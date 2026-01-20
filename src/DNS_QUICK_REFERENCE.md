# ⚡ DNS Quick Reference - altrodatony.com

**Rychlý návod pro nastavení DNS na Figma hosting**

---

## 🎯 TŘI ZMĚNY, které musíte udělat:

### 1️⃣ ZMĚNIT A záznam
```
Typ:      A
Host:     @
Stará hodnota: 62.109.151.80
NOVÁ HODNOTA:  204.69.207.1  ← ZMĚNIT NA TOTO
TTL:      3600
```

### 2️⃣ PŘIDAT CNAME záznam
```
Typ:      CNAME
Host:     www
Hodnota:  sites.figma.net.  ← S TEČKOU NA KONCI!
TTL:      3600
```

### 3️⃣ PŘIDAT TXT záznam
```
Typ:      TXT
Host:     _figma_sites_verify_www
Hodnota:  v=e765e562-3888-4038-9776-a6761d9
TTL:      3600
```

---

## ✅ BONUS: Smazat (pokud existuje)

```
Typ:      A
Host:     * (wildcard)
Hodnota:  62.109.151.80
Akce:    → SMAZAT
```

---

## ⚠️ NEMĚNIT! (Email záznamy)

Tyto záznamy **NECHTE BEZ ZMĚN**:

```
✅ MX:    @ → email1.endora.cz.
✅ MX:    @ → email2.endora.cz.
✅ MX:    @ → email3.endora.cz.
✅ MX:    @ → email4.endora.cz.
✅ TXT:   @ → "v=spf1..."
✅ TXT:   _dmarc → "v=DMARC1..."
✅ A:     mail → 62.109.151.33
✅ A:     smtp → 62.109.151.33
✅ CNAME: autoconfig → autoconfig.endora.cz.
```

---

## 🔍 Kontrola po nastavení

1. **Počkejte 30-60 minut** na DNS propagaci
2. Testujte na: **https://dnschecker.org**
3. Zadejte: `altrodatony.com`
4. Mělo by ukazovat: `204.69.207.1` ✅

---

## 📞 V případě problémů

**Endora support:** support@endora.cz | +420 234 262 000  
**Figma support:** support@figma.com

---

## 📚 Podrobné návody

- **Kompletní DNS zóna:** [DNS_ZONE_ALTRODATONY.txt](./DNS_ZONE_ALTRODATONY.txt)
- **Krok-za-krokem:** [DNS_SETUP_GUIDE.md](./DNS_SETUP_GUIDE.md)
- **Srovnání změn:** [DNS_CHANGES_SUMMARY.md](./DNS_CHANGES_SUMMARY.md)

---

**🚀 Hotovo! Po propagaci (24-48h) bude web live na Figma!**
