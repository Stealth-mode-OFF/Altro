# 📦 Migration Guide - localStorage → Supabase Database

Tento průvodce vám pomůže přenést existující data z localStorage do nové Supabase databáze.

---

## ⚠️ Před migrací

**DŮLEŽITÉ:** Proveďte zálohu vašich localStorage dat před migrací!

### Zálohování dat

Otevřete konzoli (F12) na webu a spusťte:

```javascript
// Backup všech dat
const backup = {
  reservations: localStorage.getItem('altrodatony_reservations'),
  weeklyMenu: localStorage.getItem('weeklyMenu'),
  dailyMenu: localStorage.getItem('altrodatony_daily_menu'),
  regularMenu: localStorage.getItem('altrodatony_regular_menu'),
  timestamp: new Date().toISOString()
};

console.log('📦 Záloha dat:', JSON.stringify(backup, null, 2));

// Stáhněte zálohu jako soubor
const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `altrodatony-backup-${Date.now()}.json`;
a.click();
```

---

## 🔄 Migrace rezervací

### Krok 1: Zkontrolujte existující rezervace

```javascript
const oldReservations = localStorage.getItem('altrodatony_reservations');
if (oldReservations) {
  const reservations = JSON.parse(oldReservations);
  console.log(`📊 Nalezeno ${reservations.length} rezervací`);
  console.log('Rezervace:', reservations);
} else {
  console.log('ℹ️ Žádné rezervace k migraci');
}
```

### Krok 2: Migrujte rezervace do databáze

```javascript
async function migrateReservations() {
  const oldReservations = localStorage.getItem('altrodatony_reservations');
  if (!oldReservations) {
    console.log('ℹ️ Žádné rezervace k migraci');
    return;
  }

  const reservations = JSON.parse(oldReservations);
  console.log(`🔄 Migrace ${reservations.length} rezervací...`);

  const baseUrl = 'https://ovygqbkaosxqvtjstdyv.supabase.co/functions/v1/make-server-d880a0b3';
  const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92eWdxYmthb3N4cXZ0anN0ZHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzkyMjIsImV4cCI6MjA4MDg1NTIyMn0.8BTcsj6v9xwbC6u3cdF2EJqIR35zcOHAN4AcvdVbcPE',
    'Content-Type': 'application/json'
  };

  let migrated = 0;
  let failed = 0;

  for (const reservation of reservations) {
    try {
      const response = await fetch(`${baseUrl}/reservations`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          date: reservation.date,
          time: reservation.time,
          guests: reservation.guests || reservation.numberOfGuests || '2',
          name: reservation.name,
          email: reservation.email,
          phone: reservation.phone,
          message: reservation.message || reservation.specialRequests || ''
        })
      });

      if (response.ok) {
        migrated++;
        console.log(`✅ Migrováno: ${reservation.name}`);
      } else {
        failed++;
        console.error(`❌ Selhalo: ${reservation.name}`, await response.text());
      }
      
      // Malá pauza mezi požadavky
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      failed++;
      console.error(`❌ Chyba při migraci: ${reservation.name}`, error);
    }
  }

  console.log(`\n✅ Migrace dokončena!`);
  console.log(`   Úspěšně: ${migrated}`);
  console.log(`   Selhalo: ${failed}`);
  
  if (migrated > 0 && failed === 0) {
    console.log('\n⚠️ Všechny rezervace byly migrovány. Můžete vymazat localStorage:');
    console.log('   localStorage.removeItem("altrodatony_reservations");');
  }
}

// Spustit migraci
migrateReservations();
```

---

## 🍝 Migrace denního menu

### Krok 1: Zkontrolujte existující menu

```javascript
const weeklyMenu = localStorage.getItem('weeklyMenu');
const dailyMenu = localStorage.getItem('altrodatony_daily_menu');

if (weeklyMenu) {
  console.log('📊 Weekly menu:', JSON.parse(weeklyMenu));
}
if (dailyMenu) {
  console.log('📊 Daily menu:', JSON.parse(dailyMenu));
}
```

### Krok 2: Migrujte weekly menu

