# Premium Design System 2026

## Overview

An ultra-smooth, elegant, seamless design system for luxury digital experiences. Perfect for high-end restaurants, boutique brands, art galleries, and esoteric services.

## Design Philosophy

### Core Principles

1. **Calm Confidence** - No visual noise, every element has purpose
2. **Breathable Space** - Generous whitespace, vertical rhythm
3. **Soft Transitions** - No hard borders, gradient flows
4. **Intentional Motion** - Slow, smooth, almost subconscious animations
5. **Continuous Canvas** - Sections flow into each other seamlessly

### Visual Language

- **Color Palette**: Warm off-whites, deep charcoal, muted brass
- **Typography**: Editorial and timeless (Cormorant Garamond + Outfit)
- **Surfaces**: Glassy, layered, with subtle elevation
- **Motion**: Slow easing curves, fade + translate
- **Borders**: Soft, almost invisible (rgba opacity 3-12%)

## Components

### 1. FlowingSection

Creates seamless visual flow between page sections.

```tsx
import { FlowingSection } from '@/components/premium';

<FlowingSection 
  variant="elevated"     // default | elevated | subtle | accent
  gradientFrom="top"     // top | bottom | none
>
  {children}
</FlowingSection>
```

**Variants:**
- `default` - Standard background
- `elevated` - Pure white background
- `subtle` - Slightly darker warm tone
- `accent` - Soft primary color gradient

**Gradient Transitions:**
- `top` - Fades from previous section
- `bottom` - Fades to next section
- `none` - No gradient overlay

### 2. GlassCard

Premium glass morphism card with backdrop blur.

```tsx
import { GlassCard } from '@/components/premium';

<GlassCard 
  elevation="high"    // low | medium | high
  hover={true}        // Enable hover lift effect
>
  {children}
</GlassCard>
```

**Features:**
- Soft backdrop blur (12px)
- Subtle borders with transparency
- Elevation-based shadows
- Optional smooth hover effect

### 3. PremiumInput

Elegant input field that feels like part of the layout.

```tsx
import { PremiumInput } from '@/components/premium';

<PremiumInput 
  label="Your Name"
  type="text"
  error="Optional error message"
  placeholder="Enter value"
/>
```

**Features:**
- No harsh borders (subtle rgba borders)
- Smooth focus transitions (1s duration)
- Animated underline on focus
- Uppercase label styling
- Error state support

### 4. PremiumButton

Refined button with slow, elegant interactions.

```tsx
import { PremiumButton } from '@/components/premium';

<PremiumButton 
  variant="primary"    // primary | secondary | ghost | accent
  size="lg"            // sm | md | lg
>
  Click me
</PremiumButton>
```

**Interaction Design:**
- Slow transition (1s duration)
- Subtle lift on hover (2px)
- Glow shadow effect
- No aggressive scaling

### 5. SmoothReveal

Scroll-triggered fade-in animation.

```tsx
import { SmoothReveal } from '@/components/premium';

<SmoothReveal delay={200}>
  {children}
</SmoothReveal>
```

**Features:**
- IntersectionObserver based
- Ultra-slow duration (1.4s)
- Fade + vertical translate (8px)
- Customizable delay for staggering

### 6. ElegantCalculator

Premium interactive calculator/configurator component.

```tsx
import { ElegantCalculator } from '@/components/premium';

const steps = [
  {
    id: 'guests',
    label: 'Number of guests',
    description: 'How many people?',
    type: 'number',
    unit: 'people',
  },
  {
    id: 'occasion',
    label: 'Occasion',
    type: 'select',
    options: ['Romantic dinner', 'Birthday', 'Business'],
  },
];

<ElegantCalculator
  title="Plan Your Visit"
  subtitle="We'll help create the perfect evening"
  steps={steps}
  onCalculate={(values) => {
    // Your calculation logic
    return `${total} Kč`;
  }}
  resultLabel="Estimated price"
/>
```

**Features:**
- Feels like a guided ritual, not a tool
- Progress indicator with smooth fills
- Numbered ornamental steps
- Elegant result reveal
- Multi-step form flow

## Design Tokens

### Colors

```css
/* Backgrounds */
--background: #FAF9F6           /* Warm off-white */
--background-subtle: #F5F4F1    /* Slightly darker */
--background-elevated: #FFFFFF  /* Pure white for cards */

/* Foreground */
--foreground: #2B2B2B           /* Deep charcoal */
--foreground-muted: #6B6B6B     /* Muted gray */
--foreground-subtle: #8B8B8B    /* Very subtle */

/* Accents */
--primary: #C84A47              /* Restaurant red */
--primary-soft: rgba(200,74,71,0.08)
--accent: #B8995F               /* Muted brass */
--accent-soft: rgba(184,153,95,0.12)

/* Borders - Almost invisible */
--border: rgba(43,43,43,0.06)
--border-subtle: rgba(43,43,43,0.03)
--border-medium: rgba(43,43,43,0.12)
```

### Spacing (Vertical Rhythm)

