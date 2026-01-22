#!/bin/bash

# 🚀 Automatický deployment script pro Altro Da Tony
# Tento skript připraví projekt k nasazení na Vercel

echo "🍝 =========================================="
echo "🍝  ALTRO DA TONY - DEPLOYMENT SCRIPT"
echo "🍝 =========================================="
echo ""

# Barvy
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ============================================
# KROK 1: Pre-deployment kontrola
# ============================================

echo -e "${BLUE}📋 KROK 1/5: Pre-deployment kontrola${NC}"
echo ""

# Kontrola důležitých souborů
echo -e "${YELLOW}Kontroluji důležité soubory...${NC}"

files_to_check=(
    "App.tsx"
    "package.json"
    "vite.config.ts"
    "supabase/functions/server/index.tsx"
    "supabase/functions/server/email-service.tsx"
)

missing_files=0
for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file CHYBÍ!${NC}"
        missing_files=$((missing_files + 1))
    fi
done

if [ $missing_files -gt 0 ]; then
    echo ""
    echo -e "${RED}❌ Některé důležité soubory chybí!${NC}"
    echo -e "${RED}   Nemůžu pokračovat v deploymentu.${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Všechny soubory jsou na místě!${NC}"
echo ""

# ============================================
# KROK 2: Build test
# ============================================

echo -e "${BLUE}📦 KROK 2/5: Testovací build${NC}"
echo ""
echo -e "${YELLOW}Spouštím 'npm run build' pro kontrolu...${NC}"
echo ""

# Zkontroluj, jestli existuje node_modules
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules neexistuje, spouštím npm install...${NC}"
    npm install
    
    if [ $? -ne 0 ]; then
        echo ""
        echo -e "${RED}❌ npm install selhal!${NC}"
        exit 1
    fi
fi

# Build
npm run build

if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}❌ Build selhal!${NC}"
    echo -e "${RED}   Opravte chyby a zkuste znovu.${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Build úspěšný!${NC}"
echo ""

# ============================================
# KROK 3: Environment variables kontrola
# ============================================

echo -e "${BLUE}🔐 KROK 3/5: Kontrola environment variables${NC}"
echo ""

# Načti info.tsx
if [ -f "utils/supabase/info.tsx" ]; then
    echo -e "${GREEN}✅ Supabase credentials nalezeny${NC}"
    echo ""
    echo -e "${YELLOW}📝 Tyto hodnoty budete potřebovat ve Vercel:${NC}"
    echo ""
    echo "   1. VITE_SUPABASE_URL"
    echo "   2. VITE_SUPABASE_ANON_KEY"
    echo "   3. VITE_SUPABASE_SERVICE_ROLE_KEY"
    echo ""
    echo -e "${YELLOW}Najdete je v: /utils/supabase/info.tsx${NC}"
else
    echo -e "${RED}❌ /utils/supabase/info.tsx nenalezen!${NC}"
    exit 1
fi

echo ""

# ============================================
# KROK 4: Git preparation
# ============================================

echo -e "${BLUE}📦 KROK 4/5: Příprava Git repozitáře${NC}"
echo ""

# Init git pokud neexistuje
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}Inicializuji Git...${NC}"
    git init
    echo -e "${GREEN}✅ Git inicializován${NC}"
else
    echo -e "${GREEN}✅ Git repozitář již existuje${NC}"
fi

# Přidej všechny soubory
echo -e "${YELLOW}Přidávám soubory...${NC}"
git add .

# Status
echo ""
echo -e "${YELLOW}Git status:${NC}"
git status --short | head -n 20
echo ""

# ============================================
# KROK 5: Commit & Push
# ============================================

echo -e "${BLUE}🚀 KROK 5/5: Git commit & push${NC}"
echo ""

# Zeptej se na commit message
echo -e "${YELLOW}Zadejte commit message (nebo Enter pro default):${NC}"
read -r commit_message

if [ -z "$commit_message" ]; then
    commit_message="🚀 Production deployment - $(date '+%Y-%m-%d %H:%M')"
fi

# Commit
git commit -m "$commit_message"

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Žádné změny k commitu nebo commit již existuje${NC}"
fi

