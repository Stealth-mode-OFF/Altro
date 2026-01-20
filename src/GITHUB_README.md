# 🍝 Altro Da Tony - Webová aplikace pro italskou restauraci

<div align="center">

![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

**Plně funkční webová aplikace s rezervačním systémem, správou menu a databázovým backendem**

[Live Demo](#) • [Dokumentace](./README_FINAL.md) • [API Guide](./API_TEST_GUIDE.md)

</div>

---

## 📖 O projektu

**Altro Da Tony** je moderní webová aplikace pro italskou restauraci s důrazem na:
- ✨ **Elegantní minimalistický design** - terakotová červená (#C84A47) a serif fonty
- 🌍 **Třijazyčnost** - čeština, angličtina, italština
- 💾 **Databázový backend** - Supabase s real-time synchronizací
- 🎨 **Profesionální UI/UX** - optimalizováno pro konverze
- 📱 **Plně responzivní** - perfektní na všech zařízeních

---

## ✨ Funkce

### 🍽️ Pro zákazníky
- **Rezervační systém** - intuitivní průvodce krok za krokem
- **Denní menu** - týdenní speciální nabídka
- **Hlavní menu** - stálá nabídka se 4 kategoriemi
- **Galerie** - profesionální fotografie restaurace
- **Google recenze** - integrace s Google Maps
- **Kontakty a mapa** - interaktivní zobrazení polohy

### 👨‍🍳 Pro administrátory
- **Admin panel** (`/admin`) - centralizovaná správa s heslem
- **Správa denního menu** - přidávání/mazání položek podle dnů
- **Správa hlavního menu** - editace antipasti, primi, secondi, dolci
- **Správa rezervací** - potvrzování, odmítání, statistiky
- **Real-time aktualizace** - změny se okamžitě projeví na webu

---

## 🏗️ Technologie

### Frontend
```
React 18+ • TypeScript 5+ • Tailwind CSS v4
Motion (Framer Motion) • Lucide React • Sonner
```

### Backend
```
Supabase • Hono.js • Deno Edge Functions • KV Store
```

### Design System
- **Barvy:** Terakotová červená (#C84A47), Béžová (#F5F1ED)
- **Fonty:** Playfair Display (nadpisy), Cormorant Garamond (tělo)
- **Styl:** Minimalistický styl italské restaurace s elegancí

---

## 🚀 Rychlý start

### 1. Instalace

```bash
# Klonujte repozitář
git clone https://github.com/YOUR_USERNAME/altro-da-tony.git
cd altro-da-tony

# Instalace závislostí není potřeba - běží na Figma Make
```

### 2. Konfigurace

Projekt je **již nakonfigurován** s Supabase backendem. Všechny potřebné credentials jsou v `/utils/supabase/info.tsx`.

### 3. Spuštění

Aplikace běží v **Figma Make** prostředí - není potřeba žádné spouštění. Stačí otevřít projekt a pracovat!

### 4. Přístup k admin panelu

```
URL: /admin
Heslo: altrodatony2024
```

---

## 📚 Dokumentace

| Soubor | Popis |
|--------|-------|
| [README_FINAL.md](./README_FINAL.md) | Kompletní dokumentace projektu |
| [QUICK_START_DATABASE.md](./QUICK_START_DATABASE.md) | Rychlý start s databází |
| [DATABASE_IMPLEMENTATION.md](./DATABASE_IMPLEMENTATION.md) | Detailní dokumentace backendu |
| [API_TEST_GUIDE.md](./API_TEST_GUIDE.md) | Testování API endpointů |
| [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) | Návod pro administrátory |
| [GOOGLE_REVIEWS_INTEGRATION.md](./GOOGLE_REVIEWS_INTEGRATION.md) | Integrace Google recenzí |
| [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) | Migrace z localStorage na databázi |

---

## 🗂️ Struktura projektu

```
altro-da-tony/
├── 📄 App.tsx                    # Hlavní komponenta
├── 📄 admin.tsx                  # Admin panel
│
├── 📁 components/
│   ├── Hero.tsx                  # Úvodní sekce
│   ├── Menu.tsx                  # Hlavní menu
│   ├── DailyMenu.tsx            # Denní menu
│   ├── Reservation.tsx          # Rezervační formulář
│   ├── ReservationManager.tsx   # Správa rezervací (admin)
│   ├── AdminDashboard.tsx       # Admin dashboard
│   ├── Gallery.tsx              # Galerie
│   ├── Reviews.tsx              # Google recenze
│   └── ui/                      # shadcn/ui komponenty
│
├── 📁 supabase/
│   └── functions/server/
│       ├── index.tsx            # Hono web server
│       └── kv_store.tsx         # KV store utility
│
├── 📁 hooks/
│   ├── useApi.ts                # Custom hook pro API volání
│   └── useLocalStorage.ts       # LocalStorage hook
│
├── 📁 contexts/
│   └── LanguageContext.tsx      # Jazykový kontext
│
└── 📁 utils/
    └── supabase/
        └── info.tsx             # Supabase konfigurace
```

---

## 🔧 API Endpointy

### Rezervace
```http
POST   /make-server-d880a0b3/reservations        # Vytvoření rezervace
GET    /make-server-d880a0b3/reservations        # Seznam rezervací
PATCH  /make-server-d880a0b3/reservations/:id    # Aktualizace stavu
DELETE /make-server-d880a0b3/reservations/:id    # Smazání rezervace
```

### Denní menu
```http
GET    /make-server-d880a0b3/daily-menu          # Seznam všech položek
POST   /make-server-d880a0b3/daily-menu          # Přidání položky
DELETE /make-server-d880a0b3/daily-menu/:id      # Smazání položky
```

### Hlavní menu
```http
GET    /make-server-d880a0b3/menu                # Seznam všech položek
POST   /make-server-d880a0b3/menu                # Přidání položky
PATCH  /make-server-d880a0b3/menu/:id            # Aktualizace položky
DELETE /make-server-d880a0b3/menu/:id            # Smazání položky
```

Více v [API_TEST_GUIDE.md](./API_TEST_GUIDE.md)

---

## 🎨 Design Features

### Barevná paleta
```css
--terracotta: #C84A47;     /* Hlavní červená */
--beige: #F5F1ED;          /* Světlé pozadí */
--dark: #2C1810;           /* Tmavý text */
--white: #FFFFFF;          /* Bílá */
```

### Typografie
```css
font-family: 'Playfair Display', serif;        /* H1-H3 */
font-family: 'Cormorant Garamond', serif;      /* Body text */
```

### Animace
- Smooth scroll behavior
- Fade-in efekty při scrollování
- Hover transformace na kartách
- Slide-in animace pro sekce

---

## 📊 Databázové schéma

### KV Store struktura

```typescript
// Rezervace
reservation:{id}
{
  id: string,
  name: string,
  email: string,
  phone: string,
  date: string,
  time: string,
  guests: number,
  occasion?: string,
  dietaryRestrictions?: string,
  status: 'pending' | 'confirmed' | 'cancelled',
  createdAt: string
}

// Denní menu
daily-menu:{id}
{
  id: string,
  day: 'monday' | 'tuesday' | ...,
  dishName: string,
  description: string,
  price: number,
  createdAt: string
}

// Hlavní menu
menu:{id}
{
  id: string,
  category: 'antipasti' | 'primi' | 'secondi' | 'dolci',
  name: string,
  description: string,
  price: number,
  allergens?: string[],
  isVegetarian?: boolean,
  isGlutenFree?: boolean,
  createdAt: string
}
```

---

## 🔐 Bezpečnost

- ✅ Admin panel chráněn heslem
- ✅ CORS správně nakonfigurován
- ✅ Public Anon Key je bezpečný pro veřejné použití
- ✅ Service Role Key NENÍ v kódu (pouze v Supabase env)
- ✅ Input sanitizace na všech formulářích
- ✅ Rate limiting na API endpointech

---

## 🌍 Jazyky

Aplikace podporuje 3 jazyky s kompletními překlady:

- 🇨🇿 **Čeština** (výchozí)
- 🇬🇧 **Angličtina**
- 🇮🇹 **Italština**

Přepínání pomocí language switcheru v hlavičce.

---

## 📱 Responzivita

Optimalizováno pro:
- 📱 **Mobile** - 320px - 767px
- 📱 **Tablet** - 768px - 1023px
- 💻 **Desktop** - 1024px+
- 🖥️ **Wide screens** - 1920px+

---

## 🧪 Testování

### Manuální testování API

Použijte poskytnuté cURL příkazy v [API_TEST_GUIDE.md](./API_TEST_GUIDE.md):

```bash
# Test vytvoření rezervace
curl -X POST https://ilbqmkdgkhmwwemffjgr.supabase.co/functions/v1/make-server-d880a0b3/reservations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"name":"Test","email":"test@example.com",...}'
```

### Testování admin panelu

1. Přejděte na `/admin`
2. Zadejte heslo: `altrodatony2024`
3. Otestujte všechny 3 taby (Denní menu, Hlavní menu, Rezervace)

---

## 🚧 Známé limitace

- Databáze používá KV store (key-value) místo relačních tabulek
- Nelze provádět SQL migrations (omezení Figma Make)
- Supabase Edge Functions mají cold start (~1-2s při první request)
- Google recenze jsou statické (není real-time Google API)

---

## 📈 Budoucí vylepšení

Potenciální rozšíření projektu:

- [ ] E-mail notifikace pro nové rezervace
- [ ] SMS potvrzení rezervací
- [ ] Online objednávky s platební bránou
- [ ] Věrnostní program pro zákazníky
- [ ] Push notifikace
- [ ] Analytics dashboard pro majitele
- [ ] Export rezervací do CSV
- [ ] Kalendářní zobrazení rezervací
- [ ] Multi-restaurace podpora

---

## 🤝 Contributing

Pokud chcete přispět:

1. Fork repozitář
2. Vytvořte feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit změny (`git commit -m 'Add some AmazingFeature'`)
4. Push do branch (`git push origin feature/AmazingFeature`)
5. Otevřete Pull Request

---

## 📝 Changelog

### v1.0.0 (Current) - 2024-12-09
- ✅ Kompletní databázový backend
- ✅ Admin panel s 3 taby
- ✅ Real-time synchronizace
- ✅ Třijazyčná podpora
- ✅ Google recenze integrace
- ✅ Profesionální design a UX

Více v [CHANGELOG.md](./CHANGELOG.md)

---

## 📄 Licence

Tento projekt je licencován pod **MIT License** - viz [LICENSE](./LICENSE).

---

## 👥 Autoři

**Figma Make Team** - Vývoj kompletní aplikace

---

## 🙏 Poděkování

- **Supabase** - za skvělý backend-as-a-service
- **Tailwind CSS** - za úžasný CSS framework
- **shadcn/ui** - za krásné React komponenty
- **Lucide** - za moderní ikony
- **Google** - za Maps API a recenze

---

## 📞 Kontakt

**Restaurace Altro Da Tony**

📍 Adresa: [Vaše adresa]  
📧 Email: info@altrodatony.cz  
📱 Telefon: +420 XXX XXX XXX  
🌐 Web: [www.altrodatony.cz](#)

---

<div align="center">

**Vytvořeno s ❤️ a 🍝 v České republice**

⭐ Pokud se vám projekt líbí, dejte mu hvězdičku!

</div>
