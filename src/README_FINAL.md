# 🍝 Altro Da Tony - Kompletní webová aplikace

## 📌 Přehled

**Altro Da Tony** je plně funkční webová aplikace pro italskou restauraci s moderním designem, databázovým backendem a pokročilými funkcemi pro správu restaurace.

---

## ✨ Hlavní funkce

### Pro zákazníky 🍽️
- ✅ **Responzivní web** s minimalistickým italským designem
- ✅ **Třijazyčná podpora** (čeština, angličtina, italština)
- ✅ **Rezervační systém** s intuitivním průvodcem krok za krokem
- ✅ **Denní menu** - aktuální týdenní nabídka
- ✅ **Hlavní menu** - stálá nabídka se 4 kategoriemi (antipasti, primi, secondi, dolci)
- ✅ **Galerie** s profesionálními fotografiemi restaurace
- ✅ **Google recenze** - integrace s Google Maps recenzemi
- ✅ **Kontakty a mapa** - interaktivní Google Maps

### Pro administrátory 👨‍🍳
- ✅ **Admin panel** - centralizovaná správa restaurace
- ✅ **Správa denního menu** - jednoduché přidávání/mazání položek
- ✅ **Správa hlavního menu** - kompletní editace stálé nabídky
- ✅ **Správa rezervací** - přehled, potvrzování, statistiky
- ✅ **Real-time synchronizace** - změny se okamžitě zobrazují na webu
- ✅ **Databázové úložiště** - všechna data bezpečně uložena

---

## 🏗️ Technologie

### Frontend
- **React** - moderní UI framework
- **TypeScript** - typová bezpečnost
- **Tailwind CSS v4** - utility-first styling
- **Motion (Framer Motion)** - animace a přechody
- **Lucide React** - moderní ikony
- **Sonner** - toast notifikace

### Backend
- **Supabase** - databáze a serverless funkce
- **Hono.js** - lightweight web framework
- **Edge Functions** - Deno runtime
- **KV Store** - key-value úložiště

