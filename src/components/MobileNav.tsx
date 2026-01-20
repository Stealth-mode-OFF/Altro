import { Phone, MapPin, UtensilsCrossed, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { navigate } from '../utils/router';

export function MobileNav() {
  const { language } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    {
      icon: Phone,
      label: { cs: 'Volat', en: 'Call', it: 'Chiama' },
      action: () => window.location.href = 'tel:+420774672458'
    },
    {
      icon: MapPin,
      label: { cs: 'Mapa', en: 'Map', it: 'Mappa' },
      action: () => {
        // If not on homepage, navigate there first
        if (window.location.pathname !== '/') {
          navigate('/#location');
          setTimeout(() => scrollToSection('location'), 100);
        } else {
          scrollToSection('location');
        }
      }
    },
    {
      icon: UtensilsCrossed,
      label: { cs: 'Menu', en: 'Menu', it: 'Menu' },
      action: () => navigate('/menu')
    },
    {
      icon: Calendar,
      label: { cs: 'Rezervace', en: 'Reserve', it: 'Prenota' },
      action: () => {
        // If not on homepage, navigate there first
        if (window.location.pathname !== '/') {
          navigate('/#reservation');
          setTimeout(() => scrollToSection('reservation'), 100);
        } else {
          scrollToSection('reservation');
        }
      }
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-xl border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-4 h-16 safe-area-bottom">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={item.action}
              className="flex flex-col items-center justify-center gap-1.5 text-foreground/60 active:bg-primary/5 active:text-primary transition-all duration-200 touch-manipulation relative group"
            >
              <Icon className="w-5 h-5 transition-transform group-active:scale-90" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {item.label[language]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}