@echo off
REM 🧪 Reservation API Test Script (Windows)
REM Tento skript testuje všechny endpointy rezervačního systému

echo 🧪 Testing Altro Da Tony - Reservation API
echo ==========================================
echo.

REM Načtěte PROJECT_ID a ANON_KEY z utils/supabase/info.tsx
REM Nebo je zadejte ručně zde:
set PROJECT_ID=your-project-id
set ANON_KEY=your-anon-key

REM Pokud nejsou nastaveny, ukončete
if "%PROJECT_ID%"=="your-project-id" (
    echo ⚠️  ERROR: Prosím nastavte PROJECT_ID a ANON_KEY v tomto skriptu!
    echo.
    echo Najdete je v: /utils/supabase/info.tsx
    echo.
    pause
    exit /b 1
)

set BASE_URL=https://%PROJECT_ID%.supabase.co/functions/v1/make-server-d880a0b3

REM Test 1: Health Check
echo Test 1: Health Check
echo -------------------
curl -s "%BASE_URL%/health"
echo.
echo.

REM Test 2: Create Reservation (Complete data including guests)
echo Test 2: Create Reservation (with guests field)
echo ----------------------------------------------
curl -X POST "%BASE_URL%/reservations" ^
  -H "Authorization: Bearer %ANON_KEY%" ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"TEST Jan Novák\",\"email\":\"test@email.cz\",\"phone\":\"+420123456789\",\"date\":\"2025-12-25\",\"time\":\"19:00\",\"guests\":\"4\",\"message\":\"TEST RESERVATION - PLEASE IGNORE\"}"
echo.
echo.

REM Test 3: Create Reservation (Missing required field)
echo Test 3: Validation - Missing required field (phone)
echo ---------------------------------------------------
curl -X POST "%BASE_URL%/reservations" ^
  -H "Authorization: Bearer %ANON_KEY%" ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"TEST User\",\"email\":\"test@email.cz\",\"date\":\"2025-12-25\",\"time\":\"19:00\",\"guests\":\"2\"}"
echo.
echo Expected: HTTP 400 with error message
echo.
echo.

REM Test 4: Get All Reservations
echo Test 4: Get All Reservations
echo ----------------------------
curl -X GET "%BASE_URL%/reservations" ^
  -H "Authorization: Bearer %ANON_KEY%"
echo.
echo.

REM Summary
echo ==========================================
echo 🏁 Test Summary
echo ==========================================
echo.
echo All critical tests completed.
echo.
echo ⚠️  IMPORTANT CHECKS:
echo 1. Verify that 'guests' field is present in all reservation responses
echo 2. Check Supabase Edge Function logs for email sending status
echo 3. Verify email was received at RESTAURANT_EMAIL
echo.
echo To view logs:
echo   Supabase Dashboard → Edge Functions → make-server-d880a0b3 → Logs
echo.
pause