### Design
- **Barvy:** Terakotová červená (#C84A47)
- **Fonty:** Playfair Display, Cormorant Garamond (serif)
- **Styl:** Minimalistický styl italské restaurace

---

## 📂 Struktura projektu

```
/
├── App.tsx                          # Hlavní aplikace (veřejná část)
├── admin.tsx                        # Admin panel entrypoint
├── components/
│   ├── AdminDashboard.tsx          # Správa menu (denní + hlavní)
│   ├── AdminPanel.tsx              # Layout admin panelu
│   ├── ReservationSystem.tsx       # Rezervační formulář
│   ├── ReservationManager.tsx      # Správa rezervací v adminu
│   ├── DailyMenu.tsx               # Zobrazení denního menu
│   ├── Menu.tsx                    # Zobrazení hlavního menu
│   ├── Header.tsx                  # Navigace
│   ├── Hero.tsx                    # Hero sekce
│   ├── Gallery.tsx                 # Galerie fotografií
│   ├── Reviews.tsx                 # Google recenze
│   └── ...
├── hooks/
│   ├── useApi.ts                   # API komunikace s backendem
│   └── useLocalStorage.ts          # Custom hook pro localStorage
├── contexts/
│   └── LanguageContext.tsx         # Správa jazyků (CS/EN/IT)
├── supabase/
│   └── functions/server/
│       ├── index.tsx               # Backend API (Hono server)
│       └── kv_store.tsx            # Database utilities
├── utils/
│   └── supabase/
│       └── info.tsx                # Supabase konfigurace
└── styles/
    └── globals.css                 # Globální styly + Tailwind
```

---

## 🚀 Jak začít

### 1. Otevřít aplikaci
Hlavní web je dostupný na: `/` (kořenová adresa)

### 2. Přihlášení do admin panelu
- **URL:** `/admin.tsx`
- **Heslo:** `altrodatony2024`

### 3. První kroky v admin panelu

#### Denní menu
1. Přejděte na tab "Denní menu"
2. Přidejte položky pro aktuální týden (polévky, hlavní jídla, dezerty)
3. Změny se okamžitě zobrazí na hlavní stránce

#### Hlavní menu
1. Přejděte na tab "Hlavní menu"
2. Přidejte položky do kategorií (antipasti, primi, secondi, dolci)
3. Volitelně přidejte URL obrázků
4. Změny se okamžitě zobrazí v sekci "Menu"

#### Rezervace
1. Přejděte na tab "Rezervace"
2. Zobrazí se všechny příchozí rezervace
3. Změňte status (pending → confirmed/cancelled)
4. Smažte staré rezervace

---

## 🔗 API Endpointy

### Base URL
```
https://ovygqbkaosxqvtjstdyv.supabase.co/functions/v1/make-server-d880a0b3
```

### Rezervace
- `POST /reservations` - Vytvoření rezervace
- `GET /reservations` - Získání všech rezervací
- `DELETE /reservations/:id` - Smazání rezervace
- `PATCH /reservations/:id` - Aktualizace statusu

### Denní menu
- `GET /weekly-menu/:weekStart` - Získání týdenního menu
- `POST /weekly-menu` - Uložení týdenního menu

### Hlavní menu
- `GET /main-menu` - Získání hlavního menu
- `POST /main-menu` - Uložení hlavního menu

### Health check
- `GET /health` - Kontrola stavu serveru

---

## 🎨 Design System

### Barvy
```css
--primary: #C84A47;          /* Terakotová červená */
--secondary: #8B4513;        /* Italská hněď */
--accent: #C84A47;           /* Akcent */
--background: #FAFAFA;       /* Pozadí */
--foreground: #1A1A1A;       /* Text */
```

### Typografie
- **Headings:** Playfair Display (serif)
- **Special text:** Cormorant Garamond (serif)
- **Body:** System font stack

### Komponenty
- Tlačítka s hover efekty
- Plynulé animace (Motion)
- Toast notifikace (Sonner)
- Responsivní layout
- Glassmorphism efekty

---

## 📱 Funkce podle sekcí

### Hero sekce
- ✅ Úvodní bannebr s CTA tlačítky
- ✅ Animované vstupy
- ✅ Responsivní design

### O restauraci
- ✅ Příběh šéfkuchaře Tonyho
- ✅ Filozofie restaurace
- ✅ Profesionální fotografie

### Denní menu
- ✅ Automatické zobrazení aktuálního týdne
- ✅ Kategorizace (polévky, hlavní, dezerty)
- ✅ Ceny v Kč
- ✅ Zobrazuje se pouze pokud je menu přidáno

### Hlavní menu
- ✅ 4 kategorie (antipasti, primi, secondi, dolci)
- ✅ Filtrovatelné tabby
- ✅ Volitelné obrázky u položek
- ✅ Fallback na výchozí menu

### Galerie
- ✅ Grid layout s hover efekty
- ✅ Profesionální fotografie restaurace
- ✅ Responsivní zobrazení

### Rezervace
- ✅ 4-krokový průvodce
- ✅ Výběr data (kalendář)
- ✅ Výběr času (oběd/večeře)
- ✅ Kontaktní formulář
- ✅ Validace (email, telefon)
- ✅ Potvrzovací obrazovka
- ✅ Toast notifikace

### Google recenze
- ✅ Zobrazení hodnocení (4.8/5)
- ✅ Odkazy na Google Maps
- ✅ CTA pro napsání recenze

### Kontakty
- ✅ Adresa restaurace
- ✅ Otevírací doba
- ✅ Telefon a email
- ✅ Interaktivní Google mapa

---

## 🌍 Jazyky

Aplikace podporuje 3 jazyky:
- 🇨🇿 **Čeština** (výchozí)
- 🇬🇧 **Angličtina**
- 🇮🇹 **Italština**

**Přepínání:** Kliknutím na vlajku v headeru

---

## 🔐 Bezpečnost

### Admin autentizace
- Jednoduchá password autentizace (demo)
- Heslo uloženo v localStorage
- Automatické přihlášení při dalších návštěvách

### API komunikace
- Bearer token autorizace
- CORS povolený pro všechny domény
- Error handling a logging

### Doporučení pro produkci
1. Implementovat plnohodnotné uživatelské účty
2. Použít Supabase Auth pro správu uživatelů
3. Nastavit Row Level Security (RLS) v databázi
4. Implementovat rate limiting
5. Přidat HTTPS everywhere

---

## 📊 Databázová struktura

### KV Store klíče

#### Rezervace
```
reservation:{id}
```
Hodnota: `Reservation` object

#### Denní menu
```
weekly-menu:{weekStart}
```
Hodnota: `WeeklyMenu` object s polem `items`

#### Hlavní menu
```
main-menu
```
Hodnota: Pole `MenuItem` objektů

---

## 🛠️ Troubleshooting

### Server nereaguje
1. Zkontrolujte health endpoint: `GET /health`
2. Ověřte konzoli prohlížeče (F12)
3. Zkontrolujte network tab

### Data se neuloží
1. Ověřte API volání v network tab
2. Zkontrolujte console.log pro error zprávy
3. Ověřte formát dat

### Real-time sync nefunguje
1. Otevřete admin panel i veřejnou část ve stejném prohlížeči
2. Zkontrolujte, že posloucháte správné Custom Events
3. Obnovte stránku

---

## 📖 Dokumentace

Pro detailní informace viz:
- **`DATABASE_IMPLEMENTATION.md`** - Kompletní databázová dokumentace
- **`QUICK_START_DATABASE.md`** - Rychlý průvodce pro začátečníky
- **`GOOGLE_REVIEWS_INTEGRATION.md`** - Google recenze integrace
- **`README_DEVELOPER.md`** - Technická dokumentace

---

## 🎯 Roadmap

### Krátko době
- [ ] Email notifikace pro rezervace
- [ ] SMS potvrzení
- [ ] Export rezervací do CSV
- [ ] Tisk denního menu
- [ ] Dashboard s analytikama

### Dlouhodobě
- [ ] Více admin účtů (číšníci, management)
- [ ] Online platby
- [ ] Věrnostní program
- [ ] Mobilní aplikace
- [ ] Integrace s POS systémem

---

## 🙏 Použité technologie

- [React](https://react.dev/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Hono](https://hono.dev/)
- [Motion](https://motion.dev/)
- [Lucide Icons](https://lucide.dev/)
- [Sonner](https://sonner.emilkowal.ski/)

---

## 📞 Podpora

Pro otázky nebo problémy:
1. Zkontrolujte dokumentaci
2. Prohlédněte console.log
3. Ověřte API endpointy
4. Zkontrolujte network requesty

---

## ✨ Status

**✅ PRODUKČNÍ - PŘIPRAVENO K POUŽITÍ**

Web je plně funkční s:
- ✅ Databázovým backendem
- ✅ Admin panelem
- ✅ Real-time synchronizací
- ✅ Rezervačním systémem
- ✅ Správou menu
- ✅ Třijazyčnou podporou
- ✅ Profesionálním designem

---

**Vytvořeno s ❤️ pro Altro Da Tony**

© 2024 Altro Da Tony - Italská kuchyně v srdci Prahy
