# 🚀 NASAZENÍ NA PRODUKCI - Altro Da Tony

**Stav:** ✅ Web je připraven k nasazení!  
**Datum:** 22. ledna 2026

---

## ✅ Kontrola před nasazením

### 1. Backend (Supabase) ✅
- [x] API plně funkční
- [x] Databázové indexy optimalizovány
- [x] Email služba (Resend) ověřena
- [x] Doména `send.altrodatony.com` ověřena
- [x] DKIM záznamy v pořádku
- [x] Environment variables nastaveny
- [x] Rezervační systém testován

### 2. Frontend ✅
- [x] React komponenty připraveny
- [x] Routing funguje
- [x] Admin panel zabezpečen
- [x] Multi-language podpora (CS/EN/IT)
- [x] Responzivní design
- [x] Obrázky optimalizovány

### 3. API & Database ✅
- [x] KV Store funkční
- [x] Email templates připraveny
- [x] Menu API endpointy
- [x] Reservation API endpointy
- [x] Error handling implementován

---

## 🎯 3 KROKY K NASAZENÍ

### KROK 1: Push na GitHub ⏱️ 2 minuty

**Windows:**
```bash
./push-to-github.bat
```

**Mac/Linux:**
```bash
chmod +x push-to-github.sh
./push-to-github.sh
```

**Nebo manuálně:**
```bash
git init
git add .
git commit -m "🚀 Production ready - Altro Da Tony"
git branch -M main
git remote add origin https://github.com/Stealth-mode-OFF/altrodatony.git
git push -u origin main
```

📝 **Poznámka:** Budete potřebovat GitHub Personal Access Token

---

### KROK 2: Deploy na Vercel ⏱️ 5 minut

1. **Přihlaste se na Vercel:**
   - Jděte na https://vercel.com
   - Přihlaste se pomocí GitHub účtu

2. **Import projektu:**
   - Klikněte "Add New Project"
   - Vyberte repository `altrodatony`
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Environment Variables:**
   
   Přidejte tyto 3 klíče (najdete v `/utils/supabase/info.tsx`):
   
   ```
   VITE_SUPABASE_URL = https://[váš-projekt].supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGc...
   VITE_SUPABASE_SERVICE_ROLE_KEY = eyJhbGc...
   ```

4. **Deploy:**
   - Klikněte "Deploy"
   - Počkejte 2-3 minuty
   - ✅ Vaše aplikace je živá na `https://[projekt].vercel.app`

---

### KROK 3: Propojení domény ⏱️ 24-48 hodin

#### A) Přidat doménu ve Vercel

V Vercel dashboardu:
1. Settings → Domains
2. Add Domain: `altrodatony.com`
3. Add Domain: `www.altrodatony.com`

#### B) Změnit DNS záznamy v Endora

Přihlaste se na https://admin.endora.cz a upravte:

**1. A záznam (Root domain):**
```
Typ:   A
Host:  @
Starý: 62.109.151.80
NOVÝ:  76.76.21.21  ← Vercel IP
TTL:   3600
```

**2. CNAME záznam (WWW):**
```
Typ:     CNAME
Host:    www
Hodnota: cname.vercel-dns.com.
TTL:     3600
```

**⚠️ DŮLEŽITÉ:** NESMAŽTE tyto záznamy (email by přestal fungovat!):
- MX záznamy pro `@altrodatony.com`
- TXT záznamy pro SPF/DKIM
- CNAME pro `send.altrodatony.com`

#### C) Nastavení ve Vercel

Po přidání domén ve Vercel:
1. Nastavte `www.altrodatony.com` jako **Primary Domain**
2. Zapněte redirect: `altrodatony.com` → `www.altrodatony.com`

---

## ⏱️ Timeline

| Čas | Co se děje |
|-----|------------|
| **0-5 min** | Push na GitHub ✅ |
| **5-10 min** | Vercel build & deploy ✅ |
| **10 min - 1h** | DNS propagace začíná 🔄 |
| **1-4 hodiny** | Většina světa vidí nový web 🌍 |
| **24-48 hodin** | 100% DNS propagace + SSL certifikát 🔒 |

---

## 🔍 Kontrola průběhu

### Okamžitě po nasazení:

**1. Vercel URL funguje?**
```
https://[váš-projekt].vercel.app
```
✅ Pokud vidíte web → Vercel nasazení úspěšné!

**2. API funguje?**
```
https://[váš-projekt].vercel.app/api/test
```
✅ Pokud dostanete odpověď → Backend je připojen!

---

### Po 1-4 hodinách:

**3. Doména je propagována?**

