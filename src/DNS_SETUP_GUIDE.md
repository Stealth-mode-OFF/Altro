# 🌐 DNS Setup Guide - altrodatony.com

## 📋 Přehled

Tento návod vám pomůže nastavit DNS záznamy pro doménu **altrodatony.com** tak, aby:
- ✅ Web běžel na Figma hostingu
- ✅ Email fungoval přes Endora mail servery
- ✅ WWW i non-WWW verze fungovaly správně

---

## 🎯 DNS záznamy pro Figma

Z Figma dashboardu potřebujete nastavit tyto 3 záznamy:

| Type | Host | Value | Priorita |
|------|------|-------|----------|
| **A** | @ | `204.69.207.1` | - |
| **CNAME** | www | `sites.figma.net.` | - |
| **TXT** | _figma_sites_verify_www | `v=e765e562-3888-4038-9776-a6761d9` | - |

---

## 🔧 Postup v Endora admin panelu

### Krok 1: Přihlášení
1. Jděte na https://admin.endora.cz (nebo váš Endora panel)
2. Přihlaste se svými přihlašovacími údaji
3. Najděte doménu **altrodatony.com**

### Krok 2: Otevřete DNS správu
1. Klikněte na doménu **altrodatony.com**
2. Najděte sekci **"DNS záznamy"** nebo **"Správa DNS"**
3. Měli byste vidět seznam současných DNS záznamů

### Krok 3: Upravte A záznam pro root (@)
**Najděte tento záznam:**
```
@    IN A    62.109.151.80
```

**Změňte na:**
```
@    IN A    204.69.207.1
```

**Postup:**
- Klikněte na **"Upravit"** u záznamu `@` typu A
- Změňte hodnotu z `62.109.151.80` na `204.69.207.1`
- Klikněte **"Uložit"**

### Krok 4: Přidejte CNAME záznam pro www
**Přidejte nový záznam:**
```
Typ: CNAME
Host: www
Hodnota: sites.figma.net.
TTL: 3600
```

**Postup:**
- Klikněte na **"Přidat DNS záznam"**
- Typ: vyberte **CNAME**
- Host/Název: `www`
- Hodnota/Cíl: `sites.figma.net.` (s tečkou na konci!)
- TTL: `3600` (nebo nechte výchozí)
- Klikněte **"Přidat"**

⚠️ **DŮLEŽITÉ**: Pokud již existuje záznam `www` typu A, musíte ho nejdříve **smazat** a pak přidat CNAME!

### Krok 5: Přidejte TXT záznam pro Figma verifikaci
**Přidejte nový záznam:**
```
Typ: TXT
Host: _figma_sites_verify_www
Hodnota: v=e765e562-3888-4038-9776-a6761d9
TTL: 3600
```

**Postup:**
- Klikněte na **"Přidat DNS záznam"**
- Typ: vyberte **TXT**
- Host/Název: `_figma_sites_verify_www`
- Hodnota: `v=e765e562-3888-4038-9776-a6761d9`
- TTL: `3600`
- Klikněte **"Přidat"**

### Krok 6: Odstraňte Wildcard A záznam (pokud existuje)
**Najděte tento záznam:**
```
*    IN A    62.109.151.80
```

**Smažte ho:**
- Tento záznam není potřebný s Figma hostingem
- Klikněte na **"Smazat"** u záznamu `*` typu A
- Potvrďte smazání

### Krok 7: Zkontrolujte MX záznamy (NIC NEMĚŇTE!)
**Ujistěte se, že tyto záznamy existují** (pro email):
```
@    IN MX    5 email1.endora.cz.
@    IN MX    5 email2.endora.cz.
@    IN MX    5 email3.endora.cz.
@    IN MX    5 email4.endora.cz.
```

⚠️ **NEMAZAT! Tyto záznamy jsou nutné pro fungování emailu!**

---

## ✅ Kontrolní checklist

Po provedení změn zkontrolujte:

- [ ] ✅ A záznam pro `@` ukazuje na `204.69.207.1`
- [ ] ✅ CNAME záznam pro `www` ukazuje na `sites.figma.net.`
- [ ] ✅ TXT záznam `_figma_sites_verify_www` je přidaný
- [ ] ✅ Wildcard `*` A záznam je smazaný (pokud existoval)
- [ ] ✅ MX záznamy pro email jsou zachovány
- [ ] ✅ NS záznamy (name servery) jsou zachovány

