# 🍽️ Týdenní menu - Aktualizace systému

**Datum**: 29. prosince 2025  
**Verze**: 2.0  
**Status**: ✅ **PŘIPRAVENO K POUŽITÍ**

---

## 🎯 Co je nového

### ✨ Nová kategorie "Předkrm"

Systém týdenního menu byl rozšířen o kategorii **Předkrm** (Starter / Antipasto).

**Před:**
```
Polévka → Hlavní jídlo → Dezert
```

**Po:**
```
Polévka → Předkrm → Hlavní jídlo → Dezert
```

### 📋 Připraveno 7 nových položek

Všechny položky jsou připravené k přidání do menu s překlady do angličtiny a italštiny.

---

## 🚀 Jak začít (3 kroky)

### Krok 1: Otevřete Admin Panel
```
URL: /admin
Heslo: altrodatony2024
```

### Krok 2: Přejděte na "Týdenní menu"
Klikněte na záložku **"Týdenní menu"** v admin panelu.

### Krok 3: Přidejte položky
Otevřete soubor **`PRIDANI_POLOZEK_MENU.md`** a postupujte podle návodu.

**Čas potřebný**: 5-10 minut  
**Obtížnost**: ⭐ Snadné

---

## 📚 Dokumentace

### 🎯 Začínáme (Pro všechny)

| Dokument | Popis | Doporučení |
|----------|-------|------------|
| **PRIDANI_POLOZEK_MENU.md** | Krok za krokem návod | ⭐ **ZAČNĚTE TADY** |
| **QUICK_REFERENCE_MENU.md** | Rychlá reference | Pro rychlý přehled |
| **MENU_DOCS_INDEX.md** | Index všech dokumentů | Přehled všeho |

### 📊 Pokročilé (Pro technické uživatele)

| Dokument | Popis | Použití |
|----------|-------|---------|
| MENU_UPDATE_SUMMARY.md | Technický přehled | Změny v systému |
| WEEKLY_MENU_UPDATE.md | Detailní dokumentace | Pro vývojáře |
| CONSOLE_IMPORT_SCRIPT.js | Console script | Pro import dat |

### 💾 Data (Pro export/import)

| Soubor | Formát | Použití |
|--------|--------|---------|
| **weekly-menu-data.json** | JSON | API, backup |
| weekly-menu-items.csv | CSV | Excel, Sheets |
| utils/addWeeklyMenuItems.ts | TypeScript | Vývoj |

---

## 📋 Seznam položek k přidání

### 🥣 1× Polévka
- Tomátová polévka s mascarpone - **75 Kč**

### 🧀 2× Předkrm
- Burrata s cherry rajčaty, bazalkou a balsamicem - **210 Kč**
- Sušená šunka s cantalupe melounem - **210 Kč**

### 🍝 3× Hlavní jídlo
- Rigatoni s pražskou šunkou, rukolou - **245 Kč**
- Pizza Tartufo - **420 Kč**
- Telecí saltimbocca s grenaille a hlívou - **385 Kč**

### 🍰 1× Dezert
- Carpaccio z ananasu s citronellem a červeným pepřem - **165 Kč**

**Celkem: 7 položek**

---

## 🎨 Design & Zobrazení

### Na webu se zobrazí:
- ✅ Aktuální datum
- ✅ Čas podávání (11:00 - 15:00)
- ✅ Položky podle kategorií
- ✅ Krásné animace
- ✅ Responzivní design
- ✅ Vícejazyčná podpora

### Kategorie v admin panelu:
```
[Polévka]         soup
[Předkrm]         starter    ← NOVÉ
[Hlavní jídlo]    main
[Dezert]          dessert
```

---

## 🌍 Vícejazyčná podpora

Všechny položky jsou připravené ve 3 jazycích:

| Kategorie | 🇨🇿 Čeština | 🇬🇧 English | 🇮🇹 Italiano |
|-----------|-------------|-------------|--------------|
| Polévka | Polévka | Soup | Zuppa |
| **Předkrm** | **Předkrm** | **Starter** | **Antipasto** |
| Hlavní | Hlavní jídlo | Main Course | Primo |
| Dezert | Dezert | Dessert | Dolce |

---

## ✅ Kontrolní seznam

### Před přidáním položek:
- [ ] Systém je aktualizovaný
- [ ] Máte přístup do Admin Panelu
- [ ] Máte otevřený soubor PRIDANI_POLOZEK_MENU.md

