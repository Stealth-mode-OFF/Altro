// Pomocný skript pro přidání položek do týdenního menu
// Spustit v browser konzoli na admin panelu

export const weeklyMenuItems = [
  {
    name_cs: 'Tomátová polévka s mascarpone',
    name_en: 'Tomato soup with mascarpone',
    name_it: 'Zuppa di pomodoro con mascarpone',
    description_cs: '',
    description_en: '',
    description_it: '',
    price: '75 Kč',
    category: 'soup' as const
  },
  {
    name_cs: 'Burrata s cherry rajčaty, bazalkou a balsamicem',
    name_en: 'Burrata with cherry tomatoes, basil and balsamic',
    name_it: 'Burrata con pomodorini, basilico e balsamico',
    description_cs: '',
    description_en: '',
    description_it: '',
    price: '210 Kč',
    category: 'starter' as const
  },
  {
    name_cs: 'Sušená šunka s cantalupe melounem',
    name_en: 'Cured ham with cantaloupe melon',
    name_it: 'Prosciutto crudo con melone cantalupo',
    description_cs: '',
    description_en: '',
    description_it: '',
    price: '210 Kč',
    category: 'starter' as const
  },
  {
    name_cs: 'Rigatoni s pražskou šunkou, rukolou',
    name_en: 'Rigatoni with Prague ham and arugula',
    name_it: 'Rigatoni con prosciutto cotto e rucola',
    description_cs: '',
    description_en: '',
    description_it: '',
    price: '245 Kč',
    category: 'main' as const
  },
  {
    name_cs: 'Pizza Tartufo',
    name_en: 'Pizza Tartufo',
    name_it: 'Pizza Tartufo',
    description_cs: '',
    description_en: '',
    description_it: '',
    price: '420 Kč',
    category: 'main' as const
  },
  {
    name_cs: 'Telecí saltimbocca s grenaille a hlívou',
    name_en: 'Veal saltimbocca with grenaille and oyster mushroom',
    name_it: 'Saltimbocca di vitello con grenaille e pleurotus',
    description_cs: '',
    description_en: '',
    description_it: '',
    price: '385 Kč',
    category: 'main' as const
  },
  {
    name_cs: 'Carpaccio z ananasu s citronellem a červeným pepřem',
    name_en: 'Pineapple carpaccio with lemongrass and red pepper',
    name_it: 'Carpaccio di ananas con citronella e pepe rosso',
    description_cs: '',
    description_en: '',
    description_it: '',
    price: '165 Kč',
    category: 'dessert' as const
  }
];

// Jak použít:
// 1. Přihlaste se do Admin Panelu
// 2. Přejděte na záložku "Týdenní menu"
// 3. Otevřete konzoli prohlížeče (F12)
// 4. Vložte obsah tohoto souboru
// 5. Pak pro každou položku použijte formulář, nebo přidejte skript pro automatické přidání
