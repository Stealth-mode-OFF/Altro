# 📧 Email notifikace pro rezervace - Setup Guide

## 🎯 Co jsme implementovali

Při každé **nové rezervaci** se automaticky odešle email na **rezervace@altrodatony.com** s těmito informacemi:
- ✅ Datum a čas rezervace
- ✅ Počet hostů
- ✅ Jméno, email a telefon zákazníka
- ✅ Poznámka (pokud byla vyplněna)
- ✅ ID rezervace a timestamp

---

## 🔧 Nastavení Resend API (2 minuty)

### Krok 1: Vytvoření účtu na Resend

1. Jděte na **https://resend.com**
2. Klikněte na **"Sign Up"** (zdarma - 100 emailů/den)
3. Zaregistrujte se pomocí GitHub nebo emailu

### Krok 2: Získání API klíče

1. Po přihlášení jděte do **"API Keys"**
2. Klikněte **"Create API Key"**
3. Pojmenujte klíč: `Altro Da Tony Production`
4. **Zkopírujte klíč** (začíná `re_...`)

### Krok 3: Přidání API klíče do Supabase

1. Otevřete Figma Make
2. Najděte modal pro **RESEND_API_KEY** (už jsem ho vytvořil)
3. Vložte zkopírovaný API klíč
4. Klikněte **"Save"**

---

## 📨 Ověření domény (DŮLEŽITÉ!)

Aby emaily fungovaly správně, musíte **ověřit doménu altrodatony.com** v Resend:

### Krok 1: Přidání domény v Resend

1. V Resend dashboardu jděte na **"Domains"**
2. Klikněte **"Add Domain"**
3. Zadejte: `altrodatony.com`
4. Klikněte **"Add"**

### Krok 2: DNS záznamy (do Endora)

Resend vám ukáže **3 DNS záznamy**, které musíte přidat do Endora.cz:

#### **SPF záznam (TXT):**
```
Host:  @
Type:  TXT
Value: v=spf1 include:_spf.resend.com ~all
TTL:   3600
```

#### **DKIM záznam (TXT):**
```
Host:  resend._domainkey
Type:  TXT
Value: [hodnota z Resend dashboardu]
TTL:   3600
```

#### **DMARC záznam (TXT):**
```
Host:  _dmarc
Type:  TXT
Value: v=DMARC1; p=none; rua=mailto:rezervace@altrodatony.com
TTL:   3600
```

### Krok 3: Ověření v Resend

1. Počkejte **5-10 minut** na DNS propagaci
2. V Resend dashboardu klikněte **"Verify"**
3. Status by měl být: ✅ **"Verified"**

---

## 🧪 Testování

### Test 1: Zkušební rezervace

1. Jděte na **www.altrodatony.com**
2. Vyplňte rezervační formulář
3. Odešlete rezervaci
4. **Zkontrolujte email** na rezervace@altrodatony.com

### Test 2: Kontrola admin panelu

1. Přihlaste se do admin panelu
2. Otevřete tab **"Rezervace"**
3. Měla by se tam zobrazit nová rezervace

### Test 3: Kontrola Resend logu

1. V Resend dashboardu jděte na **"Logs"**
2. Měl by se tam zobrazit odeslaný email
3. Zkontrolujte status: ✅ **"Delivered"**

---

## 📋 Formát emailu

Každý email obsahuje:

```
Subject: Nová rezervace: Jan Novák - 2024-12-15 19:00

----------------------------------------------
Nová rezervace - Altro Da Tony
----------------------------------------------

Datum: neděle 15. prosince 2024
Čas: 19:00
Počet hostů: 4

----------------------------------------------
Jméno: Jan Novák
Email: jan.novak@example.com
Telefon: +420602123456
Poznámka: Alergický na ořechy

----------------------------------------------
ID rezervace: 1702659234567-abc123xyz
Vytvořeno: 15. 12. 2024 14:30:45
```

---

## 🚨 Troubleshooting

### Problem: "Email se neposlal"

**Příčina 1:** API klíč není nastavený
- ✅ Zkontrolujte environment variable `RESEND_API_KEY`
- ✅ Restartujte Supabase Edge Function

