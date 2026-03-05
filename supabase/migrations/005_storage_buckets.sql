-- Migration: Create storage buckets and policies
-- Sets up Supabase Storage buckets for media files
--
-- NOTE: Storage buckets must be created manually via Supabase Dashboard or CLI
-- This migration only creates the storage policies
--
-- Required Storage Buckets (create these first):
-- ==============================================
-- 1. avatars - User profile pictures (public, max 5MB, image/*)
-- 2. projects - Project media files (private, max 500MB, video/*, audio/*, image/*)
-- 3. templates - Template preview images and videos (public, max 100MB, video/*, image/*)
-- 4. exports - Exported video files (private, max 2GB, video/mp4, video/webm)

-- Storage Policies for avatars bucket
-- Allow public read
DROP POLICY IF EXISTS "Public read avatars" ON storage.objects;
CREATE POLICY "Public read avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Allow authenticated users to upload to their own folder
DROP POLICY IF EXISTS "Users can upload own avatar" ON storage.objects;
CREATE POLICY "Users can upload own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to update their own avatar
DROP POLICY IF EXISTS "Users can update own avatar" ON storage.objects;
CREATE POLICY "Users can update own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
)
WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own avatar
DROP POLICY IF EXISTS "Users can delete own avatar" ON storage.objects;
CREATE POLICY "Users can delete own avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage Policies for projects bucket
-- Allow users to read their own project files
DROP POLICY IF EXISTS "Users can read own project files" ON storage.objects;
CREATE POLICY "Users can read own project files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'projects' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to upload to their own project folder
DROP POLICY IF EXISTS "Users can upload own project files" ON storage.objects;
CREATE POLICY "Users can upload own project files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'projects' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to update their own project files
DROP POLICY IF EXISTS "Users can update own project files" ON storage.objects;
CREATE POLICY "Users can update own project files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'projects' 
  AND auth.uid()::text = (storage.foldername(name))[1]
)
WITH CHECK (
  bucket_id = 'projects' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own project files
DROP POLICY IF EXISTS "Users can delete own project files" ON storage.objects;
CREATE POLICY "Users can delete own project files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'projects' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage Policies for templates bucket
-- Allow public read for template files
DROP POLICY IF EXISTS "Public read templates" ON storage.objects;
CREATE POLICY "Public read templates"
ON storage.objects FOR SELECT
USING (bucket_id = 'templates');

-- Allow authenticated users to upload to their own folder
DROP POLICY IF EXISTS "Users can upload own template files" ON storage.objects;
CREATE POLICY "Users can upload own template files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'templates' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to update their own template files
DROP POLICY IF EXISTS "Users can update own template files" ON storage.objects;
CREATE POLICY "Users can update own template files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'templates' 
  AND auth.uid()::text = (storage.foldername(name))[1]
)
WITH CHECK (
  bucket_id = 'templates' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own template files
DROP POLICY IF EXISTS "Users can delete own template files" ON storage.objects;
CREATE POLICY "Users can delete own template files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'templates' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage Policies for exports bucket (private, temporary)
-- Allow users to read their own exports
DROP POLICY IF EXISTS "Users can read own exports" ON storage.objects;
CREATE POLICY "Users can read own exports"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'exports' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to upload their own exports
DROP POLICY IF EXISTS "Users can upload own exports" ON storage.objects;
CREATE POLICY "Users can upload own exports"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'exports' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own exports
DROP POLICY IF EXISTS "Users can delete own exports" ON storage.objects;
CREATE POLICY "Users can delete own exports"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'exports' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
