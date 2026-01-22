# Bezpečnostní dokumentace / Security Documentation

## 🔒 Přehled bezpečnostních opatření

Tento projekt implementuje následující bezpečnostní praktiky:

### 1. Environment Variables (Proměnné prostředí)

**✅ Implementováno:**
- Všechny API klíče a URL jsou načítány z environment variables
- `.env` soubor je v `.gitignore` → nezobrazuje se v gitu
- Poskytnuty `.env.example` a `.env.production.example` jako šablony
- Hardcoded credentials odstraněny z repozitáře

**Použití:**
```typescript
// src/utils/supabase/env.ts
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
```

**⚠️ DŮLEŽITÉ:**
- NIKDY necommitujte `.env` do gitu
- VITE_SUPABASE_ANON_KEY je public key → bezpečný pro frontend
- Service role key NIKDY nesmí být na frontendu

### 2. Authentication & Authorization (Autentizace a autorizace)

**✅ Implementováno (client-side):**
- `AuthGuard` komponenta chrání admin routes
- Kontroluje Supabase session před zobrazením admin panelu
- Redirect na přihlášení při chybějící session

**⚠️ KRITICKÉ - Vyžaduje doplnění:**
Client-side ochrana je pouze UX layer. Pro skutečnou bezpečnost je nutné:

1. **Server-side JWT verifikace** v Supabase Edge Functions:
```typescript
// Příklad pro Edge Function
import { createClient } from '@supabase/supabase-js'

export async function handler(req: Request) {
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return new Response('Unauthorized', { status: 401 })
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')! // server-only
  )
  
  const { data: { user }, error } = await supabase.auth.getUser(
    authHeader.replace('Bearer ', '')
  )
  
  if (error || !user) return new Response('Unauthorized', { status: 401 })
  
  // Zkontrolovat admin roli
  if (user.user_metadata?.role !== 'admin') {
    return new Response('Forbidden', { status: 403 })
  }
  
  // Pokračovat s handler logikou...
}
```

2. **Row Level Security (RLS)** v Supabase databázi:
   - Zapnout RLS policies na všech tabulkách
   - Nastavit policies pro read/write/delete operace
   - Ověřit že pouze admin může upravovat data

### 3. Input Validation (Validace vstupů)

**✅ Implementováno (client-side):**
- Základní validace formulářů (email, telefon, počet hostů)
- HTML5 validace atributy (required, type="email", pattern)

**⚠️ KRITICKÉ - Vyžaduje doplnění:**
Client-side validace lze obejít. Nutné přidat:

1. **Server-side validace** v Edge Functions:
```typescript
import { z } from 'zod'

const reservationSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[0-9\s\-()]+$/),
  guests: z.number().int().min(1).max(20),
  date: z.string().datetime(),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  message: z.string().max(500).optional(),
  consent: z.boolean().refine(val => val === true)
})

try {
  const data = reservationSchema.parse(await req.json())
  // Pokračovat s vytváření rezervace...
} catch (error) {
  return new Response(JSON.stringify({ error: error.errors }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' }
  })
}
```

### 4. Rate Limiting (Omezení rychlosti požadavků)

**❌ NEIMPLEMENTOVÁNO - KRITICKÉ:**

Rezervační formulář je zranitelný vůči spam útokům. Doporučené řešení:

1. **IP-based rate limiting** v Edge Function:
```typescript
// Použít Upstash Redis nebo Supabase KV
const rateLimitKey = `ratelimit:reservation:${clientIP}`
const requests = await redis.incr(rateLimitKey)
if (requests === 1) await redis.expire(rateLimitKey, 3600) // 1 hodina

if (requests > 5) {
  return new Response('Too many requests', { status: 429 })
}
```

2. **Email-based rate limiting**:
```typescript
// Maximálně 3 rezervace za 24h na jeden email
const emailKey = `ratelimit:email:${email}`
const emailRequests = await redis.incr(emailKey)
if (emailRequests === 1) await redis.expire(emailKey, 86400) // 24 hodin

if (emailRequests > 3) {
  return new Response('Too many reservations from this email', { status: 429 })
}
```

### 5. Bot Protection (Ochrana proti botům)

**❌ NEIMPLEMENTOVÁNO - DOPORUČENÉ:**

Doporučená implementace:

1. **hCaptcha nebo Cloudflare Turnstile** na rezervačním formuláři:
```typescript
// Frontend - Reservation.tsx
import Turnstile from '@marsidev/react-turnstile'

<Turnstile
  siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
  onSuccess={(token) => setCaptchaToken(token)}
/>
```

2. **Server-side verifikace**:
```typescript
// Edge Function
const captchaResponse = await fetch(
  'https://challenges.cloudflare.com/turnstile/v0/siteverify',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: Deno.env.get('TURNSTILE_SECRET_KEY'),
      response: captchaToken,
      remoteip: clientIP
    })
  }
)

const result = await captchaResponse.json()
if (!result.success) {
  return new Response('Captcha verification failed', { status: 403 })
}
```

### 6. Content Security Policy (CSP)

**⚠️ ČÁSTEČNĚ IMPLEMENTOVÁNO:**

Vercel automaticky přidává některé security headers, ale doporučujeme přidat vlastní CSP:

```json
// vercel.json - přidat do headers
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co https://challenges.cloudflare.com;"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=()"
        }
      ]
    }
  ]
}
```

### 7. Error Handling & Logging

**✅ ČÁSTEČNĚ IMPLEMENTOVÁNO:**
- Chyby zobrazovány uživateli v UI
- Console.error pro debugging

**📋 DOPORUČENÉ VYLEPŠENÍ:**

Integrace Sentry pro production error tracking:

```typescript
// main.tsx
import * as Sentry from "@sentry/react";

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}
```

## 📋 Bezpečnostní checklist před nasazením

- [x] Environment variables nastaveny (lokálně + Vercel)
- [x] `.env` v `.gitignore`
- [x] Hardcoded credentials odstraněny
- [x] Client-side AuthGuard implementován
- [ ] **Server-side JWT verifikace v Edge Functions**
- [ ] **RLS policies aktivovány v Supabase**
- [ ] **Server-side input validace (Zod/Yup)**
- [ ] **Rate limiting implementováno**
- [ ] **Bot protection (hCaptcha/Turnstile)**
- [ ] **CSP headers konfigurovány**
- [ ] **Error tracking (Sentry)**
- [ ] Security audit třetích stran (OWASP ZAP, npm audit)

## 🔍 Pravidelná údržba

### Měsíčně:
- `npm audit` - kontrola zranitelností v závislostech
- `npm outdated` - aktualizace balíčků
- Review Supabase audit logs

### Kvartálně:
- Penetrační testování
- Review RLS policies
- Audit admin přístupů

## 📞 Hlášení bezpečnostních problémů

Pokud objevíte bezpečnostní zranitelnost, NEKOMUNIKUJTE ji veřejně (issues, PR).
Kontaktujte: [security@example.com] (nahraďte skutečným emailem)

---

**Last updated:** 2025-01-XX
**Responsible:** DevOps Team
