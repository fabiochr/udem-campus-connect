# Design System Usage Guide

Quick reference for using the MontrealCampus Connect design system in your components.

---

## 🚀 Quick Start

### Import Components
```tsx
import { UdemButton } from '@/components/ui/udem-button';
import { UdemCard } from '@/components/ui/udem-card';
import { UdemBadge } from '@/components/ui/udem-badge';
import { UdemIconContainer } from '@/components/ui/udem-icon-container';
```

### Import Design Tokens
```tsx
import { colors, components, cn } from '@/lib/designSystem';
```

---

## 🔘 Buttons

### Basic Usage
```tsx
// Primary CTA (gradient)
<UdemButton variant="primary" size="lg">
  Get Started
</UdemButton>

// Secondary action
<UdemButton variant="secondary" size="md">
  Learn More
</UdemButton>

// Outline button
<UdemButton variant="outline">
  Cancel
</UdemButton>

// Ghost button (minimal)
<UdemButton variant="ghost">
  Skip
</UdemButton>
```

### Full Width Button
```tsx
<UdemButton variant="primary" fullWidth>
  Continue
</UdemButton>
```

### Button with Icon
```tsx
import { Users } from 'lucide-react';

<UdemButton variant="primary">
  <Users className="w-5 h-5 mr-2" />
  Find Partners
</UdemButton>
```

### Disabled State
```tsx
<UdemButton variant="primary" disabled>
  Loading...
</UdemButton>
```

---

## 🎴 Cards

### Basic Card
```tsx
<UdemCard>
  <div className="p-6">
    <h3>Card Title</h3>
    <p className="text-muted-foreground">Card content</p>
  </div>
</UdemCard>
```

### Hover Card
```tsx
<UdemCard hover className="p-6">
  Content that has hover effect
</UdemCard>
```

### Interactive Card (Clickable)
```tsx
<UdemCard hover interactive onClick={handleClick}>
  <div className="p-6">
    Clickable card content
  </div>
</UdemCard>
```

### Card Variants
```tsx
// Blue accent
<UdemCard variant="blue" className="p-6">
  Blue themed content
</UdemCard>

// Red accent
<UdemCard variant="red" className="p-6">
  Red themed content
</UdemCard>

// Gradient
<UdemCard variant="gradient" className="p-6">
  Gradient themed content
</UdemCard>
```

### Structured Card
```tsx
import { UdemCard, UdemCardHeader, UdemCardContent, UdemCardFooter } from '@/components/ui/udem-card';

<UdemCard>
  <UdemCardHeader>
    <h3>Event Title</h3>
  </UdemCardHeader>
  <UdemCardContent>
    <p>Event description goes here</p>
  </UdemCardContent>
  <UdemCardFooter>
    <UdemButton>Join Event</UdemButton>
  </UdemCardFooter>
</UdemCard>
```

---

## 🏷️ Badges

### Basic Badges
```tsx
<UdemBadge variant="blue">French</UdemBadge>
<UdemBadge variant="red">Popular</UdemBadge>
<UdemBadge variant="gradient">Featured</UdemBadge>
<UdemBadge variant="neutral">General</UdemBadge>
```

### Badge Sizes
```tsx
<UdemBadge size="sm">Small</UdemBadge>
<UdemBadge size="md">Medium</UdemBadge>
<UdemBadge size="lg">Large</UdemBadge>
```

### Multiple Badges
```tsx
<div className="flex gap-2">
  {languages.map(lang => (
    <UdemBadge key={lang} variant="blue">
      {lang}
    </UdemBadge>
  ))}
</div>
```

---

## 🎯 Icon Containers

### Basic Usage
```tsx
import { Users } from 'lucide-react';

<UdemIconContainer variant="blue" size="md">
  <Users className="w-6 h-6 text-[#0055A4]" />
</UdemIconContainer>
```

### Variants
```tsx
// Blue background
<UdemIconContainer variant="blue">
  <Users className="w-6 h-6 text-[#0055A4]" />
</UdemIconContainer>

// Red background
<UdemIconContainer variant="red">
  <Calendar className="w-6 h-6 text-[#ED2939]" />
</UdemIconContainer>

// Gradient (use white icons)
<UdemIconContainer variant="gradient">
  <Trophy className="w-6 h-6 text-white" />
</UdemIconContainer>
```

### Sizes
```tsx
<UdemIconContainer size="sm">   {/* 32px */}
<UdemIconContainer size="md">   {/* 48px */}
<UdemIconContainer size="lg">   {/* 64px */}
<UdemIconContainer size="xl">   {/* 80px */}
```

### Shapes
```tsx
<UdemIconContainer rounded="square">  {/* rounded-lg */}
<UdemIconContainer rounded="rounded"> {/* rounded-xl (default) */}
<UdemIconContainer rounded="circle">  {/* rounded-full */}
```

---

## 🎨 Colors

