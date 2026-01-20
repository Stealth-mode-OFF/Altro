import { motion } from 'motion/react';
import { Flame, Award, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import pizzaImage from "../assets/37bb8a659a4a3f6604f817c626f331b3541fff8a.png";

export function SignatureDish() {
  const { language } = useLanguage();

  const content = {
    cs: {
      badge: 'Naše Specialita',
      name: 'Pizza Margherita DOC',
      description: 'Klasická neapolská pizza z pece Morello Forni při 450°C. San Marzano rajčata, mozzarella fior di latte, čerstvá bazalka a extra panenský olivový olej.',
      price: '265 Kč',
      cta: 'Zobrazit menu',
      features: ['Pec Morello Forni', 'Kváskové těsto 72h', 'Italské suroviny']
    },
    en: {
      badge: 'Our Signature',
      name: 'Pizza Margherita DOC',
      description: 'Classic Neapolitan pizza from Morello Forni oven at 450°C. San Marzano tomatoes, fior di latte mozzarella, fresh basil and extra virgin olive oil.',
      price: '265 Kč',
      cta: 'View menu',
      features: ['Morello Forni oven', '72h sourdough', 'Italian ingredients']
    },
    it: {
      badge: 'La Nostra Specialità',
      name: 'Pizza Margherita DOC',
      description: 'Pizza napoletana classica dal forno Morello Forni a 450°C. Pomodori San Marzano, mozzarella fior di latte, basilico fresco e olio extravergine di oliva.',
      price: '265 Kč',
      cta: 'Vedi menu',
      features: ['Forno Morello Forni', 'Lievito madre 72h', 'Ingredienti italiani']
    }
  };

  const t = content[language];

  const scrollToMenu = () => {
    const element = document.getElementById('menu');
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
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background decoration - Hidden on mobile to prevent overflow/distraction */}
      <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col gap-8 md:gap-12 lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group mx-auto max-w-md lg:max-w-none">
              <ImageWithFallback
                src={pizzaImage}
                alt="Pizza Margherita"
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Award badge */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-primary text-white rounded-full p-2 sm:p-3 shadow-lg">
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-6 text-center lg:text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.15em]">
              <Flame className="w-3 h-3" />
              {t.badge}
            </div>

            {/* Title & Price */}
            <div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl mb-3 text-foreground font-medium tracking-tight leading-[1.1] font-serif">
                {t.name}
              </h2>
              <div className="text-2xl sm:text-3xl text-primary font-semibold">
                {t.price}
              </div>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-foreground/70 leading-relaxed font-light">
              {content['cs'].description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
              {t.features.map((feature, index) => (
                <div
                  key={index}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-muted/50 rounded-full text-xs sm:text-sm font-medium text-foreground/70 border border-border/50"
                >
                  {feature}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={scrollToMenu}
                className="group inline-flex items-center gap-3 bg-foreground text-white px-8 py-4 rounded-full hover:bg-primary transition-all duration-400 hover:scale-105 active:scale-95 touch-manipulation font-semibold w-full sm:w-auto justify-center"
              >
                <span>{t.cta}</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-400 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
