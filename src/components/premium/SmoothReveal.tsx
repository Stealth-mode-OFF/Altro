import { ReactNode, useEffect, useRef, useState } from 'react';

interface SmoothRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * SmoothReveal - Subtle fade-in animation on scroll
 * Slow, intentional, almost subconscious
 */
export function SmoothReveal({ 
  children, 
  delay = 0,
  className = '' 
}: SmoothRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={`
        transition-all
        duration-[var(--animation-duration-ultra-slow)]
        ease-[var(--ease-out-smooth)]
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
