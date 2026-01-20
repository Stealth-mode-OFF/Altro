# 🚀 DEPLOYMENT GUIDE - Altro Da Tony

## Rychlý start: Push na GitHub a Deploy

### ✅ KROK 1: Push na GitHub

Projekt je připravený k nahrání na GitHub repository:  
**https://github.com/Stealth-mode-OFF/altrodatony**

#### Option A: Pomocí Figma Make GitHub Connector (DOPORUČENO)
1. V Figma Make klikněte na **modré "GitHub" tlačítko** v UI
2. Autorizujte GitHub účet `Stealth-mode-OFF`
3. Vyberte repository: `altrodatony`
4. Branch: `main`
5. Klikněte na **Push**
6. ✅ Hotovo!

#### Option B: Ruční push přes terminál
```bash
# 1. Initialize git (pokud ještě není)
git init

# 2. Add GitHub remote
git remote add origin https://github.com/Stealth-mode-OFF/altrodatony.git

# 3. Add all files
git add .

# 4. Commit
git commit -m "🚀 Initial release - Production ready"

# 5. Push to GitHub
git push -u origin main
```

---

### ✅ KROK 2: Deploy na Vercel (DOPORUČENO)

Vercel je nejrychlejší způsob, jak nasadit React aplikaci.

#### A) Přes Vercel Dashboard (GUI)
1. Jděte na **https://vercel.com**
2. Klikněte **"Add New Project"**
3. **Import Git Repository**:
   - Connect GitHub účet
   - Vyberte `Stealth-mode-OFF/altrodatony`
4. **Configure Project**:
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```
5. **Environment Variables** (Add):
   ```
   VITE_SUPABASE_URL = your_supabase_url
   VITE_SUPABASE_ANON_KEY = your_supabase_anon_key
   ```
6. Klikněte **"Deploy"**
7. ⏳ Čekejte ~2 minuty na build
8. ✅ **Hotovo!** Web je live na `your-project.vercel.app`

#### B) Přes Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (první push = staging)
vercel

# Deploy to production
vercel --prod

# Add environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

---

### ✅ KROK 3: Nastavit Custom Domain

#### V Vercel Dashboard:
1. Otevřete svůj projekt
2. Jděte na **"Settings" → "Domains"**
3. Přidejte doménu: `altrodatony.cz`
4. Vercel vám ukáže DNS záznamy:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21 (Vercel IP)

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

#### U vašeho domain registrátora (např. Wedos, Forpsi):
1. Jděte do DNS správy
2. Přidejte A record:
   - Typ: `A`
   - Host: `@`
   - Hodnota: `76.76.21.21`
3. Přidejte CNAME record:
   - Typ: `CNAME`
   - Host: `www`
   - Hodnota: `cname.vercel-dns.com`
4. Uložte změny
5. ⏳ Čekejte 5-60 minut na DNS propagaci
6. ✅ Web dostupný na `https://altrodatony.cz`