### Během přidávání:
- [ ] Přidávám položky jednu po druhé
- [ ] Kopíruji texty přesně (včetně diakritiky)
- [ ] Vybírám správnou kategorii
- [ ] Zadávám správnou cenu

### Po přidání položek:
- [ ] Všech 7 položek je v seznamu
- [ ] Zobrazují se na webu
- [ ] Funguje přepínání jazyků
- [ ] Zobrazení je OK na mobilu

---

## 🔧 Technické informace

### Změněné soubory (3):
```
✅ components/AdminDashboard.tsx
✅ components/DailyMenu.tsx
✅ contexts/LanguageContext.tsx
```

### Nové soubory (8):
```
✅ PRIDANI_POLOZEK_MENU.md
✅ MENU_UPDATE_SUMMARY.md
✅ WEEKLY_MENU_UPDATE.md
✅ MENU_DOCS_INDEX.md
✅ QUICK_REFERENCE_MENU.md
✅ weekly-menu-data.json
✅ weekly-menu-items.csv
✅ utils/addWeeklyMenuItems.ts
✅ CONSOLE_IMPORT_SCRIPT.js
✅ README_MENU_UPDATE.md (tento soubor)
```

### TypeScript typ:
```typescript
interface DailyMenuItem {
  id: string;
  name_cs: string;
  name_en: string;
  name_it: string;
  description_cs: string;
  description_en: string;
  description_it: string;
  price: string;
  category: 'soup' | 'starter' | 'main' | 'dessert';
}
```

---

## 💡 Tipy & Triky

### ✅ Doporučené postupy:
- Přidávejte položky v pořadí (polévka → předkrm → hlavní → dezert)
- Zkontrolujte pravopis a diakritiku
- Testujte na mobilu
- Zkuste přepnout jazyk

### ⚠️ Co se vyhnout:
- Nepřeskakujte povinná pole (název, cena, kategorie)
- Nekopírujte čárky z CSV do názvu
- Nezapomeňte na správnou kategorii

### 🚀 Pro rychlejší práci:
- Mějte otevřené 2 okna (admin + návod)
- Použijte Ctrl+C / Ctrl+V pro kopírování
- Zkontrolujte každou položku před uložením

---

## 🆘 Řešení problémů

### Položka se nepřidala
1. Obnovte stránku (F5)
2. Zkontrolujte vyplněná pole
3. Zkuste znovu

### Menu se nezobrazuje na webu
1. Zkontrolujte, že máte alespoň 1 položku
2. Obnovte hlavní stránku
3. Zkontrolujte browser konzoli (F12)

### Chyba při ukládání
1. Zkontrolujte připojení k internetu
2. Odhlaste se a přihlaste znovu
3. Zkontrolujte konzoli pro error zprávy

### Položky mají špatné pořadí
- Systém automaticky řadí podle kategorie:
  1. Polévky
  2. Předkrmy
  3. Hlavní jídla
  4. Dezerty

---

## 📞 Kontakt & Podpora

### Dokumentace:
- Návody: `/PRIDANI_POLOZEK_MENU.md`
- Index: `/MENU_DOCS_INDEX.md`
- Reference: `/QUICK_REFERENCE_MENU.md`

### Browser Console (F12):
Pro diagnostiku problémů otevřete konzoli a zkontrolujte chybové zprávy.

### Admin Panel:
```
URL: /admin
Heslo: altrodatony2024
```

---

## 🎉 Závěr

Systém týdenního menu je **připraven k použití**!

### Co máte k dispozici:
- ✅ Rozšířený systém s kategorií "Předkrm"
- ✅ 7 připravených položek s překlady
- ✅ Kompletní dokumentaci
- ✅ Data ve 3 formátech (JSON, CSV, TS)
- ✅ Krok za krokem návody

### Další kroky:
1. Otevřete **PRIDANI_POLOZEK_MENU.md**
2. Postupujte podle návodu
3. Přidejte všech 7 položek
4. Zkontrolujte výsledek na webu
5. Hotovo! 🎊

---

**Status**: ✅ Produkční  
**Server**: ✅ Běží  
**API**: ✅ Funkční  
**Frontend**: ✅ Aktualizován  
**Dokumentace**: ✅ Kompletní

**Vytvořeno**: 29. prosince 2025  
**Pro**: Altro da Tony Restaurant  
**Systém**: Reservations v2.0

---

## 🌟 Enjoy!

Nyní můžete snadno spravovat týdenní menu s plnou podporou vícejazyčnosti a novou kategorií předkrmů!

**Bon Appétit! 🍽️**
