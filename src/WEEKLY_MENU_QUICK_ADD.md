# 🍝 Rychlé přidání týdenního menu

## Problém
Týdenní menu se nezobrazuje na webu, protože **databáze je prázdná**.

## ✅ Řešení - 2 způsoby:

---

## 🚀 Způsob 1: Pomocí Admin Panelu (DOPORUČENO)

### Krok 1: Přihlaste se do Admin Panelu
```
http://localhost:5173/admin
```

### Krok 2: Najděte sekci "Týdenní menu"
V Admin panelu by měla být sekce pro správu týdenního menu.

### Krok 3: Přidejte tyto 7 položek:

#### 1️⃣ Polévka
- **Název CZ:** Tomátová polévka s mascarpone
- **Název EN:** Tomato soup with mascarpone
- **Název IT:** Zuppa di pomodoro con mascarpone
- **Cena:** 75 Kč
- **Kategorie:** soup

#### 2️⃣ Předkrm 1
- **Název CZ:** Burrata s cherry rajčaty, bazalkou a balsamicem
- **Název EN:** Burrata with cherry tomatoes, basil and balsamic
- **Název IT:** Burrata con pomodorini, basilico e balsamico
- **Cena:** 210 Kč
- **Kategorie:** starter

#### 3️⃣ Předkrm 2
- **Název CZ:** Sušená šunka s cantalupe melounem
- **Název EN:** Cured ham with cantaloupe melon
- **Název IT:** Prosciutto crudo con melone cantalupo
- **Cena:** 210 Kč
- **Kategorie:** starter

#### 4️⃣ Hlavní chod 1
- **Název CZ:** Rigatoni s pražskou šunkou, rukolou
- **Název EN:** Rigatoni with Prague ham and arugula
- **Název IT:** Rigatoni con prosciutto cotto e rucola
- **Cena:** 245 Kč
- **Kategorie:** main

#### 5️⃣ Hlavní chod 2
- **Název CZ:** Pizza Tartufo
- **Název EN:** Pizza Tartufo
- **Název IT:** Pizza Tartufo
- **Cena:** 420 Kč
- **Kategorie:** main

#### 6️⃣ Hlavní chod 3
- **Název CZ:** Telecí saltimbocca s grenaille a hlívou
- **Název EN:** Veal saltimbocca with grenaille and oyster mushroom
- **Název IT:** Saltimbocca di vitello con grenaille e pleurotus
- **Cena:** 385 Kč
- **Kategorie:** main

#### 7️⃣ Dezert
- **Název CZ:** Carpaccio z ananasu s citronellem a červeným pepřem
- **Název EN:** Pineapple carpaccio with lemongrass and red pepper
- **Název IT:** Carpaccio di ananas con citronella e pepe rosso
- **Cena:** 165 Kč
- **Kategorie:** dessert

### Krok 4: Uložte změny
Klikněte na "Uložit týdenní menu"

### Krok 5: Zkontrolujte web
Týdenní menu by se teď mělo zobrazit na hlavní stránce!

---

## ⚡ Způsob 2: Pomocí konzole prohlížeče (RYCHLÉ)

### Krok 1: Otevřete Admin Panel
```
http://localhost:5173/admin
```

### Krok 2: Otevřete konzoli prohlížeče
- Windows/Linux: `F12` nebo `Ctrl+Shift+I`
- Mac: `Cmd+Option+I`

### Krok 3: Vložte tento kód do konzole:

