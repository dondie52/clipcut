-- Migration: Create storage buckets
-- Sets up Supabase Storage buckets for media files

-- Note: Storage buckets are typically created via Supabase Dashboard or CLI
-- This file documents the required buckets and their policies

/*
Required Storage Buckets:
========================

1. avatars - User profile pictures
   - Public read access
   - Authenticated write (own folder only)
   - Max file size: 5MB
   - Allowed types: image/jpeg, image/png, image/webp, image/gif

2. projects - Project media files (videos, audio, images)
   - Private (owner only)
   - Authenticated write (own folder only)
   - Max file size: 500MB
   - Allowed types: video/*, audio/*, image/*

3. templates - Template preview images and videos
   - Public read access
   - Authenticated write (own folder only)
   - Max file size: 100MB
   - Allowed types: video/*, image/*

4. exports - Exported video files (temporary)
   - Private (owner only)
   - Auto-delete after 24 hours
   - Max file size: 2GB
   - Allowed types: video/mp4, video/webm

Storage Policies (to be set in Supabase Dashboard):
==================================================

-- avatars bucket policies
-- Allow public read
CREATE POLICY "Public read avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Allow authenticated users to upload to their own folder
CREATE POLICY "Users can upload own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to update/delete their own avatar
CREATE POLICY "Users can update own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete own avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- projects bucket policies
-- Allow users to read their own project files
CREATE POLICY "Users can read own project files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'projects' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to upload to their own project folder
CREATE POLICY "Users can upload own project files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'projects' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to update/delete their own project files
CREATE POLICY "Users can update own project files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'projects' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete own project files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'projects' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- templates bucket policies
-- Allow public read for approved templates
CREATE POLICY "Public read templates"
ON storage.objects FOR SELECT
USING (bucket_id = 'templates');

-- Allow authenticated users to upload to their own folder
CREATE POLICY "Users can upload own template files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'templates' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- exports bucket policies (private, temporary)
CREATE POLICY "Users can read own exports"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'exports' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can upload own exports"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'exports' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete own exports"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'exports' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

*/
