# Další kroky po dokončení SEO optimalizace

## ✅ Co je hotovo

Web je plně SEO-optimalizovaný s:
- Multi-page architekturou (/menu, /kontakt, /italska-restaurace-praha, /vinohrady-korunni)
- Client-side routing zachovávající URL strukturu
- Dynamic metadata pro každou stránku
- Structured data (Schema.org)
- NAP konzistence (Name, Address, Phone)
- Optimalizované fonty a výkon
- Sitemap.xml a robots.txt

## 🚀 Nasazení do produkce

### 1. Google Search Console
```bash
1. Přejděte na: https://search.google.com/search-console
2. Přidejte property: altrodatony.com
3. Ověřte vlastnictví (DNS nebo HTML tag)
4. Nahrajte sitemap: https://altrodatony.com/sitemap.xml
```

### 2. Google My Business (GMB)
```bash
1. Přejděte na: https://business.google.com
2. Vytvořte/ověřte profil restaurace
3. Zadejte přesné údaje:
   - Název: Altro Da Tony
   - Adresa: Korunní 48, 120 00 Praha 2 - Vinohrady
   - Telefon: +420 774 672 458
   - Kategorie: Italská restaurace
   - Website: https://altrodatony.com
   - Otevírací doba: Po-Ne 11:00-23:00
4. Přidejte min. 10 kvalitních fotek (interiér, jídla, exteriér)
5. Aktivujte rezervace (pokud možné)
```

### 3. Strukturované údaje - testování
```bash
1. Otevřete: https://search.google.com/test/rich-results
2. Zadejte URL: https://altrodatony.com
3. Ověřte, že se Schema.org Restaurant zobrazuje bez chyb
```

### 4. Performance testing
```bash
# PageSpeed Insights
https://pagespeed.web.dev/
- Zadejte: https://altrodatony.com
- Cíl: 90+ mobile, 95+ desktop

# Core Web Vitals
- LCP < 2.5s
- FID < 100ms (nebo INP < 200ms)
- CLS < 0.1
```

## 📝 TODO - Manuální úkoly

### Kritické (týden 1):
- [ ] Aktivovat Google My Business
- [ ] Přidat sitemap do Google Search Console
- [ ] Ověřit Schema.org data (Rich Results Test)
- [ ] Nahrát min. 10 fotek do GMB
- [ ] Požádat prvních 5 spokojených hostů o Google recenzi

### Důležité (týden 2-4):
- [ ] Vytvořit profil na Seznam Firmy
- [ ] Přidat restauraci na Mapy.cz
- [ ] Registrace na Wolt/Bolt Food (rozvoz)
- [ ] Sociální sítě - pravidelné posty (2-3x týdně)
- [ ] Aktivovat hreflang tagy pro multi-jazyk (EN, IT)

### Nice to have (měsíc 2+):
- [ ] Blog - 1 článek měsíčně (e.g. "Jak poznat pravou neapolskou pizzu")
- [ ] Email marketing - newsletter
- [ ] Instagram/Facebook ads pro lokální reach
- [ ] Partnerství s hotely v okolí

## 🔧 Technické úpravy (volitelné)

### 1. Přidat hreflang tagy
V `index.html` přidejte:
```html
<link rel="alternate" hreflang="cs" href="https://altrodatony.com/" />
<link rel="alternate" hreflang="en" href="https://altrodatony.com/?lang=en" />
<link rel="alternate" hreflang="it" href="https://altrodatony.com/?lang=it" />
```

### 2. Breadcrumbs schema
Přidejte do pillar pages:
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Domů",
      "item": "https://altrodatony.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Menu",
      "item": "https://altrodatony.com/menu"
    }
  ]
}
```

### 3. SpecialOffer schema (týdenní menu)
```json
{
  "@type": "Offer",
  "name": "Týdenní menu",
  "price": "190",
  "priceCurrency": "CZK",
  "availability": "InStock",
  "validFrom": "2026-01-06",
  "validThrough": "2026-01-10"
}
```

## 📊 Měření úspěšnosti

### Google Analytics 4 (pokud máte)
Sledujte:
- Organic traffic (cíl: +200% za 6 měsíců)
- Bounce rate (cíl: <50%)
- Avg. session duration (cíl: >2 min)
- Conversion rate (rezervace/call)

### Google Search Console
Klíčové metriky:
- **Imprese** - kolikrát web viděli v Google
  - Cíl měsíc 1: 1,000+
  - Cíl měsíc 6: 10,000+
  
- **Kliknutí** - kolik lidí kliklo
  - Cíl měsíc 1: 50+
  - Cíl měsíc 6: 500+

- **Průměrná pozice**
  - Cíl pro "italská restaurace vinohrady": Top 10
  - Cíl pro "altro da tony": #1

### Google My Business Insights
- Počet zobrazení profilu
- Počet kliknutí na "Navigovat"
- Počet kliknutí na "Zavolat"
- Počet kliknutí na "Web"

## 🎯 Klíčová slova k sledování

### Priorita 1 (lokální):
1. altro da tony
2. italská restaurace vinohrady
3. pizza vinohrady
4. neapolská pizza praha
5. italská restaurace praha 2

### Priorita 2 (širší):
1. italská restaurace praha
2. neapolská pizza
3. pasta praha
4. italská kuchyně praha
5. restaurace korunní

### Long-tail (konverzní):
1. kde koupit neapolskou pizzu praha
2. nejlepší italská restaurace vinohrady
3. rezervace italská restaurace praha
4. domácí pasta praha
5. morello forni praha

## 💡 Strategie pro recenze

### Jak získat 5-star recenze:
1. **Ideální moment**: Po zaplacení účtu, když je host spokojený
2. **Jak žádat**: "Těšilo nás, že jste si u nás pochutnali! Budeme rádi za vaši zpětnou vazbu na Google."
3. **QR kód**: Vytvořte QR kód přímo na Google review link a umístěte ho na stůl
4. **Email follow-up**: 2 dny po návštěvě poslete email s poděkováním + link na recenzi

### Google Review direct link:
```
https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID
```
(Najděte PLACE_ID v Google My Business)

## 🚨 Co NE dělat

❌ **Nekupujte recenze** - Google to pozná a penalizuje
❌ **Nekopírujte texty** z jiných stránek - duplicate content
❌ **Neplňte keywords** do textu neprirozeně
❌ **Neměňte NAP údaje** (Name, Address, Phone) - konzistence je klíčová
❌ **Nezapomeňte na mobilní UX** - 70%+ návštěv je z mobilu

## 📞 Kontakt na podporu

V případě problémů:
- **Technical SEO**: Zkontrolujte Search Console errors
- **Indexace**: Submit URL to index (Search Console)
- **Rich snippets**: Testujte na search.google.com/test/rich-results

---

**Poslední aktualizace:** 21. prosince 2024  
**Next review:** Leden 2026 (za měsíc)  
**Status:** ✅ Ready for launch!
