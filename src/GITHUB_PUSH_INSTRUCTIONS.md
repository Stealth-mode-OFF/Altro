# 🚀 Návod: Push do GitHub

Bohužel nemohu přímo spouštět git příkazy, ale připravil jsem vám **automatizační skripty**, které stačí spustit!

---

## ⚡ RYCHLÉ SPUŠTĚNÍ

### Na macOS / Linux:

```bash
# Dejte skriptu práva ke spuštění
chmod +x push-to-github.sh

# Spusťte skript
./push-to-github.sh
```

### Na Windows:

```bash
# Prostě dvojklik na soubor nebo v cmd/PowerShell:
push-to-github.bat
```

---

## 📋 Co skript dělá:

1. ✅ Inicializuje Git repozitář (pokud ještě není)
2. ✅ Přidá všechny soubory (`git add .`)
3. ✅ Vytvoří commit s popisnou zprávou
4. ✅ Nastaví branch na `main`
5. ✅ Připojí GitHub remote: `https://github.com/Stealth-mode-OFF/altrodatony.git`
6. ✅ Nahraje na GitHub (`git push -u origin main`)

---

## 🔐 Autentizace

GitHub **NEVYŽADUJE HESLO**, musíte použít **Personal Access Token**!

### Vytvoření Personal Access Token:

1. Jděte na: **https://github.com/settings/tokens**
2. Klikněte **"Generate new token"** → **"Generate new token (classic)"**
3. Nastavte:
   - **Note:** "Altro Da Tony - Git push"
   - **Expiration:** 90 days (nebo No expiration)
   - **Scopes:** Zaškrtněte `repo` (všechny pod-položky)
4. Klikněte **"Generate token"**
5. **ZKOPÍRUJTE TOKEN** - ukáže se jen jednou!

### Při push použijte:

```
Username: Stealth-mode-OFF
Password: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx  ← VÁŠ TOKEN
```

---

## 🆘 Řešení problémů

### Chyba: "Permission denied" nebo "Authentication failed"

**Příčina:** Špatný token nebo běžné heslo místo tokenu

**Řešení:**
1. Vytvořte nový Personal Access Token (viz výše)
2. Použijte token jako heslo, NE běžné GitHub heslo

---

### Chyba: "refusing to merge unrelated histories"

**Příčina:** Repozitář na GitHubu už má nějaký obsah

**Řešení:**
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

### Chyba: "remote origin already exists"

**Příčina:** Remote už je nastaven

**Řešení:**
```bash
git remote remove origin
git remote add origin https://github.com/Stealth-mode-OFF/altrodatony.git
git push -u origin main
```

---

### Alternativa: GitHub CLI

Pokud máte GitHub CLI nainstalované:

```bash
# Přihlášení
gh auth login

# Push
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Stealth-mode-OFF/altrodatony.git
git push -u origin main
```

---

## ✅ Po úspěšném nahrání

Váš projekt bude na: **https://github.com/Stealth-mode-OFF/altrodatony**

### Doporučené další kroky:

#### 1. Aktualizujte hlavní README

```bash
cp GITHUB_README.md README.md
git add README.md
git commit -m "📝 Update README for GitHub presentation"
git push
```

#### 2. Přidejte GitHub Topics

Na GitHubu v repozitáři → klikněte ⚙️ vedle "About" → přidejte:

```
react
typescript
supabase
restaurant
reservations
tailwindcss
italian-restaurant
web-app
hono
edge-functions
deno
fullstack
figma-make
```

#### 3. Vytvořte Release

```bash
git tag -a v1.0.0 -m "🚀 Release v1.0.0 - Plně funkční aplikace"
git push origin v1.0.0
```

Pak na GitHubu: **Releases** → **Draft a new release** → vyberte tag `v1.0.0`

---

## 📞 Potřebujete pomoct?

Pokud narazíte na problém:

1. Zkontrolujte, že máte Git nainstalovaný: `git --version`
2. Zkontrolujte, že jste ve správné složce projektu
3. Zkontrolujte, že používáte Personal Access Token (ne heslo)
4. Zkuste alternativní metodu s GitHub CLI

---

## 🎯 Manuální příkazy (pokud skripty nefungují)

```bash
# 1. Inicializace
git init

# 2. Přidání souborů
git add .

# 3. Commit
git commit -m "🎉 Initial commit: Plně funkční restaurační aplikace"

# 4. Nastavení branch
git branch -M main

# 5. Přidání remote
git remote add origin https://github.com/Stealth-mode-OFF/altrodatony.git

# 6. Push
git push -u origin main
```

---

<div align="center">

**Hodně štěstí! 🍝🚀**

</div>
