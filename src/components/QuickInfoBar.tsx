import { MapPin, Clock, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';

export function QuickInfoBar() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const infoItems = [
    {
      icon: MapPin,
      text: 'Korunní 48, Praha 2',
      action: () => window.open('https://maps.app.goo.gl/2HSXVSZx1cJtphZGA?g_st=ipc', '_blank')
    },
    {
      icon: Clock,
      text: '11:00 - 23:00',
      action: null
    },
    {
      icon: Phone,
      text: '+420 774 672 458',
      action: () => window.location.href = 'tel:+420774672458'
    }
  ];

  return (
    <div 
      className={`hidden md:block fixed top-20 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-border shadow-sm transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-center gap-8 lg:gap-12 py-3">
          {infoItems.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <>
                <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-foreground/80 whitespace-nowrap">{item.text}</span>
              </>
            );

            return item.action ? (
              <button
                key={index}
                onClick={item.action}
                className="flex items-center gap-2 hover:text-primary transition-colors duration-300"
              >
                {content}
              </button>
            ) : (
              <div key={index} className="flex items-center gap-2">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}