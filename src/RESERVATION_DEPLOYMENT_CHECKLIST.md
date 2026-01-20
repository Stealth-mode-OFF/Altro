# 🚀 Reservation System - Deployment Checklist

## ⚡ Quick Start (5 minut)

### 1. Ověřte Supabase Environment Variables

```bash
# Otevřete Supabase Dashboard
# Navigace: Project → Settings → Edge Functions → Secrets
```

**Povinné proměnné:**
- ✅ `RESEND_API_KEY` - Pro odesílání emailů (viz níže)
- ✅ `SUPABASE_URL` - Auto-nastaveno
- ✅ `SUPABASE_ANON_KEY` - Auto-nastaveno
- ✅ `SUPABASE_SERVICE_ROLE_KEY` - Auto-nastaveno

**Volitelné proměnné:**
- `RESTAURANT_EMAIL` - Email pro příjem rezervací (default: `rezervace@altrodatony.cz`)

---

### 2. Nastavte Resend API Key

#### A. Vytvořte Resend účet (pokud ještě nemáte)
1. Jděte na https://resend.com/signup
2. Zaregistrujte se pomocí GitHub nebo email
3. Ověřte email

#### B. Získejte API klíč
1. V Resend dashboardu klikněte na "API Keys"
2. Klikněte "Create API Key"
3. Name: "Altro Da Tony - Production"
4. Permission: "Sending access"
5. Zkopírujte vygenerovaný klíč (začíná `re_...`)

#### C. Přidejte do Supabase
```bash
# V Supabase Dashboard:
# Edge Functions → Secrets → Add new secret

Name: RESEND_API_KEY
Value: re_your_actual_api_key_here
```

**⚠️ DŮLEŽITÉ:** API klíč se zobrazí pouze jednou! Uložte ho bezpečně.

---

### 3. Ověřte Domain pro Resend (Produkční prostředí)

Pro produkční nasazení **MUSÍTE** ověřit vlastní doménu:

#### A. Přidejte doménu do Resend
1. V Resend → Domains → Add Domain
2. Zadejte: `altrodatony.cz`
3. Zkopírujte DNS záznamy

#### B. Přidejte DNS záznamy do DNS manageru
```dns
# SPF Record
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all

# DKIM Record (příklad)
Type: TXT
Name: resend._domainkey
Value: [zkopírujte z Resend dashboardu]

# DMARC Record (doporučeno)
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@altrodatony.cz
```

#### C. Počkejte na DNS propagaci (5-30 minut)

#### D. Ověřte v Resend dashboardu
- Status by měl změnit na "Verified" ✅

#### E. Aktualizujte email `from` adresu v kódu
```typescript
// V /supabase/functions/server/index.tsx řádek 148
from: 'Altro Da Tony <rezervace@altrodatony.cz>', // Změňte z 'onboarding@resend.dev'
```

**Poznámka pro testování:** Můžete dočasně používat `onboarding@resend.dev`, ale v produkci **MUSÍ** být vlastní doména!

---

### 4. Test rezervačního systému

#### A. Frontend test
1. Otevřete aplikaci: https://altrodatony.cz
2. Scrollujte k sekci "Rezervace"
3. Vyplňte formulář:
   - Jméno: TEST Jan Novák
   - Email: vas-email@example.com
   - Telefon: 123 456 789
   - Datum: Zítřek
   - Čas: 19:00
   - Hosté: 2
   - Poznámka: "TEST REZERVACE - PROSÍM IGNOROVAT"
4. Klikněte "Potvrdit rezervaci"
5. **Očekáváno:**
   - ✅ Success toast se zobrazí
   - ✅ Formulář se vyresetuje

#### B. Backend test (Admin panel)
1. Otevřete: https://altrodatony.cz/admin
2. Heslo: `menicka2026`
3. Klikněte na "Rezervace"
4. **Očekáváno:**
   - ✅ Testovací rezervace se zobrazí
   - ✅ Všechna pole včetně `guests` jsou vyplněná
   - ✅ Status: "pending"

#### C. Email test
1. Zkontrolujte email na `rezervace@altrodatony.cz`
2. **Očekáváno:**
   - ✅ Email s předmětem: "🍝 Nová rezervace: TEST Jan Novák - [DATUM] 19:00"
   - ✅ Obsahuje všechny údaje rezervace

#### D. Console log test
```bash
# V Supabase Dashboard:
# Edge Functions → Logs

# Hledejte:
📧 Sending email to rezervace@altrodatony.cz (via Resend)...
✅ Reservation email sent successfully to rezervace@altrodatony.cz
Reservation created: [ID]
```

---

### 5. Nastavte monitoring (Doporučeno)

#### A. Email notifikace na mobil
Přesměrujte `rezervace@altrodatony.cz` na osobní email/SMS pro okamžité notifikace.

#### B. Supabase Alerts
```bash
# V Supabase Dashboard:
# Project → Settings → Alerts

# Vytvořte alert pro:
- Edge Function errors > 5 per hour
- Database usage > 80%
```

---

## 🔍 Troubleshooting

