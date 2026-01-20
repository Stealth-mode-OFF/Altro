# Premium Design System 2026 - Implementation Checklist

Use this checklist to transform any page into a premium, seamless experience.

## ✅ Step 1: Plan Your Page Structure

- [ ] Identify major sections (Hero, Features, Calculator, Contact, etc.)
- [ ] Decide which sections need elevation/depth
- [ ] Plan the visual flow (default → subtle → accent pattern)
- [ ] Identify interactive elements (forms, calculators, cards)

## ✅ Step 2: Import Components

```tsx
import { 
  FlowingSection,
  GlassCard,
  PremiumInput,
  PremiumTextarea,
  PremiumButton,
  SmoothReveal,
  ElegantCalculator,
  SectionDivider
} from '@/components/premium';
```

## ✅ Step 3: Wrap Sections

Replace:
```tsx
<section className="py-20">
  {content}
</section>
```

With:
```tsx
<FlowingSection 
  variant="default"           // or: elevated | subtle | accent
  className="section-padding" // maintains vertical rhythm
  gradientFrom="bottom"       // or: top | none
>
  <div className="container-custom">
    {content}
  </div>
</FlowingSection>
```

**Section Flow Pattern:**
1. **Hero** - `variant="default"` + `gradientFrom="bottom"`
2. **Features** - `variant="subtle"` + `gradientFrom="top"`
3. **Calculator/Interactive** - `variant="accent"`
4. **Contact/CTA** - `variant="elevated"` + `gradientFrom="top"`

## ✅ Step 4: Add Smooth Reveals

Wrap content blocks:
```tsx
<SmoothReveal>
  <h1>Your Title</h1>
  <p>Your content</p>
</SmoothReveal>
```

For grids, stagger delays:
```tsx
{items.map((item, index) => (
  <SmoothReveal key={item.id} delay={index * 150}>
    <GlassCard>{item.content}</GlassCard>
  </SmoothReveal>
))}
```

## ✅ Step 5: Replace Cards

Replace:
```tsx
<div className="bg-white rounded-lg shadow p-6">
  {content}
</div>
```

With:
```tsx
<GlassCard 
  elevation="medium"  // low | medium | high
  hover={true}        // adds subtle lift effect
  className="p-8"
>
  {content}
</GlassCard>
```

## ✅ Step 6: Update Forms

Replace standard inputs:
```tsx
<input type="text" placeholder="Name" />
```

With:
```tsx
<PremiumInput 
  label="Name" 
  type="text" 
  placeholder="Your name"
/>
```

Replace textareas:
```tsx
<textarea placeholder="Message" />
```

With:
```tsx
<PremiumTextarea 
  label="Message" 
  placeholder="Your message"
/>
```

## ✅ Step 7: Update Buttons

Replace:
```tsx
<button className="bg-primary text-white px-6 py-3">
  Submit
</button>
```

With:
```tsx
<PremiumButton 
  variant="primary"  // primary | secondary | ghost | accent
  size="lg"          // sm | md | lg
>
  Submit
</PremiumButton>
```

## ✅ Step 8: Convert Interactive Tools to Calculator

If you have a multi-step form, reservation system, or calculator:

```tsx
const steps = [
  {
    id: 'field1',
    label: 'Your Label',
    description: 'Optional description',
    type: 'text',  // or 'number' | 'select'
  },
  {
    id: 'field2',
    label: 'Choose Option',
    type: 'select',
    options: ['Option A', 'Option B', 'Option C'],
  },
];

<ElegantCalculator
  title="Interactive Experience"
  subtitle="Guided and elegant"
  steps={steps}
  onCalculate={(values) => {
    // Your logic
    return result;
  }}
  resultLabel="Your Result"
/>
```

## ✅ Step 9: Add Section Dividers

Between major sections:
```tsx
<SectionDivider variant="ornament" />
```

Variants:
- `fade` - Simple gradient fade (default)
- `wave` - Soft wave SVG
- `gradient` - Colored gradient band
- `ornament` - Decorative center element

## ✅ Step 10: Typography & Styling

Update headings to use design system:
```tsx
<h1 
  style={{
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(3rem, 8vw, 7rem)',
    fontWeight: 600,
    color: 'var(--foreground)',
    letterSpacing: '-0.035em',
  }}
>
  Your Title
</h1>
```

Body text:
```tsx
<p 
  style={{
    color: 'var(--foreground-muted)',
    fontSize: '1.125rem',
    lineHeight: 1.8,
  }}
>
  Your content
</p>
```