**SSL certifikát** se vytvoří automaticky (Let's Encrypt).

---

## Alternative Hosting Platforms

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod

# Add environment variables
netlify env:set VITE_SUPABASE_URL "your_value"
netlify env:set VITE_SUPABASE_ANON_KEY "your_value"
```

#### Netlify Dashboard:
1. **https://app.netlify.com**
2. **"Add new site" → "Import existing project"**
3. Connect GitHub → vyberte repository
4. Build settings:
   ```
   Build command: npm run build
   Publish directory: dist
   ```
5. Environment variables → přidejte Supabase credentials
6. Deploy!

### Option 3: Cloudflare Pages

1. **https://dash.cloudflare.com**
2. **"Workers & Pages" → "Create application"**
3. **"Connect to Git"** → vyberte GitHub repo
4. Build configuration:
   ```
   Framework preset: Vite
   Build command: npm run build
   Build output directory: dist
   ```
5. Environment variables → přidejte credentials
6. Deploy!

---

## 🔐 Environment Variables Setup

### Kde získat Supabase credentials?

1. Jděte na **https://app.supabase.com**
2. Otevřete svůj projekt
3. **"Settings" → "API"**
4. Zkopírujte:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

### Jak přidat do Vercel?

**Option A: Dashboard**
```
Settings → Environment Variables → Add
```

**Option B: CLI**
```bash
vercel env add VITE_SUPABASE_URL production
# Paste value when prompted

vercel env add VITE_SUPABASE_ANON_KEY production
# Paste value when prompted
```

⚠️ **Po přidání env vars musíte redeploy!**

---

## 📊 Post-Deployment Checklist

### Ihned po deployu:
- [ ] ✅ Web se načítá na produkční URL
- [ ] ✅ HTTPS funguje (zelený zámek)
- [ ] ✅ Rezervační formulář ukládá do DB
- [ ] ✅ Admin panel je přístupný
- [ ] ✅ Language switcher funguje
- [ ] ✅ Všechny obrázky se načítají
- [ ] ✅ Mobile verze vypadá dobře

### První den:
- [ ] Test rezervace end-to-end
- [ ] Kontrola Supabase logs
- [ ] Monitoring uptime
- [ ] Test na reálných zařízeních
- [ ] Share link s týmem pro feedback

### První týden:
- [ ] Submit sitemap do Google Search Console
- [ ] Nastavit Google Analytics
- [ ] Propojit Google My Business
- [ ] Social media announcement
- [ ] Email stávajícím zákazníkům

---

## 🐛 Troubleshooting

### Problem: "Cannot find module 'vite'"
**Solution**:
```bash
npm install
npm run build
```

### Problem: Environment variables neviditelné
**Solution**:
- Ověřte, že začínají `VITE_` prefixem
- Redeploy po přidání env vars
- Zkontrolujte konzoli: `import.meta.env.VITE_SUPABASE_URL`

### Problem: 404 on page refresh
**Solution** (Vercel):
```json
// vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Problem: Build fails
**Solution**:
```bash
# Lokální test buildu
npm run build

# Zkontrolujte error message
# Opravte TypeScript errors
npm run type-check
```

### Problem: Rezervace nejdou do DB
**Solution**:
1. Zkontrolujte Supabase credentials
2. Ověřte API endpoint v useApi.ts
3. Zkontrolujte CORS v Supabase dashboard
4. Test API přes Postman/Insomnia

---

## 🔄 Continuous Deployment (Auto-deploy)

Po nastavení GitHub + Vercel/Netlify:

```bash
# Každý push automaticky deployuje!
git add .
git commit -m "Update menu items"
git push

# Vercel/Netlify automaticky:
# 1. Detekuje změnu
# 2. Spustí build
# 3. Deployuje novou verzi
# 4. Pošle notifikaci
```

**Preview deployments**:
- Každý pull request = preview URL
- Test změn před merge do main
- Automatic rollback v případě chyby

---

## 📊 Monitoring After Launch

### Vercel Analytics (Built-in)
- Real User Metrics (RUM)
- Core Web Vitals
- Page views
- Top pages

### Google Analytics (Doporučeno přidat)
```html
<!-- Přidat do index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Uptime Monitoring
- **UptimeRobot** (free): https://uptimerobot.com
- **Pingdom** (paid): https://pingdom.com
- Checkuje web každých 5 minut
- Email alert při downtime

---

## 🎯 Performance Optimization

### Po deployu zkontrolujte:

1. **Lighthouse Score**:
   ```bash
   # Chrome DevTools → Lighthouse → Generate Report
   ```
   - Performance: > 90 ✅
   - Accessibility: > 90 ✅
   - Best Practices: > 90 ✅
   - SEO: > 95 ✅

2. **PageSpeed Insights**:
   - https://pagespeed.web.dev
   - Test desktop i mobile
   - Cíl: Zelená skóre (90+)

3. **WebPageTest**:
   - https://www.webpagetest.org
   - Multi-location test
   - Filmstrip view

---

## 📧 Email Configuration (Optional)

Pro email notifikace při rezervacích:

### Option A: Supabase Email (Built-in)
```sql
-- V Supabase SQL Editor
CREATE OR REPLACE FUNCTION notify_reservation()
RETURNS trigger AS $$
BEGIN
  -- Send email via Supabase
  PERFORM net.http_post(
    url := 'https://api.sendgrid.com/v3/mail/send',
    headers := '{"Authorization": "Bearer YOUR_SENDGRID_KEY"}'::jsonb,
    body := json_build_object(
      'personalizations', json_build_array(
        json_build_object(
          'to', json_build_array(json_build_object('email', 'rezervace@altrodatony.cz'))
        )
      ),
      'from', json_build_object('email', 'noreply@altrodatony.cz'),
      'subject', 'Nová rezervace!',
      'content', json_build_array(
        json_build_object('type', 'text/plain', 'value', NEW.name || ' - ' || NEW.date)
      )
    )::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_reservation_created
AFTER INSERT ON kv_store_d880a0b3
FOR EACH ROW
WHEN (NEW.key LIKE 'reservation:%')
EXECUTE FUNCTION notify_reservation();
```

### Option B: Resend (Recommended)
```bash
npm install resend
```

---

## 🚨 Rollback Plan

Pokud něco selže:

### Vercel:
1. Dashboard → Deployments
2. Najděte poslední funkční verzi
3. Klikněte "⋮" → "Promote to Production"
4. ✅ Instant rollback!

### Git:
```bash
# Revert last commit
git revert HEAD
git push

# Auto-deploy old version
```

---

## ✅ FINÁLNÍ CHECKLIST

- [ ] ✅ Pushed to GitHub
- [ ] ✅ Deployed to Vercel/Netlify
- [ ] ✅ Custom domain configured
- [ ] ✅ SSL certificate active
- [ ] ✅ Environment variables set
- [ ] ✅ Test reservation works
- [ ] ✅ Admin panel accessible
- [ ] ✅ Mobile responsive check
- [ ] ✅ Lighthouse score > 90
- [ ] ✅ Google Analytics added (optional)
- [ ] ✅ Sitemap submitted to Google
- [ ] ✅ Team notified

---

## 🎉 SUCCESS!

Váš web je live na **https://altrodatony.cz**! 🚀

**Další kroky**:
1. Share na social media
2. Email stávajícím zákazníkům
3. Update Google My Business
4. Monitor analytics první týden
5. Collect feedback a iterovat

---

**Gratulujeme k úspěšnému launchi! 🍝🍷**

*Potřebujete pomoc? Kontaktujte tech support nebo Supabase community.*
