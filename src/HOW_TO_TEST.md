# 🧪 How to Test - Altro Da Tony

Quick guide for testing all functionality.

---

## 🚀 Quick Test (5 minutes)

### 1. Test Reservation Form
1. Go to homepage
2. Scroll to reservation section
3. Notice the **smooth fade-in animation** (premium design!)
4. Fill form:
   - Select 2 guests
   - Pick tomorrow's date
   - Select 19:00
   - Click "Continue"
   - Enter name, phone, email
   - Submit
5. ✅ Should see success toast
6. ✅ Check email: antoniosahulka@seznam.cz (owner) + customer email

### 2. Test Admin Panel
1. Go to `/#admin`
2. Enter password: `menicka2026`
3. Click "Rezervace" tab
4. ✅ Should see your test reservation
5. Click "Potvrdit" → Status changes to confirmed
6. Click "Smazat" → Reservation deleted

### 3. Test Premium Design
1. Go to `/premium-showcase`
2. Scroll slowly down the page
3. ✅ Notice smooth 1.4s fade-in animations
4. ✅ Hover over cards - gentle lift
5. ✅ Try the calculator
6. ✅ Click inputs - see 1s border transition

---

## 🔍 Detailed Test (15 minutes)

### Test Reservation Flow

**Step 1: Guest Selection**
- Click different guest numbers
- Notice smooth scale animation on selected

**Step 2: Date**
- Try selecting past date → Should be disabled
- Select future date → Works

**Step 3: Time**
- Scroll through time slots
- Select a time → Border highlights

**Step 4: Contact Info**
- **Name:** Type any name
- **Phone:** Type numbers → Auto-formats to "XXX XXX XXX"
- **Email:** 
  - Type "test" → See suggestions for @gmail.com, @seznam.cz
  - Type "test@g" → See @gmail.com suggestion
  - Click suggestion → Auto-fills
- **Message:** Optional

**Step 5: Submit**
- Click "Rezervovat stůl"
- See success toast
- Form resets to step 1

### Test Admin Features

**Login:**
- Wrong password → Error message
- Correct password → Success

**Reservation Management:**
- View stats: Total, Pending, Confirmed, Cancelled
- Filter: All / Pending / Confirmed / Cancelled
- Actions:
  - Potvrdit (Confirm)
  - Zrušit (Cancel)
  - Smazat (Delete)
  - Obnovit (Refresh)

**Weekly Menu:**
- Select week
- Add items for each day
- Save
- Check frontend display

**Main Menu:**
- View categories
- Edit items (tri-lingual)
- Save changes

---

## 🧪 Automated Tests

### Run in Browser Console:

1. Open browser console (F12)
2. Type: `runTests()`
3. Wait for tests to complete
4. Check results

**Expected Output:**
```
🚀 Starting Altro Da Tony Test Suite...

🧪 Running: Health Check Endpoint...
✅ PASS: Health Check Endpoint (150ms)

🧪 Running: Create Reservation...
✅ PASS: Create Reservation (300ms)

...

📊 TEST SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Tests: 10
✅ Passed: 10
❌ Failed: 0
Success Rate: 100.0%
```

---

## 📧 Email Testing

### Check Owner Email (antoniosahulka@seznam.cz)

**Subject:** 🍝 Nová rezervace: [Name] - [Date] [Time]

**Contains:**
- Guest name
- Contact info (phone, email)
- Date, time, number of guests
- Optional message
- Reservation ID
- Premium styling with Cormorant font

### Check Customer Email

**Subject:** ✓ Potvrzení rezervace - Altro Da Tony - [Date] [Time]

**Contains:**
- Personalized greeting
- Reservation details card
- Restaurant address & phone
- Important information
- Social links

---

## 🎨 Premium Design Testing

### Visual Checks:

1. **Smooth Animations:**
   - Scroll page slowly
   - Elements fade in over 1.4 seconds
   - No harsh "pop-in" effect

2. **Hover Effects:**
   - Cards: Gentle 2px lift
   - Buttons: Subtle shadow increase
   - No aggressive scaling

3. **Colors:**
   - Warm off-white backgrounds
   - Muted brass accents
   - Soft shadows

4. **Typography:**
   - Headings: Cormorant Garamond (serif)
   - Body: Outfit (sans-serif)
   - Proper font sizes

5. **Spacing:**
   - Breathable white space
   - No cramped sections
   - Comfortable reading

---

## 🐛 Common Issues & Fixes

### Issue: Email not received
**Fix:** Check Resend API key in Supabase environment variables

### Issue: Admin login fails
**Fix:** Check password is `menicka2026` or set VITE_ADMIN_PASSWORD

### Issue: Reservation not saving
**Fix:** Check browser console for API errors

### Issue: Premium animations not working
**Fix:** Check if JavaScript is enabled

---

## 📱 Mobile Testing

### On Phone:
1. Open homepage
2. Test reservation form (mobile layout)
3. Test admin panel (should be responsive)
4. Check all animations work

**Expected:**
- Form is single column on mobile
- All touch interactions work
- Smooth scrolling
- No horizontal scroll

---

## 🔒 Security Testing

### Test Authentication:
1. Go to `/#admin` without login
2. ✅ Should show login screen
3. Close browser, reopen `/#admin`
4. ✅ If previously logged in, should stay logged in
5. Click logout
6. ✅ Redirects to login

### Test API Security:
1. Open browser console
2. Try API call without auth header → Should fail
3. Try with wrong auth header → Should fail
4. Try with correct auth header → Should work

---

## ✅ Checklist

**Reservation Form:**
- [ ] Displays with premium design
- [ ] Guest selection works
- [ ] Date picker works
- [ ] Time selection works
- [ ] Phone formatting works
- [ ] Email autocomplete works
- [ ] Form submits successfully
- [ ] Success toast appears
- [ ] Form resets after submit

**Admin Panel:**
- [ ] Login works
- [ ] Dashboard displays
- [ ] Reservations load
- [ ] Filters work
- [ ] Status update works
- [ ] Delete works
- [ ] Logout works

**Premium Design:**
- [ ] Smooth animations
- [ ] Gentle hover effects
- [ ] Glass morphism cards
- [ ] Premium inputs
- [ ] Proper typography
- [ ] Responsive design

**Emails:**
- [ ] Owner notification sent
- [ ] Customer confirmation sent
- [ ] Premium HTML styling
- [ ] All details included

---

## 📞 Support

If something doesn't work:
1. Check browser console for errors
2. Check network tab for failed requests
3. Verify environment variables in Supabase
4. Check `/TEST_REPORT.md` for detailed info
5. Check `/diagnostic.js` for system health

---

**Happy Testing! 🎉**
