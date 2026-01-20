# 🚀 Deployment Guide

This repository is configured for deployment on multiple platforms. Choose the one that best fits your needs.

## Prerequisites

Before deploying, ensure you have:
- ✅ All dependencies installed (`npm install`)
- ✅ Environment variables configured (see `.env.example`)
- ✅ Supabase project set up (if using database features)

## Deployment Options

### 1. GitHub Pages (Automatic)

**✨ Easiest Option - No Additional Setup Required**

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to the `main` branch.

**Setup Steps:**
1. Go to your GitHub repository
2. Navigate to **Settings → Pages**
3. Under "Source", select **GitHub Actions**
4. Push to `main` branch - deployment will happen automatically
5. Your site will be available at: `https://stealth-mode-off.github.io/Altro/`

**To trigger manual deployment:**
- Go to **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**

---

### 2. Vercel (Recommended)

**⚡ Best for production sites with excellent performance**

**Deploy Now:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Stealth-mode-OFF/Altro)

**Manual Setup:**
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Add environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_ANON_KEY`

**Configuration:**
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

---

### 3. Netlify

**🌟 Great alternative with excellent features**

**Deploy Now:**

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Stealth-mode-OFF/Altro)

**Manual Setup:**
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy`
3. For production: `netlify deploy --prod`

**Environment Variables:**
Add in Netlify dashboard under Site Settings → Environment Variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## Building Locally

To test the production build locally:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview the production build
npm run preview
```

The build output will be in the `dist` directory.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=https://api.yourdomain.com
VITE_MODE=production
```

**Important:** Never commit `.env.local` to version control!

---

## Custom Domain Setup

### For Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### For Netlify:
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS records

### For GitHub Pages:
1. Go to Settings → Pages
2. Add custom domain under "Custom domain"
3. Add CNAME record to your DNS:
   ```
   CNAME @ stealth-mode-off.github.io
   ```

---

## Troubleshooting

### Build Fails
- Ensure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run build`
- Verify environment variables are set correctly

### White Screen After Deploy
- Check browser console for errors
- Verify base path in `vite.config.ts`
- Ensure all assets are loading correctly

### Environment Variables Not Working
- Prefix all environment variables with `VITE_`
- Restart development server after adding new variables
- Re-deploy after updating environment variables

---

## Performance Optimization

The build is optimized with:
- ✅ Code splitting for vendor and UI components
- ✅ Minification with esbuild
- ✅ Tree shaking for unused code
- ✅ Asset optimization

---

## Continuous Deployment

All platforms support automatic deployment:
- **GitHub Pages**: Automatic on push to `main`
- **Vercel**: Automatic on every git push
- **Netlify**: Automatic on every git push

---

## Support

For deployment issues:
1. Check the platform's status page
2. Review build logs in the platform dashboard
3. Consult platform-specific documentation:
   - [GitHub Pages Docs](https://docs.github.com/en/pages)
   - [Vercel Docs](https://vercel.com/docs)
   - [Netlify Docs](https://docs.netlify.com)

---

## Quick Start Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel

# Deploy to Netlify
netlify deploy --prod
```

---

**Your site is now ready for deployment! Choose your preferred platform and follow the steps above.** 🎉
