/**
 * MontrealCampus Connect Design System
 * 
 * Centralized design tokens and utility functions for consistent styling
 * across the application.
 */

// ============================================
// COLORS
// ============================================

export const colors = {
  // UdeM Brand Colors
  brand: {
    blue: '#0055A4',
    red: '#ED2939',
    blueLight: '#E6F0F9',
    redLight: '#FCE8EB',
  },
  
  // Background
  background: {
    default: '#F8F9FA',
    card: '#ffffff',
    muted: '#F1F3F5',
  },
  
  // Text
  text: {
    primary: '#1A1A2E',
    secondary: '#6C757D',
    muted: '#9CA3AF',
    inverse: '#ffffff',
  },
  
  // Semantic
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#ED2939',
    info: '#0055A4',
  },
  
  // Border
  border: {
    default: 'rgba(0, 0, 0, 0.08)',
    input: '#E1E8ED',
  }
};

// ============================================
// TYPOGRAPHY
// ============================================

export const typography = {
  fontFamily: {
    sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
  },
  
  fontWeight: {
    normal: 400,
    medium: 600,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// ============================================
// SPACING
// ============================================

export const spacing = {
  // Base spacing scale (4px increments)
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
};

// ============================================
// BORDER RADIUS
// ============================================

export const borderRadius = {
  none: '0',
  sm: '0.5rem',     // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  full: '9999px',   // Fully rounded
};

// ============================================
// SHADOWS
// ============================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
};

// ============================================
// COMPONENT STYLES
// ============================================

export const components = {
  // Card
  card: {
    default: 'bg-white rounded-2xl shadow-sm border border-gray-100',
    hover: 'hover:shadow-md transition-shadow',
    interactive: 'cursor-pointer hover:shadow-md transition-all',
  },
  
  // Button
  button: {
    primary: 'bg-gradient-to-r from-[#0055A4] to-[#ED2939] hover:opacity-90 text-white transition-opacity',
    secondary: 'bg-[#0055A4] hover:bg-[#0055A4]/90 text-white transition-colors',
    outline: 'border-2 border-[#0055A4] text-[#0055A4] hover:bg-[#0055A4] hover:text-white transition-colors',
    ghost: 'text-[#0055A4] hover:bg-[#0055A4]/10 transition-colors',
    
    // Touch target (minimum 44px for mobile)
    touch: 'min-h-[44px] px-6',
    
    // Sizes
    sm: 'px-4 py-2 rounded-full',
    md: 'px-6 py-3 rounded-xl',
    lg: 'px-12 py-6 rounded-full',
  },
  
  // Input
  input: {
    default: 'rounded-xl border border-input-border bg-white focus:border-[#0055A4] focus:ring-2 focus:ring-[#0055A4]/20 transition-colors',
    error: 'border-[#ED2939] focus:border-[#ED2939] focus:ring-[#ED2939]/20',
  },
  
  // Badge
  badge: {
    blue: 'px-3 py-1 bg-[#0055A4]/10 text-[#0055A4] rounded-full',
    red: 'px-3 py-1 bg-[#ED2939]/10 text-[#ED2939] rounded-full',
    gradient: 'px-3 py-1 bg-gradient-to-r from-[#0055A4]/10 to-[#ED2939]/10 text-[#0055A4] rounded-full',
  },
  
  // Icon Container
  iconContainer: {
    blue: 'w-12 h-12 bg-[#0055A4]/10 rounded-xl flex items-center justify-center',
    red: 'w-12 h-12 bg-[#ED2939]/10 rounded-xl flex items-center justify-center',
    gradient: 'w-12 h-12 bg-gradient-to-br from-[#0055A4] to-[#ED2939] rounded-xl flex items-center justify-center',
  },
};

// ============================================
// LAYOUT
// ============================================

export const layout = {
  // Container max widths
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  
  // Common padding
  padding: {
    page: 'p-6',
    section: 'py-8',
    card: 'p-4',
  },
  
  // Grid gaps
  gap: {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  },
};

// ============================================
// BREAKPOINTS
// ============================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ============================================
// UTILITY CLASSES
// ============================================

/**
 * Pre-composed utility class strings for common patterns
 */
export const utils = {
  // Flex centering
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
  flexCol: 'flex flex-col',
  
  // Transitions
  transition: {
    default: 'transition-all duration-200 ease-in-out',
    fast: 'transition-all duration-150 ease-in-out',
    slow: 'transition-all duration-300 ease-in-out',
  },
  
  // Text truncation
  truncate: 'truncate',
  lineClamp2: 'line-clamp-2',
  lineClamp3: 'line-clamp-3',
  
  // Gradients
  gradient: {
    bluePurple: 'bg-gradient-to-r from-[#0055A4] to-[#ED2939]',
    blueLight: 'bg-gradient-to-br from-white via-blue-50 to-red-50',
    overlay: 'bg-gradient-to-t from-black/70 via-black/30 to-transparent',
  },
};

// ============================================
// ANIMATION
// ============================================

export const animations = {
  fadeIn: 'animate-in fade-in duration-300',
  slideUp: 'animate-in slide-in-from-bottom-4 duration-300',
  slideDown: 'animate-in slide-in-from-top-4 duration-300',
  scaleIn: 'animate-in zoom-in-95 duration-200',
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Combines class names conditionally
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Get UdeM brand color classes
 */
export function getBrandColor(type: 'blue' | 'red' | 'gradient') {
  switch (type) {
    case 'blue':
      return 'text-[#0055A4]';
    case 'red':
      return 'text-[#ED2939]';
    case 'gradient':
      return 'bg-gradient-to-r from-[#0055A4] to-[#ED2939] bg-clip-text text-transparent';
  }
}

/**
 * Get button variant classes
 */
export function getButtonVariant(variant: 'primary' | 'secondary' | 'outline' | 'ghost') {
  return components.button[variant];
}

/**
 * Get card classes with optional hover
 */
export function getCardClasses(hover = false, interactive = false) {
  if (interactive) return `${components.card.default} ${components.card.interactive}`;
  if (hover) return `${components.card.default} ${components.card.hover}`;
  return components.card.default;
}
