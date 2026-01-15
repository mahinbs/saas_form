-- ================================================================
-- COMPLETE SUPABASE SETUP - RUN THIS ENTIRE FILE IN SQL EDITOR
-- ================================================================

-- ================================================================
-- PART 1: CREATE TABLE FOR FORM SUBMISSIONS
-- ================================================================

CREATE TABLE IF NOT EXISTS public.form_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT NOT NULL,
  transaction_amount DECIMAL(10, 2) NOT NULL,
  transaction_id TEXT NOT NULL,
  aadhaar_file_path TEXT NOT NULL,
  signature_file_path TEXT NOT NULL,
  agree_terms BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON public.form_submissions(email);
CREATE INDEX IF NOT EXISTS idx_form_submissions_transaction_id ON public.form_submissions(transaction_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON public.form_submissions(created_at DESC);

ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public form inserts" ON public.form_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ================================================================
-- PART 2: CREATE STORAGE BUCKETS
-- ================================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'aadhaar-documents',
  'aadhaar-documents',
  false,
  5242880,
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'signatures',
  'signatures',
  false,
  2097152,
  ARRAY['image/jpeg', 'image/png', 'image/jpg']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public upload aadhaar" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'aadhaar-documents');

CREATE POLICY "Public upload signature" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'signatures');

-- ================================================================
-- PART 3: ENABLE PG_NET EXTENSION
-- ================================================================

CREATE EXTENSION IF NOT EXISTS pg_net;

-- ================================================================
-- PART 4: CREATE EMAIL TRIGGER
-- ================================================================

CREATE OR REPLACE FUNCTION handle_form_submission()
RETURNS TRIGGER AS $$
DECLARE
  request_id BIGINT;
BEGIN
  SELECT net.http_post(
    url := current_setting('app.settings.supabase_url') || '/functions/v1/send-form-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.supabase_anon_key')
    ),
    body := jsonb_build_object(
      'record', row_to_json(NEW)
    )
  ) INTO request_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_form_submitted
  AFTER INSERT ON public.form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION handle_form_submission();

-- ================================================================
-- PART 5: SET CONFIGURATION
-- ================================================================

-- ALTER DATABASE postgres SET app.settings.supabase_url = 'https://your-project-id.supabase.co';
-- ALTER DATABASE postgres SET app.settings.supabase_anon_key = 'your-anon-key-here';
