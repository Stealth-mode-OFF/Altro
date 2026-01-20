#!/bin/bash

# 🚀 Automatický push do GitHub pro Altro Da Tony
# Repository: https://github.com/Stealth-mode-OFF/altrodatony

echo "🍝 === Altro Da Tony - GitHub Push Script ==="
echo ""

# Barvy pro výstup
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Kontrola, zda jsme v git repozitáři
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}📦 Inicializuji Git repozitář...${NC}"
    git init
    echo -e "${GREEN}✅ Git inicializován${NC}"
fi

# Přidání všech souborů
echo ""
echo -e "${YELLOW}📁 Přidávám soubory do stage...${NC}"
git add .
echo -e "${GREEN}✅ Soubory přidány${NC}"

# Commit
echo ""
echo -e "${YELLOW}💾 Vytvářím commit...${NC}"
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

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Commit vytvořen${NC}"
else
    echo -e "${YELLOW}⚠️  Žádné změny k commitu nebo commit již existuje${NC}"
fi

# Přejmenování na main branch
echo ""
echo -e "${YELLOW}🔀 Nastavuji main branch...${NC}"
git branch -M main
echo -e "${GREEN}✅ Branch nastaven na main${NC}"

# Kontrola, zda remote origin existuje
echo ""
echo -e "${YELLOW}🔗 Nastavuji GitHub remote...${NC}"
if git remote | grep -q "origin"; then
    echo -e "${YELLOW}⚠️  Remote 'origin' již existuje, odstraňuji...${NC}"
    git remote remove origin
fi

git remote add origin https://github.com/Stealth-mode-OFF/altrodatony.git
echo -e "${GREEN}✅ Remote nastaven na: https://github.com/Stealth-mode-OFF/altrodatony.git${NC}"

# Push do GitHubu
echo ""
echo -e "${YELLOW}🚀 Nahrávám na GitHub...${NC}"
echo -e "${YELLOW}⚠️  Může být potřeba GitHub autentizace:${NC}"
echo -e "${YELLOW}   Username: Stealth-mode-OFF${NC}"
echo -e "${YELLOW}   Password: Váš Personal Access Token (ne běžné heslo!)${NC}"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ =============================================${NC}"
    echo -e "${GREEN}✅  ÚSPĚŠNĚ NAHRÁNO NA GITHUB! 🎉${NC}"
    echo -e "${GREEN}✅ =============================================${NC}"
    echo ""
    echo -e "${GREEN}🌐 Váš repozitář: https://github.com/Stealth-mode-OFF/altrodatony${NC}"
    echo ""
    echo -e "${YELLOW}📋 Další doporučené kroky:${NC}"
    echo ""
    echo "1. Přidejte topics na GitHubu:"
    echo "   react, typescript, supabase, restaurant, tailwindcss"
    echo ""
    echo "2. Aktualizujte README:"
    echo "   cp GITHUB_README.md README.md"
    echo "   git add README.md"
    echo "   git commit -m '📝 Update README for GitHub'"
    echo "   git push"
    echo ""
    echo "3. Vytvořte release:"
    echo "   git tag -a v1.0.0 -m '🚀 Release v1.0.0'"
    echo "   git push origin v1.0.0"
    echo ""
else
    echo ""
    echo -e "${RED}❌ =============================================${NC}"
    echo -e "${RED}❌  CHYBA PŘI NAHRÁVÁNÍ${NC}"
    echo -e "${RED}❌ =============================================${NC}"
    echo ""
    echo -e "${YELLOW}🔧 Možná řešení:${NC}"
    echo ""
    echo "1. Autentizace selhala:"
    echo "   - Vytvořte Personal Access Token na:"
    echo "     https://github.com/settings/tokens"
    echo "   - Použijte token jako heslo (ne běžné heslo!)"
    echo ""
    echo "2. Repozitář už existuje s obsahem:"
    echo "   git pull origin main --allow-unrelated-histories"
    echo "   git push -u origin main"
    echo ""
    echo "3. Použijte GitHub CLI:"
    echo "   gh auth login"
    echo "   git push -u origin main"
    echo ""
fi
