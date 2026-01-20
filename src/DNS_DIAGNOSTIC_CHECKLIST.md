# 🔍 DNS Diagnostika - www.altrodatony.com nefunguje

## ⚡ RYCHLÉ KROKY K OPRAVĚ:

### 1️⃣ CO SE STALO?
- Nahráli jste novou DNS zónu na Endora?
- Kdy přesně jste provedli změny?
- Jakou chybovou hlášku vidíte? (např. "This site can't be reached", "DNS_PROBE_FINISHED_NXDOMAIN", apod.)

---

## 🔧 OKAMŽITÁ OPRAVA - 3 MOŽNÉ SCÉNÁŘE:

### 🅰️ SCÉNÁŘ A: Web nejde vůbec (chyba DNS)

**Příčina:** Chybí A záznamy nebo jsou špatně

**Oprava v Endora DNS editoru:**
```
@      A      204.69.207.1
www    CNAME  sites.figma.net.
```

**⚠️ DŮLEŽITÉ:** 
- @ znamená root domain (altrodatony.com)
- Tečka na konci "sites.figma.net." je POVINNÁ!

---

### 🅱️ SCÉNÁŘ B: altrodatony.com funguje, ale www.altrodatony.com ne

**Příčina:** Chybí CNAME pro www

**Oprava:**
```
www    CNAME  sites.figma.net.
```

---

### 🅲 SCÉNÁŘ C: "This site can't provide a secure connection" (SSL problém)

**Příčina:** Figma hosting není správně nakonfigurovaný

**Řešení:**
1. Přihlaste se do Figma
2. Jděte na projekt → Publish → Domain settings
3. Zkontrolujte, že jsou přidány OBA domény:
   - altrodatony.com
   - www.altrodatony.com

---

## 🧪 JAK OTESTOVAT DNS:

### Online nástroje (nejrychlejší):
1. **DNS Checker** - https://dnschecker.org
   - Zadejte: `altrodatony.com`
   - Typ: `A`
   - Mělo by ukázat: `204.69.207.1`

2. **Zkontrolujte WWW:**
   - Zadejte: `www.altrodatony.com`
   - Typ: `CNAME`
   - Mělo by ukázat: `sites.figma.net`

### Příkazová řádka (pokud máte):
```bash
# Windows
nslookup altrodatony.com
nslookup www.altrodatony.com

# Mac/Linux
dig altrodatony.com
dig www.altrodatony.com
```

---

## 📋 KONTROLNÍ SEZNAM - Co MUSÍ být v DNS:

### ✅ Pro fungující web:
```
; Root domain (altrodatony.com)
@      A      204.69.207.1

; WWW subdomain (www.altrodatony.com)
www    CNAME  sites.figma.net.

; Figma verifikace (pokud je vyžadována)
_figma_sites_verify_www  TXT  "v=e765e562-3888-4038-9776-a6761d9"
```

### ✅ Pro fungující email (Endora):
```
; MX záznamy pro příjem emailů
@      MX     5  email1.endora.cz.
@      MX     5  email2.endora.cz.
@      MX     5  email3.endora.cz.
@      MX     5  email4.endora.cz.

; Mail servery
mail   A      62.109.151.33
smtp   A      62.109.151.33
```

### ✅ Pro fungující odesílání přes Resend:
```
; Resend DKIM
resend._domainkey  TXT  "p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDtRjwn90G3PaiQQVpNzOZ8SyXTDx4RgxLw5zlWz4rJCxxfS8dYKrLBBqELE4upth8HPnI+Ys79HUyxMuHSxCOZX9ONrY3/jUR92V+vmaSHAI0NCTtlpnFQBtA1l0R4PXBzDjG1S3KQs0JThz3niYeA072GUiyEMdXnV3SyXvbZtwIDAQAB"

; Return-path pro bounces
send   MX     10  feedback-smtp.eu-west-1.amazonses.com.
send   TXT    "v=spf1 include:amazonses.com ~all"

; SPF - KOMBINOVANÝ pro Endora + Resend
@      TXT    "v=spf1 a mx include:_spf.endora.cz include:_spf.resend.com -all"

; DMARC
_dmarc TXT    "v=DMARC1; p=none;"
```

---

## 🎯 NEJČASTĚJŠÍ CHYBY:

### ❌ CHYBA 1: Zapomněli jste tečku na konci CNAME
```
ŠPATNĚ:  www  CNAME  sites.figma.net
SPRÁVNĚ: www  CNAME  sites.figma.net.
                                    ^ TEČKA!
```

### ❌ CHYBA 2: Špatná IP adresa pro Figma
```
ŠPATNĚ:  @  A  62.109.151.33  (to je Endora IP!)
SPRÁVNĚ: @  A  204.69.207.1   (Figma hosting IP)
```

### ❌ CHYBA 3: Použili jste CNAME místo A záznamu pro root
```
ŠPATNĚ:  @  CNAME  sites.figma.net.
SPRÁVNĚ: @  A      204.69.207.1
```

### ❌ CHYBA 4: Smazali jste MX záznamy
```
BEZ TOHOTO NEPŘIJMETE EMAILY:
@  MX  5  email1.endora.cz.
@  MX  5  email2.endora.cz.
@  MX  5  email3.endora.cz.
@  MX  5  email4.endora.cz.
```

---

## ⏱️ ČAS PROPAGACE DNS:

- **15-30 minut:** První viditelné změny
- **2-4 hodiny:** Většina serverů aktualizována
- **24-48 hodin:** 100% globální propagace

**💡 TIP:** Pokud jste změny provedli před méně než 30 minutami, čekejte!

---

## 🆘 NOUZOVÝ ROLLBACK:

Pokud NIC nefunguje, vraťte původní DNS zónu:

### MINIMÁLNÍ FUNGUJÍCÍ KONFIGURACE:

```
$TTL 3600
$ORIGIN altrodatony.com.

@  IN SOA  ns1.endora.cz. hostmaster.endora.cz. (
    2025122914
    28800
    7200
    604800
    10800
)

; Name servers
@    NS  ns1.endora.cz.
@    NS  ns2.endora.cz.
@    NS  ns3.endoraland.com.

; WEB - Figma hosting
@    A      204.69.207.1
www  CNAME  sites.figma.net.

; EMAIL - Endora
@    MX  5  email1.endora.cz.
@    MX  5  email2.endora.cz.
@    MX  5  email3.endora.cz.
@    MX  5  email4.endora.cz.

mail A  62.109.151.33
smtp A  62.109.151.33

; SPF (základní)
@    TXT  "v=spf1 a mx include:_spf.endora.cz -all"
```

---

## 📞 CO UDĚLAT TEĎ:

1. **Napište mi přesnou chybovou hlášku**, kterou vidíte
2. **Řekněte mi, kdy jste změnili DNS** (před 10 min? 2 hodiny?)
3. **Pošlete screenshot** Endora DNS editoru (pokud je to možné)

Na základě toho vám řeknu PŘESNĚ, co máte udělat! 🚀
