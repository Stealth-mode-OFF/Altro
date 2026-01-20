# 🧪 Testing Guide - Altro Da Tony

## ✅ E2E Testing Checklist

### 📱 **1. RESPONZIVITA**

#### Mobile (320px - 767px)
- [ ] Header se správně zobrazuje
- [ ] Mobile menu funguje (otevření/zavření)
- [ ] Language switcher je přístupný
- [ ] Formulář rezervace je použitelný
- [ ] Všechny sekce jsou čitelné
- [ ] Call-to-action tlačítka jsou viditelná
- [ ] Obrázky se načítají
- [ ] Footer není přeplněný

#### Tablet (768px - 1023px)
- [ ] Layout se přizpůsobuje
- [ ] Menu items v grid 2 sloupce
- [ ] Rezervační formulář funguje
- [ ] Galerie správně zobrazuje
- [ ] Admin panel je použitelný

#### Desktop (1024px+)
- [ ] Full header s navigací
- [ ] Menu items v grid 3 sloupce
- [ ] Rezervační formulář side-by-side
- [ ] Vše správně zarovnané

---

### 🔧 **2. FUNKČNÍ TESTY**

#### Rezervační systém
- [ ] **Validace jména**: Povinné pole
- [ ] **Validace emailu**: Správný formát (name@example.com)
- [ ] **Validace telefonu**: 
  - Auto-format na XXX XXX XXX
  - Přesně 9 číslic
  - Prefix +420 automaticky
- [ ] **Validace data**: 
  - Nelze vybrat minulé datum
  - Funkční date picker
- [ ] **Validace času**: Dropdown s otevírací dobou
- [ ] **Počet hostů**: 1-8 osob
- [ ] **Submit**: 
  - Loading state (tlačítko "Odesílám...")
  - Success toast po odeslání
  - Error toast při chybě
  - Reset formuláře po úspěchu
- [ ] **Uložení do DB**: Rezervace viditelná v admin panelu
- [ ] **Fallback**: Telefon link funguje (+420 774 672 458)

#### Admin Panel
- [ ] **Login**:
  - Heslo `altrodatony2024` funguje
  - Špatné heslo = error toast
  - Auth persistuje v localStorage
  - Po přihlášení redirect na dashboard
- [ ] **Denní menu tab**:
  - Načtení menu z DB
  - Přidání nové položky
  - Úprava položky
  - Smazání položky
  - Uložení všech změn
  - Real-time update na webu
- [ ] **Hlavní menu tab**:
  - Načtení menu z DB
  - Přidání položky (název, popis, cena, kategorie)
  - Úprava položky
  - Smazání položky
  - Kategorie: Antipasti, Primi, Secondi, Dolci
  - Uložení všech změn
  - Real-time update na webu
- [ ] **Rezervace tab**:
  - Seznam všech rezervací
  - Zobrazení detailů (jméno, email, telefon, datum, čas, počet hostů)
  - Smazání rezervace
  - Řazení podle data (nejnovější první)
- [ ] **Logout**: Smaže auth, redirect na login

#### Language Switcher
- [ ] **Čeština**: Všechny texty v češtině
- [ ] **Angličtina**: Všechny texty v angličtině
- [ ] **Italština**: Všechny texty v italštině
- [ ] **Přepínání**: Okamžitá změna bez reload
- [ ] **Persistance**: Jazyk se ukládá

#### Navigation
- [ ] **Scroll to About**: Kliknutí na "O nás" scrolluje správně
- [ ] **Scroll to Menu**: Kliknutí na "Menu" scrolluje správně
- [ ] **Scroll to Reservation**: Kliknutí na "Rezervace" scrolluje správně
- [ ] **Logo click**: Vrátí na top stránky
- [ ] **Smooth scroll**: Animace je plynulá
- [ ] **Offset**: Header se nepřekrývá s obsahem

#### Scroll to Top Button
- [ ] Objevuje se po scroll > 400px
- [ ] Mizí při scroll < 400px
- [ ] Kliknutí vrací na top
- [ ] Animace je plynulá

---

### 🎨 **3. UI/UX TESTY**

