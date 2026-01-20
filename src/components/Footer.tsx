import { Instagram, Facebook, MapPin, Phone, Mail, Clock, ArrowUpRight, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { navigate } from '../utils/router';
import logoImage from "../assets/8e479ee20a3f29f31855e79e992e8c5be3d12322.png";

export function Footer() {
  const { t, language } = useLanguage();
  
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
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
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
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0c0c0c] text-stone-300 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container-custom relative z-10 pt-20 pb-8">
        
        {/* Top Section: Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <div 
              onClick={() => navigateToSection('/')}
              className="cursor-pointer transition-transform hover:scale-105 inline-block bg-white p-4 rounded-xl shadow-lg shadow-white/5"
            >
              <img 
                src={logoImage} 
                alt="Altro Da Tony" 
                className="h-16 w-auto"
              />
            </div>
            
            <p className="text-stone-500 max-w-sm font-light leading-relaxed text-sm">
              {t('footer.about')}
            </p>

            <div className="flex gap-4">
              <SocialButton href="https://www.instagram.com/altro.da.tony" icon={<Instagram className="w-5 h-5" />} label="Instagram" />
              <SocialButton href="https://www.facebook.com/p/Altro-da-Tony-61567773236741/" icon={<Facebook className="w-5 h-5" />} label="Facebook" />
            </div>
          </div>

          {/* Column 2: Navigation (2 cols) */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="font-serif text-white text-lg mb-8">{t('nav.menu')}</h4>
            <ul className="space-y-4 font-medium text-sm">
              <FooterLink onClick={() => navigateToSection('/')}>{t('nav.home')}</FooterLink>
              <FooterLink onClick={() => navigateToSection('/menu')}>{t('nav.menu')}</FooterLink>
              <FooterLink onClick={() => navigateToSection('/', 'reservation')} highlight>{t('nav.reserve')}</FooterLink>
              <FooterLink onClick={() => navigateToSection('/kontakt')}>{language === 'cs' ? 'Kontakt' : language === 'en' ? 'Contact' : 'Contatti'}</FooterLink>
              <FooterLink onClick={() => navigateToSection('/vinohrady-korunni')}>{language === 'cs' ? 'Vinohrady' : language === 'en' ? 'Location' : 'Posizione'}</FooterLink>
            </ul>
          </div>

          {/* Column 3: Contact Info (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="font-serif text-white text-lg mb-8">{t('footer.contact')}</h4>
            <div className="space-y-6">
              
              <a href="tel:+420774672458" className="group block">
                <span className="text-xs font-bold tracking-widest text-stone-500 uppercase mb-1 block group-hover:text-primary transition-colors">
                  {language === 'cs' ? 'Zavolejte nám' : 'Call us'}
                </span>
                <span className="text-2xl font-serif text-white whitespace-nowrap group-hover:text-primary transition-colors">
                  +420 774 672 458
                </span>
              </a>

              <a 
                href="https://maps.app.goo.gl/2HSXVSZx1cJtphZGA?g_st=ipc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="flex items-start justify-center lg:justify-start gap-3 text-stone-400 group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-primary/70 group-hover:text-primary transition-colors" />
                  <span className="leading-relaxed text-sm">
                    Korunní 48, 120 00<br />
                    Praha 2 - Vinohrady
                  </span>
                </div>
              </a>

              <a href="mailto:tony@altrodatony.com" className="group block">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-stone-400 group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5 shrink-0 text-primary/70 group-hover:text-primary transition-colors" />
                  <span className="text-sm">tony@altrodatony.com</span>
                </div>
              </a>

            </div>
          </div>

          {/* Column 4: Hours (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
             <h4 className="font-serif text-white text-lg mb-8">{t('contact.hours')}</h4>
             <div className="bg-white/5 rounded-2xl p-6 w-full border border-white/5 backdrop-blur-sm">
               <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/10">
                 <span className="text-stone-300 text-sm font-medium">{t('contact.days')}</span>
                 <span className="text-primary font-bold whitespace-nowrap">11:00 - 23:00</span>
               </div>
               <p className="text-xs text-stone-500 italic leading-relaxed">
                 {t('footer.kitchenUntil')}
               </p>
               
               <div className="mt-6 pt-4 border-t border-white/5">
                 <div className="flex items-center gap-2 text-green-500 text-xs font-bold uppercase tracking-wider">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                   {language === 'cs' ? 'Otevřeno' : 'Open Now'}
                 </div>
               </div>
             </div>
          </div>

        </div>

        {/* Bottom Bar: Legal & Copy */}
        <div className="pt-8 border-t border-white/5 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
          
          <div className="text-stone-600 text-xs flex flex-col md:flex-row items-center gap-4">
            <span>© {currentYear} Cucina di Tony s.r.o.</span>
            <span className="hidden md:inline text-stone-800">•</span>
            <span className="flex items-center gap-2">
              Design by <span className="text-stone-500">Figma Make</span>
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <LegalLink onClick={() => navigateToSection('/impressum')}>Impressum</LegalLink>
            <LegalLink onClick={() => navigateToSection('/terms')}>
              {language === 'cs' ? 'Obchodní podmínky' : language === 'en' ? 'Terms & Conditions' : 'Termini'}
            </LegalLink>
            <LegalLink onClick={() => navigateToSection('/ochrana-udaju')}>
              {language === 'cs' ? 'Ochrana osobních údajů' : language === 'en' ? 'Privacy Policy' : 'Privacy'}
            </LegalLink>
            <LegalLink onClick={() => navigateToSection('/cookies')}>Cookies</LegalLink>
            <LegalLink onClick={() => window.location.hash = 'admin'}>Admin</LegalLink>
          </nav>

        </div>
      </div>
    </footer>
  );
}

// Helper Components

function SocialButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 group"
      aria-label={label}
    >
      <div className="group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
    </a>
  );
}

function FooterLink({ children, onClick, highlight }: { children: React.ReactNode; onClick: () => void; highlight?: boolean }) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center gap-2 hover:gap-3 transition-all duration-300 group ${
          highlight ? 'text-primary hover:text-primary-light' : 'text-stone-400 hover:text-white'
        }`}
      >
        <span>{children}</span>
        <ArrowUpRight className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ${highlight ? 'text-primary' : 'text-stone-500'}`} />
      </button>
    </li>
  );
}

function LegalLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-xs font-medium text-stone-500 hover:text-primary transition-colors uppercase tracking-wider"
    >
      {children}
    </button>
  );
}