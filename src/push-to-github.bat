@echo off
REM 🚀 Automatický push do GitHub pro Altro Da Tony
REM Repository: https://github.com/Stealth-mode-OFF/altrodatony

echo.
echo ============================================
echo 🍝 Altro Da Tony - GitHub Push Script
echo ============================================
echo.

REM Kontrola, zda jsme v git repozitáři
if not exist ".git" (
    echo 📦 Inicializuji Git repozitář...
    git init
    echo ✅ Git inicializován
)

REM Přidání všech souborů
echo.
echo 📁 Přidávám soubory do stage...
git add .
echo ✅ Soubory přidány

REM Commit
echo.
echo 💾 Vytvářím commit...
git commit -m "🎉 Initial commit: Plně funkční restaurační aplikace Altro Da Tony

✨ Hlavní funkce:
- Rezervační systém s Supabase databází a real-time synchronizací
- Správa denního menu pro šéfkuchaře (týdenní nabídka)
- Správa hlavního menu (antipasti, primi, secondi, dolci)
- Admin panel s heslem a 3 taby pro kompletní správu
- Třijazyčná podpora (čeština, angličtina, italština)
- Google recenze integrace
- Galerie s profesionálními fotografiemi
- Minimalistický italský design s terakotovou červenou
- REST API s Hono.js na Deno Edge Functions
- Kompletní dokumentace (README, API guide, admin guide)

🏗️ Tech stack:
- Frontend: React 18 + TypeScript + Tailwind CSS v4
- Backend: Supabase + Hono.js + Deno Edge Functions
- Design: Playfair Display, Cormorant Garamond
- Animace: Motion (Framer Motion)

🐛 Fixes:
- Oprava překrývání textu obrázkem v hlavním menu

📚 Dokumentace:
- README_FINAL.md - kompletní přehled
- DATABASE_IMPLEMENTATION.md - databázová architektura
- API_TEST_GUIDE.md - testování API
- ADMIN_GUIDE.md - návod pro administrátory
"

if %errorlevel% equ 0 (
    echo ✅ Commit vytvořen
) else (
    echo ⚠️  Žádné změny k commitu nebo commit již existuje
)

REM Přejmenování na main branch
echo.
echo 🔀 Nastavuji main branch...
git branch -M main
echo ✅ Branch nastaven na main

REM Kontrola a nastavení remote
echo.
echo 🔗 Nastavuji GitHub remote...
git remote remove origin 2>nul
git remote add origin https://github.com/Stealth-mode-OFF/altrodatony.git
echo ✅ Remote nastaven

REM Push do GitHubu
echo.
echo 🚀 Nahrávám na GitHub...
echo ⚠️  Může být potřeba GitHub autentizace:
echo    Username: Stealth-mode-OFF
echo    Password: Váš Personal Access Token (ne běžné heslo!)
echo.

git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ============================================
    echo ✅  ÚSPĚŠNĚ NAHRÁNO NA GITHUB! 🎉
    echo ============================================
    echo.
    echo 🌐 Váš repozitář: https://github.com/Stealth-mode-OFF/altrodatony
    echo.
    echo 📋 Další doporučené kroky:
    echo.
    echo 1. Přidejte topics na GitHubu
    echo 2. Aktualizujte README
    echo 3. Vytvořte release
    echo.
) else (
    echo.
    echo ============================================
    echo ❌  CHYBA PŘI NAHRÁVÁNÍ
    echo ============================================
    echo.
    echo 🔧 Možná řešení:
    echo.
    echo 1. Vytvořte Personal Access Token:
    echo    https://github.com/settings/tokens
    echo.
    echo 2. Nebo použijte:
    echo    git pull origin main --allow-unrelated-histories
    echo    git push -u origin main
    echo.
)

pause
