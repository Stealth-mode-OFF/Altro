# 🗄️ Database Integration Guide - Altro Da Tony

## Přehled

Web Altro Da Tony nyní využívá **Supabase databázi** pro ukládání rezervací a správu menu místo localStorage. Všechna data jsou perzistentní a dostupná z různých zařízení.

---

## 🏗️ Architektura

### Backend (Supabase Edge Functions)
- **Server**: `/supabase/functions/server/index.tsx`
- **KV Store**: `/supabase/functions/server/kv_store.tsx` (protected)
- **API Base URL**: `https://{projectId}.supabase.co/functions/v1/make-server-d880a0b3`

### Frontend API Client
- **Hook**: `/hooks/useApi.ts`
- Všechny API volání jsou centralizované v tomto souboru

---

## 📊 Datová struktura

### Rezervace (Reservations)

**Klíč**: `reservation:{id}`

```typescript
{
  id: string,                    // unique ID (timestamp-random)
  date: string,                  // YYYY-MM-DD
  time: string,                  // HH:MM
  guests: string,                // počet hostů
  name: string,                  // jméno hosta
  email: string,                 // email
  phone: string,                 // telefon (formát: XXX XXX XXX)
  message: string,               // volitelná poznámka
  timestamp: string,             // ISO datetime vytvoření
  status: 'pending' | 'confirmed' | 'cancelled'
}
```

### Týdenní denní menu (Weekly Menu)

**Klíč**: `weekly-menu:{weekStart}`

```typescript
{
  weekStart: string,             // YYYY-MM-DD (pondělí)
  items: [
    {
      id: string,                // unique ID
      name: string,              // název jídla
      description: string,       // popis (volitelné)
      price: string,             // cena (např. "165 Kč")
      category: 'soup' | 'main' | 'dessert'
    }
  ]
}
```

### Hlavní menu (Main Menu)

**Klíč**: `main-menu`

```typescript
[
  {
    id: string,
    name: string,
    description: string,
    price: string,
    category: string,
    // další vlastnosti dle potřeby
  }
]
```

---

## 🔌 API Endpointy

### Rezervace

#### `POST /reservations`
Vytvoří novou rezervaci.

**Request Body**:
```json
{
  "date": "2024-12-15",
  "time": "19:00",
  "guests": "4",
  "name": "Jan Novák",
  "email": "jan@example.com",
  "phone": "123 456 789",
  "message": "Prosíme o místo u okna"
}
```

**Response**:
```json
{
  "success": true,
  "reservation": { /* reservation object */ }
}
```

#### `GET /reservations`
Načte všechny rezervace (seřazené sestupně dle data vytvoření).

**Response**:
```json
{
  "success": true,
  "reservations": [ /* array of reservations */ ]
}
```

#### `PATCH /reservations/:id`
Aktualizuje status rezervace.

**Request Body**:
```json
{
  "status": "confirmed"
}
```

#### `DELETE /reservations/:id`
Smaže rezervaci.

---

### Týdenní menu

#### `GET /weekly-menu/:weekStart`
Načte menu pro daný týden.

**Parametry**:
- `weekStart`: YYYY-MM-DD (pondělí)

**Response**:
```json
{
  "success": true,
  "menu": {
    "weekStart": "2024-12-09",
    "items": [ /* array of menu items */ ]
  }
}
```

#### `POST /weekly-menu`
Uloží nebo aktualizuje týdenní menu.

**Request Body**:
```json
{
  "weekStart": "2024-12-09",
  "items": [ /* array of menu items */ ]
}
```

---

### Hlavní menu

#### `GET /main-menu`
Načte hlavní menu.

#### `POST /main-menu`
Uloží hlavní menu.

**Request Body**:
```json
{
  "items": [ /* array of menu items */ ]
}
```

---

## 🔄 Real-time synchronizace

### Custom Events
Pro okamžitou aktualizaci veřejné části webu při změnách v admin panelu používáme Custom Events:

```javascript
// V admin panelu (při uložení)
window.dispatchEvent(new CustomEvent('menuUpdated', { 
  detail: updatedMenu 
}));

// Ve veřejné části (posluchač)
window.addEventListener('menuUpdated', (event) => {
  setDailyMenu(event.detail.items);
});
```

---

## 🔐 Autentizace

### Admin panel
- **Heslo**: `altrodatony2024`
- **Storage**: localStorage (`adminAuth`)
- **Note**: Pro produkci doporučujeme implementovat Supabase Auth

### API volání
Všechny requesty obsahují Authorization header:
```
Authorization: Bearer {publicAnonKey}
```

---

## 📱 Použití v komponentách

### Vytvoření rezervace
```typescript
import { createReservation } from '../hooks/useApi';

const response = await createReservation({
  date, time, guests, name, email, phone, message
});

if (response.success) {
  // Rezervace vytvořena
}
```

### Načtení týdenního menu
```typescript
import { getWeeklyMenu } from '../hooks/useApi';

const weekStart = getCurrentWeekStart();
const response = await getWeeklyMenu(weekStart);

if (response.success) {
  setMenu(response.menu.items);
}
```

### Správa rezervací (Admin)
```typescript
import { 
  getReservations, 
  updateReservationStatus, 
  deleteReservation 
} from '../hooks/useApi';

// Načíst všechny
const response = await getReservations();

// Změnit status
await updateReservationStatus(id, 'confirmed');

// Smazat
await deleteReservation(id);
```

---

## 🚀 Nasazení a údržba

### Monitoring
- Kontrolujte konzoli prohlížeče pro API errory
- Server logy jsou v Supabase Edge Functions dashboard

### Záloha dat
Data jsou automaticky perzistentní v Supabase KV store. Pro export:
1. Použijte `getReservations()` a uložte JSON
2. Použijte `getWeeklyMenu()` pro jednotlivé týdny

### Migrace z localStorage
Pokud potřebujete migrovat stará data z localStorage:
```javascript
// Přesunutí rezervací
const oldReservations = JSON.parse(
  localStorage.getItem('altrodatony_reservations') || '[]'
);

for (const reservation of oldReservations) {
  await createReservation(reservation);
}
```

---

## 🔧 Troubleshooting

### Rezervace se neuloží
1. Zkontrolujte network tab v DevTools
2. Ujistěte se, že API endpoint odpovídá (200 status)
3. Zkontrolujte error message v konzoli

### Menu se nezobrazuje
1. Ujistěte se, že je vyplněno menu v admin panelu
2. Zkontrolujte, že `weekStart` odpovídá aktuálnímu týdnu
3. Obnovte stránku pro načtení dat

### Real-time sync nefunguje
1. Ujistěte se, že admin panel a web běží ve stejné záložce
2. Zkontrolujte, že Custom Events jsou správně propagovány
3. Pro multi-tab sync zvažte použití BroadcastChannel API

---

## 📚 Další zdroje

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Hono Web Framework](https://hono.dev/)
- `/hooks/useApi.ts` - Kompletní API client implementace
- `/supabase/functions/server/index.tsx` - Server endpoints

---

**Důležité poznámky:**
- Všechna API volání jsou asynchronní - vždy použijte `async/await`
- Error handling je kritický - vždy obalte volání v `try/catch`
- Toast notifikace poskytují uživatelský feedback
- Data jsou perzistentní, ale doporučujeme pravidelné zálohy pro produkci
