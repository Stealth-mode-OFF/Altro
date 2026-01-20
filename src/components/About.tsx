import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { Award, Heart, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import chefImage from "../assets/72c7ddfeeafb6871bbe3a7be0139e4ff974e0c84.png";
import balsamicoImage from "../assets/d2f44ae16e31926bf96aef3c5f4e4a3d03368e0a.png";

export function About() {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Italian flag decorative element */}
      <div className="absolute top-0 left-0 right-0 h-2 flex">
        <div className="flex-1 bg-[#009246]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#CE2B37]" />
      </div>

      <div className="bg-[#C84A47] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl mb-10 leading-[0.95] font-bold whitespace-pre-line">
                {t('about.title')}
              </h1>
              
              <div className="space-y-7 text-xl md:text-2xl leading-relaxed opacity-95 font-light">
                <p>
                  {t('about.p1')}
                </p>
                
                <p className="italic">
                  {t('about.p2')}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-14 pt-14 border-t border-white/30">
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <Award className="w-10 h-10 text-yellow-300" />
                  </div>
                  <div className="text-5xl font-bold mb-2">20+</div>
                  <div className="text-base opacity-90">{t('about.stat1')}</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <Heart className="w-10 h-10 text-yellow-300" />
                  </div>
                  <div className="text-5xl font-bold mb-2">100%</div>
                  <div className="text-base opacity-90">{t('about.stat2')}</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <Users className="w-10 h-10 text-yellow-300" />
                  </div>
                  <div className="text-5xl font-bold mb-2">1000+</div>
                  <div className="text-base opacity-90">{t('about.stat3')}</div>
                </div>
              </div>

              <button
                onClick={() => {
                  const element = document.getElementById('menu');
                  if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                className="mt-12 bg-white text-[#C84A47] px-12 py-5 rounded-xl text-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-xl transform hover:-translate-y-1 inline-block font-medium"
              >
                {t('about.cta')} →
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main image - Chef photo */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={chefImage}
                  alt="Chef Antonín Sahulka"
                  className="w-full h-auto"
                />
                {/* Decorative overlay */}
                <div className="absolute inset-0 ring-8 ring-white/10 rounded-3xl pointer-events-none" />
              </div>
              
              {/* Balsamic art - decorative element */}
              <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl transform rotate-6 hover:rotate-0 transition-transform hidden lg:block">
                <ImageWithFallback
                  src={balsamicoImage}
                  alt="Balsamic vinegar art"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Chef badge */}
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform">
                <div className="text-center">
                  <div className="text-[#C84A47] mb-2 text-lg font-semibold">{t('about.chefLabel')}</div>
                  <div className="text-gray-900 text-2xl font-bold mb-1">{t('hero.chefName')}</div>
                  <div className="text-base text-gray-600">{t('about.chefYears')}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-2 flex">
        <div className="flex-1 bg-[#009246]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#CE2B37]" />
      </div>
    </section>
  );
}