```javascript
// Týdenní menu data
const weeklyMenuItems = [
  {
    name_cs: 'Tomátová polévka s mascarpone',
    name_en: 'Tomato soup with mascarpone',
    name_it: 'Zuppa di pomodoro con mascarpone',
    description_cs: '',
    description_en: '',
    description_it: '',
    price: '75 Kč',
    category: 'soup'
  },
  {
    name_cs: 'Burrata s cherry rajčaty, bazalkou a balsamicem',
    name_en: 'Burrata with cherry tomatoes, basil and balsamic',
    name_it: 'Burrata con pomodorini, basilico e balsamico',
    description_cs: '',
    description_en: '',
    description_it: '',
    price: '210 Kč',
    category: 'starter'
  },
  {
    name_cs: 'Sušená šunka s cantalupe melounem',
    name_en: 'Cured ham with cantaloupe melon',
    name_it: 'Prosciutto crudo con melone cantalupo',
    description_cs: '',
    description_en: '',
    description_it: '',
    price: '210 Kč',
    category: 'starter'
  },
  {
    name_cs: 'Rigatoni s pražskou šunkou, rukolou',
    name_en: 'Rigatoni with Prague ham and arugula',
    name_it: 'Rigatoni con prosciutto cotto e rucola',
    description_cs: '',
    description_en: '',
    description_it: '',
    price: '245 Kč',
    category: 'main'
  },
  {
    name_cs: 'Pizza Tartufo',
    name_en: 'Pizza Tartufo',
    name_it: 'Pizza Tartufo',
    description_cs: '',
    description_en: '',
    description_it: '',
    price: '420 Kč',
    category: 'main'
  },
  {
    name_cs: 'Telecí saltimbocca s grenaille a hlívou',
    name_en: 'Veal saltimbocca with grenaille and oyster mushroom',
    name_it: 'Saltimbocca di vitello con grenaille e pleurotus',
    description_cs: '',
    description_en: '',
    description_it: '',
    price: '385 Kč',
    category: 'main'
  },
  {
    name_cs: 'Carpaccio z ananasu s citronellem a červeným pepřem',
    name_en: 'Pineapple carpaccio with lemongrass and red pepper',
    name_it: 'Carpaccio di ananas con citronella e pepe rosso',
    description_cs: '',
    description_en: '',
    description_it: '',
    price: '165 Kč',
    category: 'dessert'
  }
];

// Přidat ID ke každé položce
const itemsWithIds = weeklyMenuItems.map((item, index) => ({
  ...item,
  id: `item-${Date.now()}-${index}`
}));

// Uložit do databáze
async function uploadWeeklyMenu() {
  const weekStart = getCurrentWeekStart();
  
  // Import saveWeeklyMenu funkce
  const { saveWeeklyMenu } = await import('./hooks/useApi');
  
  try {
    const response = await saveWeeklyMenu(weekStart, itemsWithIds);
    if (response.success) {
      console.log('✅ Týdenní menu úspěšně nahráno!');
      console.log('🔄 Obnovte stránku pro zobrazení menu.');
    } else {
      console.error('❌ Chyba při ukládání:', response);
    }
  } catch (error) {
    console.error('❌ Chyba:', error);
  }
}

// Helper funkce
function getCurrentWeekStart() {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  return monday.toISOString().split('T')[0];
}

// Spustit upload
uploadWeeklyMenu();
```

### Krok 4: Stiskněte Enter

### Krok 5: Obnovte stránku
```
F5 nebo Ctrl+R
```

---

## 🐛 Troubleshooting

### Menu se pořád nezobrazuje?

1. **Zkontrolujte konzoli prohlížeče**
   - Měli byste vidět: `✅ Týdenní menu úspěšně nahráno!`
   - Pokud vidíte chybu, zkopírujte ji a pošlete

2. **Zkontrolujte Admin Panel**
   - Jděte do Admin Panelu
   - Měli byste vidět seznam položek menu

3. **Zkontrolujte kategorii**
   - DailyMenu komponenta podporuje: `soup`, `main`, `dessert`
   - **POZOR:** Některé položky mají kategorii `starter` - **ta se nezobrazí!**

---

## 🔧 Oprava kategorie "starter"

Pokud máte položky s kategorií `starter`, musíte je změnit na `main` nebo přidat podporu pro `starter`.

### Přidání podpory pro kategorii "starter":

Upravte soubor `/components/DailyMenu.tsx`:

```typescript
// Na řádku 82-86 přidejte:
const labels: Record<string, string> = {
  soup: t('daily.soup'),
  starter: t('daily.starter'),  // PŘIDAT!
  main: t('daily.main'),
  dessert: t('daily.dessert'),
};
```

A v `/contexts/LanguageContext.tsx` přidejte překlady:

```typescript
daily: {
  title: 'Týdenní menu',
  soup: 'Polévka',
  starter: 'Předkrm',  // PŘIDAT!
  main: 'Hlavní chod',
  dessert: 'Dezert',
  // ...
}
```

---

## ✅ Výsledek

Po úspěšném přidání uvidíte na webu sekci:

```
📅 [Dnešní datum]

TÝDENNÍ MENU
⏰ Podáváme denně 11:00 - 22:00

┌─────────────────────────────────────┐
│ POLÉVKA                             │
│ Tomátová polévka s mascarpone  75 Kč│
├─────────────────────────────────────┤
│ PŘEDKRM                             │
│ Burrata s cherry rajčaty...   210 Kč│
│ Sušená šunka s melounem...    210 Kč│
├─────────────────────────────────────┤
│ HLAVNÍ CHOD                         │
│ Rigatoni s pražskou šunkou... 245 Kč│
│ Pizza Tartufo                 420 Kč│
│ Telecí saltimbocca...         385 Kč│
├─────────────────────────────────────┤
│ DEZERT                              │
│ Carpaccio z ananasu...        165 Kč│
└─────────────────────────────────────┘
```

---

**Vytvořeno:** 29. prosince 2025  
**Pro:** Altro da Tony - Rezervační systém
