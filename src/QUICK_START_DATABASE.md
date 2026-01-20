# 🚀 Rychlý start - Databázový systém

## Pro šéfkuchaře / Administrátora

### 1️⃣ Přihlášení do admin panelu
1. Otevřete `/admin.tsx` v prohlížeči
2. Zadejte heslo: **`altrodatony2024`**
3. Klikněte na "Přihlásit se"

### 2️⃣ Přidání denního menu
1. V admin panelu klikněte na tab **"Denní menu"**
2. Vyplňte formulář:
   - **Název jídla:** např. "Kuřecí parmigiana"
   - **Popis:** krátký popis (volitelné)
   - **Cena:** např. "165 Kč"
   - **Kategorie:** Polévka / Hlavní jídlo / Dezert
3. Klikněte **"Přidat položku"**
4. Položka se okamžitě zobrazí na hlavní stránce webu v sekci "Denní menu"

### 3️⃣ Přidání položky do hlavního menu
1. V admin panelu klikněte na tab **"Hlavní menu"**
2. Vyplňte formulář:
   - **Název jídla:** např. "Spaghetti Carbonara"
   - **Popis:** např. "Spaghetti s pancettou, vejcem a parmazánem"
   - **Cena:** např. "220 Kč"
   - **Kategorie:** Předkrmy / Primi Piatti / Hlavní chody / Dezerty
   - **URL obrázku:** (volitelné) např. "https://..."
3. Klikněte **"Přidat položku"**
4. Položka se okamžitě zobrazí na hlavní stránce webu v sekci "Menu"

### 4️⃣ Správa rezervací
1. V admin panelu klikněte na tab **"Rezervace"**
2. Zobrazí se všechny příchozí rezervace
3. **Změna statusu:**
   - Klikněte na dropdown u rezervace
   - Vyberte: Čeká na potvrzení / Potvrzeno / Zrušeno
4. **Mazání:**
   - Klikněte na ikonu koše u rezervace
   - Potvrďte smazání

---

## Pro zákazníky / Návštěvníky

### Vytvoření rezervace
1. Na hlavní stránce přejděte na sekci **"Rezervace"**
2. **Krok 1 - Datum:** Vyberte datum návštěvy
3. **Krok 2 - Čas:** Vyberte čas (oběd 11:30-15:00 nebo večeře 17:00-22:00)
4. **Krok 3 - Údaje:** Vyplňte:
   - Počet hostů (1-8)
   - Jméno a příjmení
   - Email
   - Telefon (formát: +420 123 456 789)
   - Poznámka (volitelné)
5. Klikněte **"Potvrdit rezervaci"**
6. Obdržíte potvrzení a rezervace se uloží do databáze

### Prohlížení menu
- **Denní menu:** Automaticky se zobrazí, pokud je přidáno šéfkuchařem
- **Hlavní menu:** Klikejte na kategorie (Předkrmy, Primi Piatti, Hlavní chody, Dezerty)

---

## ⚡ Klíčové funkce

### ✅ Real-time aktualizace
- Změny v admin panelu se **okamžitě** zobrazí na webu
- Žádné obnovování stránky není potřeba

### ✅ Databázové úložiště
- Všechna data jsou uložena v **Supabase databázi**
- Data přetrvají i po zavření prohlížeče
- Přístup ze všech zařízení

### ✅ Bezpečnost
- Admin panel chráněn heslem
- API komunikace přes Bearer token
- Všechny rezervace bezpečně uloženy

---

## 🆘 Řešení problémů

### Změny se nezobrazují na webu
1. Zkontrolujte konzoli prohlížeče (F12)
2. Ověřte, že máte internetové připojení
3. Zkuste obnovit stránku (Ctrl+R / Cmd+R)

### Nelze se přihlásit do admin panelu
- Ověřte heslo: **`altrodatony2024`**
- Zkuste vymazat cookies a zkusit znovu

### Rezervace se neuloží
1. Zkontrolujte, že jsou vyplněna všechna povinná pole
2. Ověřte formát telefonu: musí mít 9 číslic
3. Zkontrolujte konzoli pro chybové zprávy

---

## 📋 Checklist pro první použití

- [ ] Přihlásit se do admin panelu
- [ ] Přidat alespoň 3 položky do denního menu
- [ ] Přidat položky do všech kategorií hlavního menu
- [ ] Vyzkoušet vytvoření testovací rezervace
- [ ] Ověřit, že se změny zobrazují na hlavní stránce
- [ ] Vyzkoušet správu rezervací (změna statusu, mazání)

---

## 🎉 Hotovo!

Váš web je připraven k použití. Pro více informací viz `DATABASE_IMPLEMENTATION.md`
