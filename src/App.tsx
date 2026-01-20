import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { LanguageProvider } from './contexts/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PerformanceMonitor } from './components/PerformanceMonitor';
import { OfflineIndicator } from './components/OfflineIndicator';
import { CookieConsent } from './components/CookieConsent';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { MobileNav } from './components/MobileNav';
import { AdminPanel } from './components/AdminPanel';
import { Router } from './utils/router';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { ContactPage } from './pages/ContactPage';
import { ItalianRestaurantPraguePage } from './pages/ItalianRestaurantPraguePage';
import { VinohradyKorunniPage } from './pages/VinohradvKorunniPage';
import { PremiumShowcase } from './pages/PremiumShowcase';
import { ImpressumPage } from './pages/ImpressumPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { CookiesPage } from './pages/CookiesPage';
import { AdminPage } from './pages/AdminPage';
import { AdminContactsPage } from './pages/AdminContactsPage';
import { AdminCampaignsPage } from './pages/AdminCampaignsPage';
import { AdminSuppressionPage } from './pages/AdminSuppressionPage';

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
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    const handleHashChange = () => {
      if (window.location.hash.startsWith('#admin')) {
        setShowAdmin(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    
    // Check if URL contains #admin on mount
    if (window.location.hash.startsWith('#admin')) {
      setShowAdmin(true);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // If admin panel is active, show only admin panel
  if (showAdmin) {
    return (
      <ErrorBoundary>
        <LanguageProvider>
          <Toaster position="top-center" richColors />
          <AdminPanel />
        </LanguageProvider>
      </ErrorBoundary>
    );
  }

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
            { path: '/admin', component: <AdminPage /> },
            { path: '/admin/contacts', component: <AdminContactsPage /> },
            { path: '/admin/campaigns', component: <AdminCampaignsPage /> },
            { path: '/admin/suppression', component: <AdminSuppressionPage /> },
          ]} />
          
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