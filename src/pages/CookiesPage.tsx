import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { checkConsent, getCookie, CONSENT_KEY } from '../components/CookieConsent';

export function CookiesPage() {
  const { language } = useLanguage();
  const [status, setStatus] = useState<{
    consent: string | null;
    cookie: string | null;
    local: string | null;
  }>({ consent: null, cookie: null, local: null });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = language === 'cs' ? 'Cookies | Altro Da Tony' 
      : language === 'en' ? 'Cookies | Altro Da Tony'
      : 'Cookies | Altro Da Tony';

    // Check status
    const updateStatus = () => {
      setStatus({
        consent: checkConsent(),
        cookie: getCookie(CONSENT_KEY),
        local: localStorage.getItem(CONSENT_KEY)
      });
    };
    
    updateStatus();
    const interval = setInterval(updateStatus, 1000);
    return () => clearInterval(interval);
  }, [language]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container-custom px-6 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif mb-8">Cookies</h1>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 space-y-8 text-foreground/80">
          
          <section>
            <p className="text-lg leading-relaxed">
              {language === 'cs' && 'Webové stránky provozované společností Cucina di Tony s.r.o. používají soubory cookies.'}
              {language === 'en' && 'Websites operated by Cucina di Tony s.r.o. use cookies.'}
              {language === 'it' && 'I siti web gestiti da Cucina di Tony s.r.o. utilizzano i cookie.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-primary mb-4">
              {language === 'cs' ? 'Co jsou cookies' : language === 'en' ? 'What are cookies' : 'Cosa sono i cookie'}
            </h2>
            <p className="leading-relaxed">
              {language === 'cs' && 'Cookies jsou malé textové soubory ukládané do vašeho zařízení, které pomáhají zajistit správné fungování webu.'}
              {language === 'en' && 'Cookies are small text files stored on your device that help ensure the proper functioning of the website.'}
              {language === 'it' && 'I cookie sono piccoli file di testo memorizzati sul vostro dispositivo che aiutano a garantire il corretto funzionamento del sito web.'}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-primary mb-4">
              {language === 'cs' ? 'Jaké cookies používáme' : language === 'en' ? 'What cookies we use' : 'Quali cookie utilizziamo'}
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>{language === 'cs' ? 'Technické cookies' : language === 'en' ? 'Technical cookies' : 'Cookie tecnici'}</strong> –{' '}
                {language === 'cs' ? 'nezbytné pro správné fungování webu' : language === 'en' ? 'necessary for the proper functioning of the website' : 'necessari per il corretto funzionamento del sito'}
              </li>
              <li>
                <strong>{language === 'cs' ? 'Analytické cookies' : language === 'en' ? 'Analytical cookies' : 'Cookie analitici'}</strong> –{' '}
                {language === 'cs' ? 'slouží ke zlepšování obsahu a funkčnosti webu (anonymizovaná data)' : language === 'en' ? 'serve to improve the content and functionality of the website (anonymized data)' : 'servono a migliorare il contenuto e la funzionalità del sito (dati anonimizzati)'}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-primary mb-4">
              {language === 'cs' ? 'Jak cookies spravovat' : language === 'en' ? 'How to manage cookies' : 'Come gestire i cookie'}
            </h2>
            <p className="leading-relaxed">
              {language === 'cs' && 'Používání cookies můžete omezit nebo zakázat ve svém internetovém prohlížeči. Vypnutí některých cookies může ovlivnit funkčnost webu.'}
              {language === 'en' && 'You can limit or disable the use of cookies in your internet browser. Disabling some cookies may affect the functionality of the website.'}
              {language === 'it' && 'Potete limitare o disabilitare l\'uso dei cookie nel vostro browser internet. La disattivazione di alcuni cookie potrebbe influire sulla funzionalità del sito.'}
            </p>
          </section>

          <section className="pt-8 border-t border-stone-100 mt-8">
            <h2 className="text-xl font-serif text-stone-400 mb-4 flex items-center gap-2">
              Debug Info <span className="text-xs bg-stone-100 text-stone-500 px-2 py-1 rounded">Tech</span>
            </h2>
            <div className="bg-stone-50 p-4 rounded-lg font-mono text-sm space-y-2 text-stone-600">
              <div className="flex justify-between">
                <span>Status:</span>
                <span className={status.consent ? 'text-green-600 font-bold' : 'text-red-500'}>
                  {status.consent ? (status.consent === 'accepted' ? 'ACCEPTED' : 'DECLINED') : 'NOT SET'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Cookie Storage:</span>
                <span>{status.cookie ? 'Present' : 'Empty'}</span>
              </div>
              <div className="flex justify-between">
                <span>Local Storage:</span>
                <span>{status.local ? 'Present' : 'Empty'}</span>
              </div>
              <div className="pt-2 text-xs text-stone-400 break-all">
                Key: {CONSENT_KEY}
              </div>
            </div>
            <button 
              onClick={() => {
                document.cookie = `${CONSENT_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                localStorage.removeItem(CONSENT_KEY);
                window.location.reload();
              }}
              className="mt-4 text-xs text-red-400 hover:text-red-600 underline"
            >
              Reset / Clear Data
            </button>
          </section>

        </div>
      </div>
    </div>
  );
}
