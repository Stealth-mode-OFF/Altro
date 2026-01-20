import { useState, useEffect, ReactNode } from 'react';

interface Route {
  path: string;
  component: ReactNode;
}

// Custom event for navigation
const NAVIGATE_EVENT = 'navigate';

export function Router({ routes }: { routes: Route[] }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleNavigation = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleNavigation);
    window.addEventListener(NAVIGATE_EVENT, handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener(NAVIGATE_EVENT, handleNavigation);
    };
  }, []);

  // Find matching route
  const matchedRoute = routes.find(route => route.path === currentPath) || routes.find(route => route.path === '/');

  return <>{matchedRoute?.component}</>;
}

export function navigate(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
}

// Update all anchor tags to use client-side routing
if (typeof window !== 'undefined') {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    
    if (anchor && anchor.href.startsWith(window.location.origin) && !anchor.hasAttribute('target')) {
      const path = new URL(anchor.href).pathname;
      
      // Don't intercept hash links or external links
      if (!anchor.hash || path !== window.location.pathname) {
        e.preventDefault();
        navigate(path + (anchor.hash || ''));
        
        // Scroll to hash if present
        if (anchor.hash) {
          setTimeout(() => {
            const element = document.querySelector(anchor.hash);
            if (element) {
              const offset = 80;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.scrollY - offset;
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }, 100);
        }
      }
    }
  });
}