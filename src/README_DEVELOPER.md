# 🚀 Altro Da Tony - Developer Documentation

## 🏗️ Architecture

### Frontend Stack
- **React** with TypeScript
- **Tailwind CSS v4.0** for styling
- **Motion (Framer Motion)** for animations
- **Lucide React** for icons
- **Sonner** for toast notifications

### Data Storage
Currently using **localStorage** for:
- Daily menu items
- Regular menu items
- Reservation data

### Key Components

#### 1. AdminPanel (`/components/AdminPanel.tsx`)
- Password-protected admin interface
- Manage daily menu (soups, appetizers, mains, desserts)
- Manage regular menu (antipasti, pasta, pizza, dolci)
- Data persisted to localStorage

**Default password:** `altrodatony2024`

#### 2. DailyMenu (`/components/DailyMenu.tsx`)
- Displays current daily menu items
- Only shows if items exist in localStorage
- Grouped by category with elegant styling

#### 3. MenuShowcase (`/components/MenuShowcase.tsx`)
- Main menu display with categories
- Loads data from localStorage or falls back to default data
- Features category images and filtering

#### 4. Reservation (`/components/Reservation.tsx`)
- Reservation form with validation
- Saves data to localStorage
- Opens email client with pre-filled reservation details
- Email sent to: `rezervace@altrodatony.cz`

---

## 🔧 Setup & Development

### Installation
```bash
npm install
npm run dev
```

### Key Features
- ✅ Multi-language support (Czech, English, Italian)
- ✅ Responsive design (mobile-first)
- ✅ Admin panel for menu management
- ✅ Reservation system
- ✅ Image gallery
- ✅ Google Reviews integration ready

---

## 🗄️ Data Structure

### Daily Menu Item
```typescript
{
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'soup' | 'appetizer' | 'main' | 'dessert';
}
```

### Regular Menu Item
```typescript
{
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'antipasti' | 'pasta' | 'pizza' | 'dolci';
  signature?: boolean;
  spicy?: boolean;
}
```

### Reservation
```typescript
{
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  message: string;
  timestamp: string;
}
```

---

## 🎨 Design System

### Colors
- **Primary (Terracotta Red)**: `#C84A47`
- **Accent (Gold)**: `#D4AF37`
- **Secondary (Dark Navy)**: `#1A1A1A`

### Typography
- **Display/Headers**: Cormorant Garamond (serif)
- **Body**: Inter (sans-serif)

### Font Sizes
Managed via `/styles/globals.css` - do not override with Tailwind classes unless necessary.

---

## 🚀 Production Deployment

### Current Limitations (localStorage-based)
- ❌ Data only accessible from one browser/device
- ❌ Data lost if browser cache is cleared
- ❌ No automatic emails or notifications
- ❌ No reservation management dashboard

### Recommended Upgrades for Production

#### Option 1: Supabase Backend
**Benefits:**
- Real-time database sync
- Authentication & authorization
- Row-level security
- Automatic email triggers
- File storage for images

**Implementation:**
1. Create Supabase project
2. Set up tables: `daily_menu`, `regular_menu`, `reservations`
3. Replace localStorage calls with Supabase queries
4. Add email templates for reservation confirmations

#### Option 2: Custom API + Database
**Stack suggestion:**
- Node.js/Express backend
- PostgreSQL database
- SendGrid/Mailgun for emails
- Cloudinary for images

#### Option 3: Headless CMS
**Options:**
- Strapi
- Contentful
- Sanity.io

For menu management with non-technical users.

---

## 📧 Email Integration

### Current Implementation
- Uses `mailto:` protocol
- Opens user's email client
- Pre-fills subject and body

### Production Upgrade Options

#### 1. SendGrid/Mailgun API
```typescript
const sendReservationEmail = async (data: ReservationData) => {
  await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: 'rezervace@altrodatony.cz',
      subject: `Rezervace - ${data.name}`,
      template: 'reservation',
      data: data
    })
  });
};
```

#### 2. Supabase Edge Functions
```typescript
// Trigger email on new reservation insert
create trigger on_reservation_created
  after insert on reservations
  for each row execute function send_confirmation_email();
```

---

## 🔐 Security Considerations

### Current Setup
- ⚠️ Admin password in source code
- ⚠️ No rate limiting on reservations
- ⚠️ Client-side data storage only

### Production Recommendations
1. **Environment Variables**
   ```
   VITE_ADMIN_PASSWORD=strong_password_here
   VITE_API_URL=https://api.altrodatony.cz
   ```

2. **Backend Authentication**
   - JWT tokens
   - Session management
   - Role-based access control

3. **Rate Limiting**
   - Prevent spam reservations
   - CAPTCHA on forms

4. **GDPR Compliance**
   - Privacy policy
   - Cookie consent
   - Data deletion requests
   - Secure data storage

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Admin panel login
- [ ] Add/edit/delete daily menu items
- [ ] Add/edit/delete regular menu items
- [ ] Submit reservation form
- [ ] Language switching (CS/EN/IT)
- [ ] Mobile responsiveness
- [ ] Image loading
- [ ] Navigation smooth scrolling

### Future: Automated Testing
Consider adding:
- Jest for unit tests
- React Testing Library for component tests
- Cypress/Playwright for E2E tests

---

## 📱 Mobile Optimization

- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly button sizes (min 44x44px)
- Optimized images with WebP format
- Lazy loading for images

---

## 🌐 SEO & Performance

### Current Implementation
- Semantic HTML
- Alt tags on images
- Meta tags (add to index.html)

### Recommendations
1. **Add meta tags** in `index.html`:
   ```html
   <meta name="description" content="Altro Da Tony - Autentická italská restaurace v Praze">
   <meta property="og:title" content="Altro Da Tony">
   <meta property="og:image" content="/og-image.jpg">
   ```

2. **Structured Data** (JSON-LD):
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Restaurant",
     "name": "Altro Da Tony",
     "address": {
       "@type": "PostalAddress",
       "streetAddress": "Korunní 48",
       "addressLocality": "Praha 2",
       "postalCode": "120 00"
     }
   }
   ```

3. **Performance**:
   - Image optimization (use `next-gen formats`)
   - Code splitting
   - Lazy loading
   - CDN for static assets

---

## 🐛 Known Issues & TODOs

### Current
- [ ] Add reservation viewing in admin panel
- [ ] Add image upload for menu items
- [ ] Implement proper backend
- [ ] Add online ordering system
- [ ] Integrate Google Reviews API

### Nice to Have
- [ ] Dark mode toggle
- [ ] Print menu functionality
- [ ] QR code menu for tables
- [ ] Loyalty program integration
- [ ] Newsletter signup

---

## 📞 Support

For questions or issues, contact the development team.

---

**Built with ❤️ for Altro Da Tony**
*Last updated: December 2024*
