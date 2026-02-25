-- Seed data for ClipCut
-- This file contains sample data for development and testing

-- Note: Run this AFTER all migrations have been applied

-- Sample templates (will need a creator_id from an actual user)
-- These are placeholder templates to populate the template library

-- Insert sample templates (creator_id should be replaced with actual user IDs)
-- For now, these are commented out until users are created

/*
INSERT INTO templates (name, description, category, template_data, duration_seconds, resolution, tags, is_approved, is_featured) VALUES
(
  'Quick Social Intro',
  'A fast-paced intro perfect for social media videos. Features dynamic transitions and bold text.',
  'social',
  '{"clips": [], "effects": ["fade_in", "zoom"], "duration": 5}',
  5,
  '1080p',
  ARRAY['intro', 'social', 'quick', 'dynamic'],
  true,
  true
),
(
  'Cinematic Opener',
  'Professional cinematic opening with letterbox effect and dramatic fade-ins.',
  'cinematic',
  '{"clips": [], "effects": ["letterbox", "fade_in", "color_grade"], "duration": 10}',
  10,
  '1080p',
  ARRAY['cinematic', 'professional', 'film', 'dramatic'],
  true,
  true
),
(
  'Business Presentation',
  'Clean and professional template for business presentations and corporate videos.',
  'business',
  '{"clips": [], "effects": ["slide_in", "fade"], "duration": 15}',
  15,
  '1080p',
  ARRAY['business', 'corporate', 'professional', 'clean'],
  true,
  false
),
(
  'Educational Tutorial',
  'Perfect for tutorial videos with text overlays and highlight effects.',
  'education',
  '{"clips": [], "effects": ["highlight", "zoom", "text_overlay"], "duration": 30}',
  30,
  '1080p',
  ARRAY['education', 'tutorial', 'learning', 'how-to'],
  true,
  false
),
(
  'Personal Vlog Style',
  'Casual vlog-style template with fun transitions and casual text.',
  'personal',
  '{"clips": [], "effects": ["bounce", "pop", "sticker"], "duration": 20}',
  20,
  '1080p',
  ARRAY['vlog', 'personal', 'casual', 'fun'],
  true,
  false
),
(
  'Trending Reel Format',
  'Optimized for short-form content with trending effects and music sync points.',
  'trending',
  '{"clips": [], "effects": ["beat_sync", "flash", "zoom"], "duration": 15}',
  15,
  '1080p',
  ARRAY['reel', 'tiktok', 'shorts', 'trending'],
  true,
  true
);
*/

-- Sample categories reference
-- trending, cinematic, business, social, education, personal, other

-- To use this seed file:
-- 1. First run all migrations in order (001 through 005)
-- 2. Create a user account in the app
-- 3. Uncomment the INSERT statements above and replace creator_id with the user's UUID
-- 4. Run this seed file