```javascript
async function migrateWeeklyMenu() {
  const weeklyMenu = localStorage.getItem('weeklyMenu');
  if (!weeklyMenu) {
    console.log('ℹ️ Žádné weekly menu k migraci');
    return;
  }

  const menu = JSON.parse(weeklyMenu);
  console.log(`🔄 Migrace weekly menu...`);

  const baseUrl = 'https://ovygqbkaosxqvtjstdyv.supabase.co/functions/v1/make-server-d880a0b3';
  const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92eWdxYmthb3N4cXZ0anN0ZHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzkyMjIsImV4cCI6MjA4MDg1NTIyMn0.8BTcsj6v9xwbC6u3cdF2EJqIR35zcOHAN4AcvdVbcPE',
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(`${baseUrl}/weekly-menu`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        weekStart: menu.weekStart,
        items: menu.items || []
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Weekly menu migrováno:', result);
      console.log('\n⚠️ Můžete vymazat localStorage:');
      console.log('   localStorage.removeItem("weeklyMenu");');
    } else {
      console.error('❌ Migrace selhala:', await response.text());
    }
  } catch (error) {
    console.error('❌ Chyba při migraci:', error);
  }
}

// Spustit migraci
migrateWeeklyMenu();
```

### Krok 3: Migrujte daily menu (pokud používáte starší verzi)

```javascript
async function migrateDailyMenu() {
  const dailyMenu = localStorage.getItem('altrodatony_daily_menu');
  if (!dailyMenu) {
    console.log('ℹ️ Žádné daily menu k migraci');
    return;
  }

  const items = JSON.parse(dailyMenu);
  console.log(`🔄 Migrace ${items.length} položek daily menu...`);

  // Získat aktuální pondělí
  const getMonday = () => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    return monday.toISOString().split('T')[0];
  };

  const baseUrl = 'https://ovygqbkaosxqvtjstdyv.supabase.co/functions/v1/make-server-d880a0b3';
  const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92eWdxYmthb3N4cXZ0anN0ZHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzkyMjIsImV4cCI6MjA4MDg1NTIyMn0.8BTcsj6v9xwbC6u3cdF2EJqIR35zcOHAN4AcvdVbcPE',
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(`${baseUrl}/weekly-menu`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        weekStart: getMonday(),
        items: items
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Daily menu migrováno:', result);
      console.log('\n⚠️ Můžete vymazat localStorage:');
      console.log('   localStorage.removeItem("altrodatony_daily_menu");');
    } else {
      console.error('❌ Migrace selhala:', await response.text());
    }
  } catch (error) {
    console.error('❌ Chyba při migraci:', error);
  }
}

// Spustit migraci
migrateDailyMenu();
```

---

## 🧹 Vyčištění po migraci

Po úspěšné migraci můžete vymazat stará data z localStorage:

```javascript
// POZOR: Proveďte nejprve zálohu a ověřte, že migrace proběhla úspěšně!

function cleanupLocalStorage() {
  const confirm = window.confirm(
    '⚠️ VAROVÁNÍ: Toto smaže všechna lokální data!\n\n' +
    'Ujistěte se, že:\n' +
    '1. Máte zálohu dat\n' +
    '2. Migrace proběhla úspěšně\n' +
    '3. Data jsou v databázi\n\n' +
    'Pokračovat?'
  );

  if (!confirm) {
    console.log('❌ Vyčištění zrušeno');
    return;
  }

  // Smazat stará data (ponechat pouze admin auth)
  localStorage.removeItem('altrodatony_reservations');
  localStorage.removeItem('weeklyMenu');
  localStorage.removeItem('altrodatony_daily_menu');
  localStorage.removeItem('altrodatony_regular_menu');

  console.log('✅ localStorage vyčištěn');
  console.log('ℹ️ Admin autentizace ponechána');
}

// Spustit vyčištění
cleanupLocalStorage();
```

---

## 🔍 Ověření migrace

### Zkontrolujte rezervace v databázi

