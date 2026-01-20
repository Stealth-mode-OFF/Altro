import { TextareaHTMLAttributes, forwardRef } from 'react';

interface PremiumTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

/**
 * PremiumTextarea - Elegant textarea that feels like part of the layout
 * No harsh borders, smooth focus transitions
 */
export const PremiumTextarea = forwardRef<HTMLTextAreaElement, PremiumTextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="relative group">
        {label && (
          <label 
            className="block mb-2 transition-colors duration-[var(--animation-duration-fast)]"
            style={{
              color: error ? 'var(--destructive)' : 'var(--foreground-muted)',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <textarea
            ref={ref}
            className={`
              w-full
              px-6 py-4
              rounded-[var(--radius)]
              transition-all
              duration-[var(--animation-duration-slow)]
              ease-[var(--ease-out-smooth)]
              resize-y
              min-h-[120px]
              ${className}
            `}
            style={{
              background: 'var(--background-elevated)',
              border: error 
                ? '1px solid var(--destructive)' 
                : '1px solid var(--border-subtle)',
              color: 'var(--foreground)',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1rem',
              letterSpacing: '-0.01em',
              lineHeight: '1.75',
            }}
            onFocus={(e) => {
              if (!error) {
                e.target.style.borderColor = 'var(--border-medium)';
                e.target.style.boxShadow = '0 0 0 3px var(--primary-soft)';
              }
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-subtle)';
              e.target.style.boxShadow = 'none';
            }}
            {...props}
          />
          
          {/* Subtle underline accent on focus */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full transition-all duration-[var(--animation-duration-slow)] ease-[var(--ease-out-smooth)] opacity-0 group-focus-within:opacity-100"
            style={{
              background: error 
                ? 'var(--destructive)' 
                : 'linear-gradient(to right, transparent, var(--primary), transparent)',
            }}
          />
        </div>
        
        {error && (
          <p 
            className="mt-2 text-sm animate-in fade-in slide-in-from-top-1 duration-300"
            style={{
              color: 'var(--destructive)',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

PremiumTextarea.displayName = 'PremiumTextarea';
