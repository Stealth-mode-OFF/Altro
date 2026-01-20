# Aktualizace týdenního menu - Prosinec 2025

## ✅ Provedené změny

### 1. Rozšíření systému o kategorii "Předkrm"
- ✅ Přidána kategorie `starter` do TypeScript typů
- ✅ Aktualizovány překlady pro všechny jazyky (CS, EN, IT)
- ✅ Upraveno admin rozhraní
- ✅ Upraveno veřejné zobrazení menu

### 2. Připravené položky k přidání

Následující 7 položek je připraveno k přidání do týdenního menu:

| # | Jídlo | Kategorie | Cena |
|---|-------|-----------|------|
| 1 | Tomátová polévka s mascarpone | Polévka | 75 Kč |
| 2 | Burrata s cherry rajčaty, bazalkou a balsamicem | Předkrm | 210 Kč |
| 3 | Sušená šunka s cantalupe melounem | Předkrm | 210 Kč |
| 4 | Rigatoni s pražskou šunkou, rukolou | Hlavní jídlo | 245 Kč |
| 5 | Pizza Tartufo | Hlavní jídlo | 420 Kč |
| 6 | Telecí saltimbocca s grenaille a hlívou | Hlavní jídlo | 385 Kč |
| 7 | Carpaccio z ananasu s citronellem a červeným pepřem | Dezert | 165 Kč |

## 📝 Návod na přidání položek

### Možnost A: Přes Admin Panel (Doporučeno)

1. **Přihlaste se do Admin Panelu**
   - URL: `https://[vaše-doména]/admin`
   - Heslo: `altrodatony2024`

2. **Přejděte na záložku "Týdenní menu"**
   - Klikněte na tlačítko "Týdenní menu"

3. **Pro každou položku:**
   - Klikněte "Přidat novou položku"
   - Vyplňte formulář podle tabulky výše
   - Názvy jsou přeložené automaticky v souboru `/utils/addWeeklyMenuItems.ts`
   - Klikněte "Přidat položku"

### Možnost B: Automaticky přes konzoli (Pro pokročilé)

```javascript
// 1. Otevřete konzoli prohlížeče (F12) v Admin Panelu
// 2. Vložte tento kód:

const items = [
  {
    name_cs: 'Tomátová polévka s mascarpone',
    name_en: 'Tomato soup with mascarpone',
    name_it: 'Zuppa di pomodoro con mascarpone',
    price: '75 Kč',
    category: 'soup'
  },
  {
    name_cs: 'Burrata s cherry rajčaty, bazalkou a balsamicem',
    name_en: 'Burrata with cherry tomatoes, basil and balsamic',
    name_it: 'Burrata con pomodorini, basilico e balsamico',
    price: '210 Kč',
    category: 'starter'
  },
  {
    name_cs: 'Sušená šunka s cantalupe melounem',
    name_en: 'Cured ham with cantaloupe melon',
    name_it: 'Prosciutto crudo con melone cantalupo',
    price: '210 Kč',
    category: 'starter'
  },
  {
    name_cs: 'Rigatoni s pražskou šunkou, rukolou',
    name_en: 'Rigatoni with Prague ham and arugula',
    name_it: 'Rigatoni con prosciutto cotto e rucola',
    price: '245 Kč',
    category: 'main'
  },
  {
    name_cs: 'Pizza Tartufo',
    name_en: 'Pizza Tartufo',
    name_it: 'Pizza Tartufo',
    price: '420 Kč',
    category: 'main'
  },
  {
    name_cs: 'Telecí saltimbocca s grenaille a hlívou',
    name_en: 'Veal saltimbocca with grenaille and oyster mushroom',
    name_it: 'Saltimbocca di vitello con grenaille e pleurotus',
    price: '385 Kč',
    category: 'main'
  },
  {
    name_cs: 'Carpaccio z ananasu s citronellem a červeným pepřem',
    name_en: 'Pineapple carpaccio with lemongrass and red pepper',
    name_it: 'Carpaccio di ananas con citronella e pepe rosso',
    price: '165 Kč',
    category: 'dessert'
  }
];

// Poznámka: Tento kód je jen pro referenci.
// Doporučujeme přidat položky ručně přes formulář v Admin Panelu.
```

## 🎨 Kategorie

Systém nyní podporuje 4 kategorie:

| Kategorie | Česky | English | Italiano |
|-----------|-------|---------|----------|
| `soup` | Polévka | Soup | Zuppa |
| `starter` | Předkrm | Starter | Antipasto |
| `main` | Hlavní jídlo | Main Course | Primo |
| `dessert` | Dezert | Dessert | Dolce |

## ✨ Co se zobrazí na webu

Po přidání položek se sekce "Týdenní menu" automaticky zobrazí na hlavní stránce s:
- ✅ Aktuálním datem
- ✅ Časem podávání (11:00 - 15:00)
- ✅ Položkami seřazenými podle kategorií
- ✅ Krásným designem s plynulými animacemi

## 🔧 Technické detaily

### Upravené soubory:
- `/components/AdminDashboard.tsx` - Přidána kategorie starter
- `/components/DailyMenu.tsx` - Přidána kategorie starter
- `/contexts/LanguageContext.tsx` - Přidány překlady pro starter
- `/utils/addWeeklyMenuItems.ts` - Nový soubor s připravenými daty

### Struktura dat:
```typescript
interface DailyMenuItem {
  id: string;
  name_cs: string;
  name_en: string;
  name_it: string;
  description_cs: string;
  description_en: string;
  description_it: string;
  price: string;
  category: 'soup' | 'starter' | 'main' | 'dessert';
}
```

## 📞 Podpora

Pokud máte problémy s přidáním položek:
1. Zkontrolujte, že jste přihlášeni do Admin Panelu
2. Obnovte stránku (F5)
3. Zkuste přidat jednu položku testovací
4. Zkontrolujte browser konzoli (F12) pro případné chyby
