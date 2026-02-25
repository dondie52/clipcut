-- Migration: Login Attempts Tracking for Account Lockout
-- Creates a table to track failed login attempts and implement account lockout

-- Create login_attempts table
CREATE TABLE IF NOT EXISTS login_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  failed_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMPTZ,
  last_attempt TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email)
);

-- Create index on email for fast lookups
CREATE INDEX IF NOT EXISTS idx_login_attempts_email ON login_attempts(email);
CREATE INDEX IF NOT EXISTS idx_login_attempts_user_id ON login_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_login_attempts_locked_until ON login_attempts(locked_until) WHERE locked_until IS NOT NULL;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_login_attempts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_login_attempts_updated_at
  BEFORE UPDATE ON login_attempts
  FOR EACH ROW
  EXECUTE FUNCTION update_login_attempts_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only view their own login attempts
CREATE POLICY "Users can view their own login attempts"
  ON login_attempts
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy: Service role can manage all login attempts (for server-side operations)
-- Note: This requires service role key, which should only be used server-side
-- For client-side, we'll use a function that can be called by authenticated users

-- Create function to record failed login attempt (callable by anyone, but rate-limited)
CREATE OR REPLACE FUNCTION record_failed_login_attempt(p_email TEXT)
RETURNS JSONB AS $$
DECLARE
  v_user_id UUID;
  v_existing RECORD;
  v_attempts INTEGER;
  v_locked_until TIMESTAMPTZ;
  v_max_attempts INTEGER := 5;
  v_lockout_duration INTERVAL := '30 minutes';
BEGIN
  -- Get user ID if user exists
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = p_email
  LIMIT 1;

  -- Get existing record
  SELECT * INTO v_existing
  FROM login_attempts
  WHERE email = p_email;

  -- Check if account is currently locked
  IF v_existing.locked_until IS NOT NULL AND NOW() < v_existing.locked_until THEN
    RETURN jsonb_build_object(
      'locked', true,
      'locked_until', v_existing.locked_until,
      'attempts_remaining', 0
    );
  END IF;

  -- Reset if lockout expired
  IF v_existing.locked_until IS NOT NULL AND NOW() >= v_existing.locked_until THEN
    v_attempts := 1;
    v_locked_until := NULL;
  ELSE
    v_attempts := COALESCE(v_existing.failed_attempts, 0) + 1;
    v_locked_until := NULL;
  END IF;

  -- Lock if max attempts reached
  IF v_attempts >= v_max_attempts THEN
    v_locked_until := NOW() + v_lockout_duration;
  END IF;

  -- Upsert the record
  INSERT INTO login_attempts (user_id, email, failed_attempts, locked_until, last_attempt)
  VALUES (v_user_id, p_email, v_attempts, v_locked_until, NOW())
  ON CONFLICT (email) DO UPDATE
  SET
    user_id = EXCLUDED.user_id,
    failed_attempts = EXCLUDED.failed_attempts,
    locked_until = EXCLUDED.locked_until,
    last_attempt = EXCLUDED.last_attempt,
    updated_at = NOW();

  RETURN jsonb_build_object(
    'locked', v_attempts >= v_max_attempts,
    'locked_until', v_locked_until,
    'attempts_remaining', GREATEST(0, v_max_attempts - v_attempts),
    'attempts', v_attempts
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to clear failed login attempts (callable by authenticated users for their own email)
CREATE OR REPLACE FUNCTION clear_failed_login_attempts(p_email TEXT)
RETURNS VOID AS $$
BEGIN
  -- Only allow clearing if the email matches the authenticated user's email
  IF EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid() AND email = p_email
  ) THEN
    DELETE FROM login_attempts WHERE email = p_email;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check account lockout status
CREATE OR REPLACE FUNCTION check_account_lockout(p_email TEXT)
RETURNS JSONB AS $$
DECLARE
  v_record RECORD;
  v_max_attempts INTEGER := 5;
BEGIN
  SELECT * INTO v_record
  FROM login_attempts
  WHERE email = p_email;

  IF v_record IS NULL THEN
    RETURN jsonb_build_object(
      'locked', false,
      'attempts_remaining', v_max_attempts
    );
  END IF;

  -- Check if still locked
  IF v_record.locked_until IS NOT NULL AND NOW() < v_record.locked_until THEN
    RETURN jsonb_build_object(
      'locked', true,
      'locked_until', v_record.locked_until,
      'attempts_remaining', 0
    );
  END IF;

  -- Not locked
  RETURN jsonb_build_object(
    'locked', false,
    'attempts_remaining', GREATEST(0, v_max_attempts - v_record.failed_attempts),
    'attempts', v_record.failed_attempts
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION record_failed_login_attempt(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION clear_failed_login_attempts(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION check_account_lockout(TEXT) TO authenticated;

-- Grant execute permissions to anon (for login attempts before authentication)
GRANT EXECUTE ON FUNCTION record_failed_login_attempt(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION check_account_lockout(TEXT) TO anon;

-- Add comment
COMMENT ON TABLE login_attempts IS 'Tracks failed login attempts and implements account lockout after 5 failed attempts for 30 minutes';
COMMENT ON FUNCTION record_failed_login_attempt IS 'Records a failed login attempt and returns lockout status';
COMMENT ON FUNCTION clear_failed_login_attempts IS 'Clears failed login attempts for a user (only for their own email)';
COMMENT ON FUNCTION check_account_lockout IS 'Checks if an account is currently locked due to failed login attempts';
