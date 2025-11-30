import * as React from 'react';
import { cn } from '../../lib/designSystem';

export interface UdemButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

/**
 * UdeM Button Component
 * 
 * Pre-styled button following MontrealCampus Connect design system.
 * Uses UdeM brand colors and ensures 44px minimum touch target.
 * 
 * @example
 * <UdemButton variant="primary" size="lg">Get Started</UdemButton>
 * <UdemButton variant="outline">Learn More</UdemButton>
 */
export const UdemButton = React.forwardRef<HTMLButtonElement, UdemButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-gradient-to-r from-[#0055A4] to-[#ED2939] hover:opacity-90 text-white',
      secondary: 'bg-[#0055A4] hover:bg-[#0055A4]/90 text-white',
      outline: 'border-2 border-[#0055A4] text-[#0055A4] hover:bg-[#0055A4] hover:text-white',
      ghost: 'text-[#0055A4] hover:bg-[#0055A4]/10',
    };

    const sizes = {
      sm: 'px-4 py-2 rounded-full min-h-[44px]',
      md: 'px-6 py-3 rounded-xl min-h-[44px]',
      lg: 'px-12 py-6 rounded-full min-h-[44px]',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus:outline-none focus:ring-2 focus:ring-[#0055A4] focus:ring-offset-2',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

UdemButton.displayName = 'UdemButton';



