
-- Add new design columns to personas
ALTER TABLE public.personas
  ADD COLUMN IF NOT EXISTS card_bg_image_url text,
  ADD COLUMN IF NOT EXISTS secondary_color text,
  ADD COLUMN IF NOT EXISTS tertiary_color text,
  ADD COLUMN IF NOT EXISTS text_color text,
  ADD COLUMN IF NOT EXISTS landing_bg_color text;

-- Create storage bucket for design assets (backgrounds, card images)
INSERT INTO storage.buckets (id, name, public)
VALUES ('design-assets', 'design-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload to their own folder
CREATE POLICY "Users can upload design assets"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'design-assets' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow authenticated users to update their own assets
CREATE POLICY "Users can update own design assets"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'design-assets' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow authenticated users to delete their own assets
CREATE POLICY "Users can delete own design assets"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'design-assets' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow public read access to design assets
CREATE POLICY "Public read access for design assets"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'design-assets');
