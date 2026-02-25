-- Migration: Create templates table
-- Stores community templates that users can browse and use

-- Create templates table
CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('trending', 'cinematic', 'business', 'social', 'education', 'personal', 'other')),
  thumbnail_url TEXT,
  preview_url TEXT, -- Video preview URL
  template_data JSONB NOT NULL DEFAULT '{}', -- Timeline structure, effects, etc.
  duration_seconds INTEGER DEFAULT 0,
  resolution TEXT DEFAULT '1080p' CHECK (resolution IN ('480p', '720p', '1080p')),
  tags TEXT[] DEFAULT '{}', -- Searchable tags
  downloads INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE, -- Moderation flag
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns if table already exists from previous migration
DO $$
BEGIN
  -- Add description column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'templates' AND column_name = 'description'
  ) THEN
    ALTER TABLE templates ADD COLUMN description TEXT;
  END IF;
  
  -- Add thumbnail_url column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'templates' AND column_name = 'thumbnail_url'
  ) THEN
    ALTER TABLE templates ADD COLUMN thumbnail_url TEXT;
  END IF;
  
  -- Add preview_url column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'templates' AND column_name = 'preview_url'
  ) THEN
    ALTER TABLE templates ADD COLUMN preview_url TEXT;
  END IF;
  
  -- Add duration_seconds column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'templates' AND column_name = 'duration_seconds'
  ) THEN
    ALTER TABLE templates ADD COLUMN duration_seconds INTEGER DEFAULT 0;
  END IF;
  
  -- Add resolution column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'templates' AND column_name = 'resolution'
  ) THEN
    ALTER TABLE templates ADD COLUMN resolution TEXT DEFAULT '1080p' CHECK (resolution IN ('480p', '720p', '1080p'));
  END IF;
  
  -- Add downloads column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'templates' AND column_name = 'downloads'
  ) THEN
    ALTER TABLE templates ADD COLUMN downloads INTEGER DEFAULT 0;
  END IF;
  
  -- Add tags column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'templates' AND column_name = 'tags'
  ) THEN
    ALTER TABLE templates ADD COLUMN tags TEXT[] DEFAULT '{}';
  END IF;
  
  -- Add is_featured column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'templates' AND column_name = 'is_featured'
  ) THEN
    ALTER TABLE templates ADD COLUMN is_featured BOOLEAN DEFAULT FALSE;
  END IF;
  
  -- Add is_approved column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'templates' AND column_name = 'is_approved'
  ) THEN
    ALTER TABLE templates ADD COLUMN is_approved BOOLEAN DEFAULT FALSE;
  END IF;
END $$;

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_templates_creator_id ON templates(creator_id);
CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);
CREATE INDEX IF NOT EXISTS idx_templates_downloads ON templates(downloads DESC);
CREATE INDEX IF NOT EXISTS idx_templates_is_featured ON templates(is_featured) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_templates_is_approved ON templates(is_approved) WHERE is_approved = TRUE;
CREATE INDEX IF NOT EXISTS idx_templates_created_at ON templates(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_templates_tags ON templates USING GIN(tags);

-- Enable Row Level Security
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for templates
-- Anyone can view approved templates
DROP POLICY IF EXISTS "Anyone can view approved templates" ON templates;
CREATE POLICY "Anyone can view approved templates"
  ON templates FOR SELECT
  USING (is_approved = TRUE);

-- Creators can view their own templates (even unapproved)
DROP POLICY IF EXISTS "Creators can view own templates" ON templates;
CREATE POLICY "Creators can view own templates"
  ON templates FOR SELECT
  USING (auth.uid() = creator_id);

-- Authenticated users can create templates
DROP POLICY IF EXISTS "Authenticated users can create templates" ON templates;
CREATE POLICY "Authenticated users can create templates"
  ON templates FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

-- Creators can update their own templates
DROP POLICY IF EXISTS "Creators can update own templates" ON templates;
CREATE POLICY "Creators can update own templates"
  ON templates FOR UPDATE
  USING (auth.uid() = creator_id)
  WITH CHECK (auth.uid() = creator_id);

-- Creators can delete their own templates
DROP POLICY IF EXISTS "Creators can delete own templates" ON templates;
CREATE POLICY "Creators can delete own templates"
  ON templates FOR DELETE
  USING (auth.uid() = creator_id);

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_templates_updated_at ON templates;
CREATE TRIGGER update_templates_updated_at
  BEFORE UPDATE ON templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment download count
CREATE OR REPLACE FUNCTION increment_template_downloads(template_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE templates
  SET downloads = downloads + 1
  WHERE id = template_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
