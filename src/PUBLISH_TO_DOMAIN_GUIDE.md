# 🚀 Návod: Publikování na www.altrodatony.com

## 📋 Přehled procesu

Pro publikování webu na **www.altrodatony.com** musíte udělat **3 kroky**:

1. ✅ Deploy kódu na hosting (GitHub + Vercel)
2. ✅ Nastavit DNS záznamy (Endora.cz)
3. ✅ Propojit doménu s hostingem (Vercel)

---

## KROK 1: Deploy na GitHub + Vercel

### A) Vytvoření GitHub repository

1. Jděte na https://github.com/new
2. Vytvořte nové repository:
   - **Name:** `altrodatony-website`
   - **Visibility:** Public nebo Private (dle preference)
   - **Initialize:** NEZAŠKRTÁVEJTE (repo musí být prázdné)
3. Klikněte **"Create repository"**

### B) Nahrání kódu do GitHub

Otevřete terminál/příkazovou řádku a spusťte:

```bash
# Inicializace Git repository
git init

# Přidání všech souborů
git add .

# První commit
git commit -m "Initial commit - Altro Da Tony website"

# Připojení k GitHub repository (NAHRAĎTE 'your-username')
git remote add origin https://github.com/your-username/altrodatony-website.git

# Nahrání na GitHub
git branch -M main
git push -u origin main
```

### C) Deploy na Vercel

1. Jděte na https://vercel.com
2. Přihlaste se pomocí GitHub účtu
3. Klikněte **"Add New Project"**
4. Vyberte repository `altrodatony-website`
5. **Framework Preset:** Vite
6. **Build Command:** `npm run build`
7. **Output Directory:** `dist`
8. **Environment Variables:** Přidejte tyto 3:
   ```
   SUPABASE_URL = vaše-supabase-url
   SUPABASE_ANON_KEY = váš-anon-key
   SUPABASE_SERVICE_ROLE_KEY = váš-service-role-key
   ```
9. Klikněte **"Deploy"**
10. Počkejte 2-3 minuty na build ✅

---

## KROK 2: Nastavení DNS záznamů

### Přihlášení do Endora

1. Jděte na https://admin.endora.cz
2. Přihlaste se
3. Najděte doménu **altrodatony.com**
4. Otevřete **"DNS záznamy"**

### Změny DNS záznamů

⚠️ **DŮLEŽITÉ:** Pokud používáte **Vercel**, ne Figma hosting, DNS záznamy budou JINÉ!

#### Pro VERCEL hosting (doporučeno):

1. **Změnit A záznam pro root (@):**
   ```
   Typ:   A
   Host:  @
   Starý: 62.109.151.80
   NOVÝ:  76.76.21.21  ← Vercel IP
   TTL:   3600
   ```

2. **Přidat/změnit CNAME pro www:**
   ```
   Typ:     CNAME
   Host:    www
   Hodnota: cname.vercel-dns.com.  ← S TEČKOU!
   TTL:     3600
   ```

3. **ZACHOVAT všechny MX a email záznamy** (nic neměnit!)

### Alternativa: Figma hosting

Pokud chcete použít Figma hosting místo Vercel:

1. **A záznam:**
   ```
   @   → 204.69.207.1
   ```

2. **CNAME:**
   ```
   www → sites.figma.net.
   ```

3. **TXT verifikace:**
   ```
   _figma_sites_verify_www → v=e765e562-3888-4038-9776-a6761d9
   ```

---

## KROK 3: Propojení domény ve Vercel

### A) Přidání domény do Vercel projektu

1. V Vercel dashboardu otevřete váš projekt
2. Klikněte na **"Settings"**
3. V levém menu: **"Domains"**
4. Klikněte **"Add"**
5. Zadejte: **`altrodatony.com`**
6. Klikněte **"Add"**
7. Opakujte pro: **`www.altrodatony.com`**

### B) Verifikace DNS

Vercel vám ukáže stav DNS:

```
altrodatony.com     → Pending / Invalid DNS
www.altrodatony.com → Pending / Invalid DNS
```

**To je OK!** Musíte počkat na DNS propagaci.

### C) Nastavení redirectu (volitelné)

V Vercel → Settings → Domains:

- **Primary domain:** `www.altrodatony.com`
- **Redirect:** `altrodatony.com` → `www.altrodatony.com`

---

## ⏱️ Čekání na propagaci

### Timeline:
- **5 minut:** DNS změny publikovány
- **30-60 minut:** První propagace
- **2-4 hodiny:** Většina světa vidí nový web
- **24-48 hodin:** 100% propagace

### Kontrola propagace:

**Online nástroj:**
```
https://dnschecker.org
→ Zadejte: altrodatony.com
→ Typ: A
→ Mělo by ukazovat: 76.76.21.21 (Vercel)
```

**Vercel dashboard:**
Po propagaci se status změní:
```
altrodatony.com     → Valid Configuration ✅
www.altrodatony.com → Valid Configuration ✅
```

---

## 🔒 SSL Certifikát

### Automatické vytvoření:

Vercel **automaticky vytvoří** Let's Encrypt SSL certifikát po:
1. Úspěšné DNS verifikaci
2. Propagaci DNS (může trvat až 24h)

### Kontrola SSL:

V Vercel → Settings → Domains:
```
altrodatony.com     ✅ SSL: Active
www.altrodatony.com ✅ SSL: Active
```

---

## ✅ Finální kontrola

Po úspěšné propagaci (24-48h):

