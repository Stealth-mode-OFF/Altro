# 📅 Rezervační systém - Uživatelská příručka

## ✨ Vylepšení rezervačního systému

### 🎯 Nové funkce

#### 1. **Automatické formátování telefonu**
- Při zadávání se telefonní číslo **automaticky naformátuje**
- Formát: `123 456 789` (mezera po každých 3 číslicích)
- Předvolba `+420` je **zobrazena automaticky**
- Maximum 9 číslic (české telefonní číslo)

**Příklad:**
```
Píšete: 123456789
Zobrazí se: 123 456 789
```

#### 2. **Kalendář pro výběr data**
- Kliknutím na pole "Datum" se **otevře kalendář**
- Nelze vybrat datum v minulosti
- Validace zajišťuje pouze budoucí rezervace

#### 3. **Chytré validace**
- ✅ Kontrola správného formátu emailu
- ✅ Kontrola 9 číslic u telefonu
- ✅ Prevence rezervací v minulosti
- ✅ Povinná pole označena hvězdičkou *

#### 4. **Vylepšené potvrzení**
- Krásná notifikace s detaily rezervace
- Zobrazení data v českém formátu (např. "pondělí 15. prosince 2024")
- Informace o počtu hostů
- Automatické otevření emailu

---

## 📱 Jak rezervovat (pro hosty)

### Krok 1: Základní údaje
1. **Jméno a příjmení** - celé jméno hosta
2. **Email** - pro případné dotazy
3. **Telefon** - zadejte jen čísla, mezery se přidají automaticky

### Krok 2: Detaily rezervace
1. **Datum** - klikněte a vyberte z kalendáře
2. **Čas** - vyberte z dostupných časů (11:00-21:00)
3. **Počet hostů** - vyberte 1-8 osob

### Krok 3: Poznámka (nepovinné)
- Alergie
- Speciální přání (oslava narozenin, výročí)
- Preference místa (u okna, v rohu, atd.)

### Krok 4: Odeslání
1. Klikněte na zelené tlačítko **"Rezervovat stůl"**
2. Počkejte na potvrzení
3. Otevře se váš emailový klient
4. Klikněte "Odeslat" v emailu

✅ **Hotovo!** Restaurace obdrží vaši rezervaci

---

## 🎨 Design vylepšení

### Vizuální prvky:
- 📱 **Prefix +420** - viditelný u telefonního pole
- 📅 **Kalendářová ikona** - u pole datum
- 🎯 **Focus stavy** - červený outline při kliknutí
- ⏳ **Loading stav** - "Odesílám..." při odeslání
- ✨ **Animace** - smooth transitions

### UX vylepšení:
- Disabled stav tlačítka během odesílání
- Hover efekty na interaktivních prvcích
- Čitelné chybové hlášky
- Automatický reset formuláře po úspěchu

---

## 📊 Co se děje na pozadí

### 1. Uložení do localStorage
```javascript
{
  name: "Jan Novák",
  email: "jan@example.com",
  phone: "123 456 789",
  date: "2024-12-15",
  time: "19:00",
  guests: "4",
  message: "Prosím stůl u okna",
  timestamp: "2024-12-08T10:30:00.000Z"
}
```

### 2. Email pro restauraci
```
NOVÁ REZERVACE
═══════════════════════════════════

📅 Datum: pondělí 15. prosince 2024
🕐 Čas: 19:00
👥 Počet hostů: 4

KONTAKTNÍ ÚDAJE:
───────────────────────────────────
👤 Jméno: Jan Novák
📧 Email: jan@example.com
📱 Telefon: +420 123 456 789

💬 Poznámka:
Prosím stůl u okna

═══════════════════════════════════
Odesláno z webu Altro Da Tony
8. 12. 2024 10:30:00
```

---

## 🔧 Správa rezervací (pro restauraci)

### Zobrazení všech rezervací:

1. **Otevřete konzoli prohlížeče** (F12)
2. **Vložte tento příkaz:**

```javascript
const reservations = JSON.parse(localStorage.getItem('altrodatony_reservations') || '[]');
console.table(reservations);
```

### Dnešní rezervace:

```javascript
const today = new Date().toISOString().split('T')[0];
const todayReservations = JSON.parse(localStorage.getItem('altrodatony_reservations') || '[]')
  .filter(r => r.date === today);
console.table(todayReservations);
```

### Export do CSV:

```javascript
const reservations = JSON.parse(localStorage.getItem('altrodatony_reservations') || '[]');
const csv = reservations.map(r => 
  `${r.date},${r.time},${r.name},${r.phone},${r.guests},${r.email}`
).join('\n');
console.log('Datum,Čas,Jméno,Telefon,Hosté,Email\n' + csv);
```

---

## ⚠️ Známá omezení

### Současná implementace:
- ❌ **Kontrola dostupnosti stolů** - není implementována
- ❌ **Automatické potvrzovací emaily** - host nedostane email
- ❌ **SMS notifikace** - nejsou k dispozici
- ❌ **Online platby** - záloha není vyžadována
- ❌ **Kalendář restaurace** - nelze vidět obsazené termíny

### Doporučení pro upgrade:
Pro plně profesionální rezervační systém zvažte:
- **Supabase** - backend databáze
- **SendGrid/Mailgun** - automatické emaily
- **Twilio** - SMS notifikace
- **Stripe** - online platby za zálohu

---

## 🐛 Řešení problémů

### "Telefonní číslo musí mít 9 číslic"
→ Zadejte pouze čísla (např. 774672458)
→ Mezery se přidají automaticky

### "Nelze rezervovat v minulosti"
→ Zkontrolujte vybrané datum v kalendáři
→ Vyberte dnešní nebo budoucí datum

### "Email se neotevřel"
→ Zkontrolujte, že máte nastavený výchozí emailový klient
→ Nebo zkopírujte adresu: rezervace@altrodatony.cz

### "Formulář se nevyplnil"
→ Obnovte stránku (F5)
→ Zkuste jiný prohlížeč

---

## 📈 Budoucí vylepšení

### V plánu:
- [ ] Dashboard pro správu rezervací v admin panelu
- [ ] Kalendářní zobrazení obsazenosti
- [ ] Automatické potvrzovací emaily
- [ ] SMS připomenutí den před rezervací
- [ ] Online menu s možností předobjednávky
- [ ] Věrnostní program

---

## 📞 Kontakt

**Pro technické problémy:**
Email: [váš support email]

**Pro rezervace telefonicky:**
+420 774 672 458

---

**Vytvořeno s ❤️ pro snadné rezervace v Altro Da Tony** 🇮🇹