### Using UdeM Colors Directly
```tsx
// Background colors
className="bg-[#0055A4]"           // UdeM Blue
className="bg-[#ED2939]"           // UdeM Red
className="bg-[#E6F0F9]"           // Blue Light
className="bg-[#FCE8EB]"           // Red Light

// Text colors
className="text-[#0055A4]"         // UdeM Blue
className="text-[#ED2939]"         // UdeM Red

// With opacity
className="bg-[#0055A4]/10"        // 10% opacity
className="text-[#ED2939]/80"      // 80% opacity
```

### Using CSS Variables
```tsx
className="bg-[var(--udem-blue)]"
className="text-[var(--udem-red)]"
className="bg-background"          // Page background
className="text-foreground"        // Primary text
className="text-muted-foreground"  // Secondary text
```

### Gradient Text
```tsx
<h1 className="bg-gradient-to-r from-[#0055A4] to-[#ED2939] bg-clip-text text-transparent">
  MontrealCampus Connect
</h1>
```

---

## 📐 Common Patterns

### Feature Card with Icon
```tsx
<UdemCard hover className="p-6">
  <UdemIconContainer variant="blue" size="md">
    <Users className="w-6 h-6 text-[#0055A4]" />
  </UdemIconContainer>
  <h3 className="mt-4 mb-2">Feature Title</h3>
  <p className="text-muted-foreground">
    Feature description text
  </p>
</UdemCard>
```

### Event Card with Image
```tsx
<UdemCard hover interactive onClick={handleClick}>
  <div className="relative h-48 overflow-hidden rounded-t-2xl">
    <img src={imageUrl} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
    <div className="absolute bottom-4 left-4 right-4">
      <h4 className="text-white">{title}</h4>
    </div>
  </div>
  <div className="p-4">
    <UdemBadge variant="blue">{category}</UdemBadge>
    <p className="text-muted-foreground mt-2">{description}</p>
  </div>
</UdemCard>
```

### Profile Stats Grid
```tsx
<div className="grid grid-cols-3 gap-4">
  <UdemCard variant="blue" className="p-4 text-center">
    <div className="text-2xl text-[#0055A4] mb-1">{count}</div>
    <div className="text-xs text-muted-foreground">Label</div>
  </UdemCard>
  {/* More stats... */}
</div>
```

### Action Card
```tsx
<UdemCard className="p-6">
  <div className="flex items-start gap-4">
    <UdemIconContainer variant="gradient" size="lg">
      <Trophy className="w-8 h-8 text-white" />
    </UdemIconContainer>
    <div className="flex-1">
      <h3 className="mb-2">Challenge Title</h3>
      <p className="text-muted-foreground mb-4">
        Challenge description
      </p>
      <div className="flex gap-2">
        <UdemButton variant="primary" size="sm">
          Join
        </UdemButton>
        <UdemButton variant="outline" size="sm">
          Details
        </UdemButton>
      </div>
    </div>
  </div>
</UdemCard>
```

### Form Layout
```tsx
<UdemCard className="p-8">
  <h2 className="mb-6">Form Title</h2>
  
  <form className="space-y-6">
    <div className="space-y-2">
      <Label>Field Label</Label>
      <Input 
        className="rounded-xl border-gray-200 focus:border-[#0055A4]"
        placeholder="Enter value..."
      />
    </div>
    
    <UdemButton type="submit" variant="primary" fullWidth>
      Submit
    </UdemButton>
  </form>
</UdemCard>
```

---

## 💡 Best Practices

### ✅ Do
- Use UdemButton for all interactive buttons
- Use `hover` prop for cards that show visual feedback
- Use `interactive` prop for clickable cards
- Maintain 44px minimum touch targets
- Use UdeM colors (#0055A4, #ED2939) consistently
- Add transitions for interactive elements
- Use semantic HTML (h1, h2, h3, p, etc.)

### ❌ Don't
- Don't create custom button variants
- Don't use gray backgrounds (use #F8F9FA or white)
- Don't mix design systems (stick to UdeM components)
- Don't forget hover/focus states
- Don't use random colors outside the palette
- Don't override typography sizes unnecessarily

---

## 🧪 Testing Components

### Visual Testing with StyleGuide
```tsx
// In development, you can view all components:
import { StyleGuide } from '@/components/design-system/StyleGuide';

function App() {
  return <StyleGuide />;
}
```

---

## 📚 Additional Resources

- **Full Documentation**: See `/DESIGN_SYSTEM.md`
- **Design Tokens**: See `/lib/designSystem.ts`
- **Component Examples**: See `/components/design-system/StyleGuide.tsx`

---

## 🆘 Need Help?

If you need a component that doesn't exist:

1. Check if existing components can be composed
2. Check the design tokens in `/lib/designSystem.ts`
3. Follow the patterns in existing UdeM components
4. Ensure it follows UdeM branding (#0055A4, #ED2939)
5. Maintain accessibility (44px touch targets, focus states)

---

**Happy Building! 🚀**
