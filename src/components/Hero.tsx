import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import heroBackground from "../assets/25aa2f7917174e5633532ace212d5bcf77b22ebd.png";

export function Hero() {
  const { t } = useLanguage();
  
  const scrollToSection = (id: string) => {
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
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black">
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={heroBackground}
            alt="Morello Forni Pizza Oven"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Minimal gradient overlay - only darkens bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      </div>

      {/* Content - Centered, glass overlay */}
      <div className="relative z-10 container-custom px-4 sm:px-6 text-center">
        <div className="glass-card mx-auto max-w-4xl rounded-[var(--radius-3xl)] px-6 sm:px-10 py-6 sm:py-10 bg-clip-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Main Headline */}
          <h1
            className="text-white font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight px-4"
          >
            {t('hero.subtitle')}
          </h1>

          {/* Description */}
          <p className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed px-4">
            {t('hero.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center pt-4 sm:pt-8 px-4">
            <button
              onClick={() => scrollToSection('reservation')}
              className="group relative overflow-hidden bg-primary text-white px-8 sm:px-10 py-4 sm:py-4 transition-all duration-400 hover:shadow-[0_0_30px_rgba(200,74,71,0.4)] active:scale-95 flex items-center justify-center gap-3 min-h-[56px] touch-manipulation"
            >
              <Calendar className="w-5 h-5 flex-shrink-0" />
              <span className="text-base sm:text-lg font-medium">{t('hero.reserve')}</span>
              <ArrowRight className="w-5 h-5 flex-shrink-0 transition-transform duration-400 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => scrollToSection('menu')}
              className="group glass-button text-white px-8 sm:px-10 py-4 sm:py-4 transition-all duration-400 hover:border-white/50 active:scale-95 flex items-center justify-center gap-3 min-h-[56px] touch-manipulation"
            >
              <span className="text-base sm:text-lg font-medium">{t('hero.viewMenu')}</span>
              <ArrowRight className="w-5 h-5 flex-shrink-0 opacity-60 transition-all duration-400 group-hover:opacity-100 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Minimal info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="pt-4 sm:pt-8 text-white/50 text-xs sm:text-sm tracking-wider px-4"
          >
            <a 
              href="https://maps.app.goo.gl/2HSXVSZx1cJtphZGA?g_st=ipc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors"
            >
              Korunní 48, Praha 2
            </a>
            {' • Út–Ne 11:00–23:00'}
          </motion.div>
        </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}