# 🍝 Altro Da Tony - Produkční Dokumentace

## 🎯 Přehled projektu

Plně funkční webová aplikace pro italskou restauraci **Altro Da Tony** s pokročilým rezervačním systémem, správou menu a real-time synchronizací s databází.

---

## ✅ LAUNCH CHECKLIST - Připraveno k produkci

### ✨ Implementované funkce

#### 🔧 **Backend & Database**
- ✅ Supabase backend s REST API
- ✅ Real-time synchronizace rezervací
- ✅ Správa denního menu (týdenní plány)
- ✅ Správa hlavního menu (antipasti, primi, secondi, dolci)
- ✅ Key-value databázový systém
- ✅ Error handling a logging

#### 🎨 **Frontend**
- ✅ Responzivní design (mobile, tablet, desktop)
- ✅ Minimalistický styl italské restaurace
- ✅ Terakotová červená barva (#C84A47)
- ✅ Serif fonty (Playfair Display, Cormorant Garamond)
- ✅ Smooth scroll navigation
- ✅ Motion animations
- ✅ Toast notifikace

#### 🌍 **Multilanguage**
- ✅ Čeština (výchozí)
- ✅ Angličtina
- ✅ Italština
- ✅ Language switcher v headeru

#### 📝 **Rezervační systém**
- ✅ Online formulář s validací
- ✅ Auto-format tel. čísla (+420 XXX XXX XXX)
- ✅ Date picker s ochranou proti minulým datům
- ✅ Ukládání do Supabase databáze
- ✅ Success/error feedback
- ✅ Telefon jako fallback (+420 774 672 458)
- ✅ **Email notifikace** při každé rezervaci na rezervace@altrodatony.com
- ✅ **Resend API** integrace pro odesílání emailů
- ✅ Non-blocking email processing (rezervace se uloží i když email selže)

#### 👨‍💼 **Admin Panel**
- ✅ 3 taby: Denní menu, Hlavní menu, Rezervace
- ✅ Heslo: `altrodatony2024`
- ✅ Správa denního menu (polévka, hlavní chod, dezert)
- ✅ Správa hlavního menu (kategorie, ceny, popisy)
- ✅ Přehled všech rezervací
- ✅ Smazání/úprava rezervací
- ✅ Real-time preview na webu

#### 🖼️ **Galerie & Obrázky**
- ✅ Profesionální fotky z Unsplash
- ✅ Optimalizované načítání
- ✅ Fallback obrázky
- ✅ Alt texty pro accessibility

#### 📊 **SEO & Marketing**
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ Strukturovaná data (Schema.org - Restaurant)
- ✅ Geo tags (Praha 2, souřadnice)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Canonical URL

#### ⚡ **Performance**
- ✅ Lazy loading komponent
- ✅ Optimalizované bundle size
- ✅ Fast page load
- ✅ Smooth animations bez lagů

#### ♿ **Accessibility**
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus states
- ✅ Kontrastní poměry

---

## 🚀 Jak spustit lokálně

```bash
# 1. Clone repository
git clone https://github.com/Stealth-mode-OFF/altrodatony.git
cd altrodatony

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
http://localhost:5173
```

---

## 📦 Deployment

### Doporučené platformy:
1. **Vercel** (DOPORUČENO)
   - Automatický deploy z GitHubu
   - Edge functions support
   - Optimalizace výkonu
   
2. **Netlify**
   - Jednoduchý setup
   - Continuous deployment
   
3. **Cloudflare Pages**
   - Globální CDN
   - Rychlé načítání

### Deploy na Vercel:

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Pro produkci
vercel --prod
```

---

## 🔐 Environment Variables

Tyto proměnné jsou již přednastavené v Supabase:

```env
SUPABASE_URL=<your-project-url>
SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

⚠️ **DŮLEŽITÉ**: Nikdy nesdílejte SERVICE_ROLE_KEY veřejně!

---

## 👨‍💼 Admin Panel - Návod k použití

### Přístup:
1. Otevřete web
2. Přihlaste se pomocí hesla: `altrodatony2024`
3. Vyberte tab podle potřeby

### Tab: Denní menu
- Spravujte týdenní denní menu
- Přidávejte polévky, hlavní chody, dezerty
- Změny se okamžitě zobrazí na webu

### Tab: Hlavní menu
- Spravujte stálý jídelní lístek
- Kategorie: Antipasti, Primi, Secondi, Dolci
- Přidávejte název, popis, cenu, kategorii, obrázek

### Tab: Rezervace
- Přehled všech přijatých rezervací
- Zobrazení data, času, počtu hostů, kontaktu
- Možnost smazání rezervace

---

## 📱 Kontaktní údaje

```
📍 Adresa: Korunní 48, 120 00 Praha 2 - Vinohrady
📞 Telefon: +420 774 672 458
📧 Email: rezervace@altrodatony.com
🕐 Otevírací doba: Po-Ne: 11:00 - 23:00
```

---

## 🐛 Známé problémy a řešení

### Problém: Rezervace se neuloží do databáze
**Řešení**: Zkontrolujte Supabase credentials v `/utils/supabase/info.tsx`

### Problém: Admin panel nefunguje
**Řešení**: 
1. Ověřte heslo: `altrodatony2024`
2. Smažte localStorage: `localStorage.clear()`
3. Znovu se přihlaste

### Problém: Menu se nenačítá
**Řešení**: Zkontrolujte API endpoint v Developer Tools (Network tab)

---

## 📈 Analytics & Monitoring (DOPORUČENO přidat)

Po spuštění webu doporučuji přidat:

1. **Google Analytics 4**
   - Sledování návštěvnosti
   - User behavior
   
2. **Google Search Console**
   - SEO monitoring
   - Indexace stránek
   
3. **Hotjar / Microsoft Clarity**
   - Heatmapy
   - Session recordings

---

## 🔄 Aktualizace obsahu

### Jak změnit fotky:
1. Nahrajte nové fotky do `/public/images/`
2. Aktualizujte URL v příslušných komponentách

### Jak změnit texty:
- Překlady: `/contexts/LanguageContext.tsx`
- Statický obsah: Jednotlivé komponenty v `/components/`

### Jak změnit barvy:
- Barvy tématu: `/styles/globals.css`
- Primární barva: `--primary: #C84A47`

---

## 🎨 Design System

### Barvy:
- **Primární**: #C84A47 (Terakotová červená)
- **Pozadí**: #FAFAF8 (Teplá bílá)
- **Text**: #2B2B2B (Tmavě šedá)
- **Accent**: #D4AF37 (Zlatá)

### Fonty:
- **Nadpisy**: Cormorant Garamond (serif)
- **Tělo textu**: Outfit (sans-serif)

### Spacing:
- Sections: `py-20 md:py-32 lg:py-40`
- Container: `max-w-7xl mx-auto px-6 md:px-8 lg:px-12`

---

## 📞 Technická podpora

Pokud narazíte na problém:

1. Zkontrolujte browser console (F12)
2. Zkontrolujte Network tab (API calls)
3. Ověřte Supabase dashboard
4. Kontaktujte vývojáře

---

## 📄 Licence

Tento projekt je vlastněn **Altro Da Tony**. 
Všechna práva vyhrazena © 2024

---

## 🙏 Credits

- **Design & Development**: Figma Make
- **Backend**: Supabase
- **Hosting**: TBD (Vercel/Netlify/Cloudflare)
- **Images**: Unsplash
- **Icons**: Lucide React

---

## ✨ Changelog

### v1.0.0 (2024-12-09)
- ✅ Initial release
- ✅ Rezervační systém
- ✅ Admin panel (3 taby)
- ✅ Multilanguage (CS/EN/IT)
- ✅ SEO optimalizace
- ✅ Responzivní design
- ✅ Database integration

---

**🍕 Buon appetito! 🍷**