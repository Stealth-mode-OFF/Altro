import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  elevation?: 'low' | 'medium' | 'high';
}

/**
 * GlassCard - Premium glass morphism card
 * Soft, layered surface that feels luxurious and breathable
 */
export function GlassCard({ 
  children, 
  className = '',
  hover = false,
  elevation = 'medium'
}: GlassCardProps) {
  
  const elevations = {
    low: 'shadow-[0_4px_16px_rgba(0,0,0,0.04)]',
    medium: 'shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
    high: 'shadow-[0_16px_64px_rgba(0,0,0,0.12)]',
  };

  return (
    <div 
      className={`
        relative
        rounded-[var(--radius)]
        ${elevations[elevation]}
        ${hover ? 'transition-all duration-[var(--animation-duration-slow)] ease-[var(--ease-out-smooth)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] hover:-translate-y-1' : ''}
        ${className}
      `}
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: `blur(var(--glass-blur))`,
        border: '1px solid var(--glass-border)',
      }}
    >
      {children}
    </div>
  );
}
