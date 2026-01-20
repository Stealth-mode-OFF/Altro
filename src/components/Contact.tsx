import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';

export function Contact() {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl lg:text-8xl mb-6 font-bold">{t('contact.title')}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div>
              <div className="flex items-start space-x-5 mb-8 bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                <MapPin className="w-7 h-7 text-[#C84A47] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl mb-3 font-semibold">{t('contact.address')}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {t('contact.addressLine1')}<br />
                    {t('contact.addressLine2')}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start space-x-5 mb-8 bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                <Phone className="w-7 h-7 text-[#C84A47] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl mb-3 font-semibold">{t('contact.phone')}</h3>
                  <a
                    href="tel:+420774672458"
                    className="text-gray-600 hover:text-[#C84A47] text-xl transition-colors font-medium whitespace-nowrap"
                  >
                    +420 774 672 458
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start space-x-5 mb-8 bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                <Mail className="w-7 h-7 text-[#C84A47] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl mb-3 font-semibold">{t('contact.email')}</h3>
                  <a
                    href="mailto:rezervace@altrodatony.com"
                    className="text-gray-600 hover:text-[#C84A47] text-lg transition-colors break-all"
                  >
                    rezervace@altrodatony.com
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start space-x-5 bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                <Clock className="w-7 h-7 text-[#C84A47] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl mb-3 font-semibold">{t('contact.hours')}</h3>
                  <p className="text-gray-600 text-lg">{t('contact.schedule')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl h-full min-h-[600px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.4668279366596!2d14.428844315751613!3d50.07018797942544!2m3!1f0!2f0!3f0!3m2!1i1024!i768!4f13.1!3m3!1m2!1s0x470b948d7c5c5c5d%3A0x5c5c5c5c5c5c5c5c!2sKorunn%C3%AD%2048%2C%20120%2000%20Vinohrady!5e0!3m2!1sen!2scz!4v1638888888888!5m2!1sen!2scz"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa restaurace Altro da Tony"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}