## ✅ Step 11: Verify Accessibility

- [ ] All images have alt text
- [ ] Focus states are visible
- [ ] Color contrast meets WCAG AAA
- [ ] Keyboard navigation works
- [ ] Reduced motion is respected (automatic)

## ✅ Step 12: Test Responsiveness

- [ ] Mobile (< 640px)
- [ ] Tablet (640px - 1024px)
- [ ] Desktop (> 1024px)
- [ ] Large screens (> 1920px)

## ✅ Step 13: Performance Check

- [ ] Smooth scrolling
- [ ] No layout shifts
- [ ] Animations run at 60fps
- [ ] Images are optimized
- [ ] No excessive re-renders

---

## 📋 Quick Reference: Component Props

### FlowingSection
```tsx
variant: 'default' | 'elevated' | 'subtle' | 'accent'
gradientFrom: 'top' | 'bottom' | 'none'
className: string
```

### GlassCard
```tsx
elevation: 'low' | 'medium' | 'high'
hover: boolean
className: string
```

### PremiumInput / PremiumTextarea
```tsx
label: string
error: string
type: string
placeholder: string
// ...all standard input props
```

### PremiumButton
```tsx
variant: 'primary' | 'secondary' | 'ghost' | 'accent'
size: 'sm' | 'md' | 'lg'
className: string
// ...all standard button props
```

### SmoothReveal
```tsx
delay: number (milliseconds)
className: string
```

### ElegantCalculator
```tsx
title: string
subtitle: string
steps: CalculatorStep[]
onCalculate: (values) => result
resultLabel: string
```

### SectionDivider
```tsx
variant: 'wave' | 'fade' | 'gradient' | 'ornament'
className: string
```

---

## 🎨 Color Token Reference

```tsx
// Backgrounds
'var(--background)'          // #FAF9F6
'var(--background-subtle)'   // #F5F4F1
'var(--background-elevated)' // #FFFFFF

// Foreground
'var(--foreground)'         // #2B2B2B
'var(--foreground-muted)'   // #6B6B6B
'var(--foreground-subtle)'  // #8B8B8B

// Accents
'var(--primary)'      // #C84A47
'var(--primary-soft)' // rgba(200,74,71,0.08)
'var(--accent)'       // #B8995F
'var(--accent-soft)'  // rgba(184,153,95,0.12)

// Borders
'var(--border)'        // rgba(43,43,43,0.06)
'var(--border-subtle)' // rgba(43,43,43,0.03)
'var(--border-medium)' // rgba(43,43,43,0.12)
```

---

## 🚀 Example: Complete Page Transform

**Before:**
```tsx
export function MyPage() {
  return (
    <div>
      <section className="py-20 bg-white">
        <h1>Title</h1>
        <p>Content</p>
      </section>
      
      <section className="py-20 bg-gray-50">
        <div className="grid grid-cols-3 gap-4">
          {items.map(item => (
            <div className="bg-white p-6 rounded shadow">
              {item.content}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

**After:**
```tsx
export function MyPage() {
  return (
    <div>
      <FlowingSection variant="default" className="section-padding" gradientFrom="bottom">
        <div className="container-custom">
          <SmoothReveal>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
              Title
            </h1>
            <p style={{ color: 'var(--foreground-muted)', fontSize: '1.125rem' }}>
              Content
            </p>
          </SmoothReveal>
        </div>
      </FlowingSection>
      
      <SectionDivider variant="ornament" />
      
      <FlowingSection variant="subtle" className="section-padding" gradientFrom="top">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <SmoothReveal key={item.id} delay={index * 150}>
                <GlassCard hover elevation="medium" className="p-8">
                  {item.content}
                </GlassCard>
              </SmoothReveal>
            ))}
          </div>
        </div>
      </FlowingSection>
    </div>
  );
}
```

---

## ✨ Pro Tips

1. **Section Rhythm** - Alternate variants: default → subtle → accent → elevated
2. **Delay Staggering** - Use 100-200ms increments (0, 150, 300, 450)
3. **Elevation Hierarchy** - Hero cards: high, Feature cards: medium, Decorative: low
4. **Color Usage** - Muted tones dominate, accent sparingly
5. **Spacing** - Always use `section-padding` and `container-custom` utilities
6. **Typography** - Headings = Cormorant Garamond, Body = Outfit
7. **Motion** - Less is more, slow is premium
8. **Glass Effect** - Use for interactive elements, not everywhere

---

**Ready to transform your page?** 🎨✨

Follow this checklist step by step, and your page will have the premium 2026 aesthetic!
