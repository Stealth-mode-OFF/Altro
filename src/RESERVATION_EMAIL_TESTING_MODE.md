# 🧪 Rezervační Systém - Testovací & Produkční Režim

## ✅ OPRAVENO: Email Sending Errors

### Problém:
Resend API bylo v testovacím režimu a mohlo posílat emaily pouze na email vlastníka účtu (`chatujsgpt@gmail.com`).

### Řešení:
Implementovali jsme **TESTING_MODE** přepínač, který umožňuje:
- ✅ V **testovacím režimu**: Všechny emaily se posílají na `chatujsgpt@gmail.com`
- ✅ V **produkčním režimu**: Emaily se posílají na skutečné příjemce

---

## 🔧 Aktuální Konfigurace (TESTING MODE)

```typescript
const TESTING_MODE = true; // ← ZAPNUTO pro testování
const TEST_EMAIL = 'chatujsgpt@gmail.com';
const RESTAURANT_EMAIL = 'antoniosahulka@seznam.cz';
```

### Co se děje v testovacím režimu:

1. **Oba emaily jdou na `chatujsgpt@gmail.com`**
2. **V emailech je viditelný žlutý/zelený banner** s informací:
   - Owner email: "🧪 TEST MODE - OWNER NOTIFICATION: In production, this email will be sent to **antoniosahulka@seznam.cz**"
   - Customer email: "🧪 TEST MODE - CUSTOMER CONFIRMATION: In production, this email will be sent to **[email zákazníka]**"
3. **Subject obsahuje prefix `[TEST]`**
   - `[TEST] 🍝 Nová rezervace: Jan Novák - 23. 12. 2024 18:30`
   - `[TEST] ✓ Potvrzení rezervace - Altro Da Tony - 23. 12. 2024 18:30`

---

## 🚀 Jak Přepnout do Produkčního Režimu

### Krok 1: Verifikujte Doménu v Resend

1. Přihlaste se na **https://resend.com/domains**
2. Přidejte doménu `altrodatony.com`
3. Nastavte DNS záznamy podle instrukcí Resend
4. Počkejte na verifikaci (obvykle pár minut až hodin)

### Krok 2: Změňte From Email

Po verifikaci domény upravte `from` adresu v kódu:

```typescript
// Místo:
from: 'Altro Da Tony <onboarding@resend.dev>'

// Použijte:
from: 'Tony – Altro da Tony <tony@altrodatony.com>'
```

### Krok 3: Vypněte Testing Mode

V souboru `/supabase/functions/server/index.tsx`, najděte:

```typescript
const TESTING_MODE = true; // ← ZMĚŇTE na false
```

A změňte na:

```typescript
const TESTING_MODE = false; // ← PRODUKČNÍ REŽIM
```

### Krok 4: Redeploy Backend

Po změnách je potřeba restartovat backend server, aby se změny projevily.

---

## 📧 Co se stane v produkčním režimu

```typescript
const TESTING_MODE = false; // PRODUKCE
```

### Tok emailů:

1. **Owner Notification** → `antoniosahulka@seznam.cz`
   - Subject: `🍝 Nová rezervace: Jan Novák - 23. 12. 2024 18:30`
   - Bez test banneru
   - Bez [TEST] prefixu

2. **Customer Confirmation** → Email, který zákazník zadal do formuláře
   - Subject: `✓ Potvrzení rezervace - Altro Da Tony - 23. 12. 2024 18:30`
   - Bez test banneru
   - Bez [TEST] prefixu

---

## 🧪 Testování (Současný Stav)

### Jak testovat rezervační systém:

1. **Vyplňte rezervační formulář** na webu
2. **Zkontrolujte email `chatujsgpt@gmail.com`** - měly by přijít 2 emaily:
   - ✉️ **OWNER NOTIFICATION** (žlutý banner)
   - ✉️ **CUSTOMER CONFIRMATION** (zelený banner)
3. **Ověřte obsah:**
   - Správné datum, čas, počet hostů
   - Kontaktní údaje (jméno, telefon, email)
   - Poznámka (pokud byla zadána)
4. **Zkontrolujte Admin Panel** (`/#admin`)
   - Rezervace by měla být uložena v databázi

---

## 🎨 Vizuální Rozpoznání Režimu

### Testing Mode (Současný):
- 🟡 **Žlutý banner** na owner emailu
- 🟢 **Zelený banner** na customer emailu
- 📧 Subject začíná `[TEST]`
- 📬 Všechny emaily → `chatujsgpt@gmail.com`

### Production Mode (Po přepnutí):
- ✅ **Bez bannerů**
- 🎯 **Čistý subject line**
- 📧 Emaily jdou na skutečné příjemce
- 💼 Profesionální vzhled

---

## 📝 Poznámky

### ⚠️ Důležité:
- **Nikdy nemažte test bannery z kódu** - automaticky se skryjí v produkci
- **Testing mode je bezpečný** - nemůže omylem poslat email špatné osobě
- **Vždy testujte nejdřív v testing mode** před přepnutím do produkce

### 💡 Tip:
Můžete vytvořit **environment variable** pro `TESTING_MODE`:
```typescript
const TESTING_MODE = Deno.env.get('EMAIL_TESTING_MODE') === 'true';
```

Pak můžete snadno přepínat mezi režimy bez změny kódu.

---

## ✅ Status

- [x] Testing mode implementován
- [x] Test bannery přidány
- [x] Subject prefix `[TEST]` přidán
- [x] Emaily fungují v testovacím režimu
- [ ] Doména verifikována v Resend (čeká na akci)
- [ ] Produkční režim aktivován (čeká na verifikaci)

---

**Datum:** 21. prosince 2024  
**Stav:** ✅ Testovací režim funguje, připraveno k přepnutí do produkce