# SaaS Signup Form

A secure, modern signup form for SaaS product development and consulting services. Built with React, TypeScript, Vite, and Supabase.

## Features

- ✅ Secure form submission with validation
- ✅ File uploads (Aadhaar documents and signatures)
- ✅ Digital signature upload
- ✅ Terms & Conditions agreement
- ✅ Supabase integration for data storage
- ✅ Secure file storage in Supabase buckets
- ✅ Email notifications (Resend integration)
- ✅ Automatic email to user and chairman
- ✅ Responsive design
- ✅ Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Storage)
- **Routing**: React Router
- **Internationalization**: i18next

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a Supabase project at https://supabase.com
2. Get your project URL and anon key from Settings → API
3. Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Database Migrations

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions on setting up:
- Database table (`signup_submissions`)
- Storage buckets (`aadhaar-documents` and `signatures`)

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── src/
│   ├── lib/
│   │   └── supabase.ts          # Supabase client configuration
│   ├── pages/
│   │   └── home/
│   │       ├── components/       # Form components
│   │       └── page.tsx          # Main page
│   ├── router/                   # Routing configuration
│   └── i18n/                     # Internationalization
├── supabase/
│   └── migrations/               # Database migrations
│       ├── 001_create_signup_submissions_table.sql
│       └── 002_create_storage_buckets.sql
├── .env                          # Environment variables (create this)
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Database Schema

### signup_submissions Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| full_name | TEXT | User's full name |
| phone_number | TEXT | Phone number |
| email | TEXT | Email address |
| transaction_amount | DECIMAL(10,2) | Transaction amount |
| transaction_id | TEXT | Transaction reference ID |
| aadhaar_file_path | TEXT | Path to uploaded Aadhaar document |
| signature_file_path | TEXT | Path to uploaded signature |
| agree_terms | BOOLEAN | Terms acceptance status |
| created_at | TIMESTAMP | Submission timestamp |

## Storage Buckets

1. **aadhaar-documents**
   - Private bucket
   - Max file size: 5MB
   - Allowed types: PDF, JPG, PNG

2. **signatures**
   - Private bucket
   - Max file size: 2MB
   - Allowed types: JPG, PNG

## Deployment

See [HOSTING.md](./HOSTING.md) for detailed hosting instructions. Recommended platforms:

- **Vercel** (Easiest, recommended)
- Netlify
- Cloudflare Pages
- Traditional VPS with Nginx

## Environment Variables

Required environment variables (client-side only):

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon/public key

**That's it!** Emails are handled securely through Supabase Edge Functions, so no sensitive API keys are exposed.

See [SUPABASE_EMAIL_SETUP.md](./SUPABASE_EMAIL_SETUP.md) for email configuration.

## Security Features

- Row Level Security (RLS) enabled on database table
- Private storage buckets (files not publicly accessible)
- **No API keys exposed in frontend** (Emails sent via Supabase Edge Functions)
- Client-side form validation
- Secure file upload with type and size restrictions
- Automatic email triggers via database
- HTTPS recommended for production

## Documentation

- [Supabase Setup Guide](./SUPABASE_SETUP.md) - Complete Supabase configuration
- **[Supabase Email Setup](./SUPABASE_EMAIL_SETUP.md)** - Secure email setup (Recommended)
- [Resend Setup Guide](./RESEND_SETUP.md) - Email service configuration
- [Hosting Guide](./HOSTING.md) - Deployment instructions

## License

Private - All rights reserved
