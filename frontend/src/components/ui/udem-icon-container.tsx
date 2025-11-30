import * as React from 'react';
import { cn } from '../../lib/designSystem';

export interface UdemIconContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'blue' | 'red' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'square' | 'rounded' | 'circle';
}

/**
 * UdeM Icon Container Component
 * 
 * Consistent container for icons following MontrealCampus Connect design system.
 * 
 * @example
 * <UdemIconContainer variant="blue">
 *   <Users className="w-6 h-6 text-[#0055A4]" />
 * </UdemIconContainer>
 */
export const UdemIconContainer = React.forwardRef<HTMLDivElement, UdemIconContainerProps>(
  ({ className, variant = 'blue', size = 'md', rounded = 'rounded', children, ...props }, ref) => {
    const variants = {
      blue: 'bg-[#0055A4]/10',
      red: 'bg-[#ED2939]/10',
      gradient: 'bg-gradient-to-br from-[#0055A4] to-[#ED2939]',
    };

    const sizes = {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xl: 'w-20 h-20',
    };

    const roundedVariants = {
      square: 'rounded-lg',
      rounded: 'rounded-xl',
      circle: 'rounded-full',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center shrink-0',
          variants[variant],
          sizes[size],
          roundedVariants[rounded],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

UdemIconContainer.displayName = 'UdemIconContainer';



