import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { Award, Heart } from 'lucide-react';
import chefImage from "figma:asset/8051cfda16de3d7aa19331d176f0be2dc150bed1.png";

export function ChefStory() {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="section-padding bg-secondary text-white overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="relative group">
              <ImageWithFallback
                src={chefImage}
                alt="Antonín Sahulka - Owner & Head Chef"
                className="w-full h-auto rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
              />
              
              {/* Decorative badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8, type: "spring", bounce: 0.25 }}
                className="absolute -bottom-8 -left-8 bg-accent text-secondary px-8 py-5 rounded-2xl shadow-2xl hidden lg:flex items-center gap-3"
              >
                <Award className="w-6 h-6" />
                <div>
                  <div className="text-xs uppercase tracking-[0.1em] font-medium mb-0.5">{t('about.chefLabel')}</div>
                  <div className="text-base font-semibold">{t('about.chefYears')}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className=""
          >
            <div className="inline-flex items-center gap-2 mb-8">
              <Heart className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm uppercase tracking-[0.15em] font-medium">
                {t('about.chefLabel')}
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.05] font-serif">
              {t('hero.chefName')}
            </h2>
            
            <div className="w-24 h-1 bg-accent mb-10" />

            <div className="space-y-8 text-lg md:text-xl text-white/80 leading-[1.8] font-light">
              <p>
                {t('about.ownerP1')}
              </p>
              
              <p>
                {t('about.ownerP2')}
              </p>

              <p>
                {t('about.ownerP3')}
              </p>
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
              className="mt-12 pl-8 border-l-2 border-accent"
            >
              <p className="italic text-white/60 text-lg font-light leading-[1.7]">
                "{t('about.ownerQuote')}"
              </p>
              <p className="mt-3 text-accent text-sm font-medium uppercase tracking-[0.12em]">
                — Antonín Sahulka
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}