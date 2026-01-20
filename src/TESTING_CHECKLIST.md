# 🧪 Complete System Test Checklist

## Test Date: December 21, 2025

---

## ✅ 1. RESERVATION FORM - Frontend Tests

### Test 1.1: Form Rendering
- [ ] Navigate to homepage
- [ ] Scroll to reservation section
- [ ] Verify form displays with premium design (FlowingSection wrapper)
- [ ] Verify smooth reveal animation on scroll

### Test 1.2: Step 1 - Details
- [ ] Test guest selection (1, 2, 3, 4, 5, 6+)
- [ ] Test date picker (minimum date is today)
- [ ] Test time slot selection
- [ ] Try clicking "Continue" without selecting date/time → Should show error
- [ ] Select date + time → Should proceed to Step 2

### Test 1.3: Step 2 - Contact Info
- [ ] Verify summary shows correct: date, time, guests
- [ ] Test name input
- [ ] Test phone input (format: XXX XXX XXX, max 9 digits)
- [ ] Test email input with autocomplete suggestions
  - Type "test" → Should suggest @gmail.com, @seznam.cz
  - Type "test@g" → Should suggest @gmail.com
- [ ] Test optional message textarea
- [ ] Try submitting without required fields → Should show error
- [ ] Fill all required fields → Should submit successfully

### Test 1.4: Form Submission
- [ ] Submit complete reservation
- [ ] Verify success toast appears
- [ ] Verify form resets to Step 1
- [ ] Verify data cleared

---

## ✅ 2. BACKEND API - Server Tests

### Test 2.1: Health Check
```bash
curl https://[PROJECT_ID].supabase.co/functions/v1/make-server-d880a0b3/health
```
**Expected:** `{"status":"ok"}`

### Test 2.2: Create Reservation (POST)
```bash
curl -X POST \
  https://[PROJECT_ID].supabase.co/functions/v1/make-server-d880a0b3/reservations \
  -H "Authorization: Bearer [ANON_KEY]" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@test.com",
    "phone": "123 456 789",
    "date": "2025-12-25",
    "time": "19:00",
    "guests": "2",
    "message": "Test reservation"
  }'
```
**Expected:** 
- `{"success":true, "reservation":{...}, "message":"..."}`
- Reservation saved to KV store
- 2 emails sent (owner + customer)

### Test 2.3: Get All Reservations (GET)
```bash
curl https://[PROJECT_ID].supabase.co/functions/v1/make-server-d880a0b3/reservations \
  -H "Authorization: Bearer [ANON_KEY]"
```
**Expected:** `{"success":true, "reservations":[...]}`

### Test 2.4: Update Reservation Status (PATCH)
```bash
curl -X PATCH \
  https://[PROJECT_ID].supabase.co/functions/v1/make-server-d880a0b3/reservations/[ID] \
  -H "Authorization: Bearer [ANON_KEY]" \
  -H "Content-Type: application/json" \
  -d '{"status":"confirmed"}'
```
**Expected:** `{"success":true, "reservation":{...}}`

### Test 2.5: Delete Reservation (DELETE)
```bash
curl -X DELETE \
  https://[PROJECT_ID].supabase.co/functions/v1/make-server-d880a0b3/reservations/[ID] \
  -H "Authorization: Bearer [ANON_KEY]"
```
**Expected:** `{"success":true}`

---

## ✅ 3. EMAIL NOTIFICATIONS - Production Tests

### Test 3.1: Owner Email (Restaurant)
**Check:**
- [ ] Email sent to: antoniosahulka@seznam.cz
- [ ] From: Tony – Altro da Tony <tony@altrodatony.com>
- [ ] Subject: "🍝 Nová rezervace: [NAME] - [DATE] [TIME]"
- [ ] Contains: Guest details, contact info, date/time, message
- [ ] Premium HTML styling with Cormorant Garamond font
- [ ] Reply-to: customer email

### Test 3.2: Customer Confirmation Email
**Check:**
- [ ] Email sent to: customer email
- [ ] From: Tony – Altro da Tony <tony@altrodatony.com>
- [ ] Subject: "✓ Potvrzení rezervace - Altro Da Tony - [DATE] [TIME]"
- [ ] Contains: Greeting, reservation card, important info, contact details
- [ ] Premium HTML styling
- [ ] Reply-to: antoniosahulka@seznam.cz

### Test 3.3: Email Failure Handling
- [ ] Reservation should save even if email fails
- [ ] Error logged in console but not shown to user

---

## ✅ 4. ADMIN PANEL - Full Tests

### Test 4.1: Admin Access
- [ ] Navigate to /#admin
- [ ] Verify login screen displays
- [ ] Try wrong password → Should show error
- [ ] Enter correct password: "menicka2026"
- [ ] Verify successful login
- [ ] Check localStorage for "adminAuth"

### Test 4.2: Admin Dashboard
- [ ] Verify dashboard displays 3 tabs:
  - Daily Menu (Týdenní menu)
  - Main Menu (Hlavní menu)
  - Reservations (Rezervace)
- [ ] Check navigation buttons work
- [ ] Test "Back to Website" button
- [ ] Test "Logout" button

### Test 4.3: Reservation Manager Tab
**Statistics:**
- [ ] Total reservations count
- [ ] Pending count (yellow)
- [ ] Confirmed count (green)
- [ ] Cancelled count (red)

