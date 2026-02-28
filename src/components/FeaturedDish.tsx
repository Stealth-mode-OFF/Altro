import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import pizzaImage from "../assets/37bb8a659a4a3f6604f817c626f331b3541fff8a.png";

export function FeaturedDish() {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 md:py-20 bg-muted/50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="text-4xl md:text-5xl mb-6 leading-[1.1] whitespace-pre-line">
              {t('featured.title')}
            </h2>

            <p className="text-lg text-foreground/70 leading-relaxed mb-8 font-light max-w-lg">
              {t('featured.description')}
            </p>


          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative group"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 group-hover:shadow-3xl">
              <ImageWithFallback
                src={pizzaImage}
                alt="Napoletana Pizza"
                className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}