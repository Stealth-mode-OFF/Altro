# 🗄️ Databázová implementace - Altro Da Tony

## ✅ Kompletní databázové připojení

Váš web je nyní **plně funkční s databázovým backendem** pomocí Supabase! Všechna data se ukládají perzistentně do databáze místo localStorage.

---

## 📊 Co je připojeno k databázi

### 1. **Rezervační systém** 🗓️
- ✅ Všechny rezervace se ukládají do databáze
- ✅ Real-time synchronizace mezi veřejnou částí a admin panelem
- ✅ Správa statusu rezervací (pending, confirmed, cancelled)
- ✅ Mazání rezervací
- ✅ Zobrazení všech rezervací v admin panelu

**Endpointy:**
- `POST /reservations` - Vytvoření nové rezervace
- `GET /reservations` - Získání všech rezervací
- `DELETE /reservations/:id` - Smazání rezervace
- `PATCH /reservations/:id` - Aktualizace statusu rezervace

### 2. **Denní menu** 🍽️
- ✅ Týdenní menu se ukládá do databáze
- ✅ Šéfkuchař může přidávat/mazat položky přes admin panel
- ✅ Real-time synchronizace - změny se okamžitě zobrazují na webu
- ✅ Kategorie: Polévky, Hlavní jídla, Dezerty

**Endpointy:**
- `GET /weekly-menu/:weekStart` - Získání týdenního menu
- `POST /weekly-menu` - Uložení týdenního menu

### 3. **Hlavní menu** 📋
- ✅ Stálá nabídka restaurace uložená v databázi
- ✅ Správa přes admin panel s vlastním tabuem
- ✅ Kategorie: Předkrmy (antipasti), Primi Piatti, Hlavní chody (secondi), Dezerty (dolci)
- ✅ Podpora obrázků u jednotlivých položek
- ✅ Fallback na výchozí menu, pokud je databáze prázdná

**Endpointy:**
- `GET /main-menu` - Získání hlavního menu
- `POST /main-menu` - Uložení hlavního menu

---

## 🔐 Přístup do admin panelu

### URL: `/admin.tsx`
**Heslo:** `altrodatony2024`

### Funkce admin panelu:

#### Tab: **Denní menu** 📅
- Přidávání položek denního menu (název, popis, cena, kategorie)
- Mazání položek
- Automatické ukládání do databáze
- Real-time synchronizace s veřejnou částí webu

#### Tab: **Hlavní menu** 🍝
- Přidávání položek stálého menu (název, popis, cena, kategorie, URL obrázku)
- Mazání položek
- Správa všech 4 kategorií (antipasti, primi, secondi, dolci)
- Real-time synchronizace s veřejnou částí webu

#### Tab: **Rezervace** 📞
- Přehled všech rezervací
- Statistiky (celkem, čekající, potvrzené, zrušené)
- Změna statusu rezervace
- Mazání rezervací
- Zobrazení kontaktních údajů hostů

---

## 🏗️ Technická architektura

### Backend (Supabase Edge Function)
**Umístění:** `/supabase/functions/server/index.tsx`

- **Framework:** Hono.js
- **Databáze:** Supabase KV Store (Key-Value úložiště)
- **CORS:** Plně otevřený pro všechny domény
- **Logging:** Console logging pro debugging

### Frontend (React)

**API Hook:** `/hooks/useApi.ts`
- Všechny API volání centralizovány
- Automatické error handling
- Bearer token autorizace

**Komponenty s databázovým připojením:**
- `ReservationSystem.tsx` - formulář rezervací
- `ReservationManager.tsx` - správa rezervací v adminu
- `AdminDashboard.tsx` - správa denního a hlavního menu
- `DailyMenu.tsx` - zobrazení denního menu
- `Menu.tsx` - zobrazení hlavního menu

### Real-time synchronizace
- **Custom Events:** `menuUpdated`, `mainMenuUpdated`
- Změny v admin panelu se okamžitě projeví na veřejné části webu
- Funguje v rámci jedné instance prohlížeče

---

## 🔑 Datové struktury

### Rezervace
```typescript
{
  id: string;
  date: string;
  time: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}
```

### Denní menu položka
```typescript
{
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'soup' | 'main' | 'dessert';
}
```