```javascript
async function verifyReservations() {
  const baseUrl = 'https://ovygqbkaosxqvtjstdyv.supabase.co/functions/v1/make-server-d880a0b3';
  const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92eWdxYmthb3N4cXZ0anN0ZHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzkyMjIsImV4cCI6MjA4MDg1NTIyMn0.8BTcsj6v9xwbC6u3cdF2EJqIR35zcOHAN4AcvdVbcPE'
  };

  const response = await fetch(`${baseUrl}/reservations`, { headers });
  const data = await response.json();
  
  console.log(`✅ V databázi je ${data.reservations.length} rezervací`);
  console.log('Rezervace:', data.reservations);
}

verifyReservations();
```

### Zkontrolujte menu v databázi

```javascript
async function verifyMenu() {
  const getMonday = () => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    return monday.toISOString().split('T')[0];
  };

  const baseUrl = 'https://ovygqbkaosxqvtjstdyv.supabase.co/functions/v1/make-server-d880a0b3';
  const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92eWdxYmthb3N4cXZ0anN0ZHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzkyMjIsImV4cCI6MjA4MDg1NTIyMn0.8BTcsj6v9xwbC6u3cdF2EJqIR35zcOHAN4AcvdVbcPE'
  };

  const response = await fetch(`${baseUrl}/weekly-menu/${getMonday()}`, { headers });
  const data = await response.json();
  
  console.log(`✅ V databázi je ${data.menu.items.length} položek menu`);
  console.log('Menu:', data.menu);
}

verifyMenu();
```

---

## 🚀 Kompletní migrace (all-in-one)

Spusťte celou migraci najednou:

```javascript
async function fullMigration() {
  console.log('🚀 Spouštím kompletní migraci...\n');

  // 1. Backup
  console.log('1️⃣ Vytváření zálohy...');
  const backup = {
    reservations: localStorage.getItem('altrodatony_reservations'),
    weeklyMenu: localStorage.getItem('weeklyMenu'),
    dailyMenu: localStorage.getItem('altrodatony_daily_menu'),
    timestamp: new Date().toISOString()
  };
  console.log('✅ Záloha vytvořena');

  // 2. Migrace rezervací
  console.log('\n2️⃣ Migrace rezervací...');
  await migrateReservations();

  // 3. Migrace weekly menu
  console.log('\n3️⃣ Migrace weekly menu...');
  await migrateWeeklyMenu();

  // 4. Migrace daily menu
  console.log('\n4️⃣ Migrace daily menu...');
  await migrateDailyMenu();

  // 5. Ověření
  console.log('\n5️⃣ Ověření migrace...');
  await verifyReservations();
  await verifyMenu();

  console.log('\n✅ Kompletní migrace dokončena!');
  console.log('\n⚠️ Doporučení:');
  console.log('   1. Zkontrolujte data v admin panelu (/admin)');
  console.log('   2. Ověřte, že web funguje správně');
  console.log('   3. Po ověření můžete vymazat localStorage (cleanupLocalStorage())');
}

// POZOR: Přidejte všechny funkce z výše (migrateReservations, migrateWeeklyMenu, atd.)
// a pak spusťte:
fullMigration();
```

---

## 📋 Checklist migrace

- [ ] Vytvořena záloha localStorage dat
- [ ] Migrovány rezervace do databáze
- [ ] Migrováno weekly menu
- [ ] Migrováno daily menu (pokud existuje)
- [ ] Ověřeno v admin panelu, že všechna data jsou k dispozici
- [ ] Otestován rezervační formulář s databází
- [ ] Otestována správa menu v admin panelu
- [ ] Vyčištěn localStorage (volitelné, po ověření)

---

## ❓ FAQ

**Q: Co když selže migrace některých položek?**  
A: Zkontrolujte konzoli pro error messages. Můžete migrovat jednotlivé položky manuálně.

**Q: Mohu migrovat postupně?**  
A: Ano! Můžete nejprve migrovat rezervace, pak menu. Systém bude fungovat s částečně migrovanými daty.

**Q: Můžu se vrátit k localStorage?**  
A: Technicky ano, pokud máte zálohu. Ale nová verze je navržena pro databázi.

**Q: Co když mám rezervace v různých formátech?**  
A: Upravte mapping v `migrateReservations()` funkci podle vašeho formátu dat.

---

**Pro pomoc kontaktujte vývojáře nebo zkontrolujte `/DATABASE_GUIDE.md`**