**Příčina 2:** Doména není ověřená
- ✅ Zkontrolujte DNS záznamy v Endora
- ✅ Počkejte 24h na propagaci
- ✅ Ověřte doménu v Resend

**Příčina 3:** Email je ve SPAMu
- ✅ Zkontrolujte spam složku
- ✅ Nastavte filtr: rezervace@altrodatony.com → důležité

### Problem: "Email přišel, ale vypadá divně"

**Řešení:**
- Email používá HTML formát
- Některé email klienty (Gmail, Outlook) ho správně zobrazí
- V telefonu může vypadat jinak než na PC

### Problem: "Limity překročeny"

**Free tier Resend:**
- 100 emailů/den
- 3,000 emailů/měsíc

**Pokud potřebujete víc:**
- Přejděte na **Resend Pro** ($20/měsíc = 50,000 emailů)
- Nebo použijte jiný provider (SendGrid, Mailgun)

---

## 🔄 Alternativa: SendGrid

Pokud nechcete používat Resend, můžete použít **SendGrid**:

### SendGrid Setup:

1. Zaregistrujte se na https://sendgrid.com (zdarma - 100 emailů/den)
2. Vytvořte API klíč
3. Přidejte jako environment variable: `SENDGRID_API_KEY`
4. Upravte kód v `/supabase/functions/server/index.tsx`:

```typescript
// Změnit z Resend na SendGrid API
const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${SENDGRID_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    personalizations: [{
      to: [{ email: 'rezervace@altrodatony.com' }]
    }],
    from: { email: 'tony@altrodatony.com' },
    subject: `Nová rezervace: ${reservation.name}`,
    content: [{ type: 'text/html', value: emailBody }]
  }),
});
```

---

## 📊 Monitoring

### Doporučené nastavení:

**1. Email pravidla (Gmail/Outlook):**
```
Od: tony@altrodatony.com
→ Označit jako důležité
```

**2. Resend Webhook (volitelné):**
- Nastavte webhook pro tracking doručení
- URL: `https://your-domain.com/webhook/resend`
- Events: `email.sent`, `email.delivered`, `email.bounced`

**3. Denní report (volitelné):**
- Každý den v 9:00 odeslat souhrn rezervací
- Implementovat v backend serveru s cron jobem

---

## ✅ Checklist před spuštěním

Před spuštěním do production zkontrolujte:

- [ ] Resend účet vytvořen
- [ ] API klíč vložen do Supabase
- [ ] Doména ověřena v Resend (SPF, DKIM, DMARC)
- [ ] DNS záznamy propagovány (24h)
- [ ] Test email odeslán a doručen
- [ ] Spam složka zkontrolována
- [ ] Email pravidla nastavena
- [ ] Admin panel zobrazuje rezervace
- [ ] Rezervační formulář funguje

---

## 🎯 Co se děje při rezervaci

### Frontend → Backend → Email

```
1. Uživatel vyplní formulář
   ↓
2. Frontend odešle POST /reservations
   ↓
3. Backend uloží do Supabase KV
   ↓
4. Backend zavolá sendReservationEmail()
   ↓
5. Email odeslán přes Resend API
   ↓
6. Email doručen na rezervace@altrodatony.com
   ↓
7. Šéfkuchař vidí notifikaci 📧
```

### Non-blocking architektura

Email se posílá **asynchronně** (non-blocking):
- ✅ Rezervace se uloží **okamžitě**
- ✅ Email se pošle **na pozadí**
- ✅ Pokud email selže, **rezervace je stále uložená**
- ✅ Chyba emailu se pouze **loguje do konzole**

---

## 📞 Podpora

**Resend:**
- 📧 support@resend.com
- 📚 https://resend.com/docs

**SendGrid:**
- 📧 support@sendgrid.com
- 📚 https://docs.sendgrid.com

**Endora (DNS):**
- 📧 support@endora.cz
- 📞 +420 234 262 000

---

## 🚀 Hotovo!

Email notifikace jsou nyní **plně funkční**! 

Při každé rezervaci obdržíte email na:
**📧 rezervace@altrodatony.com**

---

**Poslední update:** 9. prosince 2024  
**Autor:** AI Assistant pro Altro Da Tony