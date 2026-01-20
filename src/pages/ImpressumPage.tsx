import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function ImpressumPage() {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = language === 'cs' ? 'Impressum | Altro Da Tony' : 'Impressum | Altro Da Tony';
  }, [language]);

  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-20 font-sans">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-2xl font-bold mb-8 uppercase tracking-wider border-b border-black pb-4">
          {language === 'cs' ? 'Identifikace poskytovatele' : 'Service Provider Identification'}
        </h1>

        <div className="space-y-8 text-sm leading-relaxed text-gray-900">
          
          {/* IDENTIFIKACE */}
          <section>
            <h2 className="font-bold mb-2 uppercase text-xs text-gray-500 tracking-widest">
              {language === 'cs' ? 'Provozovatel / Service Provider' : 'Service Provider'}
            </h2>
            <p className="font-bold text-base mb-1">Cucina di Tony s.r.o.</p>
            <p>{language === 'cs' ? 'Právní forma: Společnost s ručením omezeným' : 'Legal form: Limited Liability Company'}</p>
          </section>

          <section>
            <h2 className="font-bold mb-2 uppercase text-xs text-gray-500 tracking-widest">
              {language === 'cs' ? 'Sídlo / Registered Office' : 'Registered Office'}
            </h2>
            <p>Na Florenci 1332/23</p>
            <p>Nové Město (Praha 1)</p>
            <p>110 00 Praha</p>
            <p>Česká republika / Czech Republic</p>
          </section>

          <section>
            <h2 className="font-bold mb-2 uppercase text-xs text-gray-500 tracking-widest">
              {language === 'cs' ? 'Identifikační údaje / Company ID' : 'Company ID'}
            </h2>
            <p>IČO: 21264309</p>
          </section>

          <section>
            <h2 className="font-bold mb-2 uppercase text-xs text-gray-500 tracking-widest">
              {language === 'cs' ? 'Zápis v rejstříku / Register' : 'Registered in'}
            </h2>
            <p>
              {language === 'cs' 
                ? 'Společnost je zapsána v obchodním rejstříku vedeném Městským soudem v Praze.'
                : 'Registered in the Commercial Register maintained by the Municipal Court in Prague.'}
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-2 uppercase text-xs text-gray-500 tracking-widest">
              {language === 'cs' ? 'Kontakt / Contact' : 'Contact'}
            </h2>
            <p>Email: <a href="mailto:tony@altrodatony.com" className="underline hover:text-gray-600">tony@altrodatony.com</a></p>
            <p>Phone: <a href="tel:+420774672458" className="underline hover:text-gray-600">+420 774 672 458</a></p>
            <p className="mt-1 text-gray-600 text-xs">
              {language === 'cs' ? 'Datová schránka' : 'Data Box'}: nvsf6cv
            </p>
          </section>

          <div className="h-px bg-gray-200 my-8" />

          {/* CENY */}
          <section>
             <h2 className="font-bold mb-2 uppercase text-xs text-gray-500 tracking-widest">
              {language === 'cs' ? 'Informace o cenách / Pricing' : 'Pricing Information'}
            </h2>
            <p>
              {language === 'cs'
                ? 'Ceny služeb a produktů jsou uvedeny v aktuálním jídelním a nápojovém lístku dostupném v provozovně a na těchto webových stránkách v sekci Menu.'
                : 'Prices of services and products are listed in the current food and drink menu available at the establishment and on this website in the Menu section.'}
            </p>
            <p className="mt-2 font-medium">
              {language === 'cs'
                ? 'Všechny ceny jsou uvedeny včetně DPH.'
                : 'All prices are stated including VAT.'}
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}