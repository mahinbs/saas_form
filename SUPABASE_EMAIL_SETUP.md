# Supabase Email Setup (Recommended Approach)

This guide shows how to set up automatic email sending using Supabase Edge Functions and Database Triggers. This is more secure than exposing API keys in environment variables.

## Why Use Supabase for Emails?

✅ **More Secure**: API keys stay in Supabase, never exposed to frontend  
✅ **Simpler Architecture**: No separate backend/serverless functions needed  
✅ **Automatic**: Emails sent automatically when form is submitted  
✅ **Built-in**: Uses Supabase's infrastructure  

## Prerequisites

1. Supabase project set up (see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md))
2. Resend account with API key (see [RESEND_SETUP.md](./RESEND_SETUP.md))
3. Supabase CLI installed

## Step 1: Install Supabase CLI

```bash
npm install -g supabase
```

## Step 2: Link Your Project

```bash
supabase login
supabase link --project-ref your-project-ref
```

Get your project ref from: Supabase Dashboard → Settings → General → Project ID

## Step 3: Deploy the Edge Function

The Edge Function is already created in `supabase/functions/send-signup-email/index.ts`.

Deploy it:

```bash
supabase functions deploy send-signup-email
```

## Step 4: Set Secrets in Supabase

Instead of environment variables, set secrets directly in Supabase:

```bash
supabase secrets set RESEND_API_KEY=re_your_api_key
supabase secrets set RESEND_FROM_EMAIL="BoostMySites <noreply@boostmysites.com>"
```

These secrets are only accessible to Edge Functions and are never exposed.

## Step 5: Enable pg_net Extension

The database trigger uses `pg_net` to call the Edge Function.

1. Go to Supabase Dashboard → Database → Extensions
2. Search for "pg_net"
3. Click "Enable" on the pg_net extension

## Step 6: Run the Trigger Migration

Run the migration that creates the database trigger:

```bash
supabase db push
```

Or manually run the SQL from `supabase/migrations/003_create_email_trigger.sql` in the SQL Editor.

## Step 7: Configure Database Settings

Set the configuration values for your project:

1. Go to Supabase Dashboard → SQL Editor
2. Run this SQL (replace with your values):

```sql
ALTER DATABASE postgres SET app.settings.supabase_url = 'https://your-project-id.supabase.co';
ALTER DATABASE postgres SET app.settings.supabase_anon_key = 'your-anon-key';
```

## How It Works

1. User submits the form
2. Frontend uploads files and inserts data into `signup_submissions` table
3. **Database trigger automatically fires** after insert
4. Trigger calls the Supabase Edge Function
5. Edge Function:
   - Downloads signature from storage
   - Sends email to user
   - Sends email to chairman@boostmysites.com
6. User sees success message

## Environment Variables (Client-Side Only)

Your `.env` file now only needs:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**No sensitive keys needed!** 🎉

## Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Submit a test form

3. Check email delivery:
   - Check your inbox
   - Check chairman@boostmysites.com inbox
   - Check Resend dashboard → Logs

4. Check Edge Function logs:
   ```bash
   supabase functions logs send-signup-email
   ```

## Troubleshooting

### Emails Not Sending

1. **Check Edge Function logs**:
   ```bash
   supabase functions logs send-signup-email
   ```

2. **Verify secrets are set**:
   ```bash
   supabase secrets list
   ```

3. **Check pg_net extension**: Go to Database → Extensions and verify it's enabled

4. **Test Edge Function directly**:
   ```bash
   curl -X POST https://your-project.supabase.co/functions/v1/send-signup-email \
     -H "Authorization: Bearer YOUR_ANON_KEY" \
     -H "Content-Type: application/json" \
     -d '{"record": {"id": "test-id", "full_name": "Test User", ...}}'
   ```

### Database Trigger Not Firing

1. **Check trigger exists**:
   ```sql
   SELECT * FROM pg_trigger WHERE tgname = 'on_signup_submitted';
   ```

2. **Check pg_net extension**:
   ```sql
   SELECT * FROM pg_extension WHERE extname = 'pg_net';
   ```

3. **Check configuration**:
   ```sql
   SHOW app.settings.supabase_url;
   SHOW app.settings.supabase_anon_key;
   ```

### Edge Function Errors

1. **Check Resend API key**: Make sure it's set correctly in secrets
2. **Check domain verification**: Verify your domain in Resend dashboard
3. **Check rate limits**: Free tier has 100 emails/day limit

## Production Checklist

- [ ] Supabase Edge Function deployed
- [ ] Secrets configured in Supabase (RESEND_API_KEY, RESEND_FROM_EMAIL)
- [ ] pg_net extension enabled
- [ ] Database trigger created
- [ ] Database configuration set (supabase_url, anon_key)
- [ ] Resend domain verified
- [ ] Test email sent successfully
- [ ] Check Edge Function logs

## Updating the Edge Function

If you need to modify the email template or logic:

1. Edit `supabase/functions/send-signup-email/index.ts`
2. Redeploy:
   ```bash
   supabase functions deploy send-signup-email
   ```

## Advantages Over Vercel Serverless Functions

| Feature | Supabase Edge Functions | Vercel Serverless |
|---------|------------------------|-------------------|
| API Key Security | ✅ Hidden in Supabase | ❌ In environment variables |
| Setup Complexity | ✅ Simple | ⚠️ More complex |
| Architecture | ✅ All-in-one | ⚠️ Separate backend needed |
| Automatic Triggers | ✅ Database triggers | ❌ Manual API calls |
| Cost | ✅ Included in Supabase | ⚠️ Separate billing |

## Support

- Supabase Edge Functions Docs: https://supabase.com/docs/guides/functions
- Supabase Database Triggers: https://supabase.com/docs/guides/database/postgres/triggers
- pg_net Extension: https://supabase.com/docs/guides/database/extensions/pg_net
