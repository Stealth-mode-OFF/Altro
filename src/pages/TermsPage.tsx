
import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function TermsPage() {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = language === 'cs' ? 'Obchodní podmínky | Altro Da Tony' : 'Terms & Conditions | Altro Da Tony';
  }, [language]);

  return (
    <section className="container-custom max-w-2xl mx-auto py-16">
      <h1 className="text-3xl font-serif mb-8">{language === 'cs' ? 'Obchodní podmínky' : 'Terms & Conditions'}</h1>
      <div className="space-y-6 text-base leading-relaxed">
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>{language === 'cs' ? 'Úvodní ustanovení' : 'Introductory Provisions'}</strong><br />
            {language === 'cs'
              ? 'Tyto obchodní podmínky upravují užívání webových stránek altrodatony.com a souvisejících služeb (rezervace, kontaktní formulář, newsletter). Provozovatelem webu je Cucina di Tony s.r.o., viz Impressum.'
              : 'These terms and conditions govern the use of the altrodatony.com website and related services (reservations, contact form, newsletter). The operator is Cucina di Tony s.r.o., see Impressum.'}
          </li>
          <li>
            <strong>{language === 'cs' ? 'Rezervace a služby' : 'Reservations and Services'}</strong><br />
            {language === 'cs'
              ? 'Rezervace stolu je nezávazná do potvrzení ze strany restaurace. Provozovatel si vyhrazuje právo rezervaci odmítnout nebo změnit čas dle kapacity. Kontaktní údaje zadané při rezervaci slouží pouze k vyřízení rezervace.'
              : 'Table reservations are non-binding until confirmed by the restaurant. The operator reserves the right to refuse or change the reservation time according to capacity. Contact details provided during reservation are used solely for processing the reservation.'}
          </li>
          <li>
            <strong>{language === 'cs' ? 'Platby a online prodej' : 'Payments and Online Sales'}</strong><br />
            {language === 'cs'
              ? 'Na tomto webu neprobíhají online platby a neprodáváme online vouchery. Veškeré platby probíhají na místě v restauraci.'
              : 'No online payments are processed on this website and we do not sell vouchers online. All payments are made on-site at the restaurant.'}
          </li>
          <li>
            <strong>{language === 'cs' ? 'Newsletter a marketing' : 'Newsletter and Marketing'}</strong><br />
            {language === 'cs'
              ? 'Přihlášením k odběru newsletteru souhlasíte se zasíláním obchodních sdělení. Odběr lze kdykoliv odhlásit kliknutím na odkaz v e-mailu nebo e-mailem na tony@altrodatony.com.'
              : 'By subscribing to the newsletter, you agree to receive commercial communications. You can unsubscribe at any time by clicking the link in the email or by emailing tony@altrodatony.com.'}
          </li>
          <li>
            <strong>{language === 'cs' ? 'Odpovědnost' : 'Liability'}</strong><br />
            {language === 'cs'
              ? 'Provozovatel nenese odpovědnost za škody vzniklé užíváním webu, za obsah třetích stran ani za dočasnou nedostupnost služeb. Veškeré informace na webu mají informativní charakter a nejsou právně závazné.'
              : 'The operator is not liable for damages arising from the use of the website, for third-party content, or for temporary unavailability of services. All information on the website is for informational purposes only and is not legally binding.'}
          </li>
          <li>
            <strong>{language === 'cs' ? 'Autorská práva' : 'Copyright'}</strong><br />
            {language === 'cs'
              ? 'Veškerý obsah webu (texty, fotografie, grafika, logo) je chráněn autorským právem a nesmí být bez souhlasu provozovatele dále šířen.'
              : 'All website content (texts, photos, graphics, logo) is protected by copyright and may not be further distributed without the operator’s consent.'}
          </li>
          <li>
            <strong>{language === 'cs' ? 'Závěrečná ustanovení' : 'Final Provisions'}</strong><br />
            {language === 'cs'
              ? 'Tyto podmínky nabývají účinnosti 22. 1. 2026 a mohou být kdykoliv změněny.'
              : 'These terms are effective from 22 January 2026 and may be changed at any time.'}
          </li>
        </ol>
      </div>
    </section>
  );
}
