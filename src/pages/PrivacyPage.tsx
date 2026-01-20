import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function PrivacyPage() {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = language === 'cs' ? 'GDPR | Altro Da Tony' : 'GDPR | Altro Da Tony';
  }, [language]);

  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-20 font-sans">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-2xl font-bold mb-8 uppercase tracking-wider border-b border-black pb-4">
          {language === 'cs' ? 'Ochrana osobních údajů (GDPR)' : 'Personal Data Protection (GDPR)'}
        </h1>

        <div className="space-y-8 text-sm leading-relaxed text-gray-900">
          
          <p className="font-medium">
            {language === 'cs'
              ? 'Osobní údaje zpracováváme v souladu s Nařízením (EU) 2016/679 (GDPR).'
              : 'We process personal data in accordance with Regulation (EU) 2016/679 (GDPR).'}
          </p>

          <section>
            <h2 className="font-bold mb-2 uppercase text-xs text-gray-500 tracking-widest">
              {language === 'cs' ? 'Správce údajů' : 'Data Controller'}
            </h2>
            <p className="font-bold">Cucina di Tony s.r.o.</p>
            <p>IČO: 21264309</p>
            <p>Sídlo: Na Florenci 1332/23, 110 00 Praha 1</p>
          </section>

          <section>
            <h2 className="font-bold mb-2 uppercase text-xs text-gray-500 tracking-widest">
              {language === 'cs' ? 'Účel a rozsah zpracování' : 'Purpose and Scope of Processing'}
            </h2>
            <p>
              {language === 'cs'
                ? 'Osobní údaje jsou zpracovávány výhradně za účelem:'
                : 'Personal data is processed solely for the purpose of:'}
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                {language === 'cs' ? 'Poskytování našich služeb (rezervace stolů, objednávky)' : 'Providing our services (table reservations, orders)'}
              </li>
              <li>
                {language === 'cs' ? 'Komunikace s klienty' : 'Communication with clients'}
              </li>
              <li>
                {language === 'cs' ? 'Plnění zákonných povinností (např. účetnictví)' : 'Fulfilling legal obligations (e.g. accounting)'}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold mb-2 uppercase text-xs text-gray-500 tracking-widest">
              {language === 'cs' ? 'Doba uložení' : 'Retention Period'}
            </h2>
            <p>
              {language === 'cs'
                ? 'Osobní údaje uchováváme pouze po dobu nezbytně nutnou k naplnění účelu zpracování nebo po dobu stanovenou zákonem.'
                : 'We retain personal data only for as long as necessary to fulfill the purpose of processing or for the period required by law.'}
            </p>
          </section>

          <section>
            <h2 className="font-bold mb-2 uppercase text-xs text-gray-500 tracking-widest">
              {language === 'cs' ? 'Práva subjektů údajů' : 'Rights of Data Subjects'}
            </h2>
            <p className="mb-2">
              {language === 'cs'
                ? 'Jako subjekt údajů máte následující práva:'
                : 'As a data subject, you have the following rights:'}
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{language === 'cs' ? 'Právo na přístup k osobním údajům' : 'Right of access to personal data'}</li>
              <li>{language === 'cs' ? 'Právo na opravu nepřesných údajů' : 'Right to rectification'}</li>
              <li>{language === 'cs' ? 'Právo na výmaz ("právo být zapomenut")' : 'Right to erasure ("right to be forgotten")'}</li>
              <li>{language === 'cs' ? 'Právo na omezení zpracování' : 'Right to restriction of processing'}</li>
              <li>{language === 'cs' ? 'Právo na přenositelnost údajů' : 'Right to data portability'}</li>
              <li>{language === 'cs' ? 'Právo vznést námitku proti zpracování' : 'Right to object to processing'}</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold mb-2 uppercase text-xs text-gray-500 tracking-widest">
              {language === 'cs' ? 'Kontakt pro GDPR' : 'GDPR Contact'}
            </h2>
            <p>
              {language === 'cs'
                ? 'V případě dotazů nebo uplatnění vašich práv nás kontaktujte na:'
                : 'For any questions or to exercise your rights, please contact us at:'}
            </p>
            <p className="font-bold mt-2"><a href="mailto:rezervace@altrodatony.com" className="underline hover:text-gray-600">rezervace@altrodatony.com</a></p>
          </section>

        </div>
      </div>
    </div>
  );
}