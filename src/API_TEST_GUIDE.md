# 🧪 API Testing Guide

Tento průvodce vám pomůže otestovat všechny API endpointy pro web Altro Da Tony.

## 🔧 Příprava

Otevřete konzoli prohlížeče (F12) na stránce webu a použijte následující testovací skripty.

---

## 📝 Test 1: Health Check

Zkontrolujte, že API server běží:

```javascript
fetch('https://ovygqbkaosxqvtjstdyv.supabase.co/functions/v1/make-server-d880a0b3/health', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92eWdxYmthb3N4cXZ0anN0ZHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzkyMjIsImV4cCI6MjA4MDg1NTIyMn0.8BTcsj6v9xwbC6u3cdF2EJqIR35zcOHAN4AcvdVbcPE'
  }
})
.then(r => r.json())
.then(data => console.log('✅ Health check:', data))
.catch(err => console.error('❌ Error:', err));
```

**Očekávaný výstup:**
```json
{
  "status": "ok"
}
```

---

## 📅 Test 2: Vytvořit rezervaci

```javascript
fetch('https://ovygqbkaosxqvtjstdyv.supabase.co/functions/v1/make-server-d880a0b3/reservations', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92eWdxYmthb3N4cXZ0anN0ZHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzkyMjIsImV4cCI6MjA4MDg1NTIyMn0.8BTcsj6v9xwbC6u3cdF2EJqIR35zcOHAN4AcvdVbcPE',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    date: '2024-12-20',
    time: '19:00',
    guests: '4',
    name: 'Test Uživatel',
    email: 'test@example.com',
    phone: '123 456 789',
    message: 'Testovací rezervace'
  })
})
.then(r => r.json())
.then(data => console.log('✅ Rezervace vytvořena:', data))
.catch(err => console.error('❌ Error:', err));
```

---

## 📋 Test 3: Načíst všechny rezervace

```javascript
fetch('https://ovygqbkaosxqvtjstdyv.supabase.co/functions/v1/make-server-d880a0b3/reservations', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92eWdxYmthb3N4cXZ0anN0ZHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzkyMjIsImV4cCI6MjA4MDg1NTIyMn0.8BTcsj6v9xwbC6u3cdF2EJqIR35zcOHAN4AcvdVbcPE'
  }
})
.then(r => r.json())
.then(data => console.log('✅ Všechny rezervace:', data))
.catch(err => console.error('❌ Error:', err));
```

---

## 🍝 Test 4: Uložit týdenní menu

```javascript
// Získat pondělí aktuálního týdne
const getMonday = () => {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  return monday.toISOString().split('T')[0];
};

fetch('https://ovygqbkaosxqvtjstdyv.supabase.co/functions/v1/make-server-d880a0b3/weekly-menu', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92eWdxYmthb3N4cXZ0anN0ZHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzkyMjIsImV4cCI6MjA4MDg1NTIyMn0.8BTcsj6v9xwbC6u3cdF2EJqIR35zcOHAN4AcvdVbcPE',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    weekStart: getMonday(),
    items: [
      {
        id: '1',
        name: 'Minestrone',
        description: 'Tradiční italská zeleninová polévka',
        price: '85 Kč',
        category: 'soup'
      },
      {
        id: '2',
        name: 'Spaghetti Carbonara',
        description: 'S pancettou, vejci a parmezánem',
        price: '185 Kč',
        category: 'main'
      },
      {
        id: '3',
        name: 'Tiramisu',
        description: 'Domácí dezert s mascarpone',
        price: '95 Kč',
        category: 'dessert'
      }
    ]
  })
})
.then(r => r.json())
.then(data => console.log('✅ Menu uloženo:', data))
.catch(err => console.error('❌ Error:', err));
```

---

## 📖 Test 5: Načíst týdenní menu

```javascript
const getMonday = () => {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  return monday.toISOString().split('T')[0];
};

fetch(`https://ovygqbkaosxqvtjstdyv.supabase.co/functions/v1/make-server-d880a0b3/weekly-menu/${getMonday()}`, {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92eWdxYmthb3N4cXZ0anN0ZHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzkyMjIsImV4cCI6MjA4MDg1NTIyMn0.8BTcsj6v9xwbC6u3cdF2EJqIR35zcOHAN4AcvdVbcPE'
  }
})
.then(r => r.json())
.then(data => console.log('✅ Týdenní menu:', data))
.catch(err => console.error('❌ Error:', err));
```

---

## 🔄 Test 6: Aktualizovat status rezervace

**Poznámka:** Nejprve vytvořte rezervaci (Test 2) a zkopírujte `id` z odpovědi.

```javascript
const reservationId = 'PASTE_ID_HERE'; // Vložte skutečné ID

