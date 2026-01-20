import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import galleryImage2 from '../assets/2678cc9f1180293e020e020c24637564c46ba85c.png';

export function Gallery() {
  const { t } = useLanguage();
  
  const galleryItems = [
    { image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800', title: t('gallery.item1.title'), category: t('gallery.item1.category') },
    { image: galleryImage2, title: t('gallery.item2.title'), category: t('gallery.item2.category') },
    { image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800', title: t('gallery.item3.title'), category: t('gallery.item3.category') },
    { image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800', title: t('gallery.item4.title'), category: t('gallery.item4.category') },
    { image: 'https://images.unsplash.com/photo-1627207644206-a2040d60ecad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGFzdGElMjBjYXJib25hcmElMjBkaXNofGVufDF8fHx8MTc2UyMTA3NDd8MA&ixlib=rb-4.1.0&q=80&w=1080', title: t('gallery.item5.title'), category: t('gallery.item5.category') },
    { image: 'https://images.unsplash.com/photo-1673213936348-3ad0a1c4270c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwYnJlYWQlMjBvbGl2ZSUyMG9pbHxlbnwxfHx8fDE3NjUyMTA0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080', title: t('gallery.item6.title'), category: t('gallery.item6.category') },
  ];

  return (
    <section className="section-padding bg-muted/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-24"
        >
          <div className="w-20 h-0.5 bg-primary mx-auto mb-10" />
          <h2 className="text-5xl md:text-6xl lg:text-7xl mb-6">{t('gallery.title')}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-secondary"
            >
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                  <div className="text-accent text-xs uppercase tracking-[0.15em] mb-2 font-medium">
                    {item.category}
                  </div>
                  <h3 className="text-white text-3xl font-medium leading-tight" style={{ fontFamily: 'Cormorant Garamond' }}>
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}