---

## ⏱️ Propagace DNS

### Jak dlouho to trvá?
- **Minimálně**: 15-30 minut
- **Obvykle**: 2-4 hodiny
- **Maximálně**: 24-48 hodin

### Jak zkontrolovat propagaci?

**Option 1: Online nástroj**
```
https://dnschecker.org
```
- Zadejte: `altrodatony.com`
- Typ: `A`
- Mělo by ukazovat: `204.69.207.1`

**Option 2: Terminál (Windows)**
```cmd
nslookup altrodatony.com
```

**Option 3: Terminál (Mac/Linux)**
```bash
dig altrodatony.com
```

---

## 🔍 Testování po propagaci

### Test 1: Web se načítá
```
https://altrodatony.com      ← Mělo by fungovat
https://www.altrodatony.com  ← Mělo by fungovat
```

### Test 2: Figma verifikace
1. Jděte do Figma dashboardu
2. Sekce "Connected domains"
3. Klikněte **"Refresh status"**
4. Status by měl změnit z **"Pending"** na **"Active"** ✅

### Test 3: Email funguje
```
Pošlete testovací email na: vase@altrodatony.com
```
Email by měl fungovat normálně (přes Endora servery).

---

## 🐛 Troubleshooting

### Problem: "DNS records not verified" i po 24 hodinách

**Řešení:**
1. Zkontrolujte, že CNAME `www` má **tečku na konci**: `sites.figma.net.`
2. Zkontrolujte TXT záznam - musí být přesně: `v=e765e562-3888-4038-9776-a6761d9`
3. Smazat browser cache (Ctrl+Shift+Del)
4. Zkusit jiný browser nebo incognito mode

### Problem: WWW verze nefunguje

**Řešení:**
1. Ověřte, že CNAME záznam pro `www` existuje
2. Zkontrolujte, že neexistuje konfliktní A záznam pro `www`
3. Počkejte na DNS propagaci

### Problem: Email přestal fungovat

**Řešení:**
1. Zkontrolujte MX záznamy - měly by ukazovat na `email1-4.endora.cz`
2. Zkontrolujte SPF záznam - musí existovat
3. Kontaktujte Endora support

### Problem: Redirect nefunguje (altrodatony.com → www)

**Řešení:**
1. To se řeší v **Figma dashboardu**, ne v DNS
2. Jděte do Figma → Domain settings
3. Nastavte: **"Redirect altrodatony.com → www.altrodatony.com"**

---

## 📞 Kontakty pro podporu

### Endora Support (DNS problémy)
- 📧 Email: support@endora.cz
- 📞 Telefon: +420 234 262 000
- 🌐 Web: https://www.endora.cz/podpora

### Figma Support (Domain verification)
- 📧 Email: support@figma.com
- 🌐 Help Center: https://help.figma.com

---

## 📝 Kompletní DNS zóna

**Aktuální verze je v souboru:** `/DNS_ZONE_ALTRODATONY.txt`

Pokud váš DNS provider podporuje import zóny, můžete celý soubor nahrát najednou.

---

## ✅ Finální kontrola

Po úspěšné propagaci byste měli vidět:

1. ✅ **Web funguje:**
   - https://altrodatony.com ✅
   - https://www.altrodatony.com ✅

2. ✅ **Figma dashboard:**
   - Status: **Active** (zelený)
   - ❌ "DNS records not verified" zmizí

3. ✅ **Email funguje:**
   - Můžete posílat i přijímat emaily

4. ✅ **SSL certifikát:**
   - Zelený zámek v browseru 🔒
   - HTTPS aktivní

---

## 🎉 Hotovo!

Po dokončení všech kroků by váš web měl být dostupný na:

**🌐 https://altrodatony.com**
**🌐 https://www.altrodatony.com**

**S plně funkčním emailem na** `@altrodatony.com`! 📧

---

**Hodně štěstí s nastavením! 🚀**

*Pokud narazíte na problém, kontaktujte Endora support nebo konzultujte tento návod.*
