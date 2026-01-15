-- Create a function to invoke the Edge Function when a new signup is submitted
CREATE OR REPLACE FUNCTION handle_new_signup()
RETURNS TRIGGER AS $$
DECLARE
  service_role_key TEXT;
  request_id BIGINT;
BEGIN
  -- Call the Edge Function using pg_net (Supabase's HTTP extension)
  -- The Edge Function will handle sending emails
  SELECT net.http_post(
    url := current_setting('app.settings.supabase_url') || '/functions/v1/send-signup-email',
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

-- Create trigger to call the function after insert
DROP TRIGGER IF EXISTS on_signup_submitted ON public.signup_submissions;
CREATE TRIGGER on_signup_submitted
  AFTER INSERT ON public.signup_submissions
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_signup();

-- Note: You need to set these configuration values:
-- 1. In Supabase Dashboard, go to Database → Extensions
-- 2. Enable the "pg_net" extension
-- 3. Then set the configuration:
--    ALTER DATABASE postgres SET app.settings.supabase_url = 'https://your-project.supabase.co';
--    ALTER DATABASE postgres SET app.settings.supabase_anon_key = 'your-anon-key';
