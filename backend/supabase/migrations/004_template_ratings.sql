-- Migration: Create template_ratings table
-- Stores user ratings for templates

-- Create template_ratings table
CREATE TABLE IF NOT EXISTS template_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES templates(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT, -- Optional review text
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  -- Each user can only rate a template once
  UNIQUE(template_id, user_id)
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_template_ratings_template_id ON template_ratings(template_id);
CREATE INDEX IF NOT EXISTS idx_template_ratings_user_id ON template_ratings(user_id);
CREATE INDEX IF NOT EXISTS idx_template_ratings_rating ON template_ratings(rating);

-- Enable Row Level Security
ALTER TABLE template_ratings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for template_ratings
-- Anyone can view ratings
DROP POLICY IF EXISTS "Anyone can view ratings" ON template_ratings;
CREATE POLICY "Anyone can view ratings"
  ON template_ratings FOR SELECT
  USING (true);

-- Authenticated users can create ratings
DROP POLICY IF EXISTS "Authenticated users can create ratings" ON template_ratings;
CREATE POLICY "Authenticated users can create ratings"
  ON template_ratings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own ratings
DROP POLICY IF EXISTS "Users can update own ratings" ON template_ratings;
CREATE POLICY "Users can update own ratings"
  ON template_ratings FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own ratings
DROP POLICY IF EXISTS "Users can delete own ratings" ON template_ratings;
CREATE POLICY "Users can delete own ratings"
  ON template_ratings FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_template_ratings_updated_at ON template_ratings;
CREATE TRIGGER update_template_ratings_updated_at
  BEFORE UPDATE ON template_ratings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- View for template average ratings
CREATE OR REPLACE VIEW template_rating_stats AS
SELECT 
  template_id,
  COUNT(*) as rating_count,
  ROUND(AVG(rating)::numeric, 2) as average_rating,
  COUNT(*) FILTER (WHERE rating = 5) as five_star_count,
  COUNT(*) FILTER (WHERE rating = 4) as four_star_count,
  COUNT(*) FILTER (WHERE rating = 3) as three_star_count,
  COUNT(*) FILTER (WHERE rating = 2) as two_star_count,
  COUNT(*) FILTER (WHERE rating = 1) as one_star_count
FROM template_ratings
GROUP BY template_id;
