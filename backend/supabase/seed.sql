-- Seed data for ClipCut
-- This file contains sample data for development and testing
--
-- Note: Run this AFTER all migrations have been applied
-- This will only insert data if at least one user exists in the profiles table

-- Insert sample templates using the first available user as creator
-- This will only run if users exist, and won't duplicate templates
DO $$
DECLARE
  first_user_id UUID;
  template_count INTEGER;
BEGIN
  -- Get the first user ID from profiles
  SELECT id INTO first_user_id FROM profiles LIMIT 1;
  
  -- Only proceed if a user exists
  IF first_user_id IS NOT NULL THEN
    -- Check if templates already exist to avoid duplicates
    SELECT COUNT(*) INTO template_count FROM templates;
    
    -- Only insert if no templates exist yet
    IF template_count = 0 THEN
      INSERT INTO templates (creator_id, name, description, category, template_data, duration_seconds, resolution, tags, is_approved, is_featured) VALUES
      (
        first_user_id,
        'Quick Social Intro',
        'A fast-paced intro perfect for social media videos. Features dynamic transitions and bold text.',
        'social',
        '{"clips": [], "effects": ["fade_in", "zoom"], "duration": 5}'::jsonb,
        5,
        '1080p',
        ARRAY['intro', 'social', 'quick', 'dynamic'],
        true,
        true
      ),
      (
        first_user_id,
        'Cinematic Opener',
        'Professional cinematic opening with letterbox effect and dramatic fade-ins.',
        'cinematic',
        '{"clips": [], "effects": ["letterbox", "fade_in", "color_grade"], "duration": 10}'::jsonb,
        10,
        '1080p',
        ARRAY['cinematic', 'professional', 'film', 'dramatic'],
        true,
        true
      ),
      (
        first_user_id,
        'Business Presentation',
        'Clean and professional template for business presentations and corporate videos.',
        'business',
        '{"clips": [], "effects": ["slide_in", "fade"], "duration": 15}'::jsonb,
        15,
        '1080p',
        ARRAY['business', 'corporate', 'professional', 'clean'],
        true,
        false
      ),
      (
        first_user_id,
        'Educational Tutorial',
        'Perfect for tutorial videos with text overlays and highlight effects.',
        'education',
        '{"clips": [], "effects": ["highlight", "zoom", "text_overlay"], "duration": 30}'::jsonb,
        30,
        '1080p',
        ARRAY['education', 'tutorial', 'learning', 'how-to'],
        true,
        false
      ),
      (
        first_user_id,
        'Personal Vlog Style',
        'Casual vlog-style template with fun transitions and casual text.',
        'personal',
        '{"clips": [], "effects": ["bounce", "pop", "sticker"], "duration": 20}'::jsonb,
        20,
        '1080p',
        ARRAY['vlog', 'personal', 'casual', 'fun'],
        true,
        false
      ),
      (
        first_user_id,
        'Trending Reel Format',
        'Optimized for short-form content with trending effects and music sync points.',
        'trending',
        '{"clips": [], "effects": ["beat_sync", "flash", "zoom"], "duration": 15}'::jsonb,
        15,
        '1080p',
        ARRAY['reel', 'tiktok', 'shorts', 'trending'],
        true,
        true
      );
      
      RAISE NOTICE 'Inserted 6 sample templates';
    ELSE
      RAISE NOTICE 'Templates already exist, skipping seed data';
    END IF;
  ELSE
    RAISE NOTICE 'No users found. Please create a user account first, then run this seed file.';
  END IF;
END $$;

-- Sample categories reference:
-- trending, cinematic, business, social, education, personal, other

-- Usage:
-- 1. Run all migrations in order (001 through 006)
-- 2. Create at least one user account in the app (sign up)
-- 3. Run this seed file - it will automatically use the first user as the template creator
-- 4. Safe to run multiple times - it won't create duplicates
