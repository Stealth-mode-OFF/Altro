# 🚀 Quick Start Guide - Altro Da Tony

## ⚡ Rychlý přehled všech funkcí

---

## 🔐 Admin Panel

### Přístup:
1. Klikněte na 🔒 tlačítko v pravém dolním rohu
2. Zadejte heslo: `altrodatony2024`
3. Přihlášení úspěšné ✅

### Co můžete upravovat:

#### 📅 Denní menu
```
Admin Panel → Záložka "Denní menu"
```
- ✅ Přidat polévku, předkrm, hlavní chod, dezert
- ✅ Nastavit cenu (např. "120 Kč")
- ✅ Přidat popis jídla
- ✅ Smazat položky
- ✅ **Změny se zobrazí OKAMŽITĚ na webu!**

#### 🍕 Hlavní menu
```
Admin Panel → Záložka "Hlavní menu"
```
- ✅ Přidat pizzu, pastu, antipasti, dolci
- ✅ Označit jako "Signature" nebo "Spicy"
- ✅ Upravit ceny a popisy
- ✅ **Real-time synchronizace!**

---

## 🌟 Google Recenze

### Kde najdete:
```
Web → Scrollujte na sekci "Co říkají naši hosté"
```

### Dvě tlačítka:
1. **"Zobrazit všechny recenze"** - Otevře Google Maps s recenzemi
2. **"★ Napište recenzi"** - Formulář pro napsání recenze

### Link pro hosty po návštěvě:
```
https://search.google.com/local/writereview?placeid=ChIJYbugXd6VC0cRJsXXDFI7NYE
```
💡 Můžete poslat SMS nebo email hostům!

---

## 📅 Rezervační systém

### Funkce:
- ✅ Kalendář pro výběr data
- ✅ Dropdown s časovými sloty
- ✅ Výběr počtu hostů (1-20+)
- ✅ Automatické formátování telefonu
- ✅ Email notifikace
- ✅ Uložení do localStorage

### Zobrazení rezervací:
```javascript
// V konzoli prohlížeče (F12):
console.table(JSON.parse(localStorage.getItem('altrodatony_reservations') || '[]'));
```

### Export rezervací:
```javascript
// Zkopíruje všechny rezervace do schránky:
copy(localStorage.getItem('altrodatony_reservations'));
```

---

## 🌍 Jazyky

### Přepínač v pravém horním rohu:
- 🇨🇿 **CS** - Čeština (výchozí)
- 🇬🇧 **EN** - Angličtina
- 🇮🇹 **IT** - Italština

### Kompletně přeloženo:
- ✅ Veškerý text na webu
- ✅ Formuláře
- ✅ Tlačítka
- ✅ Toast notifikace

---

## 📱 Kontaktní informace

### Na webu:
```
Telefon: +420 123 456 789
Email: info@altrodatony.cz
Adresa: Korunní 48, 120 00 Praha 2
```

### Kde upravit:
Soubor: `/contexts/LanguageContext.tsx`
```typescript
'contact.phone': '+420 123 456 789'
'contact.email': 'info@altrodatony.cz'
```

---

## 🎨 Design systém

### Hlavní barvy:
```css
Terakotová červená: #C84A47
Tmavší červená: #B43D3A
Pozadí: #FDFCFB
```

### Fonty:
```css
Nadpisy: 'Cormorant Garamond' (serif)
Tělo: system font stack (sans-serif)
```

---

## 🔧 Technické informace

### localStorage Klíče:
```javascript
'altrodatony_daily_menu'      // Denní menu
'altrodatony_regular_menu'    // Hlavní menu
'altrodatony_reservations'    // Rezervace
```

### Vymazat všechna data:
```javascript
localStorage.clear();
location.reload();
```

### Zobrazit konkrétní data:
```javascript
// Denní menu
JSON.parse(localStorage.getItem('altrodatony_daily_menu'))

// Hlavní menu
JSON.parse(localStorage.getItem('altrodatony_regular_menu'))

// Rezervace
JSON.parse(localStorage.getItem('altrodatony_reservations'))
```

---

## 🧪 Testování funkcí

### Test 1: Denní menu
```
1. Admin Panel (🔒) → heslo: altrodatony2024
2. Záložka "Denní menu"
3. Přidat položku → Vyplnit → Uložit
4. ✅ Okamžitě se zobrazí na webu!
```

### Test 2: Rezervace
```
1. Scrollujte na sekci "Rezervujte stůl"
2. Vyplňte formulář
3. Klikněte "Potvrdit rezervaci"
4. ✅ Toast notifikace "Rezervace byla odeslána!"
```

### Test 3: Google recenze
```
1. Scrollujte na sekci recenzí
2. Klikněte "★ Napište recenzi"
3. ✅ Otevře se Google formulář
```

### Test 4: Jazykový přepínač
```
1. Klikněte CS|EN|IT v pravém horním rohu
2. ✅ Celý web se přeloží okamžitě
```

---

## 📊 Struktura webu

