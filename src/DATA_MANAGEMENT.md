# 📦 Data Management Guide

## 🔄 Export & Import dat

### Jak exportovat menu

Pokud chcete zálohovat své menu nebo přenést na jiný počítač:

1. **Otevřete konzoli prohlížeče:**
   - Windows/Linux: `F12` nebo `Ctrl + Shift + I`
   - Mac: `Cmd + Option + I`

2. **Klikněte na záložku "Console"**

3. **Zkopírujte a vložte tento příkaz:**

```javascript
// Export denního menu
console.log('DENNÍ MENU:');
console.log(localStorage.getItem('altrodatony_daily_menu'));

// Export hlavního menu
console.log('HLAVNÍ MENU:');
console.log(localStorage.getItem('altrodatony_regular_menu'));

// Export rezervací
console.log('REZERVACE:');
console.log(localStorage.getItem('altrodatony_reservations'));
```

4. **Zkopírujte výstup** a uložte do textového souboru

---

### Jak importovat menu

Pro import dat na nový počítač:

1. **Otevřete konzoli prohlížeče** (stejně jako výše)

2. **Vložte tento příkaz** (nahraďte DATA vaším exportovaným JSON):

```javascript
// Import denního menu
localStorage.setItem('altrodatony_daily_menu', 'VLOŽTE_SEM_DATA');

// Import hlavního menu
localStorage.setItem('altrodatony_regular_menu', 'VLOŽTE_SEM_DATA');

// Import rezervací
localStorage.setItem('altrodatony_reservations', 'VLOŽTE_SEM_DATA');
```

3. **Obnovte stránku** (F5)

---

## 📊 Zobrazení rezervací

### V konzoli prohlížeče:

```javascript
// Získat všechny rezervace
const reservations = JSON.parse(localStorage.getItem('altrodatony_reservations') || '[]');

// Zobrazit v čitelném formátu
console.table(reservations);

// Najít rezervace pro konkrétní datum
reservations.filter(r => r.date === '2024-12-15');

// Seřadit podle data
reservations.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
```

### Export do CSV:

```javascript
const reservations = JSON.parse(localStorage.getItem('altrodatony_reservations') || '[]');

const csv = [
  ['Jméno', 'Email', 'Telefon', 'Datum', 'Čas', 'Počet hostů', 'Poznámka'],
  ...reservations.map(r => [r.name, r.email, r.phone, r.date, r.time, r.guests, r.message])
];

const csvContent = csv.map(row => row.join(',')).join('\n');
console.log(csvContent);

// Zkopírujte výstup a uložte jako .csv soubor
```

---

## 🗑️ Smazání dat

### Vymazat vše:

```javascript
localStorage.removeItem('altrodatony_daily_menu');
localStorage.removeItem('altrodatony_regular_menu');
localStorage.removeItem('altrodatony_reservations');
```

### Vymazat pouze staré rezervace (starší než 30 dní):

```javascript
const reservations = JSON.parse(localStorage.getItem('altrodatony_reservations') || '[]');
const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

const recentReservations = reservations.filter(r => {
  return new Date(r.timestamp) > thirtyDaysAgo;
});

localStorage.setItem('altrodatony_reservations', JSON.stringify(recentReservations));
console.log(`Smazáno ${reservations.length - recentReservations.length} starých rezervací`);
```

---

## 📅 Statistiky rezervací

### Kolik rezervací tento měsíc:

```javascript
const reservations = JSON.parse(localStorage.getItem('altrodatony_reservations') || '[]');
const thisMonth = new Date().getMonth();
const thisYear = new Date().getFullYear();

const thisMonthReservations = reservations.filter(r => {
  const date = new Date(r.timestamp);
  return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
});

console.log(`Tento měsíc: ${thisMonthReservations.length} rezervací`);
console.log(`Celkový počet hostů: ${thisMonthReservations.reduce((sum, r) => sum + parseInt(r.guests), 0)}`);
```

### Nejpopulárnější časy:

```javascript
const reservations = JSON.parse(localStorage.getItem('altrodatony_reservations') || '[]');

const timeCounts = reservations.reduce((acc, r) => {
  acc[r.time] = (acc[r.time] || 0) + 1;
  return acc;
}, {});

console.log('Nejpopulárnější časy:');
console.table(timeCounts);
```

---

## 🔄 Pravidelná záloha

### Doporučený postup:

1. **Týdně** exportujte všechna data (viz výše)
2. Uložte do souboru: `backup_YYYY-MM-DD.json`
3. Uchovávejte minimálně 3 poslední zálohy
4. Ukládejte na cloud (Google Drive, Dropbox)

### Automatická záloha (budoucí funkce):

Pro automatické zálohování budete potřebovat:
- Backend server (Node.js, PHP)
- Databázi (PostgreSQL, MySQL)
- Automatický cron job pro zálohy

---

## 📧 Export rezervací pro účetnictví

```javascript
const reservations = JSON.parse(localStorage.getItem('altrodatony_reservations') || '[]');

// Rezervace za konkrétní měsíc
const month = 12; // prosinec
const year = 2024;

const monthReservations = reservations.filter(r => {
  const date = new Date(r.date);
  return date.getMonth() + 1 === month && date.getFullYear() === year;
});

// Formátované pro tisk
monthReservations.forEach(r => {
  console.log(`${r.date} ${r.time} - ${r.name} (${r.guests} osob) - ${r.phone}`);
});
```

---

## 🔐 GDPR - Právo na výmaz dat

Pokud host požádá o smazání svých údajů:

```javascript
const reservations = JSON.parse(localStorage.getItem('altrodatony_reservations') || '[]');

// Smazat podle emailu
const email = 'host@example.com';
const filtered = reservations.filter(r => r.email !== email);

localStorage.setItem('altrodatony_reservations', JSON.stringify(filtered));
console.log('Data smazána');
```

---

## 🛠️ Řešení problémů

### Data se neukládají
1. Zkontrolujte, že máte povolené cookies
2. Zkontrolujte místo v prohlížeči (localStorage má limit ~5-10MB)
3. Zkuste jiný prohlížeč

### Ztráta dat po aktualizaci stránky
1. Data by měla zůstat i po refreshi
2. Pokud ne, zkontrolujte nastavení "Clear data on exit"
3. Nepoužívejte incognito/private režim

### Příliš mnoho rezervací
localStorage má limit ~5MB. Pokud máte 1000+ rezervací:
1. Exportujte je
2. Smažte staré (starší než 90 dní)
3. Archivujte do separátního souboru

---

## 📈 Budoucí vylepšení

Pro produkční nasazení doporučujeme:

### Backend databáze:
- ✅ Neomezená kapacita
- ✅ Automatické zálohy
- ✅ Multi-device přístup
- ✅ Reporting & analytics
- ✅ Email notifikace

### Dashboard:
- 📊 Vizualizace obsazenosti
- 📅 Kalendářní pohled
- 📈 Statistiky tržeb
- 🔍 Vyhledávání rezervací
- 📧 Email šablony

---

**Pro implementaci kontaktujte vývojáře**
