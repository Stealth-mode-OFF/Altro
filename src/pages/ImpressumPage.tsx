
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
          {language === 'cs' ? 'Impressum (Zákonné informace)' : 'Impressum (Legal Notice)'}
        </h1>
        <div className="space-y-8 text-sm leading-relaxed text-gray-900">
          <section>
            <h2 className="font-bold mb-2 uppercase text-xs text-gray-500 tracking-widest">{language === 'cs' ? 'Provozovatel' : 'Service Provider'}</h2>
            <p className="font-bold text-base mb-1">Cucina di Tony s.r.o.</p>
            <p>{language === 'cs' ? 'Právní forma: Společnost s ručením omezeným' : 'Legal form: Limited Liability Company'}</p>
            <p>IČO: 21264309</p>
            <p>Na Florenci 1332/23, 110 00 Praha 1, Česká republika</p>
            <p>{language === 'cs' ? 'Zapsáno v obchodním rejstříku vedeném Městským soudem v Praze.' : 'Registered in the Commercial Register maintained by the Municipal Court in Prague.'}</p>
          </section>
          <section>
            <h2 className="font-bold mb-2 uppercase text-xs text-gray-500 tracking-widest">{language === 'cs' ? 'Kontaktní údaje' : 'Contact Information'}</h2>
            <p>Email: <a href="mailto:tony@altrodatony.com" className="underline hover:text-gray-600">tony@altrodatony.com</a></p>
            <p>Telefon: <a href="tel:+420774672458" className="underline hover:text-gray-600">+420 774 672 458</a></p>
            <p className="mt-1 text-gray-600 text-xs">{language === 'cs' ? 'Datová schránka' : 'Data Box'}: nvsf6cv</p>
          </section>
          <section>
            <h2 className="font-bold mb-2 uppercase text-xs text-gray-500 tracking-widest">{language === 'cs' ? 'Odpovědná osoba' : 'Responsible Person'}</h2>
            <p>Tony Altro</p>
            <p>Email: <a href="mailto:tony@altrodatony.com" className="underline hover:text-gray-600">tony@altrodatony.com</a></p>
          </section>
          <section>
            <h2 className="font-bold mb-2 uppercase text-xs text-gray-500 tracking-widest">{language === 'cs' ? 'Dozorový orgán' : 'Supervisory Authority'}</h2>
            <p>{language === 'cs' ? 'Česká obchodní inspekce, Štěpánská 15, 120 00 Praha 2' : 'Czech Trade Inspection Authority, Štěpánská 15, 120 00 Prague 2'}</p>
            <p><a href="https://www.coi.cz/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">www.coi.cz</a></p>
          </section>
          <section>
            <h2 className="font-bold mb-2 uppercase text-xs text-gray-500 tracking-widest">{language === 'cs' ? 'Způsob řešení sporů' : 'Dispute Resolution'}</h2>
            <p>{language === 'cs' ? 'Případné spory lze řešit mimosoudně prostřednictvím České obchodní inspekce.' : 'Any disputes can be resolved out of court through the Czech Trade Inspection Authority.'}</p>
          </section>
          <section>
            <h2 className="font-bold mb-2 uppercase text-xs text-gray-500 tracking-widest">{language === 'cs' ? 'Platnost' : 'Validity'}</h2>
            <p>{language === 'cs' ? 'Tento Impressum je platný od 22. 1. 2026.' : 'This legal notice is valid from 22 January 2026.'}</p>
          </section>
        </div>
      </div>
    </div>
  );
}