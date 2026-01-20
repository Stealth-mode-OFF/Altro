import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Clock, Phone, Train, UtensilsCrossed } from 'lucide-react';

export function VinohradyKorunniPage() {
  const { language } = useLanguage();

  useEffect(() => {
    document.title = language === 'cs' 
      ? 'Italská Restaurace Vinohrady - Korunní | Altro Da Tony Praha 2'
      : language === 'en'
      ? 'Italian Restaurant Vinohrady - Korunní | Altro Da Tony Prague 2'
      : 'Ristorante Italiano Vinohrady - Korunní | Altro Da Tony Praga 2';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const description = language === 'cs'
        ? 'Altro Da Tony - italská restaurace na Vinohradech, Korunní 48, Praha 2. Neapolská pizza, domácí pasta, 7 min od metra Náměstí Míru. Rezervace: +420 774 672 458.'
        : language === 'en'
        ? 'Altro Da Tony - Italian restaurant in Vinohrady, Korunní 48, Prague 2. Neapolitan pizza, homemade pasta, 7 min from Náměstí Míru metro. Book: +420 774 672 458.'
        : 'Altro Da Tony - ristorante italiano a Vinohrady, Korunní 48, Praga 2. Pizza napoletana, pasta fatta in casa, 7 min dalla metro Náměstí Míru. Prenota: +420 774 672 458.';
      metaDescription.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://altrodatony.com/vinohrady-korunni');
    }

    window.scrollTo(0, 0);
  }, [language]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
        <div className="container-custom px-6 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <MapPin className="w-4 h-4" />
            <span className="uppercase tracking-wide">
              {language === 'cs' ? 'Naše Lokalita' : language === 'en' ? 'Our Location' : 'La Nostra Posizione'}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif mb-4">
            {language === 'cs' && 'Italská Restaurace na Vinohradech'}
            {language === 'en' && 'Italian Restaurant in Vinohrady'}
            {language === 'it' && 'Ristorante Italiano a Vinohrady'}
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 mb-6">
            {language === 'cs' && 'Korunní 48, Praha 2'}
            {language === 'en' && 'Korunní 48, Prague 2'}
            {language === 'it' && 'Korunní 48, Praga 2'}
          </p>

          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            {language === 'cs' && 'Autentická italská kuchyně v srdci pražských Vinohrad. Snadno dostupné metrem i tramvají.'}
            {language === 'en' && 'Authentic Italian cuisine in the heart of Prague Vinohrady. Easily accessible by metro and tram.'}
            {language === 'it' && 'Autentica cucina italiana nel cuore di Vinohrady a Praga. Facilmente raggiungibile con metro e tram.'}
          </p>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-12">
        <div className="container-custom px-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-border text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">
                {language === 'cs' ? 'Přesná adresa' : language === 'en' ? 'Exact Address' : 'Indirizzo Esatto'}
              </h3>
              <p className="text-foreground/80">
                Korunní 48<br />
                120 00 Praha 2 - Vinohrady
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-border text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">
                {language === 'cs' ? 'Otevírací doba' : language === 'en' ? 'Opening Hours' : 'Orari di Apertura'}
              </h3>
              <p className="text-foreground/80">
                {language === 'cs' ? 'Pondělí - Neděle' : language === 'en' ? 'Monday - Sunday' : 'Lunedì - Domenica'}<br />
                11:00 - 23:00
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-border text-center">
              <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">
                {language === 'cs' ? 'Rezervace' : language === 'en' ? 'Reservations' : 'Prenotazioni'}
              </h3>
              <p className="text-foreground/80">
                <a href="tel:+420774672458" className="hover:text-primary transition-colors">
                  +420 774 672 458
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Vinohrady */}
      <section className="py-12 bg-muted/30">
        <div className="container-custom px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif mb-8">
            {language === 'cs' && 'Proč Vinohrady?'}
            {language === 'en' && 'Why Vinohrady?'}
            {language === 'it' && 'Perché Vinohrady?'}
          </h2>

          <div className="prose prose-lg max-w-none">
            {language === 'cs' && (
              <>
                <p className="text-lg leading-relaxed text-foreground/90">
                  <strong>Vinohrady</strong> je jedna z nejoblíbenějších čtvrtí Prahy, známá svou živou atmosférou, 
                  krásnými secesními budovami a množstvím restaurací a kaváren. Ulice <strong>Korunní</strong> je 
                  hlavní tepnou této čtvrti, která spojuje Náměstí Míru s dalšími částmi Prahy 2.
                </p>

                <p className="text-lg leading-relaxed text-foreground/90">
                  <strong>Altro Da Tony</strong> se nachází na Korunní 48, v klidné části ulice, kde najdete 
                  autentickou italskou atmosféru uprostřed pražského ruchu. Jsme ideální volbou pro oběd, 
                  romantickou večeři nebo oslavu s přáteli.
                </p>
              </>
            )}

            {language === 'en' && (
              <>
                <p className="text-lg leading-relaxed text-foreground/90">
                  <strong>Vinohrady</strong> is one of Prague's most popular neighborhoods, known for its vibrant atmosphere, 
                  beautiful Art Nouveau buildings, and abundance of restaurants and cafes. <strong>Korunní</strong> street is 
                  the main artery of this district, connecting Náměstí Míru with other parts of Prague 2.
                </p>

                <p className="text-lg leading-relaxed text-foreground/90">
                  <strong>Altro Da Tony</strong> is located at Korunní 48, in a quiet part of the street, where you'll find 
                  an authentic Italian atmosphere amid the Prague hustle and bustle. We're an ideal choice for lunch, 
                  a romantic dinner, or a celebration with friends.
                </p>
              </>
            )}

            {language === 'it' && (
              <>
                <p className="text-lg leading-relaxed text-foreground/90">
                  <strong>Vinohrady</strong> è uno dei quartieri più popolari di Praga, noto per la sua atmosfera vivace, 
                  i bellissimi edifici Art Nouveau e l'abbondanza di ristoranti e caffè. La via <strong>Korunní</strong> è 
                  l'arteria principale di questo quartiere, che collega Náměstí Míru con altre parti di Praga 2.
                </p>

                <p className="text-lg leading-relaxed text-foreground/90">
                  <strong>Altro Da Tony</strong> si trova in Korunní 48, in una parte tranquilla della strada, dove troverete 
                  un'autentica atmosfera italiana in mezzo al trambusto di Praga. Siamo la scelta ideale per il pranzo, 
                  una cena romantica o una celebrazione con gli amici.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* How to Get Here */}
      <section className="py-12 bg-white">
        <div className="container-custom px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif mb-8">
            {language === 'cs' && 'Jak se k nám dostanete'}
            {language === 'en' && 'How to Get Here'}
            {language === 'it' && 'Come Raggiungerci'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Metro */}
            <div className="bg-muted/30 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                <Train className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-xl mb-2">
                    {language === 'cs' ? 'Metro' : language === 'en' ? 'Metro' : 'Metropolitana'}
                  </h3>
                  <ul className="space-y-3 text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="bg-green-600 text-white px-2 py-0.5 rounded font-semibold text-sm mt-0.5">A</span>
                      <div>
                        <strong>Náměstí Míru</strong><br />
                        <span className="text-sm">
                          {language === 'cs' ? '7 minut pěšky' : language === 'en' ? '7 minutes walk' : '7 minuti a piedi'}
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-red-600 text-white px-2 py-0.5 rounded font-semibold text-sm mt-0.5">C</span>
                      <div>
                        <strong>I.P. Pavlova</strong><br />
                        <span className="text-sm">
                          {language === 'cs' ? '10 minut pěšky' : language === 'en' ? '10 minutes walk' : '10 minuti a piedi'}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tram */}
            <div className="bg-muted/30 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                <Train className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-xl mb-2">
                    {language === 'cs' ? 'Tramvaj' : language === 'en' ? 'Tram' : 'Tram'}
                  </h3>
                  <ul className="space-y-2 text-foreground/80">
                    <li>
                      <strong>
                        {language === 'cs' ? 'Zastávka Šumavská' : language === 'en' ? 'Stop Šumavská' : 'Fermata Šumavská'}
                      </strong>
                    </li>
                    <li className="text-sm">
                      {language === 'cs' ? 'Linky:' : language === 'en' ? 'Lines:' : 'Linee:'} 10, 16
                    </li>
                    <li className="text-sm text-foreground/60">
                      {language === 'cs' ? 'Přímo u restaurace' : language === 'en' ? 'Right at the restaurant' : 'Proprio al ristorante'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-primary/5 rounded-lg p-6 border border-primary/20">
            <p className="text-foreground/80">
              <strong>
                {language === 'cs' ? 'Tip:' : language === 'en' ? 'Tip:' : 'Suggerimento:'}
              </strong>{' '}
              {language === 'cs' && 'Nejrychlejší způsob je metro A do Náměstí Míru, pak pěšky ulicí Korunní směrem k I.P. Pavlova.'}
              {language === 'en' && 'The fastest way is metro A to Náměstí Míru, then walk along Korunní street towards I.P. Pavlova.'}
              {language === 'it' && 'Il modo più veloce è la metropolitana A fino a Náměstí Míru, poi camminare lungo Korunní in direzione I.P. Pavlova.'}
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Special */}
      <section className="py-12 bg-muted/30">
        <div className="container-custom px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif mb-8 text-center">
            {language === 'cs' && 'Proč si vybrat právě nás'}
            {language === 'en' && 'Why Choose Us'}
            {language === 'it' && 'Perché Sceglierci'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-border">
              <UtensilsCrossed className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-lg mb-2">
                {language === 'cs' ? 'Autentická Italská Kuchyně' : language === 'en' ? 'Authentic Italian Cuisine' : 'Autentica Cucina Italiana'}
              </h3>
              <p className="text-foreground/80">
                {language === 'cs' && 'Pizza z pece Morello Forni, domácí pasta a tradiční italské recepty.'}
                {language === 'en' && 'Pizza from Morello Forni oven, homemade pasta and traditional Italian recipes.'}
                {language === 'it' && 'Pizza dal forno Morello Forni, pasta fatta in casa e ricette italiane tradizionali.'}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-border">
              <MapPin className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-lg mb-2">
                {language === 'cs' ? 'Skvělá Dostupnost' : language === 'en' ? 'Great Accessibility' : 'Ottima Accessibilità'}
              </h3>
              <p className="text-foreground/80">
                {language === 'cs' && '7 minut od metra Náměstí Míru, tramvaj přímo před restaurací.'}
                {language === 'en' && '7 minutes from Náměstí Míru metro, tram stop right in front of the restaurant.'}
                {language === 'it' && '7 minuti dalla metro Náměstí Míru, fermata del tram proprio davanti al ristorante.'}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-border">
              <Clock className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-lg mb-2">
                {language === 'cs' ? 'Otevřeno Denně' : language === 'en' ? 'Open Daily' : 'Aperto Ogni Giorno'}
              </h3>
              <p className="text-foreground/80">
                {language === 'cs' && 'Pondělí až neděle 11:00 - 23:00, kuchyně do 22:30.'}
                {language === 'en' && 'Monday to Sunday 11:00 - 23:00, kitchen until 22:30.'}
                {language === 'it' && 'Lunedì a domenica 11:00 - 23:00, cucina fino alle 22:30.'}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-border">
              <Phone className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-lg mb-2">
                {language === 'cs' ? 'Snadná Rezervace' : language === 'en' ? 'Easy Booking' : 'Facile Prenotazione'}
              </h3>
              <p className="text-foreground/80">
                {language === 'cs' && 'Online rezervace nebo telefonicky na +420 774 672 458.'}
                {language === 'en' && 'Online booking or by phone at +420 774 672 458.'}
                {language === 'it' && 'Prenotazione online o per telefono al +420 774 672 458.'}
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a 
              href="/#reservation"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors text-lg"
            >
              {language === 'cs' ? 'Rezervovat stůl nyní' : language === 'en' ? 'Book a Table Now' : 'Prenota un Tavolo Ora'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}