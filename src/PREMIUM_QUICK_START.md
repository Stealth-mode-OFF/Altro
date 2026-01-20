# Premium Design System - Quick Start

## 🚀 Installation

All components are already installed in `/components/premium/`

```tsx
import { 
  FlowingSection,
  GlassCard,
  PremiumInput,
  PremiumButton,
  SmoothReveal,
  ElegantCalculator,
  SectionDivider
} from '@/components/premium';
```

## 📖 5-Minute Guide

### 1. Create a Flowing Page

```tsx
export function MyPage() {
  return (
    <div>
      {/* Hero Section */}
      <FlowingSection variant="default" gradientFrom="bottom">
        <div className="container-custom section-padding">
          <SmoothReveal>
            <h1>Premium Experience</h1>
            <p>Elegant, seamless, luxurious</p>
          </SmoothReveal>
        </div>
      </FlowingSection>

      {/* Content Section */}
      <FlowingSection variant="subtle" gradientFrom="top">
        <div className="container-custom section-padding">
          <GlassCard hover className="p-12">
            <h2>Welcome</h2>
            <p>Your content here</p>
          </GlassCard>
        </div>
      </FlowingSection>
    </div>
  );
}
```

### 2. Add Interactive Calculator

```tsx
const steps = [
  {
    id: 'name',
    label: 'Your Name',
    type: 'text' as const,
  },
  {
    id: 'choice',
    label: 'Select Option',
    type: 'select' as const,
    options: ['Option A', 'Option B', 'Option C'],
  },
];

<ElegantCalculator
  title="Interactive Experience"
  subtitle="Let's create something together"
  steps={steps}
  onCalculate={(values) => {
    return `Thank you, ${values.name}!`;
  }}
/>
```

### 3. Build Premium Forms

```tsx
<GlassCard elevation="high" className="p-12">
  <form className="space-y-6">
    <PremiumInput 
      label="Name" 
      type="text" 
      placeholder="Your name"
    />
    
    <PremiumInput 
      label="Email" 
      type="email" 
      placeholder="your@email.com"
    />
    
    <PremiumButton variant="primary" size="lg" className="w-full">
      Submit
    </PremiumButton>
  </form>
</GlassCard>
```

## 🎨 Component Cheatsheet

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `FlowingSection` | Page sections with seamless transitions | `variant`, `gradientFrom` |
| `GlassCard` | Premium glass morphism containers | `elevation`, `hover` |
| `PremiumInput` | Elegant form inputs | `label`, `error`, `type` |
| `PremiumButton` | Refined buttons with smooth hovers | `variant`, `size` |
| `SmoothReveal` | Scroll-triggered fade animations | `delay` |
| `ElegantCalculator` | Multi-step interactive forms | `steps`, `onCalculate` |
| `SectionDivider` | Artistic section separators | `variant` |

## 🎯 Common Patterns

### Staggered Reveals

```tsx
<SmoothReveal delay={0}>
  <Card1 />
</SmoothReveal>

<SmoothReveal delay={150}>
  <Card2 />
</SmoothReveal>

<SmoothReveal delay={300}>
  <Card3 />
</SmoothReveal>
```

### Section Flow

```tsx
<FlowingSection variant="default" gradientFrom="bottom">
  {/* Content */}
</FlowingSection>

<SectionDivider variant="ornament" />

<FlowingSection variant="subtle" gradientFrom="top">
  {/* Content */}
</FlowingSection>
```

### Card Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {items.map((item, i) => (
    <SmoothReveal key={item.id} delay={i * 150}>
      <GlassCard hover elevation="medium" className="p-8">
        {/* Card content */}
      </GlassCard>
    </SmoothReveal>
  ))}
</div>
```

## 🎭 Design Tokens

Use CSS custom properties for consistency:

```tsx
// Custom styling
<div style={{
  background: 'var(--background-elevated)',
  color: 'var(--foreground-muted)',
  borderRadius: 'var(--radius)',
  transition: 'all var(--animation-duration-slow) var(--ease-out-smooth)',
}} />
```

## ✨ Pro Tips

1. **Always wrap sections** in `FlowingSection` for visual consistency
2. **Use SmoothReveal sparingly** - too many animations = visual noise
3. **Stagger delays** by 100-200ms for natural flow
4. **Mix variants** - alternate section backgrounds for rhythm
5. **Glass cards need space** - don't overcrowd, let them breathe
6. **Slow is premium** - use ultra-slow durations for luxury feel

## 🚦 Live Demo

Visit `/premium-showcase` to see all components in action.

## 📚 Full Documentation

See `PREMIUM_DESIGN_SYSTEM_2026.md` for complete API reference.

---

Happy building! 🎨✨
