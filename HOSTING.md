# Hosting Guide

This guide covers how to host your SaaS Signup Form application on a subdomain.

## Prerequisites

- A domain name
- Access to your domain's DNS settings
- A hosting provider (we'll cover multiple options)

## Option 1: Vercel (Recommended - Easiest)

Vercel is the easiest option for React/Vite applications.

### Steps:

1. **Install Vercel CLI** (optional, you can also use the web interface):
   ```bash
   npm install -g vercel
   ```

2. **Build your project**:
   ```bash
   npm run build
   ```

3. **Deploy to Vercel**:
   ```bash
   vercel
   ```
   - Follow the prompts to link your project
   - When asked about environment variables, add:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - **Note**: Email configuration is handled securely in Supabase (no additional env vars needed)

4. **Configure Custom Domain**:
   - Go to your project settings on Vercel dashboard
   - Navigate to **Domains**
   - Add your subdomain (e.g., `signup.yourdomain.com`)
   - Follow the DNS instructions to add the required records

5. **Update Environment Variables**:
   - In Vercel dashboard, go to **Settings** → **Environment Variables**
   - Add required variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - **Note**: Email configuration is handled in Supabase, not in Vercel
   - Redeploy if needed

### DNS Configuration for Vercel:
Add a CNAME record:
- **Type**: CNAME
- **Name**: `signup` (or your preferred subdomain)
- **Value**: `cname.vercel-dns.com`

## Option 2: Netlify

### Steps:

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build your project**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

4. **Configure Environment Variables**:
   - Go to Netlify dashboard → **Site settings** → **Environment variables**
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

5. **Add Custom Domain**:
   - Go to **Domain settings** → **Custom domains**
   - Add your subdomain
   - Follow DNS instructions

### DNS Configuration for Netlify:
Add a CNAME record pointing to your Netlify site.

## Option 3: Cloudflare Pages

### Steps:

1. **Connect Repository**:
   - Go to Cloudflare Dashboard → **Pages**
   - Click "Create a project"
   - Connect your Git repository

2. **Configure Build Settings**:
   - **Build command**: `npm run build`
   - **Build output directory**: `out` (as configured in vite.config.ts)

3. **Add Environment Variables**:
   - In project settings, add:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

4. **Configure Custom Domain**:
   - Go to **Custom domains**
   - Add your subdomain
   - Follow DNS instructions

## Option 4: Traditional VPS/Server (Nginx)

### Steps:

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Upload files**:
   - Upload the `out` directory to your server
   - Place it in `/var/www/signup-form` (or your preferred location)

3. **Configure Nginx**:
   Create `/etc/nginx/sites-available/signup-form`:
   ```nginx
   server {
       listen 80;
       server_name signup.yourdomain.com;

       root /var/www/signup-form;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Enable gzip compression
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   }
   ```

4. **Enable the site**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/signup-form /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

5. **Set up SSL with Let's Encrypt**:
   ```bash
   sudo certbot --nginx -d signup.yourdomain.com
   ```

## Option 5: GitHub Pages

### Steps:

1. **Update vite.config.ts**:
   ```typescript
   base: '/your-repo-name/', // or '/' if using custom domain
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy script to package.json**:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d out"
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Configure Custom Domain**:
   - Create a `CNAME` file in the `out` directory with your subdomain
   - Configure DNS to point to GitHub Pages

## DNS Configuration (General)

Regardless of hosting provider, you'll need to configure DNS:

### For Subdomain:
1. Log into your domain registrar's DNS management
2. Add a new record:
   - **Type**: CNAME (or A record if provider gives IP)
   - **Name**: `signup` (or your preferred subdomain)
   - **Value**: Your hosting provider's domain/IP
   - **TTL**: 3600 (or default)

### Example DNS Records:

**For Vercel/Netlify (CNAME)**:
```
Type: CNAME
Name: signup
Value: cname.vercel-dns.com (or your provider's CNAME)
```

**For VPS (A Record)**:
```
Type: A
Name: signup
Value: your.server.ip.address
```

## Post-Deployment Checklist

- [ ] Verify the site loads at your subdomain
- [ ] Test form submission
- [ ] Verify files are uploaded to Supabase storage
- [ ] Check that data is saved in Supabase database
- [ ] Test on mobile devices
- [ ] Verify SSL certificate is active (HTTPS)
- [ ] Set up monitoring/analytics (optional)
- [ ] Configure backups (Supabase dashboard)

## Environment Variables in Production

Make sure to set environment variables in your hosting platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

**Important**: After adding/changing environment variables, you may need to rebuild/redeploy your application.

## Troubleshooting

### 404 Errors on Refresh
- Ensure your hosting provider is configured to serve `index.html` for all routes (SPA routing)

### Environment Variables Not Working
- Rebuild/redeploy after adding environment variables
- Verify variable names start with `VITE_` for Vite projects
- Check that variables are set in production environment (not just development)

### CORS Issues
- Verify your Supabase project allows requests from your domain
- Check Supabase dashboard → Settings → API → CORS settings

### Build Failures
- Ensure all dependencies are in `package.json`
- Check that Node.js version matches your local environment
- Review build logs for specific errors

## Recommended: Vercel

For this project, **Vercel is recommended** because:
- Zero configuration needed
- Automatic HTTPS
- Easy environment variable management
- Free tier is generous
- Excellent performance with global CDN
- Simple custom domain setup
