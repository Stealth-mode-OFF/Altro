# Email Deliverability Test Plan & Status

## 1. Konfigurace Resend (Povinné)

Pro správné doručování emailů (zejména na Seznam.cz) je nutné mít v Resend Dashboardu ověřenou doménu.

### DNS Záznamy
Ověřte v **Resend Dashboard > Domains > Settings > DNS Records**:

1.  **SPF (Sender Policy Framework)**
    *   **Type**: TXT
    *   **Name**: `@` (root domain)
    *   **Value**: `v=spf1 include:resend.com ~all`
    *   *Poznámka: Pokud již máte SPF záznam, pouze přidejte `include:resend.com`.*

2.  **DKIM (DomainKeys Identified Mail)**
    *   **Type**: CNAME (obvykle)
    *   **Name**: `resend._domainkey` (nebo podobné, dle Resend)
    *   **Value**: (unikátní hodnota z Resend)

3.  **DMARC (Domain-based Message Authentication)**
    *   **Type**: TXT
    *   **Name**: `_dmarc`
    *   **Value**: `v=DMARC1; p=none; rua=mailto:dmarc@altrodatony.com; ruf=mailto:dmarc@altrodatony.com; adkim=s; aspf=s; pct=100`

## 2. Testovací scénář

Před spuštěním do plného provozu proveďte následující testy pomocí **Admin Panel > Deliverability > Test Email**.

### Krok 1: Seed List
Připravte si testovací emailové adresy:
*   1x Seznam.cz (`cokoliv@seznam.cz` / `email.cz`)
*   1x Gmail (`cokoliv@gmail.com`)
*   1x Outlook/Firemní (`cokoliv@outlook.com`)

### Krok 2: Odeslání a kontrola
Pro každou adresu odešlete testovací email a ověřte:

1.  **Doručení**: Dorazil email do **Inboxu** (Doručené) a ne do Spamu/Hromadné?
2.  **Zobrazení**:
    *   Je "From" jméno "Altro da Tony"?
    *   Zobrazuje se správně čeština (žádné rozsypané znaky)?
    *   Je tlačítko "Otevřít v Google Maps" funkční?
3.  **Mobil**: Vypadá email dobře na mobilním telefonu?

### Krok 3: Transakční Flow
Vytvořte testovací rezervaci na webu:
1.  Odešlete formulář.
    *   -> Očekáváno: Přijde email "Přijali jsme žádost".
    *   -> Očekáváno: Majiteli přijde "Nová žádost".
2.  Jděte do Adminu a potvrďte rezervaci.
    *   -> Očekáváno: Přijde email "Rezervace potvrzena".
3.  Vytvořte další rezervaci a zamítněte ji.
    *   -> Očekáváno: Přijde email "Rezervaci se nepodařilo potvrdit".

## 3. Diagnostika

Pokud emaily nechodí:
1.  Zkontrolujte záložku **Deliverability** v Adminu.
2.  Pokud je `RESEND_API_KEY` aktivní, ale emaily nechodí, zkontrolujte Supabase Logy.
3.  Pokud padají do Spamu na Seznamu, zkontrolujte znovu **DKIM** a **SPF**.
