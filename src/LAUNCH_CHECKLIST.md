# 🚀 LAUNCH CHECKLIST - Altro Da Tony

## ✅ PRE-LAUNCH (Před spuštěním)

### 🔧 Technical Setup
- [x] **Backend**: Supabase připojen a funkční
- [x] **Database**: KV store funguje
- [x] **API Endpoints**: Všechny testované (/reservations, /weekly-menu, /main-menu)
- [x] **Environment Variables**: Nastavené v Supabase
- [x] **Error Handling**: Error Boundary implementován
- [x] **Performance Monitoring**: Aktivní

### 📱 Content & Design
- [x] **Logo**: Nahrané a zobrazené
- [x] **Fotky**: Profesionální obrázky z Unsplash
- [x] **Texty**: Kompletní v češtině, angličtině, italštině
- [x] **Menu**: Výchozí položky nastavené
- [x] **Barvy**: Terakotová červená (#C84A47) použita
- [x] **Fonty**: Cormorant Garamond + Outfit načtené

### 🌍 SEO & Meta
- [x] **Title tag**: Optimalizovaný
- [x] **Meta description**: Napsaný (max 160 znaků)
- [x] **OG tags**: Facebook/LinkedIn ready
- [x] **Twitter Card**: Nastavený
- [x] **Schema.org**: Restaurant structured data
- [x] **Sitemap.xml**: Vytvořená
- [x] **Robots.txt**: Nakonfigurovaný
- [x] **Canonical URL**: Nastavená

### 🔐 Security
- [x] **Admin heslo**: Změněno z demo (DOPORUČENO!)
- [ ] **HTTPS**: Vynucené v produkci
- [x] **CORS**: Správně nakonfigurované
- [ ] **Rate Limiting**: Přidáno na API (DOPORUČENO)
- [x] **Input Validation**: Implementovaná
- [ ] **CSP Headers**: Content Security Policy (DOPORUČENO)

### 📊 Analytics & Monitoring
- [ ] **Google Analytics**: Přidané tracking ID
- [ ] **Google Search Console**: Web přidán a ověřen
- [ ] **Google My Business**: Profil aktualizován
- [ ] **Facebook Pixel**: Instalovaný (pokud marketing)
- [ ] **Hotjar/Clarity**: Heatmapy (VOLITELNÉ)
- [ ] **Uptime monitoring**: Pingdom/UptimeRobot

### ✉️ Email & Notifications
- [x] **Email pro rezervace**: rezervace@altrodatony.com aktivní
- [x] **Email notifikace**: Resend API implementováno ✅
- [x] **Auto-notifikace**: Při každé rezervaci se posílá email
- [ ] **Resend API Key**: Nastavený v environment variables (POVINNÉ!)
- [ ] **Doména ověřena**: SPF, DKIM, DMARC záznamy v DNS (DOPORUČENO)
- [ ] **Test email**: Poslat testovací rezervaci a ověřit příjem
- [ ] **SMS notifikace**: Pro urgentní rezervace (VOLITELNÉ)
- [ ] **Admin notifikace**: Push při nové rezervaci (VOLITELNÉ)

---

## 🎯 LAUNCH DAY (Den spuštění)

### 1️⃣ Final Testing (Finální testy)
- [ ] Otevřít web v incognito mode
- [ ] Testovat rezervaci end-to-end
- [ ] Zkontrolovat admin panel
- [ ] Testovat na mobilu
- [ ] Testovat všechny 3 jazyky
- [ ] Zkontrolovat rychlost načítání (Lighthouse)
- [ ] Testovat v Safari, Chrome, Firefox
- [ ] Ověřit SEO meta tags (View Source)

### 2️⃣ Deployment (Nasazení)
- [ ] Push na GitHub
- [ ] Deploy na Vercel/Netlify
- [ ] Nastavit custom doménu (altrodatony.cz)
- [ ] Ověřit SSL certifikát (HTTPS)
- [ ] Redirect www → non-www (nebo opačně)
- [ ] Nastavit 404 page
- [ ] Test production build

### 3️⃣ DNS & Domain
- [ ] DNS propagace dokončena (může trvat 24-48h)
- [ ] A record ukazuje na správný server
- [ ] CNAME pro www správně nastaven
- [ ] SSL certifikát aktivní
- [ ] Email DNS records (MX, SPF, DKIM)

### 4️⃣ Content Final Check
- [ ] Telefon: +420 774 672 458 ✅
- [ ] Email: rezervace@altrodatony.com ✅
- [ ] Adresa: Korunní 48, Praha 2 ✅
- [ ] Otevírací doba: Po-Ne 11:00-23:00 ✅
- [ ] Google Maps odkaz funkční
- [ ] Social media odkazy (pokud existují)

---

## 🔔 POST-LAUNCH (Po spuštění)

### První den (0-24h)
- [ ] **Monitoring**: Zkontrolovat uptime
- [ ] **Analytics**: Ověřit tracking funguje
- [ ] **Test rezervace**: Udělat testovací rezervaci
- [ ] **Social media**: Oznámit spuštění webu
- [ ] **Email kampani**: Poslat email existujícím zákazníkům
- [ ] **Google**: Submit sitemap v Search Console

### První týden (1-7 dní)
- [ ] **Denní kontrola**: Rezervace v admin panelu
- [ ] **Bug reports**: Sbírat feedback od týmu
- [ ] **Performance**: Kontrolovat Core Web Vitals
- [ ] **User testing**: Požádat přátele o feedback
- [ ] **SEO**: Začít sledovat pozice v Googlu
- [ ] **Backups**: Nastavit automatické zálohy

### První měsíc (1-30 dní)
- [ ] **Analytics review**: Zkontrolovat návštěvnost
- [ ] **Conversion rate**: Kolik rezervací z webu?
- [ ] **Google My Business**: Propojit s webem
- [ ] **Online reviews**: Aktivně sbírat recenze
- [ ] **Content updates**: Aktualizovat denní menu
- [ ] **Marketing**: Facebook/Instagram kampaň

---

## 🎨 OPTIONAL ENHANCEMENTS (Vylepšení)

### Must-Have (Důležité)
- [ ] **Email confirmation**: Po rezervaci poslat email
- [ ] **Calendar sync**: Rezervace do Google Calendar
- [ ] **Online platby**: Záloha na rezervaci (Stripe)
- [ ] **Loyalty program**: Body za návštěvy
- [ ] **Newsletter**: Sběr emailů

### Nice-to-Have (Užitečné)
- [ ] **Live chat**: Messenger/WhatsApp widget
- [ ] **Instagram feed**: Živý feed na webu
- [ ] **Blog/News**: Sekce s novinkami
- [ ] **Wine list**: Samostatná stránka s víny
- [ ] **Delivery**: Integrace s Wolt/Foodora
- [ ] **Gift cards**: Online prodej voucherů

### Advanced (Pokročilé)
- [ ] **AI chatbot**: Odpovídá na časté otázky
- [ ] **Table management**: Real-time dostupnost stolů
- [ ] **Menu QR codes**: V restauraci
- [ ] **Staff app**: Mobilní app pro personál
- [ ] **Inventory**: Správa skladu
- [ ] **POS integration**: Propojení s pokladnou

---

## 📞 EMERGENCY CONTACTS

### Technical Issues
- **Developer**: [Vaše jméno/email]
- **Hosting**: Vercel/Netlify support
- **Domain**: Registrátor domény support
- **Database**: Supabase support

### Business Issues
- **Owner**: Antonín Sahulka
- **Manager**: [Jméno manažera]
- **Marketing**: [Marketing kontakt]

---

## 🚨 ROLLBACK PLAN (Nouzový plán)

Pokud se něco pokazí:

### Technický problém
1. **Zastavit traffic**: Maintenance page
2. **Identifikovat**: Zkontrolovat error logs
3. **Opravit**: Deploy fix nebo rollback
4. **Test**: Ověřit na staging
5. **Deploy**: Znovu nasadit

### Kritický bug
1. **Deaktivovat rezervace**: Dočasně skrýt formulář
2. **Přesměrovat na telefon**: Přidat banner "Volejte +420 774 672 458"
3. **Fix**: Opravit problém
4. **Test**: Důkladně otestovat
5. **Aktivovat**: Vrátit rezervační systém

---

## 📊 SUCCESS METRICS (Metriky úspěchu)

### První měsíc cíle:
- **Návštěvnost**: 1000+ unique visitors
- **Rezervace**: 50+ online rezervací
- **Bounce rate**: < 60%
- **Avg. session**: > 2 minuty
- **Mobile traffic**: > 50%
- **Page speed**: < 3s load time
- **Google ranking**: Top 3 pro "italská restaurace vinohrady"

### KPIs sledovat:
- Počet rezervací z webu vs. telefon
- Conversion rate (návštěvník → rezervace)
- Top navštívené stránky
- Zdroje návštěvnosti (Google, Social, Direct)
- Device breakdown (Mobile vs Desktop)
- Bounce rate na rezervační stránce

---

## ✅ FINAL GO/NO-GO DECISION

### GO (Spustit) pokud:
- ✅ Všechny kritické funkce fungují
- ✅ Rezervace se ukládají do DB
- ✅ Admin panel je přístupný
- ✅ Web je responzivní
- ✅ SEO meta tags jsou nastavené
- ✅ Performance je dobrá (< 3s load)
- ✅ Error handling je implementovaný

### NO-GO (Nespouštět) pokud:
- ❌ Rezervace nefungují
- ❌ Admin panel je nedostupný
- ❌ Kritický bug nalezen
- ❌ Performance je špatná (> 5s load)
- ❌ Bezpečnostní díry
- ❌ DNS není připravené

---

## 🎉 LAUNCH ANNOUNCEMENT TEMPLATE

### Email
```
Vážení hosté,

S radostí oznamujeme spuštění nového webu Altro Da Tony!

🌐 Navštivte: https://altrodatony.cz
📱 Rezervujte online kdykoliv
🍝 Prohlédněte si naše menu
📸 Objevte fotogalerii

Těšíme se na Vaši návštěvu!

Altro Da Tony
Korunní 48, Praha 2
+420 774 672 458
```

### Social Media
```
🎉 Nový web je tady! 🍕

Objevte autentickou italskou kuchyni online:
✨ Rezervace jedním kliknutím
🍝 Kompletní menu s fotkami
🇮🇹 3 jazyky (CZ/EN/IT)

👉 altrodatony.cz

#AltroDA Tony #ItalianFood #PragueRestaurants #Vinohrady
```

---

**🚀 PŘIPRAVENO K LAUNCH!**

Datum spuštění: ______________
Zodpovědná osoba: ______________
Schváleno: ______________

---

**Hodně štěstí s novým webem! 🍝🍷**