import { Star, ExternalLink, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { GOOGLE_MAPS_SHORT_URL, GOOGLE_REVIEWS } from '../constants/maps';

const reviews = [
  {
    author: 'Martin P.',
    rating: 5,
    text: 'Naprosto fantastický zážitek! Jídlo je autentické, personál neuvěřitelně milý a atmosféra vás přenese přímo do Itálie. Tonyho kuchyně nemá v Praze konkurenci.',
    highlight: 'Autentická Itálie',
  },
  {
    author: 'Veronika S.',
    rating: 5,
    text: 'Úžasná restaurace s duší. Chodíme sem pravidelně na rodinné večeře a pokaždé jsme nadšení. Carbonara je zde nejlepší, jakou jsem kdy jedla.',
    highlight: 'Nejlepší Carbonara',
  },
  {
    author: 'Jakub D.',
    rating: 5,
    text: 'Skvělý výběr vín a jídlo připravené s láskou. Obsluha je profesionální, ale zároveň velmi přátelská. Doporučuji rezervaci předem!',
    highlight: 'Jídlo s láskou',
  },
  {
    author: 'Elena R.',
    rating: 5,
    text: 'Krásné prostředí a vynikající mořské plody. Cítili jsme se zde jako na dovolené. Děkujeme za skvělý večer.',
    highlight: 'Vynikající mořské plody',
  },
  {
    author: 'Tomáš N.',
    rating: 5,
    text: 'Pokud hledáte pravou italskou kuchyni bez kompromisů, jste tu správně. Pizza má perfektní těsto a suroviny jsou vždy čerstvé.',
    highlight: 'Pravá italská',
  },
  {
    author: 'Lucie K.',
    rating: 5,
    text: 'Velmi příjemné překvapení na Vinohradech. Osobní přístup majitele a skvělá atmosféra. Určitě se brzy vrátíme.',
    highlight: 'Osobní přístup',
  },
];

export function Reviews() {
  const { t } = useLanguage();
  const { averageRating, totalReviews } = GOOGLE_REVIEWS;

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        {/* Header with rating */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12 sm:mb-24"
        >
          <h2 className="text-4xl md:text-7xl lg:text-8xl mb-8 sm:mb-12 font-serif">{t('reviews.title')}</h2>
          
          <a
            href={GOOGLE_MAPS_SHORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 sm:p-14 shadow-xl max-w-full hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4 sm:mb-8">
              <div className="text-6xl sm:text-8xl md:text-9xl text-primary font-bold group-hover:text-primary/80 transition-colors">{averageRating}</div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start mb-2 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-8 h-8 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="text-gray-600 text-lg group-hover:text-gray-800 transition-colors">{t('reviews.based')} {totalReviews}{t('reviews.reviews')}</div>
              </div>
            </div>
            <div className="text-base text-gray-600 font-medium flex items-center justify-center gap-2 group-hover:text-primary transition-colors">
              {t('reviews.google')}
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <Quote className="w-10 h-10 text-gray-200" />
              </div>

              <p className="text-gray-700 mb-6 leading-[1.75] text-lg">{review.text}</p>

              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div className="text-base text-gray-900 font-medium">{review.author}</div>
                {review.highlight && (
                  <div className="text-xs text-primary bg-primary/5 px-3 py-1.5 rounded-full font-medium">
                    {review.highlight}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA to Google Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-20">


            <a
              href="https://www.google.com/maps/place/Altro+Da+Tony/@50.0751789,14.4425174,17z/data=!4m8!3m7!1s0x470b95ded05abb61:0x9135fb520cd7c526!8m2!3d50.0751789!4d14.4450923!9m1!1b1!16s%2Fg%2F11x0r9srl2?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D#:~:text=%EE%A2%8E-,%EE%95%A0,-Write%20a%20review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl hover:bg-primary/90 transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 font-medium text-lg"
            >
              <Star className="w-5 h-5 fill-white" />
              {t('reviews.write')}
            </a>
          </div>

          {/* Social proof CTA */}
          <div className="mt-20 bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-16 text-white">
            <h3 className="text-4xl md:text-5xl mb-8 font-serif font-bold leading-[1.1]">{t('reviews.join')}</h3>
            <p className="text-white/95 mb-10 text-xl md:text-2xl font-light leading-[1.7] max-w-2xl mx-auto">
              {t('reviews.joinText')}
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('reservation');
                if (element) {
                  const offset = 120;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.scrollY - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}
              className="bg-white text-primary px-14 py-6 rounded-2xl text-xl hover:bg-gray-100 transition-all duration-500 shadow-2xl hover:shadow-xl transform hover:-translate-y-1 font-medium"
            >
              {t('reviews.cta')} →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}