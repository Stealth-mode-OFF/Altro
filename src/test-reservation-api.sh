#!/bin/bash

# 🧪 Reservation API Test Script
# Tento skript testuje všechny endpointy rezervačního systému

echo "🧪 Testing Altro Da Tony - Reservation API"
echo "=========================================="
echo ""

# Načtěte PROJECT_ID a ANON_KEY z utils/supabase/info.tsx
# Nebo je zadejte ručně zde:
PROJECT_ID="your-project-id"
ANON_KEY="your-anon-key"

# Pokud nejsou nastaveny, ukončete
if [ "$PROJECT_ID" = "your-project-id" ] || [ "$ANON_KEY" = "your-anon-key" ]; then
    echo "⚠️  ERROR: Prosím nastavte PROJECT_ID a ANON_KEY v tomto skriptu!"
    echo ""
    echo "Najdete je v: /utils/supabase/info.tsx"
    echo ""
    exit 1
fi

BASE_URL="https://${PROJECT_ID}.supabase.co/functions/v1/make-server-d880a0b3"

# Barvy pro výstup
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Health Check
echo "Test 1: Health Check"
echo "-------------------"
RESPONSE=$(curl -s -w "\n%{http_code}" "${BASE_URL}/health")
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ PASS${NC} - Server is healthy"
    echo "   Response: $BODY"
else
    echo -e "${RED}❌ FAIL${NC} - Server health check failed (HTTP $HTTP_CODE)"
    echo "   Response: $BODY"
fi
echo ""

# Test 2: Create Reservation (Complete data including guests)
echo "Test 2: Create Reservation (with guests field)"
echo "----------------------------------------------"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${BASE_URL}/reservations" \
  -H "Authorization: Bearer ${ANON_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TEST Jan Novák",
    "email": "test@email.cz",
    "phone": "+420123456789",
    "date": "2025-12-25",
    "time": "19:00",
    "guests": "4",
    "message": "TEST RESERVATION - PLEASE IGNORE"
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ PASS${NC} - Reservation created successfully"
    echo "   Response: $BODY"
    
    # Extrahujte ID rezervace pro další testy
    RESERVATION_ID=$(echo "$BODY" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
    echo "   Reservation ID: $RESERVATION_ID"
    
    # Zkontrolujte zda guests je v odpovědi
    if echo "$BODY" | grep -q '"guests":"4"'; then
        echo -e "   ${GREEN}✅ guests field is present and correct${NC}"
    else
        echo -e "   ${RED}❌ WARNING: guests field is missing or incorrect!${NC}"
    fi
else
    echo -e "${RED}❌ FAIL${NC} - Failed to create reservation (HTTP $HTTP_CODE)"
    echo "   Response: $BODY"
fi
echo ""

# Test 3: Create Reservation (Missing required field)
echo "Test 3: Validation - Missing required field (phone)"
echo "---------------------------------------------------"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${BASE_URL}/reservations" \
  -H "Authorization: Bearer ${ANON_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TEST User",
    "email": "test@email.cz",
    "date": "2025-12-25",
    "time": "19:00",
    "guests": "2"
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "400" ]; then
    echo -e "${GREEN}✅ PASS${NC} - Validation correctly rejected missing field"
    echo "   Response: $BODY"
else
    echo -e "${RED}❌ FAIL${NC} - Validation did not catch missing field (HTTP $HTTP_CODE)"
    echo "   Response: $BODY"
fi
echo ""

# Test 4: Get All Reservations
echo "Test 4: Get All Reservations"
echo "----------------------------"
RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "${BASE_URL}/reservations" \
  -H "Authorization: Bearer ${ANON_KEY}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ PASS${NC} - Successfully retrieved reservations"
    
    # Spočítejte počet rezervací
    COUNT=$(echo "$BODY" | grep -o '"id":' | wc -l)
    echo "   Found $COUNT reservation(s)"
    
    # Zkontrolujte zda obsahují guests
    if echo "$BODY" | grep -q '"guests"'; then
        echo -e "   ${GREEN}✅ Reservations include guests field${NC}"
    else
        echo -e "   ${YELLOW}⚠️  WARNING: No guests field found in reservations${NC}"
    fi
else
    echo -e "${RED}❌ FAIL${NC} - Failed to retrieve reservations (HTTP $HTTP_CODE)"
    echo "   Response: $BODY"
fi
echo ""

# Test 5: Update Reservation Status (pokud máme ID z Test 2)
if [ ! -z "$RESERVATION_ID" ]; then
    echo "Test 5: Update Reservation Status"
    echo "---------------------------------"
    RESPONSE=$(curl -s -w "\n%{http_code}" -X PATCH "${BASE_URL}/reservations/${RESERVATION_ID}" \
      -H "Authorization: Bearer ${ANON_KEY}" \
      -H "Content-Type: application/json" \
      -d '{"status": "confirmed"}')
    
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | sed '$d')
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✅ PASS${NC} - Successfully updated reservation status"
        echo "   Response: $BODY"
    else
        echo -e "${RED}❌ FAIL${NC} - Failed to update reservation (HTTP $HTTP_CODE)"
        echo "   Response: $BODY"
    fi
    echo ""
fi

# Test 6: Delete Reservation (cleanup test data)
if [ ! -z "$RESERVATION_ID" ]; then
    echo "Test 6: Delete Reservation (cleanup)"
    echo "-----------------------------------"
    RESPONSE=$(curl -s -w "\n%{http_code}" -X DELETE "${BASE_URL}/reservations/${RESERVATION_ID}" \
      -H "Authorization: Bearer ${ANON_KEY}")
    
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | sed '$d')
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✅ PASS${NC} - Successfully deleted test reservation"
        echo "   Response: $BODY"
    else
        echo -e "${RED}❌ FAIL${NC} - Failed to delete reservation (HTTP $HTTP_CODE)"
        echo "   Response: $BODY"
    fi
    echo ""
fi

# Summary
echo "=========================================="
echo "🏁 Test Summary"
echo "=========================================="
echo ""
echo "All critical tests completed."
echo ""
echo "⚠️  IMPORTANT CHECKS:"
echo "1. Verify that 'guests' field is present in all reservation responses"
echo "2. Check Supabase Edge Function logs for email sending status"
echo "3. Verify email was received at RESTAURANT_EMAIL"
echo ""
echo "To view logs:"
echo "  Supabase Dashboard → Edge Functions → make-server-d880a0b3 → Logs"
echo ""
echo "To run this script:"
echo "  chmod +x test-reservation-api.sh"
echo "  ./test-reservation-api.sh"
echo ""
