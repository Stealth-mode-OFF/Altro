import { useState, useEffect } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { navigate } from '../utils/router';
import logoImage from '../assets/altro-logo.avif';

export function Header() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (path: string, sectionId?: string) => {
    if (window.location.pathname !== path) {
      navigate(path);
      setTimeout(() => {
        if (sectionId) {
          const element = document.getElementById(sectionId);
          if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        } else {
          window.scrollTo(0, 0);
        }
      }, 100);
    } else if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      window.scrollTo(0, 0);
    }
    setIsMobileMenuOpen(false);
  };

  const openAdminPanel = () => {
    setIsMobileMenuOpen(false);

    if (window.location.pathname === '/') {
      window.location.hash = 'admin';
      return;
    }

    window.location.href = '/#admin';
  };

  const menuItems = [
    { path: '/', sectionId: 'about', labelKey: 'nav.about' },
    { path: '/menu', labelKey: 'nav.menu' },
    { path: '/', sectionId: 'reservation', labelKey: 'nav.reserve' },
    { path: '/kontakt', labelKey: 'nav.contact' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 bg-background/98 backdrop-blur-xl shadow-lg border-b border-border`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-20 sm:h-24 transition-all duration-500 ease-out">
          {/* Logo - Premium sizing & interaction */}
          <button 
            onClick={openAdminPanel}
            aria-label="Otevřít administraci"
            className="group flex items-center p-2 -ml-2 transition-transform duration-500 hover:scale-105 active:scale-95 touch-manipulation"
          >
            <img 
              src={logoImage}
              alt="Altro Da Tony - Italská Restaurace Praha 2 Vinohrady"
              className="h-14 sm:h-16 w-auto drop-shadow-2xl transition-all duration-500 group-hover:drop-shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            />
          </button>

          {/* Desktop Navigation - Minimalist Luxury */}
          <nav className="hidden md:flex items-center gap-10 lg:gap-14">
            {menuItems.map((item) => (
              <button
                key={item.path + (item.sectionId || '')}
                onClick={() => navigateToSection(item.path, item.sectionId)}
                className="relative text-foreground/60 hover:text-foreground transition-all duration-500 text-xs lg:text-sm font-medium tracking-[0.2em] uppercase py-2 group"
              >
                {t(item.labelKey)}
                <span className="absolute -bottom-2 left-1/2 w-1 h-1 bg-primary rounded-full opacity-0 -translate-x-1/2 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0" />
              </button>
            ))}
            
            <div className="flex items-center gap-6 pl-2">
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-border to-transparent opacity-50" />
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Mobile Menu Button - Sleek & Thin */}
          <div className="md:hidden flex items-center gap-5">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="group relative p-2 -mr-2 text-foreground/80 hover:text-primary transition-colors duration-300 touch-manipulation"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="absolute inset-0 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              {isMobileMenuOpen ? (
                <X className="w-8 h-8 relative z-10 transition-transform duration-500 group-hover:rotate-90" strokeWidth={1} />
              ) : (
                <div className="flex flex-col gap-1.5 relative z-10 w-8 items-end group-hover:items-center transition-all duration-300">
                  <span className="w-8 h-px bg-current transition-all duration-300 group-hover:w-6" />
                  <span className="w-6 h-px bg-current transition-all duration-300 group-hover:w-6" />
                  <span className="w-4 h-px bg-current transition-all duration-300 group-hover:w-6" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-in fade-in slide-in-from-top-2 duration-400">
          <div className="container-custom py-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.path + (item.sectionId || '')}
                onClick={() => navigateToSection(item.path, item.sectionId)}
                className="block w-full text-left text-foreground/80 hover:text-foreground active:bg-muted/70 transition-all duration-300 py-4 px-4 rounded-lg text-base font-medium tracking-wide uppercase min-h-[56px] touch-manipulation"
              >
                {t(item.labelKey)}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}