import { ButtonHTMLAttributes, ReactNode } from 'react';

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * PremiumButton - Refined button with slow, elegant hover states
 * No aggressive scaling, just opacity and subtle glow
 */
export function PremiumButton({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  ...props 
}: PremiumButtonProps) {
  
  const variants = {
    primary: `
      bg-[var(--primary)] 
      text-[var(--primary-foreground)]
      hover:shadow-[0_8px_32px_rgba(200,74,71,0.25)]
    `,
    secondary: `
      bg-[var(--secondary)] 
      text-[var(--secondary-foreground)]
      hover:shadow-[0_8px_32px_rgba(43,43,43,0.15)]
    `,
    ghost: `
      bg-transparent 
      text-[var(--foreground)]
      hover:bg-[var(--primary-soft)]
    `,
    accent: `
      bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]
      text-[var(--accent-foreground)]
      hover:shadow-[0_8px_32px_rgba(184,153,95,0.3)]
    `,
  };

  const sizes = {
    sm: 'px-6 py-2.5 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-12 py-5 text-lg',
  };

  return (
    <button
      className={`
        relative
        rounded-[var(--radius)]
        transition-all
        duration-[var(--animation-duration-slow)]
        ease-[var(--ease-out-smooth)]
        hover:translate-y-[-2px]
        active:translate-y-0
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:translate-y-0
        disabled:hover:shadow-none
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 500,
        letterSpacing: '0.02em',
      }}
      {...props}
    >
      {children}
    </button>
  );
}
