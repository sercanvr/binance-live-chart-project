import * as React from 'react';
import { cn } from '../../lib/utils';

// Variant stilleri: Her buton türü için farklı görünüm
const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-border bg-transparent hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
};

// Boyut stilleri
const sizes = {
    sm: 'h-8 px-3 text-xs rounded-md',
    md: 'h-9 px-4 text-sm rounded-lg',
    lg: 'h-11 px-6 text-base rounded-lg',
    icon: 'h-9 w-9 rounded-lg',
};

const Button = React.forwardRef(
({ className, variant = 'primary', size = 'md', children, ...props }, ref) => (
    <button
    ref={ref}
    className={cn(
        // Ortak buton stilleri
        'inline-flex items-center justify-center font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
        variants[variant],
        sizes[size],
        className
    )}
    {...props}
    >
    {children}
    </button>
)
);
Button.displayName = 'Button';

export default Button;