import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function CookiesPage() {
  const { language } = useLanguage();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = language === 'cs' ? 'Cookies | Altro Da Tony' 
      : language === 'en' ? 'Cookies | Altro Da Tony'
      : 'Cookies | Altro Da Tony';
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
                {language === 'cs' ? 'nepoužíváme (pokud je v budoucnu zapneme, požádáme o souhlas)' : language === 'en' ? 'not used (if enabled in the future, we will ask for consent)' : 'non utilizzati (se attivati in futuro, chiederemo il consenso)'}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-primary mb-4">
              {language === 'cs' ? 'Cookies třetích stran' : language === 'en' ? 'Third‑party cookies' : 'Cookie di terze parti'}
            </h2>
            <p className="leading-relaxed">
              {language === 'cs' && 'Některé vložené prvky (např. mapy nebo sociální sítě) mohou nastavovat vlastní cookies podle zásad třetích stran.'}
              {language === 'en' && 'Some embedded elements (e.g., maps or social networks) may set their own cookies under third‑party policies.'}
              {language === 'it' && 'Alcuni elementi incorporati (es. mappe o social network) possono impostare cookie propri secondo le policy di terze parti.'}
            </p>
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
            <h2 className="text-xl font-serif text-stone-400 mb-4">
              {language === 'cs' ? 'Správa souhlasů a IP adresa' : language === 'en' ? 'Manage consent & IP address' : 'Gestione consenso e indirizzo IP'}
            </h2>
            <p className="text-sm text-stone-500">
              {language === 'cs' && (
                'Abychom vám zjednodušili opakované návštěvy, ukládáme informaci o vašem souhlasu spolu s vaší veřejnou IP adresou. Pokud navštívíte web z téže IP adresy, znovu vás o souhlas nepožádáme. Nastavení cookies můžete kdykoliv změnit ve svém prohlížeči nebo vymazáním cookies.'
              )}
              {language === 'en' && (
                'To simplify repeat visits, we store your consent information together with your public IP address. If you visit the site again from the same IP, you will not be asked for consent again. You can change cookie settings at any time in your browser or by clearing cookies.'
              )}
              {language === 'it' && (
                'Per semplificare le visite ripetute, memorizziamo il consenso insieme al tuo indirizzo IP pubblico. Se visiti nuovamente il sito dallo stesso IP, non ti verrà richiesto nuovamente il consenso. Puoi modificare le impostazioni dei cookie in qualsiasi momento nel browser o cancellando i cookie.'
              )}
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