```css
--space-xs: 0.5rem   /* 8px */
--space-sm: 1rem     /* 16px */
--space-md: 2rem     /* 32px */
--space-lg: 4rem     /* 64px */
--space-xl: 6rem     /* 96px */
--space-2xl: 8rem    /* 128px */
--space-3xl: 12rem   /* 192px */
```

### Animation

```css
/* Durations - Intentionally slow */
--animation-duration: 0.6s
--animation-duration-fast: 0.4s
--animation-duration-slow: 1s
--animation-duration-ultra-slow: 1.4s

/* Easing - Smooth, natural curves */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)
--ease-out-smooth: cubic-bezier(0.16, 1, 0.3, 1)
--ease-in-smooth: cubic-bezier(0.7, 0, 0.84, 0)
```

### Glass Morphism

```css
--glass-bg: rgba(255, 255, 255, 0.7)
--glass-border: rgba(255, 255, 255, 0.3)
--glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.08)
--glass-blur: 12px
```

## Usage Examples

### Restaurant Reservation Calculator

```tsx
const reservationSteps = [
  {
    id: 'guests',
    label: 'Number of guests',
    type: 'number',
    unit: 'people',
  },
  {
    id: 'date',
    label: 'Preferred date',
    type: 'text',
  },
  {
    id: 'time',
    label: 'Preferred time',
    type: 'select',
    options: ['17:00', '18:00', '19:00', '20:00', '21:00'],
  },
];

<ElegantCalculator
  title="Reserve Your Table"
  subtitle="Experience authentic Italian hospitality"
  steps={reservationSteps}
  onCalculate={(values) => {
    // Handle reservation
    return 'Confirmed';
  }}
/>
```

### Numerology Calculator

```tsx
const numerologySteps = [
  {
    id: 'birthdate',
    label: 'Your birth date',
    description: 'Enter your full birth date',
    type: 'text',
  },
  {
    id: 'name',
    label: 'Full name',
    description: 'As it appears on your birth certificate',
    type: 'text',
  },
];

<ElegantCalculator
  title="Discover Your Life Path"
  subtitle="Ancient wisdom meets modern design"
  steps={numerologySteps}
  onCalculate={(values) => {
    // Calculate life path number
    return `Life Path ${number}`;
  }}
  resultLabel="Your Life Path Number"
/>
```

### Premium Contact Form

```tsx
<FlowingSection variant="elevated" gradientFrom="top">
  <div className="container-custom max-w-2xl">
    <GlassCard elevation="high" className="p-12">
      <form className="space-y-6">
        <SmoothReveal delay={0}>
          <PremiumInput label="Name" type="text" />
        </SmoothReveal>
        
        <SmoothReveal delay={100}>
          <PremiumInput label="Email" type="email" />
        </SmoothReveal>
        
        <SmoothReveal delay={200}>
          <PremiumInput label="Message" type="text" />
        </SmoothReveal>
        
        <SmoothReveal delay={300}>
          <PremiumButton variant="primary" size="lg" className="w-full">
            Send Message
          </PremiumButton>
        </SmoothReveal>
      </form>
    </GlassCard>
  </div>
</FlowingSection>
```

## Best Practices

### Layout Flow

1. **Start with FlowingSection** - Every major section should be wrapped
2. **Use gradient transitions** - Add `gradientFrom` to create seamless flow
3. **Vary section backgrounds** - Alternate between variants for visual rhythm
4. **Maintain vertical spacing** - Use consistent section-padding utility

### Interactive Elements

1. **Forms feel natural** - Use PremiumInput with proper labels
2. **Calculators are rituals** - Break into clear, meaningful steps
3. **Buttons are calm** - No aggressive animations, just gentle transitions
4. **Cards have depth** - Use GlassCard for elevation and premium feel

### Motion Design

1. **Stagger reveals** - Use delay prop on SmoothReveal (0, 100, 200, 300ms)
2. **Slow everything down** - Use ultra-slow durations for premium feel
3. **Respect reduced motion** - System automatically handles user preferences
4. **Subtle is better** - 8px translate, never more than 100% opacity change

### Accessibility

- All components respect `prefers-reduced-motion`
- Focus states use visible outlines
- Color contrast meets WCAG AAA
- Touch targets minimum 44px on mobile
- Keyboard navigation fully supported

## Reusability

This system is designed to work for:

✅ **Restaurants** - Reservations, menus, pricing
✅ **Boutique brands** - Product showcases, lookbooks
✅ **Art galleries** - Exhibition pages, artist profiles
✅ **Numerology/Esoteric** - Calculators, readings
✅ **Luxury hospitality** - Booking, concierge services
✅ **Fine dining** - Tasting menus, wine pairings

## Demo

Visit `/premium-showcase` to see the complete system in action.

## Technical Notes

- Built with React + TypeScript
- Styled with Tailwind CSS v4
- Uses CSS custom properties for theming
- IntersectionObserver for scroll animations
- No external animation libraries required
- Production-ready, fully responsive
- Works perfectly in Figma Make environment

---

**Version:** 1.0.0  
**Last Updated:** December 2025  
**License:** MIT
