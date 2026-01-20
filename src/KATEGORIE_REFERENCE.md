# 📂 Reference kategorií týdenního menu

## 🎨 Všechny kategorie (4)

### 1. 🥣 Polévka (Soup / Zuppa)

**Kód**: `soup`

**Překlady:**
- 🇨🇿 Polévka / Polévky
- 🇬🇧 Soup / Soups
- 🇮🇹 Zuppa / Zuppe

**Příklad položky:**
```
Tomátová polévka s mascarpone - 75 Kč
```

---

### 2. 🧀 Předkrm (Starter / Antipasto) ⭐ NOVÉ

**Kód**: `starter`

**Překlady:**
- 🇨🇿 Předkrm / Předkrmy
- 🇬🇧 Starter / Starters
- 🇮🇹 Antipasto / Antipasti

**Příklady položek:**
```
Burrata s cherry rajčaty - 210 Kč
Sušená šunka s melounem - 210 Kč
```

---

### 3. 🍝 Hlavní jídlo (Main Course / Primo)

**Kód**: `main`

**Překlady:**
- 🇨🇿 Hlavní jídlo / Hlavní jídla
- 🇬🇧 Main Course / Main Courses
- 🇮🇹 Primo / Primi

**Příklady položek:**
```
Rigatoni s pražskou šunkou - 245 Kč
Pizza Tartufo - 420 Kč
Telecí saltimbocca - 385 Kč
```

---

### 4. 🍰 Dezert (Dessert / Dolce)

**Kód**: `dessert`

**Překlady:**
- 🇨🇿 Dezert / Dezerty
- 🇬🇧 Dessert / Desserts
- 🇮🇹 Dolce / Dolci

**Příklad položky:**
```
Carpaccio z ananasu - 165 Kč
```

---

## 📊 Přehledová tabulka

| # | Kategorie | Kód | 🇨🇿 Česky | 🇬🇧 English | 🇮🇹 Italiano |
|---|-----------|-----|-----------|-------------|--------------|
| 1 | Polévka | `soup` | Polévka<br>Polévky | Soup<br>Soups | Zuppa<br>Zuppe |
| 2 | **Předkrm** | `starter` | **Předkrm**<br>**Předkrmy** | **Starter**<br>**Starters** | **Antipasto**<br>**Antipasti** |
| 3 | Hlavní | `main` | Hlavní jídlo<br>Hlavní jídla | Main Course<br>Main Courses | Primo<br>Primi |
| 4 | Dezert | `dessert` | Dezert<br>Dezerty | Dessert<br>Desserts | Dolce<br>Dolci |

---

## 🔤 Použití v kódu

### TypeScript typ:
```typescript
type MenuCategory = 'soup' | 'starter' | 'main' | 'dessert';
```

### V admin panelu (select):
```html
<select>
  <option value="soup">Polévka</option>
  <option value="starter">Předkrm</option>
  <option value="main">Hlavní jídlo</option>
  <option value="dessert">Dezert</option>
</select>
```

### V překladech (CS):
```javascript
'daily.soup': 'Polévka',
'daily.starter': 'Předkrm',
'daily.main': 'Hlavní chod',
'daily.dessert': 'Dezert',
'daily.soups': 'Polévky',
'daily.starters': 'Předkrmy',
'daily.mains': 'Hlavní jídla',
'daily.desserts': 'Dezerty',
```

---

## 🎯 Pořadí zobrazení

Položky se na webu zobrazují v tomto pořadí:

```
1. POLÉVKY       (soup)
2. PŘEDKRMY      (starter)    ← NOVÉ
3. HLAVNÍ JÍDLA  (main)
4. DEZERTY       (dessert)
```

Toto pořadí je **pevně dané** a nelze jej změnit.

---

## 💡 Tipy pro výběr kategorie

### Polévka (soup)
- Jakákoli polévka
- Pouze tekuté pokrmy

### Předkrm (starter)
- Studené předkrmy
- Teplé předkrmy
- Antipasti
- Salátové předkrmy
- Menší porce před hlavním chodem

### Hlavní jídlo (main)
- Pasta
- Pizza
- Maso
- Ryby
- Vegetariánská hlavní jídla
- Velké porce

### Dezert (dessert)
- Sladké pokrmy
- Zmrzlina
- Ovoce
- Tiramisu, panna cotta atd.

---

## 🔍 Detaily změn

### Co je nové (29.12.2025):

**Přidána kategorie "Předkrm":**
- ✅ Nový typ: `'starter'`
- ✅ Překlady do 3 jazyků
- ✅ Přidáno do admin panelu
- ✅ Přidáno do veřejného zobrazení
- ✅ Správné řazení mezi polévkou a hlavním jídlem

**Soubory změněny:**
1. `/components/AdminDashboard.tsx`
2. `/components/DailyMenu.tsx`
3. `/contexts/LanguageContext.tsx`

---

## 📝 Poznámky

### Singulár vs. Plurál

**Singulár** (1 položka):
- Používá se v popisech
- Např. "Přidat předkrm"

**Plurál** (více položek):
- Používá se v nadpisech kategorií
- Např. nadpis sekce "Předkrmy"

### Kdy použít kterou kategorii?

**Unsure mezi starter a main?**
- Malá porce → starter
- Velká porce → main
- Chléb nebo toast → starter
- Pasta jako hlavní → main
- Pasta jako předkrm → starter

**Unsure mezi soup a starter?**
- Tekuté → soup
- Pevné/polotekuté → starter
- Gaspacho → soup (i když studené)

---

## ✅ Kontrolní seznam

Při přidávání položky:
- [ ] Vybral jsem správnou kategorii
- [ ] Kategorie odpovídá typu pokrmu
- [ ] Použil jsem správný kód kategorie
- [ ] Zkontroloval jsem zobrazení na webu

---

## 🌐 Lokalizace

### Automatické překlady
Systém automaticky vybere správný překlad podle:
- Vybraného jazyka na webu
- Uživatelského nastavení

### Všechny překlady jsou:
- ✅ Gramaticky správné
- ✅ Kulinarsky přesné
- ✅ Konzistentní napříč systémem

---

## 📞 Podpora

Pokud si nejste jisti, kterou kategorii použít:
1. Podívejte se na příklady výše
2. Konzultujte s kuchařem
3. V nejhorším použijte "main" (nejčastější)

---

**Aktualizováno**: 29. prosince 2025  
**Systém**: Altro da Tony v2.0  
**Kategorie celkem**: 4  
**Nové kategorie**: 1 (starter)