### Hlavní menu položka
```typescript
{
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'antipasti' | 'primi' | 'secondi' | 'dolci';
  image?: string;
}
```

---

## 📍 Klíče v databázi

### Rezervace
- **Prefix:** `reservation:`
- **Format:** `reservation:{id}`
- **Příklad:** `reservation:1733766000000-abc123xyz`

### Denní menu
- **Klíč:** `weekly-menu:{weekStart}`
- **Format:** `weekly-menu:2024-12-09`
- **Hodnota:** `{ weekStart: string, items: DailyMenuItem[] }`

### Hlavní menu
- **Klíč:** `main-menu`
- **Hodnota:** `MenuItem[]`

---

## 🚀 Jak používat

### Pro zákazníky (veřejná část)
1. Otevřít web
2. Procházet menu (denní i hlavní)
3. Vytvořit rezervaci přes rezervační formulář
4. Obdržet potvrzení

### Pro šéfkuchaře/administrátora
1. Přejít na `/admin.tsx`
2. Přihlásit se heslem: `altrodatony2024`
3. **Denní menu:**
   - Přidat nové položky pro aktuální týden
   - Mazat staré položky
   - Změny se okamžitě zobrazí na webu
4. **Hlavní menu:**
   - Upravovat stálou nabídku restaurace
   - Přidávat/mazat položky v kategoriích
   - Volitelně přidat obrázky k položkám
5. **Rezervace:**
   - Zobrazit všechny příchozí rezervace
   - Potvrdit/zrušit rezervace
   - Mazat staré rezervace

---

## 🔧 Konfigurace

### Supabase
- **Project ID:** `ovygqbkaosxqvtjstdyv`
- **API URL:** `https://ovygqbkaosxqvtjstdyv.supabase.co/functions/v1/make-server-d880a0b3`
- **Auth:** Bearer token s publicAnonKey

### Environment Variables
Všechny klíče jsou automaticky nastaveny v `/utils/supabase/info.tsx`:
- `projectId`
- `publicAnonKey`

---

## ⚠️ Důležité poznámky

### Zabezpečení
- Admin panel používá jednoduché heslo (pro demo účely)
- Pro produkci doporučujeme implementovat plnohodnotné uživatelské účty
- Supabase poskytuje bezpečnou autentizaci, kterou lze přidat později

### Data persistence
- ✅ Data jsou uložena v Supabase databázi
- ✅ Data přetrvají i po zavření prohlížeče
- ✅ Data jsou dostupná ze všech zařízení
- ❌ localStorage se už nepoužívá (kromě admin autentizace)

### Fallback mechanismus
- Pokud je databáze prázdná, hlavní menu zobrazí výchozí položky
- Denní menu se nezobrazí, pokud nebyly přidány položky
- Rezervace vyžadují funkční databázové připojení

---

## 🎯 Další možnosti rozšíření

### Krátko​dobé
- 📧 Email notifikace pro nové rezervace
- 📱 SMS potvrzení rezervací
- 📊 Analytika a statistiky návštěvnosti
- 🖼️ Upload obrázků přímo z admin panelu

### Dlouhodobé
- 👥 Více admin účtů s různými oprávněními
- 🍷 Vinný lístek s vlastní správou
- 📅 Kalendář událostí a speciálních nabídek
- 💳 Online platby pro rezervace
- ⭐ Integrace hodnocení hostů

---

## 📞 Podpora

Pro jakékoliv otázky nebo problémy:
1. Zkontrolujte console.log v prohlížeči (F12)
2. Ověřte síťové požadavky (Network tab)
3. Ujistěte se, že Supabase Edge Function běží

**Status check:** `GET https://ovygqbkaosxqvtjstdyv.supabase.co/functions/v1/make-server-d880a0b3/health`

---

## ✨ Shrnutí

Váš web **Altro Da Tony** je nyní plně funkční restaurační aplikace s:
- ✅ Databázovým backendem (Supabase)
- ✅ Rezervačním systémem s real-time synchronizací
- ✅ Správou denního menu přes admin panel
- ✅ Správou hlavního menu přes admin panel
- ✅ Profesionálním admin rozhraním
- ✅ Real-time aktualizacemi na veřejné části webu

**Web je připraven k použití!** 🎉
