import { ImageWithFallback } from './figma/ImageWithFallback';
import { Clock, Calendar, UtensilsCrossed, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import heroBackground from "figma:asset/25aa2f7917174e5633532ace212d5bcf77b22ebd.png";
import logoImage from "figma:asset/8e479ee20a3f29f31855e79e992e8c5be3d12322.png";

export function HeroNew() {
  const { t, language } = useLanguage();
  
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-[92svh] flex flex-col items-center justify-end md:justify-center overflow-hidden pb-20 md:pb-0">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={heroBackground}
            alt="Pizza Oven"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30 md:bg-gradient-to-b md:from-black/50 md:via-black/20 md:to-black/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full container-custom px-6 pb-20 md:pb-0 text-center pt-[50vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6 md:gap-8"
        >
          {/* Logo */}


          {/* Headline - Simplified for mobile */}
          <h1 className="text-white text-4xl sm:text-6xl md:text-8xl leading-none font-serif tracking-tight">
            {t('hero.subtitle')}
          </h1>

          <p className="text-white/90 text-lg sm:text-2xl font-light max-w-lg mx-auto">
            {t('hero.description')}
          </p>

          {/* Mobile-First Actions Grid */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm mx-auto mt-4">
            <button
              onClick={() => scrollTo('reservation')}
              className="bg-primary hover:bg-primary/90 text-white p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg"
            >
              <Calendar className="w-6 h-6" />
              <span className="font-bold uppercase tracking-wide text-sm">{t('hero.reserve')}</span>
            </button>
            <button
              onClick={() => scrollTo('menu')}
              className="bg-white hover:bg-gray-100 text-foreground p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg"
            >
              <UtensilsCrossed className="w-6 h-6 text-primary" />
              <span className="font-bold uppercase tracking-wide text-sm">{t('nav.menu')}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-white/90 text-sm mt-4 bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
            <Clock className="w-4 h-4" />
            <span>11:00 - 23:00</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}