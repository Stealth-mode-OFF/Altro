# 📚 Index dokumentace - Aktualizace týdenního menu

## 🎯 Začněte zde

### Pro rychlé přidání položek:
👉 **[PRIDANI_POLOZEK_MENU.md](./PRIDANI_POLOZEK_MENU.md)** - Krok za krokem s copy-paste údaji

### Pro technický přehled:
👉 **[MENU_UPDATE_SUMMARY.md](./MENU_UPDATE_SUMMARY.md)** - Kompletní souhrn všech změn

---

## 📄 Všechny dokumenty

### 1. Návody (pro uživatele)
| Soubor | Popis | Pro koho |
|--------|-------|----------|
| **PRIDANI_POLOZEK_MENU.md** | Detailní průvodce s daty ke zkopírování | ⭐ **Začněte zde** |
| MENU_UPDATE_SUMMARY.md | Celkový přehled změn a možností | Manažeři |
| WEEKLY_MENU_UPDATE.md | Technická dokumentace změn | Pokročilí |

### 2. Data (pro import)
| Soubor | Formát | Použití |
|--------|--------|---------|
| **weekly-menu-data.json** | JSON | API, import, backup |
| weekly-menu-items.csv | CSV | Excel, Google Sheets |
| utils/addWeeklyMenuItems.ts | TypeScript | Pro vývojáře |

### 3. Technické soubory (změněné)
| Soubor | Co bylo změněno |
|--------|-----------------|
| components/AdminDashboard.tsx | ✅ Přidána kategorie "starter" |
| components/DailyMenu.tsx | ✅ Přidána kategorie "starter" |
| contexts/LanguageContext.tsx | ✅ Přidány překlady (CS, EN, IT) |

---

## 🎯 Rychlý start

### Potřebuji přidat položky do menu:
1. Otevřete → **[PRIDANI_POLOZEK_MENU.md](./PRIDANI_POLOZEK_MENU.md)**
2. Postupujte podle návodu
3. Hotovo za 5-10 minut!

### Chci technický přehled:
1. Otevřete → **[MENU_UPDATE_SUMMARY.md](./MENU_UPDATE_SUMMARY.md)**
2. Přečtěte si sekci "Co bylo provedeno"
3. Případně prozkoumejte změněné soubory

### Potřebuji data v jiném formátu:
- **JSON**: `weekly-menu-data.json`
- **CSV**: `weekly-menu-items.csv`
- **TypeScript**: `utils/addWeeklyMenuItems.ts`

---

## 📋 Připravené položky

**Celkem: 7 položek**

### Kategorie:
- 🥣 **1× Polévka** (75 Kč)
- 🍽️ **2× Předkrm** (210 Kč každý)
- 🍝 **3× Hlavní jídlo** (245-420 Kč)
- 🍰 **1× Dezert** (165 Kč)

### Seznam:
1. Tomátová polévka s mascarpone - 75 Kč
2. Burrata s cherry rajčaty, bazalkou a balsamicem - 210 Kč
3. Sušená šunka s cantalupe melounem - 210 Kč
4. Rigatoni s pražskou šunkou, rukolou - 245 Kč
5. Pizza Tartufo - 420 Kč
6. Telecí saltimbocca s grenaille a hlívou - 385 Kč
7. Carpaccio z ananasu s citronellem a červeným pepřem - 165 Kč

---

## 🔧 Systémové změny

### Nová kategorie "Předkrm"

**TypeScript typ:**
```typescript
category: 'soup' | 'starter' | 'main' | 'dessert'
```

**Překlady:**
- 🇨🇿 Předkrm / Předkrmy
- 🇬🇧 Starter / Starters
- 🇮🇹 Antipasto / Antipasti

**Zobrazení:**
- Admin panel: Dropdown s 4 možnostmi
- Veřejný web: Automatické řazení podle kategorií

---

## ✅ Status

- ✅ Systém rozšířen o kategorii "Předkrm"
- ✅ Všechny překlady přidány (CS, EN, IT)
- ✅ Admin rozhraní aktualizováno
- ✅ Veřejné zobrazení aktualizováno
- ✅ Data připravena k importu
- ✅ Dokumentace kompletní

**Systém je připraven k použití!** 🎉

---

## 💡 Nejčastější otázky

**Q: Musím přidat všech 7 položek najednou?**  
A: Ne, můžete přidat jen některé nebo je přidat postupně.

**Q: Mohu změnit ceny?**  
A: Ano, při přidávání zadejte vlastní ceny.

**Q: Mohu přidat vlastní položky?**  
A: Ano, systém podporuje libovolné položky ve 4 kategoriích.

**Q: Kde se položky zobrazí?**  
A: Automaticky na hlavní stránce v sekci "Týdenní menu".

**Q: Jak smažu celé menu?**  
A: Smažte všechny položky v Admin Panelu.

**Q: Jak změním menu na příští týden?**  
A: Smažte staré položky a přidejte nové.

---

## 📞 Podpora

Pokud potřebujete pomoc:
1. Přečtěte si tento index
2. Otevřete příslušný dokument
3. Postupujte podle návodu
4. Zkontrolujte browser konzoli (F12) při problémech

---

**Vytvořeno**: 29. prosince 2025  
**Verze systému**: Altro da Tony Reservations v2.0  
**Status**: ✅ Produkční