### Problém: Email se neodesílá

**Kontrola 1:** Zkontrolujte RESEND_API_KEY
```bash
# Supabase Dashboard → Edge Functions → Secrets
# Ověřte že RESEND_API_KEY existuje a je platný
```

**Kontrola 2:** Zkontrolujte Edge Function logy
```bash
# Měli byste vidět:
❌ RESEND_API_KEY not configured - skipping email notification

# NEBO chybu od Resend API
```

**Kontrola 3:** Ověřte domain v Resend
```bash
# Pokud používáte vlastní doménu, ověřte že je "Verified" v Resend dashboardu
```

**Řešení:**
1. Pokud chybí API klíč → Vytvořte a nastavte (krok 2)
2. Pokud domain není verified → Použijte `onboarding@resend.dev` pro testing
3. Pokud API klíč je neplatný → Vygenerujte nový v Resend

---

### Problém: Rezervace se neuloží do databáze

**Kontrola:** Zkontrolujte KV store
```bash
# V Supabase Dashboard:
# Database → Tables → kv_store_d880a0b3

# Hledejte záznamy s key začínajícím na "reservation:"
```

**Řešení:**
```bash
# Pokud tabulka neexistuje, restartujte Edge Function:
# Supabase Dashboard → Edge Functions → make-server-d880a0b3 → Redeploy
```

---

### Problém: Formulář zobrazuje chybu i když jsou pole vyplněná

**Možná příčina:** Síťová chyba nebo CORS

**Kontrola:**
1. Otevřete DevTools → Console
2. Hledejte CORS nebo network errors
3. Zkontrolujte Network tab → Status kód

**Řešení:**
```bash
# Pokud je CORS problém:
# Ověřte že server má nastaveno:
cors({
  origin: "*",
  allowMethods: ["POST"]
})
```

---

### Problém: DatePicker se nezobrazuje

**Možná příčina:** CSS transform na parent elementu

**Řešení:** Už opraveno pomocí:
```typescript
popperClassName="z-[100]"
popperPlacement="bottom-start"
```

Zkuste vyčistit cache prohlížeče (Ctrl+Shift+R).

---

## 📱 Mobile Testing Checklist

- [ ] iPhone Safari - Formulář funguje
- [ ] Android Chrome - Formulář funguje
- [ ] Formulář je čitelný na 375px šířce
- [ ] Tlačítka jsou dostatečně velká (min 44x44px)
- [ ] DatePicker se otevírá správně
- [ ] Není horizontální scroll

---

## 🎯 Performance Checklist

- [ ] Initial load < 3s
- [ ] Form submission < 2s
- [ ] Email delivery < 5s
- [ ] Toast notifications jsou okamžité
- [ ] Žádné layout shifts při otevření kalendáře

---

## 🔒 Security Checklist

- [ ] ✅ RESEND_API_KEY je pouze v Edge Functions (NIKDY ve frontend!)
- [ ] ✅ Server validuje všechna povinná pole
- [ ] ✅ Phone number je validován (9 číslic)
- [ ] ✅ Email format je validován (HTML5)
- [ ] ✅ SQL injection není možná (KV store používá safe keys)
- [ ] ✅ XSS protection (React auto-escapes)
- [ ] ✅ CORS je otevřený jen pro potřebné metody

---

## ✅ Final Production Checklist

Před spuštěním do produkce ověřte:

### Backend
- [ ] ✅ RESEND_API_KEY nastaven a platný
- [ ] ✅ RESTAURANT_EMAIL nastaven (nebo default)
- [ ] ✅ Edge Functions jsou deployed
- [ ] ✅ KV store tabulka existuje
- [ ] ✅ Email domain je verified (pro produkci)

### Frontend
- [ ] ✅ Všechny 3 jazyky (CS, EN, IT) testovány
- [ ] ✅ Mobile responsivita perfektní
- [ ] ✅ DatePicker funguje ve všech prohlížečích
- [ ] ✅ Loading states jsou viditelné
- [ ] ✅ Error handling je robustní

### Testing
- [ ] ✅ Úspěšná rezervace vytvořena
- [ ] ✅ Email doručen na `rezervace@altrodatony.cz`
- [ ] ✅ Rezervace viditelná v Admin panelu
- [ ] ✅ Všechna pole včetně `guests` jsou uložena

### Monitoring
- [ ] ✅ Email notifikace nastaveny
- [ ] ✅ Supabase alerts nakonfigurovány
- [ ] ✅ Záložní kontakt (telefon) je viditelný na webu

---

## 🎉 Launch!

Po dokončení všech kroků výše je rezervační systém **připraven k nasazení!**

**Status:** 🟢 PRODUCTION READY

**Support kontakt:**
- Email: rezervace@altrodatony.cz  
- Telefon: +420 774 672 458

---

## 📚 Dodatečné zdroje

- [Resend Documentation](https://resend.com/docs)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [React DatePicker Docs](https://reactdatepicker.com/)
- [Reservation Test Guide](/RESERVATION_TEST_GUIDE.md)

**Poslední aktualizace:** 20. prosince 2025
