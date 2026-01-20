import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LocationMap } from '../components/LocationMap';
import { Phone, MapPin, Clock, Mail, Navigation, Train, Car } from 'lucide-react';
import { navigate } from '../utils/router';

export function ContactPage() {
  const { language } = useLanguage();

  const navigateToReservation = () => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('reservation');
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    document.title = language === 'cs' 
      ? 'Kontakt | Italská Restaurace Altro Da Tony Praha 2 - Vinohrady'
      : language === 'en'
      ? 'Contact | Italian Restaurant Altro Da Tony Prague 2 - Vinohrady'
      : 'Contatti | Ristorante Italiano Altro Da Tony Praga 2 - Vinohrady';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const description = language === 'cs'
        ? 'Kontakt: Altro Da Tony, Korunní 48, Praha 2 - Vinohrady. Tel: +420 774 672 458. Otevřeno Po-Ne 11:00-23:00. MHD: Náměstí Míru, I.P. Pavlova.'
        : language === 'en'
        ? 'Contact: Altro Da Tony, Korunní 48, Prague 2 - Vinohrady. Tel: +420 774 672 458. Open Mon-Sun 11:00-23:00. Public transport: Náměstí Míru, I.P. Pavlova.'
        : 'Contatti: Altro Da Tony, Korunní 48, Praga 2 - Vinohrady. Tel: +420 774 672 458. Aperto Lun-Dom 11:00-23:00. Trasporti pubblici: Náměstí Míru, I.P. Pavlova.';
      metaDescription.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://altrodatony.com/kontakt');
    }

    window.scrollTo(0, 0);
  }, [language]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
        <div className="container-custom px-6 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Phone className="w-4 h-4" />
            <span className="uppercase tracking-wide">
              {language === 'cs' ? 'Kontakt' : language === 'en' ? 'Contact' : 'Contatti'}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif mb-4">
            {language === 'cs' && 'Navštivte nás na Vinohradech'}
            {language === 'en' && 'Visit Us in Vinohrady'}
            {language === 'it' && 'Visitateci a Vinohrady'}
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            {language === 'cs' && 'Těšíme se na vaši návštěvu v italské restauraci Altro Da Tony v Praze 2 - Vinohrady, Korunní 48.'}
            {language === 'en' && 'We look forward to your visit at Altro Da Tony Italian restaurant in Prague 2 - Vinohrady, Korunní 48.'}
            {language === 'it' && 'Non vediamo l\'ora della vostra visita al ristorante italiano Altro Da Tony a Praga 2 - Vinohrady, Korunní 48.'}
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container-custom px-6 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Address */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-xl mb-2">
                    {language === 'cs' ? 'Adresa' : language === 'en' ? 'Address' : 'Indirizzo'}
                  </h2>
                  <p className="text-foreground/80">
                    <strong>Altro Da Tony</strong><br />
                    Korunní 48<br />
                    Praha 2 - Vinohrady<br />
                    120 00 Praha
                  </p>
                  <a 
                    href="https://maps.app.goo.gl/2HSXVSZx1cJtphZGA?g_st=ipc" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-primary hover:underline"
                  >
                    <Navigation className="w-4 h-4" />
                    {language === 'cs' ? 'Navigovat' : language === 'en' ? 'Get Directions' : 'Indicazioni'}
                  </a>
                </div>
              </div>
            </div>

            {/* Phone & Email */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-xl mb-2">
                    {language === 'cs' ? 'Telefon & Email' : language === 'en' ? 'Phone & Email' : 'Telefono & Email'}
                  </h2>
                  <p className="text-foreground/80 mb-2">
                    <a href="tel:+420774672458" className="hover:text-primary transition-colors whitespace-nowrap">
                      +420 774 672 458
                    </a>
                  </p>
                  <p className="text-foreground/80">
                    <a href="mailto:rezervace@altrodatony.com" className="hover:text-primary transition-colors">
                      rezervace@altrodatony.com
                    </a>
                  </p>
                  <a 
                    href="tel:+420774672458"
                    className="inline-flex items-center gap-2 mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4" />
                    {language === 'cs' ? 'Zavolat' : language === 'en' ? 'Call Now' : 'Chiama Ora'}
                  </a>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-xl mb-2">
                    {language === 'cs' ? 'Otevírací doba' : language === 'en' ? 'Opening Hours' : 'Orari di Apertura'}
                  </h2>
                  <div className="space-y-1 text-foreground/80">
                    <p>
                      <strong>
                        {language === 'cs' ? 'Pondělí - Neděle' : language === 'en' ? 'Monday - Sunday' : 'Lunedì - Domenica'}
                      </strong>
                    </p>
                    <p>11:00 - 23:00</p>
                    <p className="text-sm text-foreground/60 mt-3 italic">
                      {language === 'cs' ? 'Kuchyně vaří do 22:00' : language === 'en' ? 'Kitchen cooks until 10:00 PM' : 'La cucina cuoce fino alle 22:00'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Notification */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-xl mb-2">
                    {language === 'cs' ? 'Rezervace & Dotazy' : language === 'en' ? 'Reservations & Inquiries' : 'Prenotazioni & Richieste'}
                  </h2>
                  <p className="text-foreground/80">
                    {language === 'cs' && 'Pro rezervaci stolu použijte online formulář nebo nás kontaktujte telefonicky. Na dotazy odpovídáme do 24 hodin.'}
                    {language === 'en' && 'Use our online form to book a table or contact us by phone. We respond to inquiries within 24 hours.'}
                    {language === 'it' && 'Utilizzate il nostro modulo online per prenotare un tavolo o contattateci telefonicamente. Rispondiamo alle richieste entro 24 ore.'}
                  </p>
                  <button 
                    onClick={navigateToReservation}
                    className="inline-flex items-center gap-2 mt-4 text-primary hover:underline"
                  >
                    {language === 'cs' ? 'Rezervovat stůl' : language === 'en' ? 'Book a Table' : 'Prenota un Tavolo'} →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Get Here */}
      <section className="py-12 bg-muted/30">
        <div className="container-custom px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">
            {language === 'cs' ? 'Jak se k nám dostanete' : language === 'en' ? 'How to Get Here' : 'Come Raggiungerci'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Public Transport */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-start gap-3 mb-4">
                <Train className="w-5 h-5 text-primary mt-1" />
                <h3 className="font-semibold text-lg">
                  {language === 'cs' ? 'MHD' : language === 'en' ? 'Public Transport' : 'Trasporti Pubblici'}
                </h3>
              </div>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Metro A:</strong> {language === 'cs' ? 'Náměstí Míru (7 min pěšky)' : language === 'en' ? 'Náměstí Míru (7 min walk)' : 'Náměstí Míru (7 min a piedi)'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Metro C:</strong> {language === 'cs' ? 'I.P. Pavlova (10 min pěšky)' : language === 'en' ? 'I.P. Pavlova (10 min walk)' : 'I.P. Pavlova (10 min a piedi)'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Tram:</strong> {language === 'cs' ? 'Zastávka Šumavská' : language === 'en' ? 'Stop Šumavská' : 'Fermata Šumavská'}
                  </span>
                </li>
              </ul>
            </div>

            {/* Parking */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-start gap-3 mb-4">
                <Car className="w-5 h-5 text-primary mt-1" />
                <h3 className="font-semibold text-lg">
                  {language === 'cs' ? 'Parkování' : language === 'en' ? 'Parking' : 'Parcheggio'}
                </h3>
              </div>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    {language === 'cs' ? 'Zóna placeného stání (modrá zóna)' : language === 'en' ? 'Paid parking zone (blue zone)' : 'Zona parcheggio a pagamento (zona blu)'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    {language === 'cs' ? 'Po-Pá 8:00-18:00 placené' : language === 'en' ? 'Mon-Fri 8:00-18:00 paid' : 'Lun-Ven 8:00-18:00 a pagamento'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    {language === 'cs' ? 'Večer a o víkendu zdarma' : language === 'en' ? 'Evenings and weekends free' : 'Sera e fine settimana gratis'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <LocationMap />
    </div>
  );
}