# 📚 DOCUMENTATION INDEX - Altro Da Tony

Kompletní dokumentace webové aplikace Altro Da Tony.

---

## 🚀 Start Here

| Dokument | Popis | Pro koho? |
|----------|-------|-----------|
| [**QUICKSTART.md**](./QUICKSTART.md) | ⚡ Spusťte web za 5 minut | Všichni |
| [**README.md**](./README.md) | 📖 Hlavní README s přehledem projektu | Developers |
| [**FINAL_REPORT.md**](./FINAL_REPORT.md) | ✅ Výsledky E2E auditu | Management |

---

## 📖 Complete Guides

### 🎯 For Developers

| Dokument | Co obsahuje |
|----------|-------------|
| [**README_PRODUCTION.md**](./README_PRODUCTION.md) | Kompletní produkční dokumentace, tech stack, features, návody |
| [**DEPLOYMENT.md**](./DEPLOYMENT.md) | Deployment na Vercel/Netlify, DNS setup, troubleshooting |
| [**TESTING_GUIDE.md**](./TESTING_GUIDE.md) | E2E testing checklist, manual scenarios, browser testing |

### 👨‍💼 For Management

| Dokument | Co obsahuje |
|----------|-------------|
| [**AUDIT_SUMMARY.md**](./AUDIT_SUMMARY.md) | Shrnutí auditu, opravy, doporučení, metriky |
| [**LAUNCH_CHECKLIST.md**](./LAUNCH_CHECKLIST.md) | Pre-launch checklist, launch day plan, post-launch monitoring |
| [**FINAL_REPORT.md**](./FINAL_REPORT.md) | Executive summary, findings, scores, sign-off |

### 🍽️ For Restaurant Staff

| Dokument | Co obsahuje |
|----------|-------------|
| [**ADMIN_GUIDE.md**](./ADMIN_GUIDE.md) | ⚠️ TO DO: Návod pro šéfkuchaře (jak editovat menu) |
| [**RESERVATION_GUIDE.md**](./RESERVATION_GUIDE.md) | ✅ Jak spravovat rezervace |

---

## 🔍 Quick Reference

### Technické
- **Tech Stack**: React 18, TypeScript, Tailwind CSS 4.0, Supabase
- **Backend**: Hono Edge Functions + PostgreSQL (Supabase)
- **Hosting**: Vercel (recommended) / Netlify / Cloudflare Pages

### Kontakty
```
📍 Korunní 48, Praha 2
📞 +420 774 672 458
📧 rezervace@altrodatony.cz
🌐 https://altrodatony.cz
👨‍💼 Admin: /admin (heslo: altrodatony2024)
```

### Klíčové funkce
- ✅ Online rezervace → Supabase
- ✅ Admin panel (3 taby)
- ✅ Multilanguage (CS/EN/IT)
- ✅ SEO optimized
- ✅ Responsive design

---

## 📁 File Structure

```
altro-da-tony/
├── 📖 Documentation
│   ├── QUICKSTART.md           ⚡ Quick start (5 min)
│   ├── README.md               📖 Main README
│   ├── README_PRODUCTION.md    📘 Production docs
│   ├── DEPLOYMENT.md           🚀 Deploy guide
│   ├── TESTING_GUIDE.md        ✅ Testing checklist
│   ├── LAUNCH_CHECKLIST.md     🎯 Launch plan
│   ├── AUDIT_SUMMARY.md        🔍 Audit results
│   ├── FINAL_REPORT.md         📊 Final report
│   └── DOCS_INDEX.md           📚 This file
│
├── 📱 Application Code
│   ├── /components             React components
│   ├── /contexts               React contexts
│   ├── /hooks                  Custom hooks
│   ├── /supabase              Backend functions
│   ├── /styles                 CSS & Tailwind
│   ├── /utils                  Utilities
│   └── App.tsx                 Main app
│
└── 🔧 Configuration
    ├── package.json            Dependencies
    ├── tsconfig.json           TypeScript config
    ├── vite.config.ts          Vite config
    ├── index.html              Entry point
    └── .gitignore              Git ignore
```

---

## 🎯 Common Tasks

### Potřebuji...

| Úkol | Kde najdu info |
|------|----------------|
| **Rychle spustit web** | [QUICKSTART.md](./QUICKSTART.md) |
| **Nasadit na Vercel** | [DEPLOYMENT.md](./DEPLOYMENT.md) → Krok 2 |
| **Testovat před launch** | [TESTING_GUIDE.md](./TESTING_GUIDE.md) |
| **Změnit admin heslo** | [README_PRODUCTION.md](./README_PRODUCTION.md) → Bezpečnost |
| **Upravit menu** | Admin panel `/admin` → Tab "Hlavní menu" |
| **Přidat denní menu** | Admin panel `/admin` → Tab "Denní menu" |
| **Vidět rezervace** | Admin panel `/admin` → Tab "Rezervace" |
| **Změnit barvy** | `/styles/globals.css` → CSS variables |
| **Přeložit texty** | `/contexts/LanguageContext.tsx` |
| **Přidat novou sekci** | Vytvořit komponentu v `/components` |
| **SEO meta tags** | `/index.html` |
| **API endpointy** | `/supabase/functions/server/index.tsx` |

---

## ❓ FAQ

### Jak změním admin heslo?
1. Otevři `/components/AdminPanel.tsx`
2. Najdi `const ADMIN_PASSWORD = 'altrodatony2024'`
3. Změň na své heslo
4. Redeploy web

### Jak přidám novou fotku?
1. Nahraj do `/public/images/`
2. Použij v komponentě: `<img src="/images/photo.jpg" />`

### Jak změním telefon/email?
1. Otevři `/contexts/LanguageContext.tsx`
2. Najdi sekci `contact`
3. Změň hodnoty
4. Uložit → Auto refresh

### Web nejde, co dělat?
1. Zkontroluj browser console (F12)
2. Zkontroluj Supabase dashboard (logs)
3. Zkontroluj Vercel deployment logs
4. Čti [DEPLOYMENT.md](./DEPLOYMENT.md) → Troubleshooting

---

## 🆘 Potřebujete pomoc?

1. **Technické problémy**: Čtěte [DEPLOYMENT.md](./DEPLOYMENT.md) → Troubleshooting
2. **Testing otázky**: Čtěte [TESTING_GUIDE.md](./TESTING_GUIDE.md)
3. **Business otázky**: Kontaktujte management
4. **Bug report**: GitHub Issues

---

## ✅ Status

| Kategorie | Status |
|-----------|--------|
| **Dokumentace** | ✅ Kompletní |
| **Code** | ✅ Production ready |
| **Testing** | ✅ Passed |
| **Deployment** | ✅ Ready |
| **SEO** | ✅ Optimized |
| **Security** | ✅ Implemented |
| **Performance** | ✅ Excellent |

---

## 🎉 Next Steps

1. ✅ Přečíst [QUICKSTART.md](./QUICKSTART.md)
2. ✅ Pushnout na GitHub
3. ✅ Deployovat na Vercel
4. ✅ Testovat
5. ✅ LAUNCH! 🚀

---

**Všechna dokumentace je aktuální k 9. prosinci 2024.**

*Pro nejnovější verzi navštivte GitHub repository.*

---

📖 [Zpět na README](./README.md) | 🚀 [Quick Start](./QUICKSTART.md) | 📊 [Final Report](./FINAL_REPORT.md)
