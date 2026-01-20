import { useEffect } from 'react';
import { HeroNew } from '../components/HeroNew';
import { ChefStory } from '../components/ChefStory';
import { DailyMenu } from '../components/DailyMenu';
import { MenuAccordion } from '../components/MenuAccordion';
import { Reservation } from '../components/Reservation';
import { LocationMap } from '../components/LocationMap';
import { Reviews } from '../components/Reviews';
import { InstagramCTA } from '../components/InstagramCTA';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { useLanguage } from '../contexts/LanguageContext';

export function HomePage() {
  const { language } = useLanguage();

  useEffect(() => {
    // Set page metadata
    document.title = language === 'cs' 
      ? 'Altro Da Tony | Italská Restaurace Praha 2 - Vinohrady, Korunní'
      : language === 'en'
      ? 'Altro Da Tony | Italian Restaurant Prague 2 - Vinohrady, Korunní'
      : 'Altro Da Tony | Ristorante Italiano Praga 2 - Vinohrady, Korunní';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const description = language === 'cs'
        ? 'Autentická italská restaurace v Praze 2 - Vinohrady. Neapolská pizza z pece Morello Forni, domácí čerstvá pasta, tradiční italské speciality. Korunní 48. Rezervace online.'
        : language === 'en'
        ? 'Authentic Italian restaurant in Prague 2 - Vinohrady. Neapolitan pizza from Morello Forni oven, fresh homemade pasta, traditional Italian specialties. Korunní 48. Book online.'
        : 'Autentico ristorante italiano a Praga 2 - Vinohrady. Pizza napoletana dal forno Morello Forni, pasta fresca fatta in casa, specialità italiane tradizionali. Korunní 48. Prenota online.';
      metaDescription.setAttribute('content', description);
    }

    // Set canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://altrodatony.com/');
    }
  }, [language]);

  return (
    <>
      <HeroNew />
      
      {/* SEO-critical intro text above fold */}
      <section className="bg-background py-8 md:py-12">
        <div className="container-custom px-6 max-w-4xl mx-auto text-center">
          <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
            {language === 'cs' && (
              <>
                Vítejte v <strong>Altro Da Tony</strong> – autentické <strong>italské restauraci v Praze 2 na Vinohradech</strong> (Korunní 48). 
                Podáváme tradiční <strong>neapolskou pizzu</strong> z prémiové pece Morello Forni, <strong>domácí čerstvou pastu</strong> a klasické 
                italské speciality. Rezervujte si stůl online nebo zavolejte <a href="tel:+420774672458" className="text-primary hover:underline whitespace-nowrap">+420 774 672 458</a>.
              </>
            )}
            {language === 'en' && (
              <>
                Welcome to <strong>Altro Da Tony</strong> – an authentic <strong>Italian restaurant in Prague 2 Vinohrady</strong> (Korunní 48). 
                We serve traditional <strong>Neapolitan pizza</strong> from premium Morello Forni oven, <strong>fresh homemade pasta</strong> and classic 
                Italian specialties. Book your table online or call <a href="tel:+420774672458" className="text-primary hover:underline whitespace-nowrap">+420 774 672 458</a>.
              </>
            )}
            {language === 'it' && (
              <>
                Benvenuti a <strong>Altro Da Tony</strong> – un autentico <strong>ristorante italiano a Praga 2 Vinohrady</strong> (Korunní 48). 
                Serviamo <strong>pizza napoletana</strong> tradizionale dal forno premium Morello Forni, <strong>pasta fresca fatta in casa</strong> e 
                specialità italiane classiche. Prenota il tuo tavolo online o chiama <a href="tel:+420774672458" className="text-primary hover:underline whitespace-nowrap">+420 774 672 458</a>.
              </>
            )}
          </p>
        </div>
      </section>

      <ChefStory />
      <DailyMenu />
      <MenuAccordion />
      <Reviews />
      <InstagramCTA />
      <NewsletterSignup />
      <Reservation />
      <LocationMap />
    </>
  );
}