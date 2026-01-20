# 🔧 Seznam.cz Email Deliverability - Troubleshooting Guide

## 🚨 Problém: Emaily z Resend neodcházejí/nedoručují na seznam.cz

---

## ✅ KROK 1: Ověřte DNS záznamy v Resend (KRITICKÉ!)

### Postup:
1. Otevřete: **https://resend.com/domains**
2. Klikněte na doménu **altrodatony.com**
3. Zkontrolujte, že **všechny 3 záznamy jsou ✅ VERIFIED**:
   - ✅ **SPF** - Status: VERIFIED
   - ✅ **DKIM** - Status: VERIFIED
   - ✅ **DMARC** - Status: VERIFIED

❌ **Pokud některý záznam NENÍ verified:**
- Emaily NEBUDOU doručeny na seznam.cz (a ani na jiné servery)!
- Seznam.cz má nejpřísnější kontrolu autentizace v ČR

### Jak opravit:
1. Resend vám zobrazí přesné DNS záznamy, které chybí
2. Přidejte je do Endora admin panelu (https://admin.endora.cz)
3. Počkejte 2-24 hodin na propagaci
4. V Resend klikněte na **"Refresh Verification"**

---

## ✅ KROK 2: Ověřte, že FROM adresa SKUTEČNĚ EXISTUJE

**Aktuální FROM adresa:** `rezervace@altrodatony.com`

### Problém:
Seznam.cz **okamžitě odmítá** emaily z neexistujících adres!

### Test:
1. Pošlete email **NA** `rezervace@altrodatony.com` z vašeho osobního emailu
2. Zkontrolujte, zda email dorazil

❌ **Pokud email NEDORAZIL:**
- Emailová schránka `rezervace@altrodatony.com` **neexistuje**
- Musíte ji vytvořit v Endora admin panelu!

### Jak vytvořit schránku v Endora:
1. Přihlaste se na https://admin.endora.cz
2. Sekce: **"E-mailové schránky"** nebo **"Email accounts"**
3. Klikněte **"Přidat novou schránku"**
4. Email: `rezervace@altrodatony.com`
5. Nastavte heslo
6. Uložte

### Nastavení forwardingu (DOPORUČENO):
Po vytvoření schránky nastavte **forwarding**:
```
rezervace@altrodatony.com → antoniosahulka@seznam.cz
```

**Proč?**
- Všechny odpovědi zákazníků dorazí přímo na váš seznam.cz
- Není potřeba kontrolovat další schránku

---

## ✅ KROK 3: Zkontrolujte aktuální SPF záznam

Seznam.cz vyžaduje **přesný** SPF záznam s Resend.

### Kontrola:
1. Otevřete: https://mxtoolbox.com/spf.aspx
2. Zadejte: `altrodatony.com`
3. Klikněte **"SPF Record Lookup"**

### Co by mělo být zobrazeno:
```
v=spf1 include:resend.com mx ~all
```

❌ **Pokud `include:resend.com` CHYBÍ:**
- Musíte upravit SPF záznam v Endora DNS!

### Úprava SPF v Endora:
1. Přihlaste se na https://admin.endora.cz
2. Sekce: **"DNS záznamy"** pro altrodatony.com
3. Najděte TXT záznam pro `@` (root)
4. Upravte hodnotu na:
```
v=spf1 include:resend.com mx ~all
```
5. Uložte a počkejte 1-4 hodiny na propagaci

---

## ✅ KROK 4: Otestujte odesílání přes Admin Panel

1. Jděte na: **https://altrodatony.com/admin**
2. Sekce: **"Deliverability"**
3. Do pole "Test Email" zadejte: `antoniosahulka@seznam.cz`
4. Klikněte **"Send Test Email"**

### Co zkontrolovat:
- ✅ **Status: Success** - Email byl odeslán Resend API
- ⏳ Počkejte 1-5 minut
- 📬 Zkontrolujte **Doručenou poštu** na seznam.cz
- 🗑️ Zkontrolujte **složku SPAM** na seznam.cz

### Pokud email není ANI ve SPAMu:
- Email byl **odmítnut** Seznam.cz serverem (hard bounce)
- Důvod: chybějící DNS záznamy NEBO neexistující FROM adresa

---

## ✅ KROK 5: Zkontrolujte Resend Dashboard logs

1. Otevřete: **https://resend.com/emails**
2. Najděte váš testovací email
3. Klikněte na něj pro detail

### Co hledat:
- **Status: Sent** ✅ - Email byl odeslán
- **Status: Delivered** ✅ - Email byl přijat Seznam.cz serverem
- **Status: Bounced** ❌ - Email byl odmítnut

### Pokud je status "Bounced":
- Klikněte na email pro detail chyby
- Zkopírujte chybovou hlášku
- Obvyklé důvody:
  - `550 5.7.1 SPF check failed` → Opravte SPF záznam
  - `550 5.7.1 DKIM check failed` → Ověřte DKIM v Resend
  - `550 Sender address rejected` → FROM adresa neexistuje

---

## ✅ KROK 6: Budování reputace domény

Nová doména má **špatnou reputaci** u Seznam.cz. Musíte ji budovat.

### Postup:
1. Pošlete **5-10 testovacích emailů** na antoniosahulka@seznam.cz
2. Každý email **označte jako "Není spam"** v Seznam.cz webmailu
3. **Odpovězte** na některé z emailů
4. Počkejte 24-48 hodin

**Proč to funguje?**
- Seznam.cz se "učí", že vaše doména je důvěryhodná
- Interakce (označení jako není spam, odpověď) zlepšují reputaci
- Po 2-3 dnech by emaily měly chodit přímo do Doručené pošty

---

## ✅ KROK 7: Zkontrolujte DMARC politiku

1. Otevřete: https://mxtoolbox.com/dmarc.aspx
2. Zadejte: `altrodatony.com`
3. Klikněte **"DMARC Lookup"**

### Co by mělo být zobrazeno:
```
v=DMARC1; p=none; rua=mailto:dmarc@altrodatony.com; ruf=mailto:dmarc@altrodatony.com; adkim=s; aspf=s; pct=100
```

❌ **Pokud DMARC chybí:**
- Přidejte TXT záznam v Endora DNS:

```
Host: _dmarc
Typ: TXT
Hodnota: v=DMARC1; p=none; rua=mailto:antoniosahulka@seznam.cz
```

---

## 🔍 DIAGNOSTIKA: Checklist pro kontrolu

| Krok | Co kontrolovat | Status |
|------|----------------|--------|
| 1 | DNS záznamy v Resend jsou ✅ VERIFIED | [ ] |
| 2 | Schránka `rezervace@altrodatony.com` existuje | [ ] |
| 3 | SPF obsahuje `include:resend.com` | [ ] |
| 4 | DKIM je ověřený v Resend dashboardu | [ ] |
| 5 | DMARC politika existuje | [ ] |
| 6 | Testovací email odeslán přes Admin Panel | [ ] |
| 7 | Email dorazil alespoň do SPAM složky | [ ] |
| 8 | Označeno jako "Není spam" na seznam.cz | [ ] |
| 9 | Počkáno 24-48h na zlepšení reputace | [ ] |

---

## 🚀 QUICK FIX: Pokud chcete okamžité řešení

### Změna FROM adresy na existující schránku

Pokud `rezervace@altrodatony.com` neexistuje a nechcete ji vytvářet:

#### Option 1: Použít existující schránku
Pokud máte existující schránku, např. `info@altrodatony.com`:

1. Upravte `/supabase/functions/server/email-service.tsx`
2. Řádek 13:
```tsx
EMAIL_FROM: 'Altro da Tony <info@altrodatony.com>',
```
3. Řádek 14:
```tsx
EMAIL_REPLY_TO: 'info@altrodatony.com',
```

#### Option 2: Použít osobní seznam.cz (NEDOPORUČENO pro produkci)
⚠️ Pouze pro testování!

1. Upravte `/supabase/functions/server/email-service.tsx`
2. Řádek 13:
```tsx
EMAIL_FROM: 'Altro da Tony <antoniosahulka@seznam.cz>',
```
3. Řádek 14:
```tsx
EMAIL_REPLY_TO: 'antoniosahulka@seznam.cz',
```

**Proč NEDOPORUČENO:**
- V Resend musíte ověřit seznam.cz doménu (složité!)
- Unprofesionální (používá osobní email místo firemního)

---

## 📊 Očekávané výsledky po opravě

### Po 2-4 hodinách (DNS propagace):
- ✅ Všechny DNS záznamy v Resend jsou verified
- ✅ Testovací emaily dorazí do SPAM složky na seznam.cz

### Po 24-48 hodinách (budování reputace):
- ✅ Emaily dorazí přímo do Doručené pošty
- ✅ Zákazníci budou dostávat potvrzení rezervací
- ✅ Majitel dostane notifikace na antoniosahulka@seznam.cz

---

## 💡 Nejčastější chyby

1. ❌ **"Resend ukazuje všechny verified, ale emaily nejdou"**
   - Problém: FROM adresa neexistuje
   - Řešení: Vytvořte schránku `rezervace@altrodatony.com`

2. ❌ **"Email dorazil do SPAMu"**
   - Problém: Špatná reputace nové domény
   - Řešení: Označte jako "Není spam" + počkejte 24-48h

3. ❌ **"Hard bounce / Sender rejected"**
   - Problém: SPF nebo DKIM chybí/není správně
   - Řešení: Opravte DNS + ověřte v Resend

4. ❌ **"Resend API error 401"**
   - Problém: Špatný RESEND_API_KEY
   - Řešení: Regenerujte API klíč v Resend → zkopírujte do Supabase secrets

---

## 🆘 Pokud nic nefunguje

### 1. Kontaktujte Resend Support
- 📧 Email: support@resend.com
- 🌐 Dashboard: https://resend.com/support
- Uveďte:
  - Doménu: `altrodatony.com`
  - Cílový email: `seznam.cz`
  - Chybovou hlášku z logs

### 2. Kontaktujte Endora Support (DNS problémy)
- 📧 Email: support@endora.cz
- 📞 Telefon: +420 234 262 000
- Uveďte:
  - Doménu: `altrodatony.com`
  - Požadavek: Ověření SPF/DKIM/DMARC záznamů

### 3. Dočasné řešení: Posílat z gmail.com
⚠️ Pouze do doby, než opravíte DNS!

- Vytvořte Gmail App Password
- Použijte SMTP místo Resend API
- **POZOR**: Gmail má limit 500 emailů/den

---

## ✅ Finální kontrola (když vše funguje)

Po úspěšné opravě ověřte:

1. ✅ Vytvořena rezervace přes web
2. ✅ Email "Přijali jsme žádost" dorazil zákazníkovi (seznam.cz)
3. ✅ Email "Nová žádost" dorazil majiteli (antoniosahulka@seznam.cz)
4. ✅ Potvrzení rezervace v Adminu odešle email zákazníkovi
5. ✅ Všechny emaily jsou v **Doručené poště** (ne ve SPAMu)

---

**Vytvořeno:** 3. ledna 2026  
**Status:** Aktivní troubleshooting guide pro Seznam.cz deliverability
