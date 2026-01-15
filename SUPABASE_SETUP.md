# Supabase Setup Guide

This guide will help you set up Supabase for the SaaS Signup Form application.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. A Supabase project created

## Step 1: Create Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in your project details:
   - Name: `saas-signup-form` (or your preferred name)
   - Database Password: (choose a strong password)
   - Region: (choose closest to your users)
4. Click "Create new project" and wait for it to be ready

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and replace the placeholder values:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```
   
   **Note**: The `SUPABASE_SERVICE_ROLE_KEY` is needed for the email API to access storage files. Get it from **Settings** → **API** → **service_role** key. ⚠️ Keep this secret!

## Step 4: Run Database Migrations

You have two options to run the migrations:

### Option A: Using Supabase Dashboard (Recommended for beginners)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open the file `supabase/migrations/001_create_signup_submissions_table.sql`
4. Copy and paste the entire SQL content into the SQL Editor
5. Click "Run" to execute the migration
6. Repeat for `supabase/migrations/002_create_storage_buckets.sql`

### Option B: Using Supabase CLI

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. Run migrations:
   ```bash
   supabase db push
   ```

## Step 5: Verify Storage Buckets

1. Go to **Storage** in your Supabase dashboard
2. You should see two buckets:
   - `aadhaar-documents` (5MB limit, PDF/Images)
   - `signatures` (2MB limit, Images only)

If the buckets don't exist, run the migration `002_create_storage_buckets.sql` again.

## Step 6: Test the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Fill out the form and submit
3. Check your Supabase dashboard:
   - **Table Editor** → `signup_submissions` (should show your submission)
   - **Storage** → Check the buckets for uploaded files

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure your `.env` file exists and has the correct values
- Restart your development server after changing `.env`

### Error: "Failed to upload file"
- Check that the storage buckets exist
- Verify the file size is within limits (5MB for Aadhaar, 2MB for signature)
- Check that the file types are allowed

### Error: "Failed to save submission"
- Verify the `signup_submissions` table exists
- Check that RLS policies allow inserts
- Review the browser console for detailed error messages

## Security Notes

- The storage buckets are set to **private** by default
- Only authenticated users can read files (you may want to adjust this based on your needs)
- The `anon` key is safe to use in client-side code, but consider using Row Level Security (RLS) policies for production

## Production Considerations

1. **Row Level Security (RLS)**: The current setup allows public inserts. For production, consider:
   - Adding rate limiting
   - Implementing CAPTCHA
   - Restricting SELECT access to admin users only

2. **File Access**: Currently, files are private. If you need to access them:
   - Create signed URLs for temporary access
   - Or adjust the bucket policies to allow public reads (not recommended for sensitive documents)

3. **Backup**: Set up regular backups of your Supabase database

4. **Monitoring**: Enable Supabase monitoring and alerts
