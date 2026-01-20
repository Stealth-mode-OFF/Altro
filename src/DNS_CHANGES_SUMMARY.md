# 📊 DNS Changes Summary - altrodatony.com

## 🔄 Přehled změn

Tento dokument ukazuje, co se mění v DNS záznamech při přechodu z Endora hostingu na Figma hosting.

---

## 📋 Srovnání: PŘED vs. PO

### ✏️ ZMĚNĚNO

| Typ | Host | PŘED (Endora) | PO (Figma) | Důvod |
|-----|------|---------------|------------|-------|
| **A** | @ | `62.109.151.80` | `204.69.207.1` | Přesměrování webu na Figma servery |

### ➕ PŘIDÁNO

| Typ | Host | Hodnota | Důvod |
|-----|------|---------|-------|
| **CNAME** | www | `sites.figma.net.` | Figma hosting pro www verzi |
| **TXT** | _figma_sites_verify_www | `v=e765e562-3888-4038-9776-a6761d9` | Verifikace domény v Figma |

### ➖ ODSTRANĚNO

| Typ | Host | Hodnota | Důvod |
|-----|------|---------|-------|
| **A** | * (wildcard) | `62.109.151.80` | Není potřebný s Figma hostingem |

### ✅ ZACHOVÁNO (BEZ ZMĚN)

| Typ | Host | Hodnota | Důvod |
|-----|------|---------|-------|
| **MX** | @ | `email1.endora.cz.` | Email musí fungovat |
| **MX** | @ | `email2.endora.cz.` | Email musí fungovat |
| **MX** | @ | `email3.endora.cz.` | Email musí fungovat |
| **MX** | @ | `email4.endora.cz.` | Email musí fungovat |
| **A** | mail | `62.109.151.33` | Mail server hostname |
| **A** | smtp | `62.109.151.33` | SMTP server hostname |
| **CNAME** | autoconfig | `autoconfig.endora.cz.` | Email autoconfig |
| **SRV** | _autodiscover._tcp | `autodiscover.webglobe.cz.` | Email autodiscovery |
| **TXT** | @ | `v=spf1 a mx include:_spf.endora.cz -all` | SPF record pro email |
| **TXT** | _dmarc | `v=DMARC1; p=none;` | DMARC policy |
| **NS** | @ | `ns1.endora.cz.` | Name server 1 |
| **NS** | @ | `ns2.endora.cz.` | Name server 2 |
| **NS** | @ | `ns3.endoraland.com.` | Name server 3 |

---

## 🎯 Klíčové body

### ✅ Co se ZMĚNÍ:
- **Web běží na Figma** místo Endora
- **Root doména** (`altrodatony.com`) → Figma server `204.69.207.1`
- **WWW subdoména** (`www.altrodatony.com`) → Figma přes CNAME

### ✅ Co ZŮSTANE:
- **Email 100% zachován** - všechny MX záznamy zůstávají
- **Mail servery** - Endora `email1-4.endora.cz`
- **SPF a DMARC** - email autentizace funguje
- **Name servery** - pořád Endora NS servery

### ⚠️ Co NEBUDE fungovat:
- **Starý web na Endora** hostingu (už se nebude zobrazovat)
- **Wildcard subdomény** (`*.altrodatony.com`) - pokud jste je používali

---

## 📊 Vizuální srovnání

### PŘED (Endora hosting):
```
altrodatony.com     → 62.109.151.80 (Endora web server)
*.altrodatony.com   → 62.109.151.80 (Endora web server)
email@altrodatony.com → email1-4.endora.cz (Email servery)
```

### PO (Figma hosting):
```
altrodatony.com       → 204.69.207.1 (Figma web server)
www.altrodatony.com   → sites.figma.net → Figma web
email@altrodatony.com → email1-4.endora.cz (Email servery) ← ZACHOVÁNO!
```

---

## 🔍 Kontrolní otázky

### Q: Přijdu o email?
**A:** ❌ NE! Všechny MX záznamy zůstávají, email funguje stejně jako předtím.

### Q: Musím měnit name servery (NS)?
**A:** ❌ NE! NS záznamy zůstávají na Endora (ns1.endora.cz, atd.)

### Q: Co se stane se starým webem na Endora?
**A:** ℹ️ Přestane být dostupný. Web bude nyní na Figma hostingu.

### Q: Budou fungovat subdomény (např. blog.altrodatony.com)?
**A:** ⚠️ Pouze pokud je přidáte do DNS. Wildcard `*` záznam se ruší.

### Q: Můžu to vrátit zpět?
**A:** ✅ ANO! Stačí změnit A záznam `@` zpět na `62.109.151.80`

---

## 📝 Checklist před změnou

Než začnete měnit DNS:

- [ ] ✅ Zálohujte si současnou DNS zónu (screenshot nebo export)
- [ ] ✅ Ujistěte se, že máte přístup do Endora admin panelu
- [ ] ✅ Připravte si Figma DNS hodnoty (jsou v souboru)
- [ ] ✅ Naplánujte změnu mimo špičku (večer/víkend)
- [ ] ✅ Informujte tým, že může být krátký výpadek (5-30 min)

---

## ⏱️ Timeline

### T+0 (Začátek):
- Změníte DNS záznamy v Endora panelu
- Uložíte změny

### T+5 minut:
- DNS změny se publikují na Endora NS serverech

### T+30 minut:
- První návštěvníci vidí nový web (Figma)
- Někteří ještě vidí starý web (cache)

### T+2-4 hodiny:
- Většina světa vidí nový web
- DNS propagace pokračuje

### T+24 hodin:
- 99% propagace dokončena
- Téměř všichni vidí nový web

### T+48 hodin:
- 100% propagace dokončena
- Všichni vidí nový web

---

## 🐛 Možné problémy během přechodu

### Problem 1: "Někteří uživatelé vidí starý web"
**Řešení:** Normální během DNS propagace. Počkejte 24-48h.

### Problem 2: "SSL certifikát nefunguje"
**Řešení:** 
1. Figma automaticky vytvoří SSL po verifikaci DNS
2. Může trvat až 1 hodinu po propagaci
3. Zkuste hard refresh (Ctrl+Shift+R)

### Problem 3: "Email nefunguje"
**Řešení:**
1. Zkontrolujte MX záznamy - musí být zachovány!
2. Zkontrolujte SPF a DMARC záznamy
3. Kontaktujte Endora support

---

## 📞 Podpora

Pokud něco nefunguje:

1. **První krok**: Počkejte 24 hodin na DNS propagaci
2. **Druhý krok**: Zkontrolujte DNS pomocí https://dnschecker.org
3. **Třetí krok**: Kontaktujte support:
   - **Endora** (DNS): support@endora.cz
   - **Figma** (hosting): support@figma.com

---

## ✅ Po úspěšné migraci

Když je vše hotovo:

- ✅ **Web funguje** na Figma hostingu
- ✅ **Email funguje** přes Endora servery
- ✅ **HTTPS** aktivní (zelený zámek)
- ✅ **WWW i non-WWW** verze fungují
- ✅ **Figma dashboard** ukazuje "Active" status

**Gratuluji! Migrace úspěšná! 🎉**

---

## 📚 Související dokumenty

- **Kompletní DNS zóna:** [DNS_ZONE_ALTRODATONY.txt](./DNS_ZONE_ALTRODATONY.txt)
- **Krok-za-krokem návod:** [DNS_SETUP_GUIDE.md](./DNS_SETUP_GUIDE.md)
- **Deployment guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**Poslední update:** 9. prosince 2024  
**Serial:** 2025120903
