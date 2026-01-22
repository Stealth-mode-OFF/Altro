@echo off
REM 🚀 Automatický deployment script pro Altro Da Tony (Windows)
REM Tento skript připraví projekt k nasazení na Vercel

echo.
echo ========================================
echo   ALTRO DA TONY - DEPLOYMENT SCRIPT
echo ========================================
echo.

REM ============================================
REM KROK 1: Pre-deployment kontrola
REM ============================================

echo [KROK 1/5] Pre-deployment kontrola
echo.
echo Kontroluji dulezite soubory...

set missing_files=0

if exist "App.tsx" (
    echo [OK] App.tsx
) else (
    echo [CHYBA] App.tsx CHYBI!
    set /a missing_files+=1
)

if exist "package.json" (
    echo [OK] package.json
) else (
    echo [CHYBA] package.json CHYBI!
    set /a missing_files+=1
)

if exist "vite.config.ts" (
    echo [OK] vite.config.ts
) else (
    echo [CHYBA] vite.config.ts CHYBI!
    set /a missing_files+=1
)

if exist "supabase\functions\server\index.tsx" (
    echo [OK] supabase/functions/server/index.tsx
) else (
    echo [CHYBA] supabase/functions/server/index.tsx CHYBI!
    set /a missing_files+=1
)

if exist "supabase\functions\server\email-service.tsx" (
    echo [OK] supabase/functions/server/email-service.tsx
) else (
    echo [CHYBA] supabase/functions/server/email-service.tsx CHYBI!
    set /a missing_files+=1
)

if %missing_files% gtr 0 (
    echo.
    echo [CHYBA] Nektere dulezite soubory chybi!
    echo         Nemuzu pokracovat v deploymentu.
    pause
    exit /b 1
)

echo.
echo [OK] Vsechny soubory jsou na miste!
echo.

REM ============================================
REM KROK 2: Build test
REM ============================================

echo [KROK 2/5] Testovaci build
echo.
echo Spoustim 'npm run build' pro kontrolu...
echo.

REM Zkontroluj node_modules
if not exist "node_modules" (
    echo [VAROVANI] node_modules neexistuje, spoustim npm install...
    call npm install
    
    if errorlevel 1 (
        echo.
        echo [CHYBA] npm install selhal!
        pause
        exit /b 1
    )
)

REM Build
call npm run build

if errorlevel 1 (
    echo.
    echo [CHYBA] Build selhal!
    echo         Opravte chyby a zkuste znovu.
    pause
    exit /b 1
)

echo.
echo [OK] Build uspesny!
echo.

REM ============================================
REM KROK 3: Environment variables kontrola
REM ============================================

echo [KROK 3/5] Kontrola environment variables
echo.

if exist "utils\supabase\info.tsx" (
    echo [OK] Supabase credentials nalezeny
    echo.
    echo Tyto hodnoty budete potrebovat ve Vercel:
    echo.
    echo    1. VITE_SUPABASE_URL
    echo    2. VITE_SUPABASE_ANON_KEY
    echo    3. VITE_SUPABASE_SERVICE_ROLE_KEY
    echo.
    echo Najdete je v: /utils/supabase/info.tsx
) else (
    echo [CHYBA] /utils/supabase/info.tsx nenalezen!
    pause
    exit /b 1
)

echo.

REM ============================================
REM KROK 4: Git preparation
REM ============================================

echo [KROK 4/5] Priprava Git repozitare
echo.

REM Init git pokud neexistuje
if not exist ".git" (
    echo Inicializuji Git...
    git init
    echo [OK] Git inicializovan
) else (
    echo [OK] Git repozitar jiz existuje
)

REM Přidej všechny soubory
echo Pridavam soubory...
git add .

REM Status
echo.
echo Git status:
git status --short
echo.

REM ============================================
REM KROK 5: Commit & Push
REM ============================================

echo [KROK 5/5] Git commit ^& push
echo.

REM Commit message
set /p commit_message="Zadejte commit message (nebo Enter pro default): "

if "%commit_message%"=="" (
    set commit_message=Production deployment - %date% %time%
)

REM Commit
git commit -m "%commit_message%"

if errorlevel 1 (
    echo [VAROVANI] Zadne zmeny k commitu nebo commit jiz existuje
)

REM Branch
git branch -M main

REM Remote
git remote | findstr "origin" >nul
if %errorlevel% equ 0 (
    echo Remote 'origin' jiz existuje
) else (
    echo Pridavam remote 'origin'...
    git remote add origin https://github.com/Stealth-mode-OFF/altrodatony.git
)

REM Push
echo.
echo Nahravarn na GitHub...
echo.

git push -u origin main

if errorlevel 1 (
    REM ============================================
    REM ERROR!
    REM ============================================
    
    echo.
    echo ==========================================
    echo   CHYBA PRI NAHRAVANI NA GITHUB
    echo ==========================================
    echo.
    echo Mozna reseni:
    echo.
    echo 1. Autentizace selhala:
    echo    - Vytvorte Personal Access Token:
    echo      https://github.com/settings/tokens
    echo    - Pouzijte token jako heslo
    echo.
    echo 2. Repozitar uz existuje s obsahem:
    echo    git pull origin main --allow-unrelated-histories
    echo    git push -u origin main
    echo.
    echo 3. Pouzijte GitHub CLI:
    echo    gh auth login
    echo    git push -u origin main
    echo.
    pause
    exit /b 1
)

REM ============================================
REM SUCCESS!
REM ============================================

echo.
echo ==========================================
echo   USPESNE NAHRANO NA GITHUB!
echo ==========================================
echo.
echo Repository: https://github.com/Stealth-mode-OFF/altrodatony
echo.
echo ------------------------------------------
echo   DALSI KROKY - DEPLOY NA VERCEL
echo ------------------------------------------
echo.
echo 1. Jdete na: https://vercel.com
echo.
echo 2. Kliknete: "Add New Project"
echo.
echo 3. Vyberte repository: "altrodatony"
echo.
echo 4. Nastaveni:
echo    • Framework: Vite
echo    • Build Command: npm run build
echo    • Output Directory: dist
echo.
echo 5. Pridejte Environment Variables:
echo    VITE_SUPABASE_URL
echo    VITE_SUPABASE_ANON_KEY
echo    VITE_SUPABASE_SERVICE_ROLE_KEY
echo.
echo    Hodnoty najdete v: /utils/supabase/info.tsx
echo.
echo 6. Kliknete: "Deploy"
echo.
echo 7. Pockejte 2-3 minuty na build
echo.
echo ------------------------------------------
echo.
echo Po dokonceni Vercel buildu:
echo.
echo    Vas web bude zivy na:
echo    https://[projekt].vercel.app
echo.
echo    Pote pripojte vlastni domenu:
echo    https://www.altrodatony.com
echo.
echo ------------------------------------------
echo.
echo Detailni navod: /DEPLOY_NOW.md
echo DNS setup: /PUBLISH_TO_DOMAIN_GUIDE.md
echo.
echo Buon appetito!
echo.
pause
