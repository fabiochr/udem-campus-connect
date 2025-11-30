import * as React from 'react';
import { cn } from '../../lib/designSystem';

export interface UdemBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'red' | 'gradient' | 'neutral' | 'outline' | 'secondary'; // ADD NEW VARIANTS
  size?: 'sm' | 'md' | 'lg';
}

export const UdemBadge = React.forwardRef<HTMLSpanElement, UdemBadgeProps>(
  ({ className, variant = 'blue', size = 'md', children, ...props }, ref) => {
    const variants = {
      blue: 'bg-[#0055A4]/10 text-[#0055A4]',
      red: 'bg-[#ED2939]/10 text-[#ED2939]',
      gradient: 'bg-gradient-to-r from-[#0055A4]/10 to-[#ED2939]/10 text-[#0055A4]',
      neutral: 'bg-gray-100 text-gray-700',
      // NEW VARIANTS:
      outline: 'border border-white/20 bg-white/10 text-white backdrop-blur-sm',
      secondary: 'bg-gray-800 text-white',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full transition-colors',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

UdemBadge.displayName = 'UdemBadge';