### 1. Web funguje:
```
✅ https://altrodatony.com
✅ https://www.altrodatony.com
✅ Redirect funguje (altrodatony.com → www)
✅ SSL certifikát (zelený zámek 🔒)
```

### 2. Email funguje:
```
✅ Můžete posílat emaily
✅ Můžete přijímat emaily
✅ SPF/DMARC funguje
```

### 3. Rezervační systém funguje:
```
✅ Formulář ukládá do Supabase
✅ Admin panel zobrazuje rezervace
✅ Denní menu se načítá z databáze
```

---

## 🐛 Troubleshooting

### Problem: "Invalid DNS Configuration" ve Vercel

**Řešení:**
1. Zkontrolujte A záznam: `@` → `76.76.21.21`
2. Zkontrolujte CNAME: `www` → `cname.vercel-dns.com.`
3. Počkejte 24 hodin na propagaci
4. Klikněte **"Refresh"** ve Vercel

### Problem: "SSL Certificate Error"

**Řešení:**
1. Počkejte 24 hodin po DNS propagaci
2. SSL se vytvoří automaticky
3. Zkuste hard refresh (Ctrl+Shift+R)

### Problem: "Mixed Content Warning"

**Řešení:**
1. Všechny odkazy musí být HTTPS
2. Zkontrolujte `<img>` tagy
3. Zkontrolujte API calls

### Problem: "Email nefunguje"

**Řešení:**
1. Zkontrolujte MX záznamy - NESMÍ se změnit!
2. MX musí ukazovat na `email1-4.endora.cz`
3. Kontaktujte Endora support

---

## 📊 Srovnání: Vercel vs. Figma hosting

| Funkce | Vercel | Figma |
|--------|--------|-------|
| **Deployment** | GitHub → Auto-deploy | Manuální export |
| **SSL** | Automatický | Automatický |
| **Custom domain** | ✅ Ano | ✅ Ano |
| **Serverless functions** | ✅ Ano | ❌ Ne |
| **Edge Functions** | ✅ Ano | ❌ Ne |
| **Database (Supabase)** | ✅ Plná podpora | ⚠️ Omezená |
| **Environment variables** | ✅ Ano | ❌ Ne |
| **CI/CD** | ✅ Automatický | ❌ Manuální |
| **Analytics** | ✅ Ano | ⚠️ Základní |

**🏆 Doporučení:** Používejte **Vercel**, protože máte backend (Supabase) a potřebujete environment variables.

---

## 🎯 Doporučený workflow

### Pro Vercel (DOPORUČENO):

```
Váš kód → GitHub → Vercel → www.altrodatony.com
            ↓
      Auto-deploy při každém push
```

**Výhody:**
- ✅ Automatické nasazení při každé změně
- ✅ Preview URLs pro testování
- ✅ Rollback na předchozí verze
- ✅ Plná podpora Supabase
- ✅ Environment variables

### Pro Figma (ALTERNATIVA):

```
Figma → Export → Figma Sites → www.altrodatony.com
```

**Výhody:**
- ✅ Jednodušší pro designéry
- ✅ Přímý export z Figma

**Nevýhody:**
- ❌ Bez Supabase podpory
- ❌ Bez CI/CD
- ❌ Manuální update

---

## 📝 Quick Checklist

Než začnete:

- [ ] Máte GitHub účet
- [ ] Máte Vercel účet
- [ ] Máte přístup k Endora admin panelu
- [ ] Máte Supabase credentials (URL, keys)
- [ ] Kód je ready (všechny soubory)

Kroky:

- [ ] 1. Push kódu na GitHub
- [ ] 2. Import do Vercel
- [ ] 3. Přidat environment variables
- [ ] 4. Deploy na Vercel
- [ ] 5. Změnit DNS záznamy v Endora
- [ ] 6. Přidat doménu ve Vercel
- [ ] 7. Počkat 24-48h na propagaci
- [ ] 8. Zkontrolovat SSL certifikát
- [ ] 9. Otestovat web + email
- [ ] 10. ✅ DONE!

---

## 🚀 Rychlý start (TL;DR)

```bash
# 1. GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/altrodatony-website.git
git push -u origin main

# 2. Vercel
# → Jděte na vercel.com
# → Import GitHub repo
# → Add environment variables
# → Deploy

# 3. DNS (v Endora admin)
# @ (A)    → 76.76.21.21
# www (CNAME) → cname.vercel-dns.com.

# 4. Vercel Domains
# → Add altrodatony.com
# → Add www.altrodatony.com
# → Set www as primary

# 5. Wait 24-48h ⏱️
# → DNS propagace
# → SSL generování

# 6. ✅ LIVE!
# https://www.altrodatony.com
```

---

## 📞 Podpora

**Vercel:**
- 📧 support@vercel.com
- 📚 https://vercel.com/docs

**Endora (DNS):**
- 📧 support@endora.cz
- 📞 +420 234 262 000

**Supabase:**
- 📚 https://supabase.com/docs

---

## ✅ Po úspěšném nasazení

Gratuluji! 🎉 Váš web je nyní live na:

**🌐 https://www.altrodatony.com**

S plně funkčním:
- ✅ Rezervačním systémem
- ✅ Denním menu (editovatelné admin panelem)
- ✅ Hlavním menu (editovatelné)
- ✅ Galerií fotek
- ✅ Google recenzemi
- ✅ Emailem (@altrodatony.com)
- ✅ 3 jazyky (CZ, EN, IT)
- ✅ SSL certifikátem (HTTPS)

**🚀 Web je production ready!**

---

**Poslední update:** 9. prosince 2024  
**Autor:** AI Assistant pro Altro Da Tony