```
┌─────────────────────────────────────┐
│ 1. Header (navigace + jazyk)       │
├─────────────────────────────────────┤
│ 2. Hero (úvodní sekce + CTA)       │
├─────────────────────────────────────┤
│ 3. Intro (o restauraci)            │
├─────────────────────────────────────┤
│ 4. FeaturedDish (hlavní jídlo)     │
├─────────────────────────────────────┤
│ 5. ChefStory (příběh šéfkuchaře)   │
├─────────────────────────────────────┤
│ 6. DailyMenu (denní menu) ⭐       │
├─────────────────────────────────────┤
│ 7. MenuShowcase (hlavní menu) 🍕   │
├─────────────────────────────────────┤
│ 8. Gallery (fotogalerie)           │
├─────────────────────────────────────┤
│ 9. Reviews (Google recenze) ⭐     │
├─────────────────────────────────────┤
│ 10. Reservation (rezervace) 📅     │
├─────────────────────────────────────┤
│ 11. Footer (kontakt + info)        │
└─────────────────────────────────────┘
```

⭐ = Nově přidáno s real-time sync

---

## 🎯 Hlavní CTA tlačítka

### Na webu:
1. **"Rezervovat stůl"** (Hero sekce) - hlavní CTA
2. **"Zavolat"** (Hero sekce) - alternativa
3. **"Prohlédnout menu"** (Intro sekce)
4. **"★ Napište recenzi"** (Reviews sekce)
5. **"Rezervovat stůl"** (Reviews social proof)
6. **"Potvrdit rezervaci"** (Rezervační formulář)

### Všechna CTA vedou k:
- Rezervačnímu formuláři (scroll)
- Telefonnímu číslu (tel: link)
- Google recenzi (external link)

---

## 💾 Backup dat

### Export všech dat:
```javascript
// Spusťte v konzoli (F12):
const backup = {
  dailyMenu: localStorage.getItem('altrodatony_daily_menu'),
  regularMenu: localStorage.getItem('altrodatony_regular_menu'),
  reservations: localStorage.getItem('altrodatony_reservations'),
  date: new Date().toISOString()
};
console.log(JSON.stringify(backup, null, 2));
// Zkopírujte výstup a uložte jako backup.json
```

### Import dat:
```javascript
// Načtěte backup.json a spusťte:
const backup = {/* paste backup here */};
localStorage.setItem('altrodatony_daily_menu', backup.dailyMenu);
localStorage.setItem('altrodatony_regular_menu', backup.regularMenu);
localStorage.setItem('altrodatony_reservations', backup.reservations);
location.reload();
```

---

## 🐛 Troubleshooting

### Denní menu se nezobrazuje?
```
1. Zkontrolujte localStorage:
   localStorage.getItem('altrodatony_daily_menu')
2. Přidejte testovací položku v admin panelu
3. Refresh stránky (Ctrl+F5)
```

### Admin panel nelze otevřít?
```
1. Klikněte na 🔒 v pravém dolním rohu
2. Heslo: altrodatony2024
3. Pokud nefunguje, vyčistěte cache
```

### Rezervace se neukládají?
```
1. Otevřete konzoli (F12)
2. Hledejte chyby (červené texty)
3. Zkontrolujte localStorage:
   localStorage.getItem('altrodatony_reservations')
```

### Google recenze link nefunguje?
```
1. Zkuste otevřít v novém inkognito okně
2. Ověřte, že jste přihlášeni do Google
3. Alternativní link: https://g.page/altrodatony/review
```

---

## 📚 Dokumentace

### Kompletní návody:
- 📖 `/REAL_TIME_SYNC_GUIDE.md` - Real-time synchronizace
- 📖 `/GOOGLE_REVIEWS_INTEGRATION.md` - Google recenze
- 📖 `/RESERVATION_GUIDE.md` - Rezervační systém (pokud existuje)
- 📖 `/ADMIN_GUIDE.md` - Admin panel (pokud existuje)

### Quick Links:
```
Admin Panel heslo: altrodatony2024
Google Reviews Write: https://search.google.com/local/writereview?placeid=ChIJYbugXd6VC0cRJsXXDFI7NYE
Place ID: ChIJYbugXd6VC0cRJsXXDFI7NYE
```

---

## 📞 Klíčové kontakty (pro web)

```
📍 Korunní 48, 120 00 Praha 2 - Vinohrady
📞 +420 123 456 789
📧 info@altrodatony.cz
🕐 Po-Ne: 11:00 - 23:00
```

---

## ✅ Checklist před spuštěním

Před nasazením webu zkontrolujte:

- [ ] Správné telefonní číslo
- [ ] Správný email
- [ ] Ověřené Google Place ID
- [ ] Testovací rezervace funguje
- [ ] Admin panel je zabezpečený
- [ ] Denní menu je prázdné (nebo připravené)
- [ ] Hlavní menu je naplněné
- [ ] Všechny odkazy fungují
- [ ] Web je responsive (mobile/tablet/desktop)
- [ ] Překlady jsou správné
- [ ] Fotky jsou načtené

---

**Status: ✅ VŠE PŘIPRAVENO K POUŽITÍ!**

**Poslední update: Prosinec 8, 2024**

**Připraveno pro:** Altro Da Tony 🇮🇹🍕✨
