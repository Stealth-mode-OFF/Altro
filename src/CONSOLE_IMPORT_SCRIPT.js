// ====================================================================
// CONSOLE IMPORT SCRIPT - Přidání položek týdenního menu
// ====================================================================
// 
// NÁVOD:
// 1. Otevřete Admin Panel (/admin) a přihlaste se
// 2. Přejděte na záložku "Týdenní menu"
// 3. Otevřete Browser Console (F12 > Console)
// 4. Zkopírujte CELÝ tento soubor a vložte do console
// 5. Stiskněte Enter
// 6. Počkejte až se všechny položky přidají
//
// ⚠️ POZNÁMKA: Tento skript pracuje s interním stavem React komponenty.
// Doporučujeme raději přidat položky ručně přes formulář!
//
// ====================================================================

console.log('🚀 Zahájení importu týdenního menu...');
console.log('📋 Celkem 7 položek');

const menuItems = [
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

// ====================================================================
// FUNKCE PRO IMPORT (použijte s opatrností)
// ====================================================================

function displayItemsForManualEntry() {
  console.log('\n📋 DATA PRO RUČNÍ PŘIDÁNÍ:\n');
  console.log('===============================================');
  
  menuItems.forEach((item, index) => {
    console.log(`\n🔹 POLOŽKA ${index + 1}:`);
    console.log('─────────────────────────────────────────────');
    console.log(`🇨🇿 Název: ${item.name_cs}`);
    console.log(`🇬🇧 Name: ${item.name_en}`);
    console.log(`🇮🇹 Nome: ${item.name_it}`);
    console.log(`💰 Cena: ${item.price}`);
    console.log(`📂 Kategorie: ${item.category}`);
    console.log('─────────────────────────────────────────────');
  });
  
  console.log('\n✅ Zkopírujte údaje výše a přidejte každou položku ručně!');
  console.log('📖 Nebo použijte soubor: PRIDANI_POLOZEK_MENU.md');
}

// ====================================================================
// EXPORT DO KONZOLE
// ====================================================================

console.log('\n📦 Menu data připravena!');
console.log('Použijte: displayItemsForManualEntry() pro zobrazení dat\n');

// Automaticky zobrazit data
displayItemsForManualEntry();

// Export objektu pro přístup k datům
window.weeklyMenuData = {
  items: menuItems,
  count: menuItems.length,
  categories: {
    soup: menuItems.filter(i => i.category === 'soup').length,
    starter: menuItems.filter(i => i.category === 'starter').length,
    main: menuItems.filter(i => i.category === 'main').length,
    dessert: menuItems.filter(i => i.category === 'dessert').length
  }
};

console.log('\n✅ Data uložena do: window.weeklyMenuData');
console.log('📊 Přístup: window.weeklyMenuData.items');
console.log('\n🎉 Import dokončen!');
console.log('⚠️  Přidejte položky RUČNĚ přes formulář v Admin Panelu');
