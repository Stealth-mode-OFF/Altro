# Konvence commitů (Conventional Commits)

Dodržujte prosím tento formát commit zpráv pro čitelnou historii verzí a automatické generování změnových logů.

<pre>
<typ>(<scope>): <krátký popis v češtině>

<volitelně delší popis změn – proč, jak>

BREAKING CHANGE: <popis nekompatibilní změny>
Související: #123
</pre>

## Povolené typy
- feat: nová funkcionalita
- fix: oprava chyby
- docs: dokumentace (README, průvodci)
- style: úpravy bez vlivu na logiku (formátování, mezery)
- refactor: úpravy kódu bez nové funkce či opravy chyby
- perf: zlepšení výkonu
- test: testy (přidání/úprava)
- build: změny v build nástrojích, závislostech
- ci: změny v CI skriptech
- chore: drobnosti, úklid, přesuny souborů
- revert: vrácení předchozího commitu

## Příklady
- `feat(header): přidán nový responzivní navigační panel`
- `fix(footer): oprava odkazu na Instagram`
- `docs: doplněn návod k nasazení na Vercel`
- `refactor: sloučení duplikované logiky pro překlady`
- `perf(images): zapnuto dlouhodobé cachování statických assetů`

## Poznámky
- Pište krátký předmět (do ~72 znaků), v rozkazovacím způsobu.
- Čeština je preferovaná; buďte struční a konkrétní.
- Používejte „Související: #číslo“ pro propojení issue.