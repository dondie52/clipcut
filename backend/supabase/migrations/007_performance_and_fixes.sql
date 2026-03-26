-- Migration 007: Performance Indexes, Storage Buckets, and Bug Fixes
-- Addresses DB-001 through DB-006 production readiness tasks
--
-- Fixes:
--   1. Creates storage buckets (005 only created policies, not buckets)
--   2. Adds composite indexes for common query patterns
--   3. Fixes handle_new_user() username collision on signup
--   4. Removes redundant update_login_attempts_updated_at() function

-- ============================================================
-- 1. CREATE STORAGE BUCKETS
-- Migration 005 defined policies but never created the buckets
-- ============================================================

-- Avatars bucket: public, 5MB max, images only
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Projects bucket: private, 500MB max, video/audio/image
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'projects',
  'projects',
  false,
  524288000, -- 500MB
  ARRAY['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo',
        'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/webm',
        'image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Templates bucket: public, 100MB max, video/image
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'templates',
  'templates',
  true,
  104857600, -- 100MB
  ARRAY['video/mp4', 'video/webm', 'image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Exports bucket: private, 2GB max, video only
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'exports',
  'exports',
  false,
  2147483648, -- 2GB
  ARRAY['video/mp4', 'video/webm']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 2. COMPOSITE INDEXES FOR PERFORMANCE
-- Based on actual query patterns in projectService.js and app code
-- ============================================================

-- listProjects() filters by user_id and orders by updated_at DESC
-- Replaces separate idx_projects_user_id for this common query
CREATE INDEX IF NOT EXISTS idx_projects_user_id_updated
  ON projects(user_id, updated_at DESC);

-- projects: composite for fetching by id + user_id (deleteProject, updateProject)
CREATE INDEX IF NOT EXISTS idx_projects_id_user_id
  ON projects(id, user_id);

-- templates: browsing approved templates by category (template browser page)
CREATE INDEX IF NOT EXISTS idx_templates_approved_category
  ON templates(category, created_at DESC)
  WHERE is_approved = TRUE;

-- templates: featured approved templates (dashboard featured section)
CREATE INDEX IF NOT EXISTS idx_templates_featured_approved
  ON templates(downloads DESC)
  WHERE is_approved = TRUE AND is_featured = TRUE;

-- templates: text search on name (for template search)
-- Enable pg_trgm if available, then create trigram index for fuzzy search
DO $$
BEGIN
  CREATE EXTENSION IF NOT EXISTS pg_trgm;
  CREATE INDEX IF NOT EXISTS idx_templates_name_trgm
    ON templates USING GIN(name gin_trgm_ops);
EXCEPTION WHEN OTHERS THEN
  -- pg_trgm not available, fall back to B-tree index on name
  CREATE INDEX IF NOT EXISTS idx_templates_name ON templates(name);
END $$;

-- profiles: email lookup (used in handle_new_user trigger, GDPR export)
CREATE INDEX IF NOT EXISTS idx_profiles_email
  ON profiles(email);

-- ============================================================
-- 3. FIX handle_new_user() USERNAME COLLISION
-- If two users sign up with emails user@a.com and user@b.com,
-- the derived username "user" collides. Add a random suffix on conflict.
-- ============================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  base_username TEXT;
  final_username TEXT;
  suffix TEXT;
BEGIN
  -- Derive base username from metadata or email
  base_username := COALESCE(
    NEW.raw_user_meta_data->>'username',
    split_part(NEW.email, '@', 1)
  );

  -- Try inserting with the base username
  BEGIN
    INSERT INTO public.profiles (id, email, username, created_at)
    VALUES (NEW.id, NEW.email, base_username, NOW());
    RETURN NEW;
  EXCEPTION WHEN unique_violation THEN
    -- Username taken: append random 4-char suffix
    suffix := substr(md5(random()::text), 1, 4);
    final_username := base_username || '_' || suffix;
    INSERT INTO public.profiles (id, email, username, created_at)
    VALUES (NEW.id, NEW.email, final_username, NOW());
    RETURN NEW;
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- 4. REPLACE REDUNDANT TRIGGER FUNCTION IN login_attempts
-- Migration 006 created update_login_attempts_updated_at() which
-- duplicates update_updated_at_column() from migration 001.
-- Switch to the shared function.
-- ============================================================

DROP TRIGGER IF EXISTS update_login_attempts_updated_at ON login_attempts;
CREATE TRIGGER update_login_attempts_updated_at
  BEFORE UPDATE ON login_attempts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Drop the redundant function (only if nothing else depends on it)
DROP FUNCTION IF EXISTS update_login_attempts_updated_at();

-- ============================================================
-- 5. ADD updated_at INDEX ON PROJECTS
-- listProjects default sort is updated_at DESC
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_projects_updated_at
  ON projects(updated_at DESC);

-- ============================================================
-- COMMENTS
-- ============================================================

COMMENT ON INDEX idx_projects_user_id_updated IS 'Composite index for listProjects(userId) ordered by updated_at';
COMMENT ON INDEX idx_projects_id_user_id IS 'Composite index for single-project lookups filtered by owner';
COMMENT ON INDEX idx_templates_approved_category IS 'Partial composite for browsing approved templates by category';
COMMENT ON INDEX idx_templates_featured_approved IS 'Partial composite for featured template listings';
COMMENT ON INDEX idx_profiles_email IS 'Index for email lookups (handle_new_user, GDPR)';
COMMENT ON INDEX idx_projects_updated_at IS 'Index for projects sorted by last update';
