# 📧 Rezervační Systém - Emailové Konfirmace

## ✅ Implementované Změny

### 1. **Email pro Majitele Restaurace**
- **Příjemce**: antoniosahulka@seznam.cz
- **Účel**: Notifikace o nové rezervaci
- **Design**: Elegantní, tmavá hlavička s prémiovou typografií (Cormorant Garamond + Outfit)
- **Obsah**:
  - Datum a čas rezervace (zvýrazněno)
  - Jméno hosta
  - Kontaktní údaje (telefon, email) - klikatelné
  - Poznámka od hosta (pokud existuje)
  - ID rezervace pro trackování

### 2. **Konfirmační Email pro Zákazníka**
- **Příjemce**: Email zákazníka zadaný v rezervačním formuláři
- **Účel**: Potvrzení rezervace a důležité informace
- **Design**: Červený gradient header, prémiový vzhled s fonty Cormorant Garamond a Outfit
- **Obsah**:
  - Osobní pozdrav (Buongiorno + jméno)
  - Děkovací zpráva
  - Detail rezervace v zvýrazněném boxu:
    - 📅 Datum (s názvem dne)
    - ⏰ Čas
    - 👥 Počet hostů
    - 💬 Poznámka zákazníka (pokud existuje)
  - Důležité informace (adresa, telefon, email)
  - Citát šéfkuchaře
  - Sociální sítě (Instagram, Facebook)
  - Footer s kontakty

### 3. **Backend Změny** (`/supabase/functions/server/index.tsx`)

```typescript
// Email je nastaven přímo v kódu
const RESTAURANT_EMAIL = 'antoniosahulka@seznam.cz';

// Posílají se 2 emaily:
// 1. Notifikace majiteli
// 2. Konfirmace zákazníkovi
```

### 4. **Přidané Překlady** (`/contexts/LanguageContext.tsx`)

Všechny tři jazyky (CS, EN, IT):
```typescript
'reservation.fillAll': 'je povinné pole' / 'is a required field' / 'è un campo obbligatorio'
'reservation.error': 'Něco se pokazilo...' / 'Something went wrong...' / 'Qualcosa è andato storto...'
```

## 🎨 Design Featury

### Owner Email:
- **Barvy**: Tmavý gradient (#1a1a1a → #2d2d2d)
- **Accent**: Červená (#C84A47)
- **Typography**: Serif hlavičky, Sans-serif detaily
- **Layout**: Čistý, přehledný s oddělením sekcí

### Customer Email:
- **Barvy**: Červený gradient header (#C84A47 → #a83d3a)
- **Accent**: Tlumené zemité tóny (#f9f6f2)
- **Typography**: Mix Cormorant Garamond (nadpisy) + Outfit (text)
- **Layout**: Elegantní s rezervačním kartou uprostřed

## 🔧 Technické Detaily

### Email Provider: **Resend**
- API endpoint: `https://api.resend.com/emails`
- From: `Altro Da Tony <onboarding@resend.dev>`
- Reply-to:
  - Owner email → zákazník může odpovědět přímo
  - Customer email → restaurace může odpovědět

### Error Handling:
- Emaily se posílají asynchronně (non-blocking)
- Pokud email selže, rezervace se stále uloží do databáze
- Vše je logováno do konzole

### Formátování:
- Datum: plný formát s názvem dne (např. "pondělí, 23. prosince 2024")
- Čas: 24h formát (např. "18:30")
- Počet osob: automatická deklinace (osoba/osoby/osob)

## 📱 Responsivní Design

Oba emaily jsou plně responzivní a optimalizované pro:
- Desktop email klienty (Outlook, Gmail, Apple Mail)
- Mobilní zařízení (iOS, Android)
- Webmail rozhraní

## 🚀 Jak to Funguje

1. **Uživatel vyplní rezervační formulář** na webu
2. **Frontend odešle data** na backend API endpoint `/make-server-d880a0b3/reservations`
3. **Backend uloží rezervaci** do KV store databáze
4. **Backend posílá 2 emaily paralelně**:
   - Email majiteli (antoniosahulka@seznam.cz)
   - Email zákazníkovi (potvrzení)
5. **Uživatel vidí success zprávu** na webu

## ✉️ Příklady Emailů

### Subject Lines:

**Owner Notification:**
```
🍝 Nová rezervace: Jan Novák - 23. 12. 2024 18:30
```

**Customer Confirmation:**
```
✓ Potvrzení rezervace - Altro Da Tony - 23. 12. 2024 18:30
```

## 🔐 Bezpečnost

- RESEND_API_KEY je uložen v environment variables
- Email majitele je hardcoded v backend kódu (ne v env variables)
- Reply-to funkce umožňuje bezpečnou komunikaci mezi restaurací a hosty

## 📊 Testování

Pro testování rezervačního systému:

1. Vyplňte rezervační formulář na webu
2. Zkontrolujte:
   - Email na antoniosahulka@seznam.cz (owner notification)
   - Email na adrese, kterou jste zadali (customer confirmation)
3. Ověřte admin panel (/#admin) - rezervace by měla být viditelná

---

**Status**: ✅ Implementováno a připraveno k testování
**Datum**: 21. prosince 2024