fetch(`https://ovygqbkaosxqvtjstdyv.supabase.co/functions/v1/make-server-d880a0b3/reservations/${reservationId}`, {
  method: 'PATCH',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92eWdxYmthb3N4cXZ0anN0ZHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzkyMjIsImV4cCI6MjA4MDg1NTIyMn0.8BTcsj6v9xwbC6u3cdF2EJqIR35zcOHAN4AcvdVbcPE',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    status: 'confirmed'
  })
})
.then(r => r.json())
.then(data => console.log('✅ Status aktualizován:', data))
.catch(err => console.error('❌ Error:', err));
```

---

## 🗑️ Test 7: Smazat rezervaci

**Varování:** Tato akce je nevratná!

```javascript
const reservationId = 'PASTE_ID_HERE'; // Vložte skutečné ID

fetch(`https://ovygqbkaosxqvtjstdyv.supabase.co/functions/v1/make-server-d880a0b3/reservations/${reservationId}`, {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92eWdxYmthb3N4cXZ0anN0ZHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzkyMjIsImV4cCI6MjA4MDg1NTIyMn0.8BTcsj6v9xwbC6u3cdF2EJqIR35zcOHAN4AcvdVbcPE'
  }
})
.then(r => r.json())
.then(data => console.log('✅ Rezervace smazána:', data))
.catch(err => console.error('❌ Error:', err));
```

---

## 📦 Kompletní test suite

Spusťte všechny testy najednou:

```javascript
async function runAllTests() {
  console.log('🧪 Spouštím všechny API testy...\n');
  
  const baseUrl = 'https://ovygqbkaosxqvtjstdyv.supabase.co/functions/v1/make-server-d880a0b3';
  const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92eWdxYmthb3N4cXZ0anN0ZHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzkyMjIsImV4cCI6MjA4MDg1NTIyMn0.8BTcsj6v9xwbC6u3cdF2EJqIR35zcOHAN4AcvdVbcPE',
    'Content-Type': 'application/json'
  };

  try {
    // 1. Health check
    console.log('1️⃣ Health check...');
    const health = await fetch(`${baseUrl}/health`, { headers }).then(r => r.json());
    console.log('✅ Health:', health);

    // 2. Vytvořit rezervaci
    console.log('\n2️⃣ Vytváření rezervace...');
    const reservation = await fetch(`${baseUrl}/reservations`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        date: '2024-12-20',
        time: '19:00',
        guests: '2',
        name: 'Test User',
        email: 'test@test.com',
        phone: '123 456 789',
        message: 'Test reservation'
      })
    }).then(r => r.json());
    console.log('✅ Rezervace:', reservation);

    // 3. Načíst rezervace
    console.log('\n3️⃣ Načítání rezervací...');
    const reservations = await fetch(`${baseUrl}/reservations`, { headers }).then(r => r.json());
    console.log('✅ Počet rezervací:', reservations.reservations.length);

    // 4. Uložit menu
    console.log('\n4️⃣ Ukládání menu...');
    const getMonday = () => {
      const today = new Date();
      const monday = new Date(today);
      monday.setDate(today.getDate() - today.getDay() + 1);
      return monday.toISOString().split('T')[0];
    };

    const menu = await fetch(`${baseUrl}/weekly-menu`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        weekStart: getMonday(),
        items: [
          { id: '1', name: 'Test Soup', description: 'Test', price: '85 Kč', category: 'soup' },
          { id: '2', name: 'Test Main', description: 'Test', price: '185 Kč', category: 'main' }
        ]
      })
    }).then(r => r.json());
    console.log('✅ Menu uloženo:', menu);

    // 5. Načíst menu
    console.log('\n5️⃣ Načítání menu...');
    const loadedMenu = await fetch(`${baseUrl}/weekly-menu/${getMonday()}`, { headers }).then(r => r.json());
    console.log('✅ Menu položky:', loadedMenu.menu.items.length);

    console.log('\n✅ Všechny testy proběhly úspěšně!');
  } catch (error) {
    console.error('\n❌ Test selhal:', error);
  }
}

// Spustit testy
runAllTests();
```

---

## ✅ Očekávané výsledky

Po úspěšném provedení všech testů byste měli vidět:
- ✅ Health status: "ok"
- ✅ Vytvořenou rezervaci s ID
- ✅ Seznam všech rezervací
- ✅ Uložené menu s položkami
- ✅ Načtené menu pro aktuální týden

---

## 🐛 Common Issues

### CORS Error
→ Ujistěte se, že server běží a CORS headers jsou nastaveny

### 401 Unauthorized
→ Zkontrolujte Authorization token

### 500 Server Error
→ Zkontrolujte Supabase Edge Functions logs

---

**Tip:** Pro detailní debugging použijte Network tab v DevTools (F12)
