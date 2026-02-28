import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import introImage from '../assets/6bc4f18e3e30fa0644c76f7df4899136a7bdab79.png';

export function Intro() {
  const { t } = useLanguage();
  
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="w-20 h-0.5 bg-primary mb-12" />
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl mb-12 text-balance leading-[1.05]">
              {t('about.title')}
            </h2>
            
            <p className="text-xl md:text-2xl text-foreground/70 leading-[1.8] font-light mb-10">
              {t('about.p1')}
            </p>

            <p className="text-lg md:text-xl text-foreground/60 italic font-light max-w-2xl leading-[1.75]">
              {t('about.p2')}
            </p>

            <div className="flex items-center gap-20 mt-20 text-center">
              <div>
                <div className="text-5xl md:text-6xl font-semibold text-primary mb-3" style={{ fontFamily: 'Cormorant Garamond' }}>20+</div>
                <div className="text-sm uppercase tracking-[0.12em] text-foreground/60 font-medium">{t('about.stat1')}</div>
              </div>
              <div className="w-px h-20 bg-border" />
              <div>
                <div className="text-5xl md:text-6xl font-semibold text-primary mb-3" style={{ fontFamily: 'Cormorant Garamond' }}>4.8★</div>
                <div className="text-sm uppercase tracking-[0.12em] text-foreground/60 font-medium">{t('reviews.title')}</div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative group"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 group-hover:shadow-3xl">
              <ImageWithFallback
                src={introImage}
                alt="Altro Da Tony Pizza"
                className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}