interface SectionDividerProps {
  variant?: 'wave' | 'fade' | 'gradient' | 'ornament';
  className?: string;
}

/**
 * SectionDivider - Creates elegant transitions between sections
 * Replaces hard breaks with soft, artistic separations
 */
export function SectionDivider({ 
  variant = 'fade',
  className = '' 
}: SectionDividerProps) {
  
  if (variant === 'wave') {
    return (
      <div className={`relative h-24 overflow-hidden ${className}`}>
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.1 }}
        >
          <path 
            d="M0,0 C300,60 900,60 1200,0 L1200,120 L0,120 Z"
            fill="var(--foreground)"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div 
        className={`h-32 ${className}`}
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, var(--primary-soft) 50%, transparent 100%)',
        }}
      />
    );
  }

  if (variant === 'ornament') {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-[1px]"
            style={{
              background: 'linear-gradient(to right, transparent, var(--foreground-subtle))',
            }}
          />
          <div 
            className="w-2 h-2 rounded-full"
            style={{
              background: 'var(--accent)',
              boxShadow: '0 0 12px var(--accent-soft)',
            }}
          />
          <div 
            className="w-12 h-[1px]"
            style={{
              background: 'linear-gradient(to left, transparent, var(--foreground-subtle))',
            }}
          />
        </div>
      </div>
    );
  }

  // Default: fade
  return (
    <div 
      className={`h-24 ${className}`}
      style={{
        background: 'linear-gradient(to bottom, var(--background) 0%, transparent 50%, var(--background) 100%)',
      }}
    />
  );
}
