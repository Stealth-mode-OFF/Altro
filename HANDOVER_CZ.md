# Předávací dokument (Altro)

Tento dokument shrnuje stav projektu, jak jej spustit, vyvíjet a nasadit na Vercel. Je v češtině pro plynulý handover.

## 1) Přehled projektu
- Frontend: Vite + React (SWC plugin)
- Stylování: Tailwind/utility přístup + vlastní CSS
- Ikony: `lucide-react`
- Stav/překlady: vlastní kontext `LanguageContext`
- Build výstup: složka `build/`

## 2) Požadavky
- Node.js 18+
- NPM 9+

## 3) Konfigurace prostředí (DŮLEŽITÉ)

### Lokální vývoj
Vytvořte soubor `.env` v kořenovém adresáři projektu:

```bash
VITE_SUPABASE_URL=https://ovygqbkaosxqvtjstdyv.supabase.co
VITE_SUPABASE_ANON_KEY=<váš-anon-key>
```

⚠️ **Bezpečnost**: Nikdy necommitujte `.env` do gitu! Soubor je v `.gitignore`.

Vzorový soubor s placeholder hodnotami je v `.env.example`.

### Produkce (Vercel)
V Vercel projektu nastavte Environment Variables:
1. Otevřete Settings → Environment Variables
2. Přidejte:
   - `VITE_SUPABASE_URL` = `https://ovygqbkaosxqvtjstdyv.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `<váš-anon-key>`
3. Aplikujte na všechny prostředí (Production, Preview, Development)

### Kde najít Supabase credentials
1. Přihlaste se do [Supabase Dashboard](https://supabase.com/dashboard)
2. Vyberte projekt
3. Settings → API
4. Zkopírujte:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

## 4) Lokální vývoj
```bash
npm install
npm run dev
```
Aplikace poběží na http://localhost:3000/.

## 5) Build (produkce)
```bash
npm run build
```
Artefakty se vytvoří do složky `build/`.

## 6) Nasazení na Vercel
Projekt je připraven pro Vercel pomocí souboru vercel.json:
- buildCommand: `npm run build`
- outputDirectory: `build`
- SPA fallback: všechny cesty přesměrované na `index.html`
- Cache hlavičky pro statická aktiva v `/assets/`

Postup:
1. Propojte repo s Vercel (Import Project)
2. Build & Output: Vercel autodetekuje Vite, případně ručně nastavte `npm run build` a výstup `build`
3. ⚠️ **KRITICKÉ**: Nastavte Environment Variables (viz sekce 3)
4. Deploy spustí Vercel automaticky po pushi na `main`

## 7) Linting a formátování kódu

Pro udržení konzistentní kvality kódu jsou nastaveny:
- **ESLint** (TypeScript, React, jsx-a11y): `npm run lint`
- **Prettier** (formátování): `npm run format`

Doporučené workflow:
```bash
npm run format  # automatické formátování
npm run lint    # kontrola chyb a varování
```

## 8) Struktura složek

```
/workspaces/Altro/
├── src/
│   ├── components/      # Všechny React komponenty
│   ├── pages/          # Stránky (Home, Menu, Reservation, Admin...)
│   ├── hooks/          # Custom React hooks (useApi, useLanguage)
│   ├── contexts/       # React Context (LanguageContext)
│   ├── utils/          # Utility funkce, Supabase client
│   │   └── supabase/  # Supabase konfigurace (client.ts, env.ts, auth.ts)
│   ├── auth/          # AuthGuard komponenta pro admin ochranu
│   ├── assets/        # Obrázky, ikony, logo
│   └── public/        # Statické soubory (robots.txt, sitemap.xml)
├── build/             # Výstup po `npm run build` (není v gitu)
├── .env               # Lokální proměnné prostředí (není v gitu)
├── .env.example       # Šablona pro .env
├── vite.config.ts     # Konfigurace Vite (code-splitting, publicDir)
├── vercel.json        # Vercel nasazení (SPA fallback, cache headers)
├── HANDOVER_CZ.md     # Tento soubor
└── package.json       # NPM závislosti a skripty
```

## 9) Práce s obrázky a logem
- Logo: `src/assets/altro-logo.avif` – sjednoceno napříč aplikací (Header, Footer, Hero)
- Další obrázky uchovávejte v `src/assets/` a používejte moderní formáty (AVIF, WebP) kde je to možné

## 10) Překlady a navigace
- Překlady: kontext `LanguageContext` v `src/contexts/LanguageContext.tsx`
- Navigace: komponenta `src/components/Header.tsx` + utilita `navigate()`
- Jednostránková aplikace (SPA) – přesměrování na `index.html` zajištěno přes Vercel

## 11) Konvence verzování a Git
- PR šablona: `.github/PULL_REQUEST_TEMPLATE.md`
- Konvence commitů (CZ): `.github/COMMIT_CONVENTIONS_CZ.md`
- Doporučení: krátké, věcné commit zprávy v češtině (viz konvence)

## 12) Check-list před releasem
- [ ] Vytvořen a aktivován `.env` soubor s VITE_SUPABASE_URL a VITE_SUPABASE_ANON_KEY
- [ ] Environment variables nastaveny ve Vercel projektu
- [ ] `npm run build` prochází bez chyb
- [ ] Rychlá vizuální kontrola hlavních stránek (home, menu, kontakt)
- [ ] Ověřená responzivita (mobil/tablet/desktop)
- [ ] Základní SEO prvky (title, meta, sitemap, robots) v pořádku
- [ ] Logo zobrazeno pouze z `altro-logo.avif`
- [ ] Admin routes chráněny AuthGuard (vyžadují přihlášení)

## 13) Známé poznámky
- V `vite.config.ts` je nastaven `build.outDir = 'build'` – tomu odpovídá Vercel konfigurace
- V repozitáři může existovat i složka `dist/` z dřívějších buildů – pro nasazení se používá `build/`
- **Bezpečnost**: Nikdy necommitujte `.env` soubor do gitu – je v `.gitignore`
- **Admin přístup**: Chráněn AuthGuard komponentou, vyžaduje Supabase session
- **API klíče**: Public anon key je bezpečný pro frontend, service_role key NIKDY nesmí být na frontendu

## 14) Budoucí vylepšení (doporučené)
- [ ] Server-side validace v Supabase Edge Function pro /reservations endpoint
- [ ] Rate limiting (IP + email) v Edge Function
- [ ] Bot protection: hCaptcha nebo Cloudflare Turnstile na rezervačním formuláři
- [ ] Row Level Security (RLS) policies v Supabase databázi
- [ ] JWT a admin role verifikace v Edge Functions pro /admin/* endpoints
- [ ] Sentry error tracking integrace
- [ ] Vercel Analytics aktivace
- [ ] Optimalizace obrázků: konverze PNG → AVIF/WebP
- [ ] Vitest testy pro kritické komponenty (Reservation, AuthGuard)

V případě dotazů či rozšíření funkcí je projekt přehledně rozdělen na komponenty v `src/components/` a dokumentace je v `src/*.md` souborech.