Zkontrolujte na: https://dnschecker.org
```
Doména:    altrodatony.com
Typ:       A
Očekáváno: 76.76.21.21
```

✅ Zelené fajfky po celém světě = propagováno!

**4. Vercel vidí DNS?**

Ve Vercel → Settings → Domains:
```
altrodatony.com     → Valid Configuration ✅
www.altrodatony.com → Valid Configuration ✅
```

---

### Po 24-48 hodinách:

**5. SSL certifikát aktivní?**

Jděte na: https://www.altrodatony.com

✅ Zelený zámek 🔒 = SSL funguje!

**6. Email funguje?**

Otestujte rezervaci:
```
1. Vyplňte rezervační formulář
2. Zkontrolujte, zda přišel email
3. Zkontrolujte odesílatele: info@send.altrodatony.com
```

✅ Email dorazil = Vše funguje!

---

## 🐛 Troubleshooting

### Problem 1: "Invalid DNS Configuration" ve Vercel

**Příčina:** DNS ještě není propagované  
**Řešení:**
1. Počkejte 1-4 hodiny
2. Zkontrolujte DNS na https://dnschecker.org
3. Klikněte "Refresh" ve Vercel

---

### Problem 2: "Mixed Content Error"

**Příčina:** HTTP odkazy místo HTTPS  
**Řešení:**
1. Zkontrolujte konzoli prohlížeče (F12)
2. Najděte HTTP odkazy
3. Změňte na HTTPS
4. Push & redeploy

---

### Problem 3: "Environment Variables Not Found"

**Příčina:** Chybí environment variables ve Vercel  
**Řešení:**
1. Vercel → Settings → Environment Variables
2. Přidejte všechny 3 klíče (viz KROK 2.3)
3. Redeploy: Deployments → ... → Redeploy

---

### Problem 4: Email nefunguje po změně DNS

**Příčina:** Smazali jste MX záznamy  
**Řešení:**
1. Obnovte MX záznamy v Endora
2. Počkejte 1-2 hodiny na propagaci
3. Otestujte email

---

## 📊 Co se stane po nasazení

### ✅ Web bude dostupný na:
```
https://www.altrodatony.com
https://altrodatony.com (redirect na www)
```

### ✅ Funkční features:
- 🍝 Rezervační systém
- 📧 Automatické email potvrzení
- 🥗 Denní menu (editovatelné šéfkuchařem)
- 📋 Hlavní menu (editovatelné adminem)
- 🖼️ Galerie
- ⭐ Google recenze
- 🌍 3 jazyky (CS/EN/IT)
- 🔒 HTTPS & SSL

### ✅ Admin panel:
```
URL: https://www.altrodatony.com/admin
Heslo: [vaše heslo z kódu]
```

---

## 📞 Kontakty pro podporu

**Vercel (hosting):**
- 📚 Docs: https://vercel.com/docs
- 💬 Discord: https://vercel.com/discord

**Endora (DNS):**
- 📧 Email: support@endora.cz
- 📞 Telefon: +420 234 262 000

**Supabase (database):**
- 📚 Docs: https://supabase.com/docs
- 💬 Discord: https://discord.supabase.com

**Resend (email):**
- 📧 Email: support@resend.com
- 📚 Docs: https://resend.com/docs

---

## 🎉 Po úspěšném nasazení

Gratulujeme! 🍝 Váš web je nyní živý!

### Doporučené kroky:

1. **SEO optimalizace:**
   ```
   - Google Search Console
   - Google Analytics
   - Bing Webmaster Tools
   ```

2. **Monitoring:**
   ```
   - Vercel Analytics (už aktivní)
   - Supabase Dashboard
   - Resend Dashboard
   ```

3. **Backup:**
   ```
   - Export dat z Supabase (týdně)
   - Git push pravidelně
   ```

4. **Updates:**
   ```
   git add .
   git commit -m "Update..."
   git push
   # Vercel automaticky redeploy!
   ```

---

## 🚀 Quick Command Summary

```bash
# 1. Push na GitHub
git add .
git commit -m "Update"
git push

# 2. Vercel redeploy
# (automatický po push)

# 3. Kontrola DNS
curl -I https://www.altrodatony.com

# 4. Test API
curl https://www.altrodatony.com/api/health

# 5. Sledování logů
# Vercel Dashboard → Functions → Logs
```

---

**✅ PŘIPRAVENO K NASAZENÍ!**

Máte všechny nástroje a instrukce. Stačí jen spustit `./push-to-github.sh` nebo `.bat` a pak postupovat podle kroků výše.

**Hodně štěstí! 🍀**

---

_Poslední update: 22. ledna 2026_  
_Status: ✅ Production Ready_