#### Design
- [ ] **Barvy**: Terakotová červená (#C84A47) použita konzistentně
- [ ] **Fonty**: 
  - Nadpisy = Cormorant Garamond
  - Text = Outfit
- [ ] **Spacing**: Konzistentní mezery mezi sekcemi
- [ ] **Shadows**: Správné stíny na kartách
- [ ] **Borders**: Správné rádiusy (rounded corners)
- [ ] **Contrast**: Čitelnost textu na pozadí

#### Animace
- [ ] **Hero**: Fade in při načtení
- [ ] **Sections**: Fade in při scroll do view
- [ ] **Hover states**: Všechna tlačítka mají hover efekt
- [ ] **Focus states**: Viditelné při Tab navigation
- [ ] **Transitions**: Plynulé (300-500ms)
- [ ] **Performance**: Bez lagů na 60fps

#### Obrázky
- [ ] **Loading**: Fallback při načítání
- [ ] **Alt texts**: Všechny obrázky mají alt
- [ ] **Optimalizace**: Rychlé načítání
- [ ] **Responsive**: Správná velikost na mobilech

---

### 🔐 **4. BEZPEČNOSTNÍ TESTY**

#### API
- [ ] **CORS**: Správně nastavený
- [ ] **Rate limiting**: Zamezení spamu (doporučeno přidat)
- [ ] **Input sanitization**: Ochrana proti XSS
- [ ] **SQL injection**: Bezpečné queries (Supabase handled)
- [ ] **Error messages**: Neodhalují citlivé info

#### Admin
- [ ] **Password protection**: Nelze přistoupit bez hesla
- [ ] **Session timeout**: Auth expiruje (doporučeno přidat)
- [ ] **HTTPS only**: V produkci pouze HTTPS
- [ ] **CSP headers**: Content Security Policy (doporučeno)

---

### ♿ **5. ACCESSIBILITY TESTY**

#### Keyboard Navigation
- [ ] **Tab order**: Logické pořadí
- [ ] **Focus visible**: Viditelný outline
- [ ] **Skip links**: Přeskočení navigace (doporučeno přidat)
- [ ] **Enter/Space**: Aktivují tlačítka
- [ ] **Escape**: Zavírá modály

#### Screen Readers
- [ ] **Semantic HTML**: Správné heading hierarchy (h1, h2, h3)
- [ ] **ARIA labels**: Na ikonkách a tlačítkách
- [ ] **Alt texts**: Na všech obrázcích
- [ ] **Form labels**: Správně svázané s inputy
- [ ] **Live regions**: Oznámení změn (toast)

#### Color Contrast
- [ ] **Text na pozadí**: Min. 4.5:1 ratio
- [ ] **Tlačítka**: Dostatečný kontrast
- [ ] **Links**: Viditelné od textu
- [ ] **Placeholders**: Čitelné

---

### 📊 **6. SEO TESTY**

#### Meta Tags
- [ ] **Title**: "Altro Da Tony | Autentická Italská Restaurace Praha"
- [ ] **Description**: Max 160 znaků, obsahuje keywords
- [ ] **OG tags**: Správné pro Facebook/LinkedIn
- [ ] **Twitter Card**: Správné pro Twitter
- [ ] **Canonical**: Správná URL

#### Structured Data
- [ ] **Schema.org**: Restaurant schema přítomné
- [ ] **Google Rich Results**: Test passed
- [ ] **Opening hours**: Správně specifikované
- [ ] **Address**: Kompletní kontaktní údaje
- [ ] **Reviews**: Aggregate rating

#### Technical SEO
- [ ] **Sitemap.xml**: Přítomná a správná
- [ ] **Robots.txt**: Správně nakonfigurovaný
- [ ] **Mobile-friendly**: Google test passed
- [ ] **Page speed**: < 3s load time
- [ ] **HTTPS**: Vynucené v produkci
- [ ] **Clean URLs**: Bez query parametrů

---

### ⚡ **7. PERFORMANCE TESTY**

#### Core Web Vitals
- [ ] **LCP** (Largest Contentful Paint): < 2.5s ✅
- [ ] **FID** (First Input Delay): < 100ms ✅
- [ ] **CLS** (Cumulative Layout Shift): < 0.1 ✅

#### Loading
- [ ] **Time to Interactive**: < 3.8s
- [ ] **First Contentful Paint**: < 1.8s
- [ ] **Total Bundle Size**: < 500KB
- [ ] **Images optimized**: WebP nebo optimalizované JPEG

#### Lighthouse Score
- [ ] **Performance**: > 90
- [ ] **Accessibility**: > 90
- [ ] **Best Practices**: > 90
- [ ] **SEO**: > 90

---

### 🌐 **8. BROWSER COMPATIBILITY**

#### Desktop
- [ ] **Chrome** (latest)
- [ ] **Firefox** (latest)
- [ ] **Safari** (latest)
- [ ] **Edge** (latest)

#### Mobile
- [ ] **iOS Safari** (iOS 14+)
- [ ] **Chrome Mobile** (Android)
- [ ] **Samsung Internet**

---

### 🔥 **9. ERROR HANDLING**

#### Network Errors
- [ ] **API offline**: Zobrazí error message
- [ ] **Timeout**: Retry mechanismus
- [ ] **404**: Správná error page
- [ ] **500**: Error boundary catches

#### User Errors
- [ ] **Invalid input**: Inline validace
- [ ] **Empty form**: Povinná pole označena
- [ ] **Wrong format**: Specific error messages

---

### 📱 **10. CROSS-DEVICE TESTING**

#### Devices to test
- [ ] iPhone SE (375px)
- [ ] iPhone 12/13 (390px)
- [ ] iPhone 14 Pro Max (430px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Laptop (1440px)
- [ ] Desktop (1920px)
- [ ] 4K (2560px+)

---

## 🚀 FINÁLNÍ CHECKLIST PŘED LAUNCH

### Must-Have
- [ ] ✅ Rezervace fungují a ukládají do DB
- [ ] ✅ Admin panel má všechny 3 taby
- [ ] ✅ Language switcher funguje (CS/EN/IT)
- [ ] ✅ SEO meta tags přítomné
- [ ] ✅ Responzivní na všech zařízeních
- [ ] ✅ Error boundary implementován
- [ ] ✅ Performance monitoring aktivní

### Recommended (Nice-to-Have)
- [ ] Google Analytics připojená
- [ ] Google Search Console nastavená
- [ ] Favicon přidaná
- [ ] OG image vytvořená
- [ ] Email notifikace pro rezervace (přes Supabase)
- [ ] Rate limiting na API
- [ ] Offline fallback (service worker)
- [ ] Progressive Web App (PWA) manifest

---

## 🎯 USER SCENARIOS - Manual Testing

### Scenario 1: Nový návštěvník
1. Přijde na web
2. Scrolluje a prohlíží sekce
3. Klikne na "Rezervovat stůl"
4. Vyplní formulář
5. Odešle rezervaci
6. Vidí success message
7. Dostane potvrzení (budoucí: email)

### Scenario 2: Návštěvník s alergiemi
1. Přijde na web
2. Jde na Menu sekci
3. Hledá vegetariánské položky
4. Nechce najít alergeny
5. Kontaktuje restauraci přes telefon

### Scenario 3: Chef aktualizuje menu
1. Jde na /admin
2. Přihlásí se heslem
3. Klikne na "Denní menu"
4. Přidá novou polévku
5. Uloží změny
6. Zkontroluje na webu - vidí okamžitě

### Scenario 4: Mezinárodní host
1. Přijde na web (anglicky mluvící)
2. Klikne na EN vlajku
3. Web se přepne do angličtiny
4. Rezervuje stůl v angličtině
5. Vše funguje

---

## 🐛 Known Issues & Workarounds

### Issue: Admin panel login persistence
**Status**: ✅ FIXED
**Solution**: localStorage auth

### Issue: Rezervace nešly do DB
**Status**: ✅ FIXED
**Solution**: createReservation API call implementován

### Issue: Chybí hlavní menu admin
**Status**: ✅ FIXED
**Solution**: MainMenuAdmin component vytvořen

---

## 📞 Report Issues

Pokud najdete bug:
1. Screenshot problému
2. Browser a verze
3. Device (mobile/desktop)
4. Kroky k reprodukci
5. Kontakt: [email/phone]

---

**✅ PŘIPRAVENO K PRODUKCI!** 🚀
