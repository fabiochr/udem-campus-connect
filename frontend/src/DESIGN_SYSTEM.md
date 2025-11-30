# MontrealCampus Connect Design System

A comprehensive design system for building consistent, accessible, and beautiful user interfaces for the MontrealCampus Connect application.

---

## 🎨 Brand Colors

### Primary Colors
```css
UdeM Blue:    #0055A4  (var(--udem-blue))
UdeM Red:     #ED2939  (var(--udem-red))
```

### Light Variations
```css
Blue Light:   #E6F0F9  (var(--udem-blue-light))
Red Light:    #FCE8EB  (var(--udem-red-light))
```

### Usage Guidelines
- **Blue (#0055A4)**: Primary actions, links, informational elements
- **Red (#ED2939)**: Secondary accents, highlights, important CTAs
- **Gradient**: Special CTAs and hero elements
  ```tsx
  bg-gradient-to-r from-[#0055A4] to-[#ED2939]
  ```

---

## 📐 Layout & Spacing

### Background Colors
```css
Page Background:  #F8F9FA  (var(--background))
Card Background:  #FFFFFF  (var(--card))
Muted Background: #F1F3F5  (var(--muted))
```

### Text Colors
```css
Primary Text:   #1A1A2E  (var(--foreground))
Secondary Text: #6C757D  (var(--muted-foreground))
Muted Text:     #9CA3AF
Inverse Text:   #FFFFFF
```

### Spacing Scale (4px increments)
```tsx
spacing-1  = 4px   (0.25rem)
spacing-2  = 8px   (0.5rem)
spacing-3  = 12px  (0.75rem)
spacing-4  = 16px  (1rem)
spacing-6  = 24px  (1.5rem)
spacing-8  = 32px  (2rem)
spacing-12 = 48px  (3rem)
```

### Common Padding
```tsx
Page:    p-6      (24px all sides)
Section: py-8     (32px vertical)
Card:    p-4      (16px all sides)
```

---

## 📝 Typography

### Font Sizes
```tsx
text-xs   = 12px  (0.75rem)
text-sm   = 14px  (0.875rem)
text-base = 16px  (1rem)      ← Default
text-lg   = 18px  (1.125rem)
text-xl   = 20px  (1.25rem)
text-2xl  = 24px  (1.5rem)
text-3xl  = 30px  (1.875rem)
```

### Font Weights
```tsx
font-normal   = 400
font-medium   = 600  ← Use for headings
font-semibold = 600
font-bold     = 700
```

### Line Heights
```tsx
leading-tight   = 1.25
leading-normal  = 1.5   ← Default
leading-relaxed = 1.75
```

### Heading Hierarchy
```tsx
h1: text-2xl, font-medium, line-height 1.5
h2: text-xl, font-medium, line-height 1.5
h3: text-lg, font-medium, line-height 1.5
h4: text-base, font-medium, line-height 1.5
```

---

## 🔘 Buttons

### Touch Target Requirements
**All buttons MUST have a minimum height of 44px** for mobile accessibility.

### Button Variants

#### Primary Button (Gradient)
```tsx
<UdemButton variant="primary" size="lg">
  Get Started
</UdemButton>
```
- **Use for**: Main CTAs, important actions
- **Style**: Blue-to-red gradient, white text
- **Classes**: `bg-gradient-to-r from-[#0055A4] to-[#ED2939]`

#### Secondary Button (Solid Blue)
```tsx
<UdemButton variant="secondary" size="md">
  Learn More
</UdemButton>
```
- **Use for**: Secondary actions, confirmations
- **Style**: Solid blue, white text
- **Classes**: `bg-[#0055A4] text-white`

#### Outline Button
```tsx
<UdemButton variant="outline">
  Cancel
</UdemButton>
```
- **Use for**: Tertiary actions, cancel buttons
- **Style**: Blue border, blue text, fills on hover
- **Classes**: `border-2 border-[#0055A4] text-[#0055A4]`

#### Ghost Button
```tsx
<UdemButton variant="ghost">
  More Options
</UdemButton>
```
- **Use for**: Low-emphasis actions, menu items
- **Style**: No border, blue text, light blue background on hover
- **Classes**: `text-[#0055A4] hover:bg-[#0055A4]/10`

### Button Sizes
```tsx
sm: 'px-4 py-2 rounded-full'   // Small, pill-shaped
md: 'px-6 py-3 rounded-xl'     // Medium, rounded
lg: 'px-12 py-6 rounded-full'  // Large, pill-shaped
```

### Hover States
All buttons include:
- Opacity/color transitions (200ms)
- Focus ring for accessibility
- Disabled state (50% opacity)

---

## 🎴 Cards

### Default Card
```tsx
<UdemCard>
  <div className="p-6">Content</div>
</UdemCard>
```
- **Style**: White background, subtle shadow, rounded corners
- **Border**: 1px light gray (#f1f3f5)
- **Radius**: 16px (rounded-2xl)
- **Shadow**: Subtle elevation

### Interactive Card
```tsx
<UdemCard hover interactive onClick={handleClick}>
  Clickable content
</UdemCard>
```
- **Hover**: Increases shadow, smooth transition
- **Cursor**: Pointer on hover
- **Use for**: Event cards, navigation cards

### Card Variants
```tsx
<UdemCard variant="blue">   // Light blue background
<UdemCard variant="red">    // Light red background
<UdemCard variant="gradient"> // Gradient background
```

### Card Structure
```tsx
<UdemCard>
  <UdemCardHeader>
    <h3>Title</h3>
  </UdemCardHeader>
  <UdemCardContent>
    <p>Main content</p>
  </UdemCardContent>
  <UdemCardFooter>
    <UdemButton>Action</UdemButton>
  </UdemCardFooter>
</UdemCard>
```

---

## 🏷️ Badges

### Badge Variants
```tsx
<UdemBadge variant="blue">Language</UdemBadge>
<UdemBadge variant="red">Popular</UdemBadge>
<UdemBadge variant="gradient">Featured</UdemBadge>
<UdemBadge variant="neutral">Tag</UdemBadge>
```

### Badge Sizes
```tsx
<UdemBadge size="sm">   // Small (12px text)
<UdemBadge size="md">   // Medium (14px text)
<UdemBadge size="lg">   // Large (16px text)
```

### Usage
- **Blue**: Language indicators, informational tags
- **Red**: Hot/trending indicators, deadlines
- **Gradient**: Premium features, highlights
- **Neutral**: General categorization

---

## 🎯 Icon Containers

### Consistent Icon Backgrounds
```tsx
<UdemIconContainer variant="blue" size="md">
  <Users className="w-6 h-6 text-[#0055A4]" />
</UdemIconContainer>
```

### Variants
- `blue`: Light blue background (10% opacity)
- `red`: Light red background (10% opacity)
- `gradient`: Full gradient background (use white icons)

### Sizes
- `sm`: 32px × 32px (w-8 h-8)
- `md`: 48px × 48px (w-12 h-12)
- `lg`: 64px × 64px (w-16 h-16)
- `xl`: 80px × 80px (w-20 h-20)

### Rounded Options
- `square`: rounded-lg
- `rounded`: rounded-xl (default)
- `circle`: rounded-full

---

## 📏 Border Radius

### Standard Radii
```tsx
rounded-none   = 0
rounded-sm     = 8px   (0.5rem)
rounded-md     = 12px  (0.75rem)
rounded-lg     = 16px  (1rem)
rounded-xl     = 20px  (1.25rem)
rounded-2xl    = 24px  (1.5rem)  ← Cards
rounded-full   = 9999px           ← Pills, avatars
```

### Component Guidelines
- **Cards**: `rounded-2xl` (24px)
- **Buttons (primary)**: `rounded-full` (pills)
- **Buttons (secondary)**: `rounded-xl` (20px)
- **Inputs**: `rounded-xl` (20px)
- **Badges**: `rounded-full` (pills)
- **Icon containers**: `rounded-xl` (20px)

---

## 🌑 Shadows

### Shadow Scale
```tsx
shadow-sm   = Subtle (hover states)
shadow      = Default (cards at rest)
shadow-md   = Medium (elevated cards)
shadow-lg   = Large (modals, popovers)
shadow-xl   = Extra large (special emphasis)
```

### Usage
```tsx
// Card at rest
className="shadow-sm"

// Card on hover
className="hover:shadow-md transition-shadow"

// Modal or important overlay
className="shadow-lg"
```

---

## 🎭 Forms & Inputs

### Input Styles
```tsx
<Input 
  className="rounded-xl border-gray-200 focus:border-[#0055A4] focus:ring-2 focus:ring-[#0055A4]/20"
/>
```

### Input States
- **Default**: Light gray border
- **Focus**: Blue border with subtle ring
- **Error**: Red border with red ring
- **Disabled**: 50% opacity, no interaction

### Form Layout
```tsx
<div className="space-y-6">  // Form container
  <div className="space-y-2">  // Field group
    <Label>Field Label</Label>
    <Input />
  </div>
</div>
```

---

## 🎨 Gradients

### Brand Gradients
```tsx
// Primary gradient (Blue → Red)
bg-gradient-to-r from-[#0055A4] to-[#ED2939]

// Background gradient (Subtle)
bg-gradient-to-br from-white via-blue-50 to-red-50

// Overlay gradient (Image overlays)
bg-gradient-to-t from-black/70 via-black/30 to-transparent
```

### Text Gradients
```tsx
<h1 className="bg-gradient-to-r from-[#0055A4] to-[#ED2939] bg-clip-text text-transparent">
  MontrealCampus Connect
</h1>
```

---

## ⚡ Transitions & Animations

### Default Transition
```tsx
className="transition-all duration-200 ease-in-out"
```

### Common Transitions
```tsx
// Hover effects
transition-colors     // Color changes
transition-shadow     // Shadow changes
transition-all        // Everything
transition-opacity    // Fade effects

// Durations
duration-150  // Fast (150ms)
duration-200  // Default (200ms)
duration-300  // Slow (300ms)
```

### Animation Examples
```tsx
// Fade in
className="animate-in fade-in duration-300"

// Slide up
className="animate-in slide-in-from-bottom-4 duration-300"

// Scale in
className="animate-in zoom-in-95 duration-200"
```

---

## 🧩 Component Composition Examples

### Event Card
```tsx
<UdemCard hover interactive onClick={handleEventClick}>
  <div className="relative h-40 rounded-t-2xl overflow-hidden">
    <img src={eventImage} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <h4 className="text-white">{eventTitle}</h4>
    </div>
  </div>
  <div className="p-4">
    <UdemBadge variant="blue">{category}</UdemBadge>
    <p className="text-muted-foreground mt-2">{description}</p>
  </div>
</UdemCard>
```

### Feature Card
```tsx
<UdemCard className="p-6">
  <UdemIconContainer variant="blue" size="md">
    <Users className="w-6 h-6 text-[#0055A4]" />
  </UdemIconContainer>
  <h3 className="mt-4">Language Partners</h3>
  <p className="text-muted-foreground mt-2">
    Practice languages with native speakers
  </p>
</UdemCard>
```

### Profile Stats
```tsx
<div className="grid grid-cols-3 gap-4">
  <UdemCard variant="blue" className="p-4 text-center">
    <div className="text-2xl text-[#0055A4] mb-1">12</div>
    <div className="text-xs text-muted-foreground">Events</div>
  </UdemCard>
  {/* More stats... */}
</div>
```

---

## 📱 Responsive Design

### Breakpoints
```tsx
sm:   640px   // Small tablets
md:   768px   // Tablets
lg:   1024px  // Laptops
xl:   1280px  // Desktops
2xl:  1536px  // Large desktops
```

### Mobile-First Approach
Always design for mobile first, then enhance for larger screens:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

### Touch Targets
- **Minimum size**: 44px × 44px
- **Recommended**: 48px × 48px for primary actions
- **Spacing**: At least 8px between interactive elements

---

## ♿ Accessibility

### Focus States
All interactive elements must have visible focus states:
```tsx
focus:outline-none focus:ring-2 focus:ring-[#0055A4] focus:ring-offset-2
```

### Color Contrast
- **Primary text on white**: 13.5:1 (AAA)
- **UdeM Blue on white**: 5.9:1 (AA)
- **White on UdeM Blue**: 5.9:1 (AA)

### ARIA Labels
```tsx
<button aria-label="Close menu">
  <X className="w-6 h-6" />
</button>
```

---

## 🛠️ Using the Design System

### Import Design Tokens
```tsx
import { colors, typography, spacing, components } from '@/lib/designSystem';
import { cn, getBrandColor, getCardClasses } from '@/lib/designSystem';
```

### Import Components
```tsx
import { UdemButton } from '@/components/ui/udem-button';
import { UdemCard } from '@/components/ui/udem-card';
import { UdemBadge } from '@/components/ui/udem-badge';
import { UdemIconContainer } from '@/components/ui/udem-icon-container';
```

### Combine Classes
```tsx
const MyComponent = () => {
  return (
    <div className={cn(
      'flex items-center gap-4',
      'p-6 rounded-2xl',
      'bg-white shadow-sm',
      'hover:shadow-md transition-shadow'
    )}>
      Content
    </div>
  );
};
```

---

## ✅ Component Checklist

When creating new components, ensure:

- [ ] Uses UdeM colors (#0055A4, #ED2939)
- [ ] Has minimum 44px touch targets for interactive elements
- [ ] Includes hover/focus states
- [ ] Follows border radius standards (rounded-xl, rounded-2xl)
- [ ] Has proper spacing (multiples of 4px)
- [ ] Includes smooth transitions (200ms)
- [ ] Works on mobile (responsive)
- [ ] Has accessible contrast ratios
- [ ] Uses consistent shadows
- [ ] Follows typography scale

---

## 📚 Examples Library

See `/components/ui/udem-*` files for implementation examples of:
- UdemButton
- UdemCard
- UdemBadge
- UdemIconContainer

For full design tokens, see `/lib/designSystem.ts`

---

**Built with ❤️ for Université de Montréal**
