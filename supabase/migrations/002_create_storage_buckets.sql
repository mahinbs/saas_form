-- Create storage buckets for Aadhaar documents and signatures

-- Create aadhaar-documents bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'aadhaar-documents',
  'aadhaar-documents',
  false, -- Private bucket (not publicly accessible)
  5242880, -- 5MB limit (5 * 1024 * 1024 bytes)
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
)
ON CONFLICT (id) DO NOTHING;

-- Create signatures bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'signatures',
  'signatures',
  false, -- Private bucket (not publicly accessible)
  2097152, -- 2MB limit (2 * 1024 * 1024 bytes)
  ARRAY['image/jpeg', 'image/png', 'image/jpg']
)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for aadhaar-documents bucket
-- Allow public to upload files
CREATE POLICY "Allow public uploads to aadhaar-documents"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'aadhaar-documents');

-- Allow authenticated users to read files
CREATE POLICY "Allow authenticated reads from aadhaar-documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'aadhaar-documents');

-- Allow authenticated users to delete their own files (optional)
CREATE POLICY "Allow authenticated deletes from aadhaar-documents"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'aadhaar-documents');

-- Create storage policies for signatures bucket
-- Allow public to upload files
CREATE POLICY "Allow public uploads to signatures"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'signatures');

-- Allow authenticated users to read files
CREATE POLICY "Allow authenticated reads from signatures"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'signatures');

-- Allow authenticated users to delete their own files (optional)
CREATE POLICY "Allow authenticated deletes from signatures"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'signatures');
