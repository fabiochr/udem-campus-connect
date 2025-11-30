import * as React from 'react';
import { cn } from '../../lib/designSystem';

export interface UdemCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  interactive?: boolean;
  variant?: 'default' | 'blue' | 'red' | 'gradient' | 'glass' | 'elevated';
}

export const UdemCard = React.forwardRef<HTMLDivElement, UdemCardProps>(
  ({ className, hover, interactive, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white border-gray-100',
      blue: 'border-[#0055A4]/20 bg-[#E6F0F9]/30',
      red: 'border-[#ED2939]/20 bg-[#FCE8EB]/30',
      gradient: 'border-transparent bg-gradient-to-br from-[#E6F0F9] to-[#FCE8EB]',
      glass: 'backdrop-blur-sm bg-white/10 border-white/20 text-white',
      elevated: 'shadow-lg border-0 bg-white',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl shadow-sm border',
          hover && 'hover:shadow-md transition-shadow',
          interactive && 'cursor-pointer hover:shadow-md transition-all',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

UdemCard.displayName = 'UdemCard';

// Card Header
const UdemCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pb-4', className)} {...props} />
  )
);
UdemCardHeader.displayName = 'UdemCardHeader';

// Card Content
const UdemCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
UdemCardContent.displayName = 'UdemCardContent';

// Card Footer
const UdemCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-4', className)} {...props} />
  )
);
UdemCardFooter.displayName = 'UdemCardFooter';

// Export all components
export { UdemCardHeader, UdemCardContent, UdemCardFooter };