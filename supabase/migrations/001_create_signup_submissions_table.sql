-- Create signup_submissions table
CREATE TABLE IF NOT EXISTS public.signup_submissions (
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

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_signup_submissions_email ON public.signup_submissions(email);

-- Create index on transaction_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_signup_submissions_transaction_id ON public.signup_submissions(transaction_id);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_signup_submissions_created_at ON public.signup_submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.signup_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (public can submit forms)
CREATE POLICY "Allow public inserts" ON public.signup_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to read all submissions
-- Adjust this based on your security requirements
CREATE POLICY "Allow authenticated reads" ON public.signup_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Note: For production, you may want to restrict SELECT to only admin users
-- You can create a more restrictive policy based on user roles
