import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function TermsPage() {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = language === 'cs' ? 'Obchodní podmínky | Altro Da Tony' : 'Terms & Conditions | Altro Da Tony';
  }, [language]);

  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-20 font-sans">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-2xl font-bold mb-8 uppercase tracking-wider border-b border-black pb-4">
          {language === 'cs' ? 'Obchodní podmínky' : 'Terms and Conditions'}
        </h1>

        <div className="space-y-6 text-sm leading-relaxed text-gray-900">
          <p>
            {language === 'cs' 
              ? 'Poskytování našich služeb se řídí platnými zákony České republiky a těmito Obchodními podmínkami.'
              : 'The provision of our services is governed by the applicable laws of the Czech Republic and these Terms and Conditions.'}
          </p>
          
          <p>
             {language === 'cs'
               ? 'Prosíme, seznamte se s nimi před provedením rezervace nebo objednávky.'
               : 'Please review them carefully before making a reservation or order.'}
          </p>

          <div className="p-4 bg-gray-50 border border-gray-200 mt-8">
            <p className="italic text-gray-500">
              {language === 'cs' 
                ? 'Plné znění obchodních podmínek je k dispozici v provozovně.'
                : 'The full text of the Terms and Conditions is available at the establishment.'}
            </p>
          </div>
          
          <section className="mt-12 pt-8 border-t border-gray-100">
            <h2 className="font-bold mb-4 uppercase text-xs text-gray-500 tracking-widest">
              {language === 'cs' ? 'Odstoupení od smlouvy (Spotřebitel)' : 'Right of withdrawal'}
            </h2>
            <p>
              {language === 'cs'
                ? 'Spotřebitelé mají právo odstoupit od smlouvy v zákonné lhůtě, pokud byla smlouva uzavřena distančním způsobem (např. online objednávka), s výjimkou případů stanovených zákonem (např. dodání zboží podléhajícího rychlé zkáze nebo zboží upraveného podle přání spotřebitele).'
                : 'Consumers have the right to withdraw from the contract within the statutory period if the contract was concluded remotely (e.g. online order), with the exception of cases specified by law (e.g. supply of goods subject to rapid decay or goods customized to the consumer\'s wishes).'}
            </p>
            <p className="mt-4 text-xs text-gray-500">
              {language === 'cs'
                ? 'Detailní podmínky jsou specifikovány v plném znění Obchodních podmínek.'
                : 'Detailed conditions are specified in the full Terms and Conditions.'}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}