**Filters:**
- [ ] Test "All" filter
- [ ] Test "Pending" filter
- [ ] Test "Confirmed" filter
- [ ] Test "Cancelled" filter

**Reservation Cards:**
- [ ] Verify each card displays:
  - Status badge (color-coded)
  - Name, email, phone
  - Date, time, guests
  - Message (if provided)
  - Action buttons

**Actions:**
- [ ] Test "Confirm" button → Status changes to confirmed
- [ ] Test "Cancel" button → Status changes to cancelled
- [ ] Test "Delete" button → Confirmation dialog → Reservation deleted
- [ ] Test "Refresh" button → Reloads from server

### Test 4.4: Daily Menu Manager
- [ ] Select current week
- [ ] Add new menu items for each day
- [ ] Edit existing items
- [ ] Delete items
- [ ] Save menu
- [ ] Verify saved on frontend display

### Test 4.5: Main Menu Manager
- [ ] View all menu categories
- [ ] Add new items
- [ ] Edit existing items with tri-lingual support
- [ ] Delete items
- [ ] Save changes
- [ ] Verify changes on menu page

---

## ✅ 5. PREMIUM DESIGN SYSTEM - Visual Tests

### Test 5.1: FlowingSection Component
- [ ] Navigate to /premium-showcase
- [ ] Verify smooth section transitions
- [ ] Check gradient overlays (top/bottom)
- [ ] Test different variants: default, subtle, accent, elevated

### Test 5.2: SmoothReveal Animation
- [ ] Scroll page slowly
- [ ] Verify elements fade in smoothly (1.4s duration)
- [ ] Check stagger delays work correctly
- [ ] Test on reservation section

### Test 5.3: GlassCard Component
- [ ] Check backdrop blur effect
- [ ] Test hover state (gentle lift)
- [ ] Verify shadow elevation (low, medium, high)
- [ ] Check border glow on hover

### Test 5.4: PremiumInput Component
- [ ] Focus input field
- [ ] Verify 1s border transition
- [ ] Check glowing underline effect
- [ ] Test label animation

### Test 5.5: PremiumButton Component
- [ ] Hover over buttons
- [ ] Check gentle lift (no aggressive scaling)
- [ ] Test all variants: primary, ghost
- [ ] Verify smooth transitions

### Test 5.6: ElegantCalculator (Showcase)
- [ ] Navigate to /premium-showcase
- [ ] Scroll to calculator section
- [ ] Interact with calculator
- [ ] Verify smooth animations and premium feel

---

## ✅ 6. INTEGRATION TESTS - End-to-End

### Test 6.1: Complete User Journey
1. [ ] User visits homepage
2. [ ] Scrolls to reservation section
3. [ ] Fills out reservation form
4. [ ] Submits reservation
5. [ ] Receives confirmation toast
6. [ ] Admin receives email notification
7. [ ] Customer receives confirmation email

### Test 6.2: Complete Admin Journey
1. [ ] Admin navigates to /#admin
2. [ ] Logs in with password
3. [ ] Views pending reservations
4. [ ] Confirms a reservation
5. [ ] Checks customer received update (if implemented)
6. [ ] Deletes old reservation
7. [ ] Logs out

---

## ✅ 7. BROWSER COMPATIBILITY

### Desktop
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Responsive design (320px - 1920px)

---

## ✅ 8. PERFORMANCE TESTS

### Lighthouse Audit
- [ ] Performance score > 90
- [ ] Accessibility score > 95
- [ ] Best Practices score > 95
- [ ] SEO score > 95

### Load Times
- [ ] Initial page load < 2s
- [ ] API requests < 500ms
- [ ] Images lazy-loaded
- [ ] Smooth 60fps animations

---

## ✅ 9. ERROR HANDLING

### Network Errors
- [ ] Offline indicator appears when offline
- [ ] Form submission fails gracefully
- [ ] Retry mechanism works
- [ ] User-friendly error messages

### Validation Errors
- [ ] Empty fields caught before submission
- [ ] Invalid email format rejected
- [ ] Phone number validation works
- [ ] Date/time validation works

### Server Errors
- [ ] 400 errors handled with specific messages
- [ ] 500 errors handled gracefully
- [ ] CORS errors logged
- [ ] Detailed error logs in console

---

## ✅ 10. SECURITY TESTS

### Authentication
- [ ] Admin password protected
- [ ] LocalStorage auth persists correctly
- [ ] Logout clears auth token
- [ ] No sensitive data exposed in frontend

### API Security
- [ ] CORS configured correctly
- [ ] Authorization header required
- [ ] Supabase service role key NOT exposed to frontend
- [ ] KV store keys properly namespaced

---

## 🎯 FINAL CHECKLIST

- [ ] All reservation form tests pass ✅
- [ ] All backend API tests pass ✅
- [ ] All email notifications working ✅
- [ ] All admin panel features working ✅
- [ ] Premium design system applied ✅
- [ ] No console errors ✅
- [ ] Mobile responsive ✅
- [ ] Performance optimized ✅
- [ ] Error handling complete ✅
- [ ] Security verified ✅

---

## 📝 TEST RESULTS

**Date:** _____________
**Tester:** _____________
**Environment:** [ ] Development [ ] Staging [ ] Production

**Overall Status:** [ ] PASS [ ] FAIL

**Notes:**
_________________________________________
_________________________________________
_________________________________________

**Critical Issues Found:**
_________________________________________
_________________________________________

**Minor Issues Found:**
_________________________________________
_________________________________________

**Sign-off:** _____________