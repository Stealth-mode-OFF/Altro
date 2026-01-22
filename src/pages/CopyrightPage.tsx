import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function CopyrightPage() {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = language === 'cs' ? 'Autorská práva | Altro Da Tony' : 'Copyright | Altro Da Tony';
  }, [language]);

  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-20 font-sans">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-2xl font-bold mb-8 uppercase tracking-wider border-b border-black pb-4">
          {language === 'cs' ? 'Autorská práva' : 'Copyright'}
        </h1>
        <div className="space-y-6 text-sm leading-relaxed text-gray-900">
          <p>
            {language === 'cs'
              ? 'Veškerý obsah těchto webových stránek (texty, fotografie, grafika, logo, struktura) je chráněn autorským právem a je majetkem společnosti Cucina di Tony s.r.o. Jakékoliv kopírování, šíření nebo jiné užití obsahu bez předchozího písemného souhlasu je zakázáno.'
              : 'All content on this website (texts, photos, graphics, logo, structure) is protected by copyright and is the property of Cucina di Tony s.r.o. Any copying, distribution, or other use of the content without prior written consent is prohibited.'}
          </p>
          <p>
            {language === 'cs'
              ? 'Porušení autorských práv může být postihováno podle platných právních předpisů.'
              : 'Violation of copyright may be prosecuted under applicable law.'}
          </p>
          <p className="mt-8 text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Cucina di Tony s.r.o. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
