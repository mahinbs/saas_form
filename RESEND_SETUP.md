# Resend Email Setup Guide

This guide will help you set up Resend for sending confirmation emails when users sign up.

## Prerequisites

1. A Resend account (sign up at https://resend.com)
2. A verified domain (for production) or use Resend's test domain (for development)

## Step 1: Create Resend Account

1. Go to https://resend.com
2. Sign up for a free account
3. Verify your email address

## Step 2: Get Your API Key

1. Go to **API Keys** in your Resend dashboard
2. Click **Create API Key**
3. Give it a name (e.g., "SaaS Signup Form")
4. Copy the API key (starts with `re_`)
5. **Important**: Save this key securely - you won't be able to see it again!

## Step 3: Verify Your Domain (Production)

For production use, you need to verify your domain:

1. Go to **Domains** in your Resend dashboard
2. Click **Add Domain**
3. Enter your domain (e.g., `boostmysites.com`)
4. Add the DNS records provided by Resend to your domain's DNS settings:
   - **SPF Record**: For email authentication
   - **DKIM Records**: For email signing
   - **DMARC Record** (optional): For email security
5. Wait for verification (usually takes a few minutes to 24 hours)

### Using Test Domain (Development)

For development/testing, you can use Resend's test domain:
- From email: `onboarding@resend.dev`
- This works without domain verification but has limitations

## Step 4: Configure Environment Variables

### Local Development

1. Add to your `.env` file:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   RESEND_FROM_EMAIL=BoostMySites <noreply@boostmysites.com>
   ```

   For development with test domain:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   RESEND_FROM_EMAIL=onboarding@resend.dev
   ```

### Production (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `RESEND_API_KEY` = Your Resend API key
   - `RESEND_FROM_EMAIL` = Your verified email address (e.g., `BoostMySites <noreply@boostmysites.com>`)
   - `SUPABASE_SERVICE_ROLE_KEY` = Your Supabase service role key (for server-side access)

## Step 5: Get Supabase Service Role Key

The email API needs the Supabase service role key to access storage files:

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Find **service_role** key (under "Project API keys")
4. **⚠️ Important**: This key has admin access. Never expose it in client-side code!
5. Add it to your environment variables as `SUPABASE_SERVICE_ROLE_KEY`

## Step 6: Test Email Sending

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Submit a test form
3. Check:
   - Your email inbox (user email)
   - chairman@boostmysites.com inbox
   - Resend dashboard → **Logs** to see email status

## Email Templates

The system sends two emails:

### 1. User Confirmation Email
- **To**: User's email address
- **Subject**: "Signup Confirmation - Your Signed Application Form"
- **Content**: Includes all form details and signature image
- **Attachment**: Signature image file

### 2. Chairman Notification Email
- **To**: chairman@boostmysites.com
- **Subject**: "New Signup Submission - [Name] ([Transaction ID])"
- **Content**: Submission details for review
- **Attachment**: Signature image file

## Troubleshooting

### Emails Not Sending

1. **Check API Key**: Verify your `RESEND_API_KEY` is correct
2. **Check Domain**: Ensure your domain is verified (for production)
3. **Check Logs**: Go to Resend dashboard → **Logs** to see error messages
4. **Check Environment Variables**: Ensure all variables are set correctly
5. **Check Supabase Service Key**: Verify `SUPABASE_SERVICE_ROLE_KEY` is set

### Common Errors

**"Invalid API Key"**
- Verify your API key is correct
- Ensure it starts with `re_`

**"Domain not verified"**
- Verify your domain in Resend dashboard
- Or use `onboarding@resend.dev` for testing

**"Failed to retrieve signature"**
- Check that `SUPABASE_SERVICE_ROLE_KEY` is set correctly
- Verify the signature file exists in Supabase storage

**"Rate limit exceeded"**
- Resend free tier: 100 emails/day
- Upgrade plan if you need more

## Resend Pricing

- **Free Tier**: 100 emails/day, 3,000 emails/month
- **Pro Tier**: $20/month - 50,000 emails/month
- **Business Tier**: Custom pricing

See https://resend.com/pricing for current pricing.

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for all sensitive data
3. **Rotate API keys** periodically
4. **Monitor email logs** for suspicious activity
5. **Use service role key** only in server-side code (never in client)

## Production Checklist

- [ ] Domain verified in Resend
- [ ] API key added to environment variables
- [ ] From email address configured
- [ ] Supabase service role key configured
- [ ] Test emails sent successfully
- [ ] Email templates reviewed
- [ ] Monitoring set up (optional)

## Support

- Resend Documentation: https://resend.com/docs
- Resend Support: support@resend.com
- Resend Status: https://status.resend.com
