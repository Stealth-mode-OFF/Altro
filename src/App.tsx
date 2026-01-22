import { useState, useEffect, lazy, Suspense } from 'react';
import { Toaster } from 'sonner@2.0.3';
import { LanguageProvider } from './contexts/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PerformanceMonitor } from './components/PerformanceMonitor';
import { OfflineIndicator } from './components/OfflineIndicator';
import { CookieConsent } from './components/CookieConsent';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { MobileNav } from './components/MobileNav';
import { Router } from './utils/router';
import { AdminGate } from './components/AdminGate';

// Lazy: admin interface and all route pages
const AdminPanel = lazy(() => import('./components/AdminPanel').then(m => ({ default: m.AdminPanel })));
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const MenuPage = lazy(() => import('./pages/MenuPage').then(m => ({ default: m.MenuPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const ItalianRestaurantPraguePage = lazy(() => import('./pages/ItalianRestaurantPraguePage').then(m => ({ default: m.ItalianRestaurantPraguePage })));
const VinohradyKorunniPage = lazy(() => import('./pages/VinohradvKorunniPage').then(m => ({ default: m.VinohradyKorunniPage })));
const PremiumShowcase = lazy(() => import('./pages/PremiumShowcase').then(m => ({ default: m.PremiumShowcase })));
const ImpressumPage = lazy(() => import('./pages/ImpressumPage').then(m => ({ default: m.ImpressumPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const CookiesPage = lazy(() => import('./pages/CookiesPage').then(m => ({ default: m.CookiesPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));
const AdminContactsPage = lazy(() => import('./pages/AdminContactsPage').then(m => ({ default: m.AdminContactsPage })));
const AdminCampaignsPage = lazy(() => import('./pages/AdminCampaignsPage').then(m => ({ default: m.AdminCampaignsPage })));
const AdminSuppressionPage = lazy(() => import('./pages/AdminSuppressionPage').then(m => ({ default: m.AdminSuppressionPage })));

// Suppress Jotai multiple instances warning (caused by motion/react)
// This is a known issue: https://github.com/pmndrs/jotai/discussions/2044
const originalConsoleWarn = console.warn;
console.warn = (...args: any[]) => {
  if (args[0]?.includes?.('Detected multiple Jotai instances')) {
    return; // Suppress this specific warning
  }
  originalConsoleWarn(...args);
};

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // SEO-optimized multi-page structure
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Header />
        <PerformanceMonitor />
        <OfflineIndicator />
        <CookieConsent />
        <div className="min-h-screen pb-20 md:pb-0">
          <Toaster position="top-center" richColors />
          
          <Suspense fallback={<div className="p-6 text-center text-sm text-foreground/60">Načítání…</div>}>
            <Router routes={[
              { path: '/', component: <HomePage /> },
              { path: '/menu', component: <MenuPage /> },
              { path: '/kontakt', component: <ContactPage /> },
              { path: '/contact', component: <ContactPage /> },
              { path: '/italska-restaurace-praha', component: <ItalianRestaurantPraguePage /> },
              { path: '/vinohrady-korunni', component: <VinohradyKorunniPage /> },
              { path: '/premium-showcase', component: <PremiumShowcase /> },
              { path: '/impressum', component: <ImpressumPage /> },
              { path: '/obchodni-podminky', component: <TermsPage /> },
              { path: '/terms', component: <TermsPage /> },
              { path: '/ochrana-udaju', component: <PrivacyPage /> },
              { path: '/privacy', component: <PrivacyPage /> },
              { path: '/cookies', component: <CookiesPage /> },
              { path: '/admin', component: <AdminGate><AdminPage /></AdminGate> },
              { path: '/admin/panel', component: <AdminGate><AdminPanel /></AdminGate> },
              { path: '/admin/contacts', component: <AdminGate><AdminContactsPage /></AdminGate> },
              { path: '/admin/campaigns', component: <AdminGate><AdminCampaignsPage /></AdminGate> },
              { path: '/admin/suppression', component: <AdminGate><AdminSuppressionPage /></AdminGate> },
            ]} />
          </Suspense>
          
          <Footer />
          
          {/* Mobile bottom navigation */}
          <MobileNav />
          
          {/* Utilities */}
          {showScrollTop && <ScrollToTop />}
        </div>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
