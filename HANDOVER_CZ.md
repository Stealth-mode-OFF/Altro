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

## 3) Lokální vývoj
```bash
npm install
npm run dev
```
Aplikace poběží na http://localhost:3000/.

## 4) Build (produkce)
```bash
npm run build
```
Artefakty se vytvoří do složky `build/`.

## 5) Nasazení na Vercel
Projekt je připraven pro Vercel pomocí souboru vercel.json:
- buildCommand: `npm run build`
- outputDirectory: `build`
- SPA fallback: všechny cesty přesměrované na `index.html`
- Cache hlavičky pro statická aktiva v `/assets/`

Postup:
1. Propojte repo s Vercel (Import Project)
2. Build & Output: Vercel autodetekuje Vite, případně ručně nastavte `npm run build` a výstup `build`
3. Proměnné prostředí (pokud používáte Supabase nebo jiné API):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy spustí Vercel automaticky po pushi na `main`

## 6) Struktura složek (zkráceně)
- `src/` – zdrojové kódy (komponenty, styly, kontexty, utilitky)
- `public/` – veřejné soubory (robots, sitemap)
- `build/` – produkční výstup po buildu
- `scripts/` – nástroje (např. optimalizace obrázků)

## 7) Práce s obrázky a logem
- Logo: `src/assets/altro-logo.avif` – sjednoceno napříč aplikací (Header, Footer, Hero)
- Další obrázky uchovávejte v `src/assets/` a používejte moderní formáty (AVIF, WebP) kde je to možné

## 8) Překlady a navigace
- Překlady: kontext `LanguageContext` v `src/contexts/LanguageContext.tsx`
- Navigace: komponenta `src/components/Header.tsx` + utilita `navigate()`
- Jednostránková aplikace (SPA) – přesměrování na `index.html` zajištěno přes Vercel

## 9) Konvence verzování a Git
- PR šablona: `.github/PULL_REQUEST_TEMPLATE.md`
- Konvence commitů (CZ): `.github/COMMIT_CONVENTIONS_CZ.md`
- Doporučení: krátké, věcné commit zprávy v češtině (viz konvence)

## 10) Check-list před releasem
- [ ] `npm run build` prochází bez chyb
- [ ] Rychlá vizuální kontrola hlavních stránek (home, menu, kontakt)
- [ ] Ověřená responzivita (mobil/tablet/desktop)
- [ ] Základní SEO prvky (title, meta, sitemap, robots) v pořádku
- [ ] Logo zobrazeno pouze z `altro-logo.avif`

## 11) Známé poznámky
- V `vite.config.ts` je nastaven `build.outDir = 'build'` – tomu odpovídá Vercel konfigurace
- V repozitáři může existovat i složka `dist/` z dřívějších buildů – pro nasazení se používá `build/`

V případě dotazů či rozšíření funkcí je projekt přehledně rozdělen na komponenty v `src/components/` a dokumentace je v `src/*.md` souborech.
