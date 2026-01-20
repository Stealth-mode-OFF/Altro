# 🤝 Průvodce pro přispěvatele

Děkujeme za váš zájem přispět do projektu **Altro Da Tony**! 

---

## 📋 Obsah

1. [Jak začít](#jak-začít)
2. [Vývojové prostředí](#vývojové-prostředí)
3. [Kódovací standardy](#kódovací-standardy)
4. [Commit konvence](#commit-konvence)
5. [Pull Request proces](#pull-request-proces)
6. [Testování](#testování)
7. [Hlášení chyb](#hlášení-chyb)

---

## 🚀 Jak začít

### 1. Fork repozitář

Klikněte na tlačítko "Fork" v pravém horním rohu GitHubu.

### 2. Klonujte váš fork

```bash
git clone https://github.com/YOUR_USERNAME/altro-da-tony.git
cd altro-da-tony
```

### 3. Přidejte upstream remote

```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/altro-da-tony.git
```

### 4. Vytvořte feature branch

```bash
git checkout -b feature/your-feature-name
```

---

## 💻 Vývojové prostředí

Tento projekt běží v **Figma Make** prostředí, což má specifika:

### Technologie
- **Runtime:** Figma Make (ne Node.js)
- **Backend:** Supabase Edge Functions (Deno runtime)
- **Frontend:** React + TypeScript + Tailwind CSS v4

### Lokální vývoj

**Pozor:** Standardní `npm install` a `npm run dev` nefungují!

Projekt se vyvíjí přímo v Figma Make prostředí. Pokud chcete přispět:

1. Importujte projekt do Figma Make
2. Proveďte změny
3. Exportujte kód
4. Vytvořte Pull Request

---

## 📝 Kódovací standardy

### TypeScript

```typescript
// ✅ SPRÁVNĚ - Vždy používejte explicitní typy
interface ReservationData {
  name: string;
  email: string;
  phone: string;
}

const createReservation = (data: ReservationData): Promise<void> => {
  // ...
}

// ❌ ŠPATNĚ - Vyhněte se 'any'
const createReservation = (data: any) => {
  // ...
}
```

### React komponenty

```typescript
// ✅ SPRÁVNĚ - Funkční komponenty s TypeScript
interface Props {
  title: string;
  onSubmit: () => void;
}

export const MyComponent: React.FC<Props> = ({ title, onSubmit }) => {
  return <div>{title}</div>;
};

// ❌ ŠPATNĚ - Class komponenty
class MyComponent extends React.Component {
  // ...
}
```

### Tailwind CSS

```tsx
// ✅ SPRÁVNĚ - Používejte Tailwind utility třídy
<div className="flex items-center gap-4 p-6 bg-[#C84A47]">

// ❌ ŠPATNĚ - Nepoužívejte inline styles (kromě výjimek)
<div style={{ display: 'flex', padding: '24px' }}>
```

### Naming konvence

```typescript
// Komponenty - PascalCase
export const ReservationForm = () => {}

// Funkce - camelCase
const handleSubmit = () => {}

// Konstanty - UPPER_CASE
const API_BASE_URL = "https://..."

// Typy/Interface - PascalCase
interface UserData {}
type ReservationStatus = 'pending' | 'confirmed'
```

---

## 📦 Commit konvence

Používáme **Conventional Commits** s emojis:

### Formát

```
<emoji> <type>(<scope>): <subject>

<body>

<footer>
```

### Typy commitů

| Emoji | Type | Použití |
|-------|------|---------|
| ✨ | `feat` | Nová funkce |
| 🐛 | `fix` | Oprava chyby |
| 📝 | `docs` | Dokumentace |
| 💄 | `style` | Styling/CSS změny |
| ♻️ | `refactor` | Refaktoring kódu |
| ⚡ | `perf` | Performance optimalizace |
| ✅ | `test` | Přidání testů |
| 🔧 | `chore` | Změny v buildu/tools |
| 🚀 | `deploy` | Deployment změny |

### Příklady

```bash
# Nová funkce
git commit -m "✨ feat(reservation): Add email confirmation"

# Oprava chyby
git commit -m "🐛 fix(menu): Fix price display for decimal values"

# Dokumentace
git commit -m "📝 docs: Update API documentation with new endpoints"

# Styling
git commit -m "💄 style(hero): Improve mobile responsiveness"

# Refaktoring
git commit -m "♻️ refactor(api): Extract API calls to custom hook"
```

---

## 🔄 Pull Request proces

### 1. Ujistěte se, že je váš fork aktuální

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

### 2. Vytvořte feature branch

```bash
git checkout -b feature/amazing-new-feature
```

### 3. Proveďte změny

- Pište čistý, dokumentovaný kód
- Dodržujte kódovací standardy
- Přidejte komentáře kde je to potřeba

### 4. Commitněte změny

```bash
git add .
git commit -m "✨ feat(scope): Description of changes"
```

### 5. Push do vašeho forku

```bash
git push origin feature/amazing-new-feature
```

### 6. Otevřete Pull Request

- Přejděte na GitHub
- Klikněte "New Pull Request"
- Vyplňte šablonu PR

### PR šablona

```markdown
## 📝 Popis změn

Stručný popis co tento PR dělá.

## 🎯 Typ změny

- [ ] 🐛 Bug fix
- [ ] ✨ Nová funkce
- [ ] 💄 Styling
- [ ] 📝 Dokumentace
- [ ] ♻️ Refaktoring

## ✅ Checklist

- [ ] Kód dodržuje styling guidelines
- [ ] Přidal/a jsem komentáře do složitých částí
- [ ] Dokumentace byla aktualizována
- [ ] Moje změny negenerují nové warnings
- [ ] Přidal/a jsem testy (pokud relevantní)
- [ ] Všechny testy prošly

## 📸 Screenshots (pokud relevantní)

Přidejte screenshot pokud měníte UI.

## 🔗 Related Issues

Closes #123
```

---

## 🧪 Testování

### Manuální testování

**Vždy otestujte:**

1. **Rezervační formulář**
   - Vyplnění všech polí
   - Validace emailu
   - Odeslání do databáze

2. **Admin panel**
   - Přihlášení
   - Přidání položky do denního menu
   - Přidání položky do hlavního menu
   - Změna stavu rezervace

3. **Language switcher**
   - Přepínání mezi jazyky
   - Persistence výběru

4. **Responzivita**
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)

### API testování

Použijte cURL příkazy z `API_TEST_GUIDE.md`:

```bash
# Test vytvoření rezervace
curl -X POST https://ilbqmkdgkhmwwemffjgr.supabase.co/functions/v1/make-server-d880a0b3/reservations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{...}'
```

---

## 🐞 Hlášení chyb

### Před nahlášením chyby

1. Zkontrolujte [existující issues](https://github.com/YOUR_USERNAME/altro-da-tony/issues)
2. Ujistěte se, že používáte nejnovější verzi
3. Zkuste reprodukovat chybu

### Jak nahlásit

Vytvořte nový Issue s těmito informacemi:

```markdown
## 🐛 Popis chyby

Jasný a stručný popis co se pokazilo.

## 🔄 Kroky k reprodukci

1. Přejděte na '...'
2. Klikněte na '...'
3. Scrollujte dolů na '...'
4. Vidíte chybu

## ✅ Očekávané chování

Co by se mělo stát.

## ❌ Aktuální chování

Co se skutečně děje.

## 📸 Screenshots

Pokud relevantní, přidejte screenshots.

## 🌐 Prostředí

- Browser: [např. Chrome 120]
- OS: [např. macOS 14]
- Zařízení: [např. iPhone 15, Desktop]

## 📋 Dodatečný kontext

Jakékoliv další informace o problému.
```

---

## 💡 Návrhy vylepšení

Máte nápad na vylepšení? Skvělé!

### Vytvoření Feature Request

```markdown
## 💡 Popis nápadu

Jasný a stručný popis vašeho návrhu.

## 🎯 Problém který to řeší

Jaký problém toto řeší? Proč je to užitečné?

## 🔧 Navrhované řešení

Jak by to mělo fungovat?

## 🔀 Alternativy

Zvažovali jste alternativní řešení?

## 📋 Dodatečný kontext

Screenshots, mockupy, příklady, odkazy...
```

---

## 📚 Užitečné zdroje

### Dokumentace projektu
- [README_FINAL.md](./README_FINAL.md) - Kompletní dokumentace
- [API_TEST_GUIDE.md](./API_TEST_GUIDE.md) - API testování
- [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) - Admin návod

### Externí dokumentace
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Hono.js Docs](https://hono.dev/)

---

## 🎨 Design Guidelines

### Barevná paleta

```css
--terracotta: #C84A47;     /* Hlavní barva - tlačítka, akcenty */
--beige: #F5F1ED;          /* Pozadí */
--dark: #2C1810;           /* Text */
--white: #FFFFFF;          /* Bílá */
```

### Typografie

```css
/* Nadpisy */
font-family: 'Playfair Display', serif;

/* Tělo textu */
font-family: 'Cormorant Garamond', serif;
```

### Spacing

Používejte Tailwind spacing scale (4px base):
- `gap-2` = 8px
- `gap-4` = 16px
- `gap-6` = 24px
- `gap-8` = 32px

---

## ❓ Dotazy?

Pokud máte jakékoliv dotazy:

1. Zkontrolujte [dokumentaci](./README_FINAL.md)
2. Podívejte se na [existující issues](https://github.com/YOUR_USERNAME/altro-da-tony/issues)
3. Vytvořte nový issue s tagem `question`

---

## 🙏 Děkujeme!

Každý příspěvek pomáhá! Ať už je to oprava překladu, bug fix, nebo nová funkce - vážíme si toho! ❤️

---

<div align="center">

**Happy Coding! 🍝**

</div>
