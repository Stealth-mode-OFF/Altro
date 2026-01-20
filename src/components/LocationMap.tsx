import { MapPin, Navigation, Train } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export function LocationMap() {
  const { language } = useLanguage();

  const content = {
    cs: {
      title: 'Najdete nás',
      subtitle: 'V srdci Vinohrad, pár kroků od Náměstí Míru',
      address: 'Korunní 48, Praha 2 - Vinohrady, 120 00',
      directions: 'Navigovat',
      metro: 'Metro A - Náměstí Míru (5 min)',
      tram: 'Tramvaj 10, 16 - Šumavská',
      parking: 'Parkování na ulici nebo Atrium Flora'
    },
    en: {
      title: 'Find us',
      subtitle: 'In the heart of Vinohrady, steps from Náměstí Míru',
      address: 'Korunní 48, Praha 2 - Vinohrady, 120 00',
      directions: 'Get directions',
      metro: 'Metro A - Náměstí Míru (5 min)',
      tram: 'Tram 10, 16 - Šumavská',
      parking: 'Street parking or Atrium Flora'
    },
    it: {
      title: 'Dove siamo',
      subtitle: 'Nel cuore di Vinohrady, a pochi passi da Náměstí Míru',
      address: 'Korunní 48, Praha 2 - Vinohrady, 120 00',
      directions: 'Indicazioni',
      metro: 'Metro A - Náměstí Míru (5 min)',
      tram: 'Tram 10, 16 - Šumavská',
      parking: 'Parcheggio in strada o Atrium Flora'
    }
  };

  const t = content[language];

  return (
    <section id="location" className="section-padding bg-muted/30 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl mb-4 text-foreground font-medium tracking-tight leading-[1.1] font-serif">
            {t.title}
          </h2>
          <p className="text-lg text-foreground/60 font-light max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden shadow-xl h-[300px] sm:h-[400px] lg:h-[500px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10241.543956823539!2d14.4426!3d50.0755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKorunn%C3%AD%2048%2C%20120%2000%20Praha%202-Vinohrady!5e0!3m2!1sen!2scz!4v1710000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location map"
              className="w-full h-full filter grayscale hover:grayscale-0 transition-all duration-700 ease-in-out mix-blend-multiply opacity-90 hover:opacity-100"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Address Card */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-border/50">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-wider text-foreground/50 font-semibold mb-1">
                    {language === 'cs' ? 'Adresa' : language === 'it' ? 'Indirizzo' : 'Address'}
                  </div>
                  <div className="text-lg font-medium text-foreground">
                    {t.address}
                  </div>
                </div>
              </div>
              <a
                href="https://maps.app.goo.gl/2HSXVSZx1cJtphZGA?g_st=ipc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-4 rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation font-semibold w-full justify-center"
              >
                <Navigation className="w-4 h-4" />
                {t.directions}
              </a>
            </div>

            {/* Transport */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-border/50">
              <h3 className="text-xs uppercase tracking-widest text-stone-400 font-bold mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                {language === 'cs' ? 'Jak k nám' : language === 'it' ? 'Come Arrivare' : 'How to get here'}
              </h3>
              
              <div className="space-y-5">
                {/* Metro */}
                <div className="flex items-start gap-4 group cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-[#00A558]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span className="font-bold text-[#00A558] text-lg">A</span>
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-bold text-stone-900 leading-tight">Metro A</p>
                    <p className="text-xs text-stone-500 mt-0.5">Náměstí Míru (5 min)</p>
                  </div>
                </div>

                {/* Tram */}
                <div className="flex items-start gap-4 group cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-[#ED1C24]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Train className="w-5 h-5 text-[#ED1C24]" />
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-bold text-stone-900 leading-tight">Tram 10, 16</p>
                    <p className="text-xs text-stone-500 mt-0.5">Šumavská</p>
                  </div>
                </div>

                {/* Parking */}
                <div className="flex items-start gap-4 group cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-[#0065B3]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span className="font-serif font-bold text-[#0065B3] text-lg">P</span>
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-bold text-stone-900 leading-tight">{language === 'cs' ? 'Parkování' : language === 'it' ? 'Parcheggio' : 'Parking'}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{t.parking}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}