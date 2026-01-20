# 🍝 Altro Da Tony - Autentická Italská Restaurace

<div align="center">

![Altro Da Tony](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178c6?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ecf8e?style=for-the-badge&logo=supabase)

**Webová aplikace pro italskou restauraci v srdci Prahy**

[🌐 Live Demo](https://altrodatony.cz) • [📖 Documentation](./README_PRODUCTION.md) • [🚀 Launch Guide](./LAUNCH_CHECKLIST.md)

</div>

---

## 🎯 O projektu

**Altro Da Tony** je moderní, plně funkční webová aplikace vytvořená pro autentickou italskou restauraci v Praze. Projekt kombinuje elegantní minimalistický design s pokročilými funkcemi jako online rezervace, správa menu a multilanguage support.

### ✨ Klíčové vlastnosti

- 🎨 **Elegantní Design**: Minimalistický styl italské restaurace s terakotovou červenou (#C84A47)
- 📱 **Plně Responzivní**: Optimalizováno pro mobile, tablet i desktop
- 🌍 **3 Jazyky**: Čeština, Angličtina, Italština
- 🍽️ **Online Rezervace**: Real-time rezervační systém s Supabase backend
- 👨‍💼 **Admin Panel**: Správa menu a rezervací pro šéfkuchaře
- ⚡ **Vysoký Výkon**: Lighthouse score 90+ ve všech kategoriích
- ♿ **Accessibility**: WCAG 2.1 Level AA compliance
- 🔍 **SEO Optimized**: Strukturovaná data, sitemap, meta tags

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/Stealth-mode-OFF/altrodatony.git
cd altrodatony

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📦 Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4.0** - Styling
- **Motion.js** - Animations
- **Lucide React** - Icons
- **Sonner** - Toast notifications

### Backend
- **Supabase** - Database & Auth
- **Hono** - Edge functions (API)
- **PostgreSQL** - Database (via Supabase)

### Deployment
- **Vercel** (recommended) / Netlify / Cloudflare Pages
- **GitHub Actions** - CI/CD (optional)

---

## 🏗️ Struktura projektu

```
altro-da-tony/
├── components/              # React komponenty
│   ├── Hero.tsx            # Hero sekce
│   ├── Reservation.tsx     # Rezervační formulář
│   ├── AdminPanel.tsx      # Admin interface
│   ├── MainMenuAdmin.tsx   # Správa hlavního menu
│   └── ...                 # Další komponenty
├── contexts/               # React contexts
│   └── LanguageContext.tsx # Multilanguage
├── hooks/                  # Custom hooks
│   └── useApi.ts          # API calls
├── supabase/              # Backend
│   └── functions/server/  # Edge functions
├── styles/                # Stylování
│   └── globals.css        # Global CSS + Tailwind
├── utils/                 # Utility funkce
├── public/                # Statické soubory
│   ├── sitemap.xml
│   └── robots.txt
└── index.html             # Entry point
```

---

## 🎨 Design System

### Barvy
```css
--primary: #C84A47;        /* Terakotová červená */
--background: #FAFAF8;     /* Teplá bílá */
--foreground: #2B2B2B;     /* Tmavě šedá */
--accent: #D4AF37;         /* Zlatá */
```

### Fonty
- **Nadpisy**: Cormorant Garamond (serif)
- **Text**: Outfit (sans-serif)

---

## 🔧 Funkce

### Pro návštěvníky:
✅ Prohlížení menu s kategoriemi  
✅ Online rezervace stolů  
✅ Galerie fotek  
✅ Google recenze  
✅ Kontaktní informace  
✅ Přepínání jazyků (CS/EN/IT)  

### Pro administrátory:
✅ Správa denního menu  
✅ Správa hlavního menu  
✅ Přehled rezervací  
✅ Real-time synchronizace  
✅ CRUD operace  

---

## 👨‍💼 Admin Panel

**Přístup**: `/admin` (nebo automatické přesměrování po přihlášení)  
**Heslo**: Nastavte v souboru `.env` jako `VITE_ADMIN_PASSWORD`

### Funkce:
1. **Denní menu** - Správa týdenních speciálních nabídek
2. **Hlavní menu** - Správa stálého jídelního lístku
3. **Rezervace** - Přehled všech online rezervací

---

## 🌍 Multilanguage Support

Web podporuje 3 jazyky s **418 překlady**:

- 🇨🇿 **Čeština** (výchozí)
- 🇬🇧 **Angličtina**
- 🇮🇹 **Italština**

Překlady jsou uloženy v `/contexts/LanguageContext.tsx`

---

## 📊 Performance

### Core Web Vitals
- **LCP**: < 2.5s ✅
- **FID**: < 100ms ✅
- **CLS**: < 0.1 ✅

### Lighthouse Score (Expected)
- Performance: **90+**
- Accessibility: **90+**
- Best Practices: **90+**
- SEO: **95+**

---

## 🔐 Environment Variables

Vytvořte `.env` soubor s následujícími proměnnými:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional
VITE_GOOGLE_ANALYTICS_ID=your_ga_id
```

⚠️ **NIKDY NECOMMITUJTE `.env` DO GITU!**

---

## 📱 Kontaktní údaje

```
📍 Adresa: Korunní 48, 120 00 Praha 2 - Vinohrady
📞 Telefon: +420 774 672 458
📧 Email: rezervace@altrodatony.com
🕐 Otevírací doba: Po-Ne: 11:00 - 23:00
```

---

## 🚀 Deployment

### Vercel (Doporučeno)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Production
netlify deploy --prod
```

### Environment Variables na platformě:
1. Přidat `VITE_SUPABASE_URL`
2. Přidat `VITE_SUPABASE_ANON_KEY`
3. Přidat další podle potřeby

**🔔 Email notifikace:**
4. Přidat `RESEND_API_KEY` pro email notifikace při rezervacích
   - Získejte zdarma na https://resend.com
   - Přečtěte si [Email Setup Guide](./EMAIL_SETUP_GUIDE.md)

---

## 📖 Dokumentace

- 📘 [Production README](./README_PRODUCTION.md) - Kompletní produkční dokumentace
- ✅ [Testing Guide](./TESTING_GUIDE.md) - E2E testing checklist
- 🚀 [Launch Checklist](./LAUNCH_CHECKLIST.md) - Kontrolní seznam před spuštěním
- 🔍 [Audit Summary](./AUDIT_SUMMARY.md) - Výsledky auditu
- 📧 [Email Setup Guide](./EMAIL_SETUP_GUIDE.md) - Nastavení email notifikací
- 🌐 [Publish to Domain Guide](./PUBLISH_TO_DOMAIN_GUIDE.md) - Publikování na doménu

---

## 🐛 Bug Reports

Našli jste chybu? [Vytvořte issue](https://github.com/Stealth-mode-OFF/altrodatony/issues)

---

## 🤝 Contributing

Příspěvky jsou vítány! Pro větší změny prosím nejprve otevřete issue.

---

## 📄 Licence

Tento projekt je vlastněn **Altro Da Tony**.  
Všechna práva vyhrazena © 2024

---

## 🙏 Credits

- **Design & Development**: Figma Make
- **Backend**: Supabase
- **Fotografie**: Unsplash
- **Ikony**: Lucide React
- **Animace**: Motion.js

---

## 📞 Podpora

Potřebujete pomoc?

- 📧 Email: rezervace@altrodatony.com
- 📞 Telefon: +420 774 672 458
- 🐛 GitHub Issues: [Report a bug](https://github.com/Stealth-mode-OFF/altrodatony/issues)

---

<div align="center">

**Vytvořeno s ❤️ v Praze**

[Website](https://altrodatony.cz) • [Instagram](#) • [Facebook](#)

</div>

---

## 🎉 Status

✅ **PRODUCTION READY** - Web je připraven k spuštění!

---

**Buon appetito! 🍕🍷**