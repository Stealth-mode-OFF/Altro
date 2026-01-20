import { ReactNode } from 'react';

interface FlowingSectionProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'subtle' | 'accent';
  className?: string;
  gradientFrom?: 'top' | 'bottom' | 'none';
  id?: string;
}

/**
 * FlowingSection - Creates seamless visual flow between sections
 * No hard borders, uses gradient transitions and soft shadows
 */
export function FlowingSection({ 
  children, 
  variant = 'default',
  className = '',
  gradientFrom = 'none',
  id
}: FlowingSectionProps) {
  
  const backgrounds = {
    default: 'bg-[var(--background)]',
    elevated: 'bg-[var(--background-elevated)]',
    subtle: 'bg-[var(--background-subtle)]',
    accent: 'bg-gradient-to-br from-[var(--primary-soft)] to-transparent',
  };

  const gradients = {
    top: 'before:absolute before:inset-x-0 before:top-0 before:h-32 before:bg-gradient-to-b before:from-[var(--background)] before:to-transparent before:pointer-events-none before:z-10',
    bottom: 'after:absolute after:inset-x-0 after:bottom-0 after:h-32 after:bg-gradient-to-t after:from-[var(--background)] after:to-transparent after:pointer-events-none after:z-10',
    none: '',
  };

  return (
    <section 
      id={id}
      className={`
        relative 
        ${backgrounds[variant]}
        ${gradients[gradientFrom]}
        ${className}
      `}
      style={{
        isolation: 'isolate',
      }}
    >
      {children}
    </section>
  );
}