# Branch
git branch -M main

# Remote
if git remote | grep -q "origin"; then
    echo -e "${YELLOW}Remote 'origin' již existuje${NC}"
else
    echo -e "${YELLOW}Přidávám remote 'origin'...${NC}"
    git remote add origin https://github.com/Stealth-mode-OFF/altrodatony.git
fi

# Push
echo ""
echo -e "${YELLOW}🚀 Nahrávám na GitHub...${NC}"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    # ============================================
    # SUCCESS!
    # ============================================
    
    echo ""
    echo -e "${GREEN}✅ =========================================="
    echo -e "✅  ÚSPĚŠNĚ NAHRÁNO NA GITHUB! 🎉"
    echo -e "✅ ==========================================${NC}"
    echo ""
    echo -e "${GREEN}🌐 Repository: https://github.com/Stealth-mode-OFF/altrodatony${NC}"
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}📋 DALŠÍ KROKY - DEPLOY NA VERCEL${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "1️⃣  Jděte na: ${BLUE}https://vercel.com${NC}"
    echo ""
    echo "2️⃣  Klikněte: ${YELLOW}\"Add New Project\"${NC}"
    echo ""
    echo "3️⃣  Vyberte repository: ${YELLOW}\"altrodatony\"${NC}"
    echo ""
    echo "4️⃣  Nastavení:"
    echo "    • Framework: ${YELLOW}Vite${NC}"
    echo "    • Build Command: ${YELLOW}npm run build${NC}"
    echo "    • Output Directory: ${YELLOW}dist${NC}"
    echo ""
    echo "5️⃣  Přidejte Environment Variables:"
    echo "    ${YELLOW}VITE_SUPABASE_URL${NC}"
    echo "    ${YELLOW}VITE_SUPABASE_ANON_KEY${NC}"
    echo "    ${YELLOW}VITE_SUPABASE_SERVICE_ROLE_KEY${NC}"
    echo ""
    echo "    ${BLUE}💡 Hodnoty najdete v: /utils/supabase/info.tsx${NC}"
    echo ""
    echo "6️⃣  Klikněte: ${YELLOW}\"Deploy\"${NC}"
    echo ""
    echo "7️⃣  Počkejte 2-3 minuty na build"
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${GREEN}✅ Po dokončení Vercel buildu:${NC}"
    echo ""
    echo "   → Váš web bude živý na:"
    echo "     ${GREEN}https://[projekt].vercel.app${NC}"
    echo ""
    echo "   → Poté připojte vlastní doménu:"
    echo "     ${GREEN}https://www.altrodatony.com${NC}"
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${YELLOW}📚 Detailní návod: /DEPLOY_NOW.md${NC}"
    echo -e "${YELLOW}📚 DNS setup: /PUBLISH_TO_DOMAIN_GUIDE.md${NC}"
    echo ""
    echo -e "${GREEN}🍝 Buon appetito! 🇮🇹${NC}"
    echo ""
    
else
    # ============================================
    # ERROR!
    # ============================================
    
    echo ""
    echo -e "${RED}❌ =========================================="
    echo -e "❌  CHYBA PŘI NAHRÁVÁNÍ NA GITHUB"
    echo -e "❌ ==========================================${NC}"
    echo ""
    echo -e "${YELLOW}🔧 Možná řešení:${NC}"
    echo ""
    echo "1. ${YELLOW}Autentizace selhala:${NC}"
    echo "   → Vytvořte Personal Access Token:"
    echo "     ${BLUE}https://github.com/settings/tokens${NC}"
    echo "   → Použijte token jako heslo"
    echo ""
    echo "2. ${YELLOW}Repozitář už existuje s obsahem:${NC}"
    echo "   ${BLUE}git pull origin main --allow-unrelated-histories${NC}"
    echo "   ${BLUE}git push -u origin main${NC}"
    echo ""
    echo "3. ${YELLOW}Použijte GitHub CLI:${NC}"
    echo "   ${BLUE}gh auth login${NC}"
    echo "   ${BLUE}git push -u origin main${NC}"
    echo ""
    exit 1
fi
