import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { UtensilsCrossed, Award, ChefHat, Clock, MapPin, Phone } from 'lucide-react';
import { navigate } from '../utils/router';
import heroBackground from "figma:asset/25aa2f7917174e5633532ace212d5bcf77b22ebd.png";

export function ItalianRestaurantPraguePage() {
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
      ? 'Italská Restaurace Praha | Altro Da Tony - Vinohrady'
      : language === 'en'
      ? 'Italian Restaurant Prague | Altro Da Tony - Vinohrady'
      : 'Ristorante Italiano Praga | Altro Da Tony - Vinohrady';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const description = language === 'cs'
        ? 'Hledáte autentickou italskou restauraci v Praze? Altro Da Tony na Vinohradech nabízí pravou neapolskou pizzu, domácí pastu a tradiční italské speciality. Rezervace: +420 774 672 458.'
        : language === 'en'
        ? 'Looking for an authentic Italian restaurant in Prague? Altro Da Tony in Vinohrady offers real Neapolitan pizza, homemade pasta and traditional Italian specialties. Reservations: +420 774 672 458.'
        : 'Cercate un autentico ristorante italiano a Praga? Altro Da Tony a Vinohrady offre vera pizza napoletana, pasta fatta in casa e specialità italiane tradizionali. Prenotazioni: +420 774 672 458.';
      metaDescription.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://altrodatony.com/italska-restaurace-praha');
    }

    window.scrollTo(0, 0);
  }, [language]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroBackground}
            alt="Italian Restaurant Prague"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-serif mb-4">
              {language === 'cs' && 'Italská Restaurace v Praze'}
              {language === 'en' && 'Italian Restaurant in Prague'}
              {language === 'it' && 'Ristorante Italiano a Praga'}
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              {language === 'cs' && 'Autentická italská kuchyně na Vinohradech od roku 2018'}
              {language === 'en' && 'Authentic Italian cuisine in Vinohrady since 2018'}
              {language === 'it' && 'Autentica cucina italiana a Vinohrady dal 2018'}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom px-6 max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {language === 'cs' && (
              <>
                <h2 className="text-3xl md:text-4xl font-serif mb-6">Proč zvolit Altro Da Tony jako svou italskou restauraci v Praze?</h2>
                
                <p className="text-lg leading-relaxed text-foreground/90">
                  Pokud hledáte <strong>autentickou italskou restauraci v Praze</strong>, která nabízí více než jen standardní pizzu a těstoviny, 
                  vítejte v <strong>Altro Da Tony</strong>. Nacházíme se v srdci <strong>Prahy 2 - Vinohrad</strong> na ulici <strong>Korunní 48</strong>, 
                  pouhých 7 minut pěšky od metra Náměstí Míru.
                </p>

                <p className="text-lg leading-relaxed text-foreground/90">
                  Naše restaurace kombinuje <strong>tradiční italské recepty</strong> s moderním přístupem ke kvalitě a čerstvosti surovin. 
                  Připravujeme pokrmy v duchu pravé italské gastronomie – s vášní, pečlivostí a respektem k tradicím.
                </p>
              </>
            )}
            
            {language === 'en' && (
              <>
                <h2 className="text-3xl md:text-4xl font-serif mb-6">Why Choose Altro Da Tony as Your Italian Restaurant in Prague?</h2>
                
                <p className="text-lg leading-relaxed text-foreground/90">
                  If you're looking for an <strong>authentic Italian restaurant in Prague</strong> that offers more than just standard pizza and pasta, 
                  welcome to <strong>Altro Da Tony</strong>. We're located in the heart of <strong>Prague 2 - Vinohrady</strong> on <strong>Korunní 48</strong>, 
                  just 7 minutes walk from Náměstí Míru metro station.
                </p>

                <p className="text-lg leading-relaxed text-foreground/90">
                  Our restaurant combines <strong>traditional Italian recipes</strong> with a modern approach to quality and freshness of ingredients. 
                  We prepare dishes in the spirit of true Italian gastronomy – with passion, care and respect for traditions.
                </p>
              </>
            )}

            {language === 'it' && (
              <>
                <h2 className="text-3xl md:text-4xl font-serif mb-6">Perché Scegliere Altro Da Tony come Tuo Ristorante Italiano a Praga?</h2>
                
                <p className="text-lg leading-relaxed text-foreground/90">
                  Se cercate un <strong>autentico ristorante italiano a Praga</strong> che offre più della semplice pizza e pasta standard, 
                  benvenuti a <strong>Altro Da Tony</strong>. Ci troviamo nel cuore di <strong>Praga 2 - Vinohrady</strong> in <strong>Korunní 48</strong>, 
                  a soli 7 minuti a piedi dalla stazione della metropolitana Náměstí Míru.
                </p>

                <p className="text-lg leading-relaxed text-foreground/90">
                  Il nostro ristorante combina <strong>ricette italiane tradizionali</strong> con un approccio moderno alla qualità e freschezza degli ingredienti. 
                  Prepariamo i piatti nello spirito della vera gastronomia italiana – con passione, cura e rispetto per le tradizioni.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-12 bg-muted/30">
        <div className="container-custom px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-10">
            {language === 'cs' && 'Co nás odlišuje od ostatních italských restaurací v Praze'}
            {language === 'en' && 'What Sets Us Apart from Other Italian Restaurants in Prague'}
            {language === 'it' && 'Cosa Ci Distingue da Altri Ristoranti Italiani a Praga'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-border text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {language === 'cs' ? 'Neapolská Pizza' : language === 'en' ? 'Neapolitan Pizza' : 'Pizza Napoletana'}
              </h3>
              <p className="text-foreground/80">
                {language === 'cs' && 'Pečeme v prémiové peci Morello Forni podle tradičních neapolských postupů. Křupavé okraje, vzdušné těsto, autentická chuť.'}
                {language === 'en' && 'Baked in premium Morello Forni oven following traditional Neapolitan methods. Crispy edges, airy dough, authentic taste.'}
                {language === 'it' && 'Cotta in forno premium Morello Forni seguendo i metodi tradizionali napoletani. Bordi croccanti, impasto soffice, gusto autentico.'}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-border text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {language === 'cs' ? 'Domácí Pasta' : language === 'en' ? 'Homemade Pasta' : 'Pasta Fatta in Casa'}
              </h3>
              <p className="text-foreground/80">
                {language === 'cs' && 'Čerstvá pasta připravovaná denně podle tradičních italských receptů. Carbonara, Amatriciana, Cacio e Pepe – vše jako v Itálii.'}
                {language === 'en' && 'Fresh pasta prepared daily according to traditional Italian recipes. Carbonara, Amatriciana, Cacio e Pepe – just like in Italy.'}
                {language === 'it' && 'Pasta fresca preparata giornalmente secondo ricette tradizionali italiane. Carbonara, Amatriciana, Cacio e Pepe – proprio come in Italia.'}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-border text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {language === 'cs' ? '20+ Let Zkušeností' : language === 'en' ? '20+ Years Experience' : '20+ Anni di Esperienza'}
              </h3>
              <p className="text-foreground/80">
                {language === 'cs' && 'Náš šéfkuchař Antonín Sahulka má více než dvě dekády zkušeností s italskou kuchyní. Každé jídlo je dílo s příběhem.'}
                {language === 'en' && 'Our chef Antonín Sahulka has over two decades of experience with Italian cuisine. Every dish is a work with a story.'}
                {language === 'it' && 'Il nostro chef Antonín Sahulka ha oltre due decenni di esperienza con la cucina italiana. Ogni piatto è un\'opera con una storia.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-12 bg-white">
        <div className="container-custom px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif mb-8">
            {language === 'cs' && 'Naše speciality'}
            {language === 'en' && 'Our Specialties'}
            {language === 'it' && 'Le Nostre Specialità'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">
                {language === 'cs' ? 'Pizza Napoletana' : language === 'en' ? 'Neapolitan Pizza' : 'Pizza Napoletana'}
              </h3>
              <p className="text-foreground/80 mb-3">
                {language === 'cs' && 'Margherita, Diavola, Quattro Formaggi a další. Pečeno při 450°C v peci Morello Forni.'}
                {language === 'en' && 'Margherita, Diavola, Quattro Formaggi and more. Baked at 450°C in Morello Forni oven.'}
                {language === 'it' && 'Margherita, Diavola, Quattro Formaggi e altro. Cotta a 450°C nel forno Morello Forni.'}
              </p>
            </div>

            <div className="border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">
                {language === 'cs' ? 'Pasta Fresca' : language === 'en' ? 'Fresh Pasta' : 'Pasta Fresca'}
              </h3>
              <p className="text-foreground/80 mb-3">
                {language === 'cs' && 'Carbonara, Amatriciana, Aglio e Olio. Denně čerstvá, jako v Římě.'}
                {language === 'en' && 'Carbonara, Amatriciana, Aglio e Olio. Daily fresh, just like in Rome.'}
                {language === 'it' && 'Carbonara, Amatriciana, Aglio e Olio. Fresca ogni giorno, proprio come a Roma.'}
              </p>
            </div>

            <div className="border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">
                {language === 'cs' ? 'Antipasti' : language === 'en' ? 'Antipasti' : 'Antipasti'}
              </h3>
              <p className="text-foreground/80 mb-3">
                {language === 'cs' && 'Burrata, Prosciutto di Parma, Bruschetta – tradiční italské předkrmy.'}
                {language === 'en' && 'Burrata, Prosciutto di Parma, Bruschetta – traditional Italian starters.'}
                {language === 'it' && 'Burrata, Prosciutto di Parma, Bruschetta – antipasti italiani tradizionali.'}
              </p>
            </div>

            <div className="border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">
                {language === 'cs' ? 'Dolci' : language === 'en' ? 'Desserts' : 'Dolci'}
              </h3>
              <p className="text-foreground/80 mb-3">
                {language === 'cs' && 'Tiramisu, Panna Cotta, Cannoli – sladká tečka za perfektním jídlem.'}
                {language === 'en' && 'Tiramisu, Panna Cotta, Cannoli – sweet ending to a perfect meal.'}
                {language === 'it' && 'Tiramisu, Panna Cotta, Cannoli – dolce finale per un pasto perfetto.'}
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a 
              href="/menu"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              {language === 'cs' ? 'Zobrazit celé menu' : language === 'en' ? 'View Full Menu' : 'Visualizza Menu Completo'}
            </a>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-12 bg-muted/30">
        <div className="container-custom px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-10">
            {language === 'cs' && 'Kde nás najdete'}
            {language === 'en' && 'Where to Find Us'}
            {language === 'it' && 'Dove Trovarci'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">
                {language === 'cs' ? 'Adresa' : language === 'en' ? 'Address' : 'Indirizzo'}
              </h3>
              <p className="text-foreground/80">
                Korunní 48<br />
                Praha 2 - Vinohrady
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">
                {language === 'cs' ? 'Otevírací doba' : language === 'en' ? 'Opening Hours' : 'Orari'}
              </h3>
              <p className="text-foreground/80">
                {language === 'cs' ? 'Po-Ne' : language === 'en' ? 'Mon-Sun' : 'Lun-Dom'}<br />
                11:00 - 23:00
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">
                {language === 'cs' ? 'Telefon' : language === 'en' ? 'Phone' : 'Telefono'}
              </h3>
              <p className="text-foreground/80">
                <a href="tel:+420774672458" className="hover:text-primary whitespace-nowrap">
                  +420 774 672 458
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={navigateToReservation}
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              {language === 'cs' ? 'Rezervovat stůl' : language === 'en' ? 'Book a Table' : 'Prenota un Tavolo'}
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="container-custom px-6 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">
            {language === 'cs' ? 'Časté dotazy' : language === 'en' ? 'Frequently Asked Questions' : 'Domande Frequenti'}
          </h2>
          
          <div className="space-y-6">
            <details className="bg-muted/30 rounded-lg p-6 group">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="font-semibold">
                  {language === 'cs' ? 'Je třeba rezervovat stůl předem?' : language === 'en' ? 'Do I need to book a table in advance?' : 'Devo prenotare un tavolo in anticipo?'}
                </span>
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-foreground/80">
                {language === 'cs' && <>Doporučujeme rezervaci, zejména o víkendech a večer. Můžete rezervovat online nebo zavolat na <span className="whitespace-nowrap">+420 774 672 458</span>.</>}
                {language === 'en' && <>We recommend booking, especially on weekends and evenings. You can book online or call <span className="whitespace-nowrap">+420 774 672 458</span>.</>}
                {language === 'it' && <>Consigliamo la prenotazione, soprattutto nei fine settimana e la sera. Potete prenotare online o chiamare <span className="whitespace-nowrap">+420 774 672 458</span>.</>}
              </p>
            </details>

            <details className="bg-muted/30 rounded-lg p-6 group">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="font-semibold">
                  {language === 'cs' ? 'Jak daleko je od metra?' : language === 'en' ? 'How far is it from the metro?' : 'Quanto dista dalla metropolitana?'}
                </span>
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-foreground/80">
                {language === 'cs' && 'Jsme 7 minut pěšky od stanice metra Náměstí Míru (linka A) a 10 minut od I.P. Pavlova (linka C).'}
                {language === 'en' && 'We are 7 minutes walk from Náměstí Míru metro station (line A) and 10 minutes from I.P. Pavlova (line C).'}
                {language === 'it' && 'Siamo a 7 minuti a piedi dalla stazione della metropolitana Náměstí Míru (linea A) e 10 minuti da I.P. Pavlova (linea C).'}
              </p>
            </details>

            <details className="bg-muted/30 rounded-lg p-6 group">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="font-semibold">
                  {language === 'cs' ? 'Máte bezlepkové nebo veganské varianty?' : language === 'en' ? 'Do you have gluten-free or vegan options?' : 'Avete opzioni senza glutine o vegane?'}
                </span>
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-foreground/80">
                {language === 'cs' && 'Ano, nabízíme bezlepkovou pizzu a pastu, stejně jako veganské varianty vybraných pokrmů. Informujte nás o svých dietních požadavcích.'}
                {language === 'en' && 'Yes, we offer gluten-free pizza and pasta, as well as vegan versions of selected dishes. Please inform us of your dietary requirements.'}
                {language === 'it' && 'Sì, offriamo pizza e pasta senza glutine, così come versioni vegane di piatti selezionati. Vi preghiamo di informarci delle vostre esigenze dietetiche.'}
              </p>
            </details>

            <details className="bg-muted/30 rounded-lg p-6 group">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="font-semibold">
                  {language === 'cs' ? 'Máte týdenní menu?' : language === 'en' ? 'Do you have a weekly menu?' : 'Avete un menu settimanale?'}
                </span>
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-foreground/80">
                {language === 'cs' && 'Ano, od pondělí do pátku nabízíme speciální týdenní menu s italskými specialitami za výhodné ceny.'}
                {language === 'en' && 'Yes, from Monday to Friday we offer a special weekly menu with Italian specialties at advantageous prices.'}
                {language === 'it' && 'Sì, dal lunedì al venerdì offriamo un menu settimanale speciale con specialità italiane a prezzi vantaggiosi.'}
              </p>
            </details>

            <details className="bg-muted/30 rounded-lg p-6 group">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="font-semibold">
                  {language === 'cs' ? 'Máte rozvoz?' : language === 'en' ? 'Do you deliver?' : 'Fate consegne?'}
                </span>
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-foreground/80">
                {language === 'cs' && 'Nabízíme takeaway a rozvoz přes Wolt a Bolt Food. Doporučujeme však návštěvu restaurace pro nejlepší zážitek.'}
                {language === 'en' && 'We offer takeaway and delivery via Wolt and Bolt Food. However, we recommend visiting the restaurant for the best experience.'}
                {language === 'it' && 'Offriamo da asporto e consegna tramite Wolt e Bolt Food. Tuttavia, consigliamo di visitare il ristorante per la migliore esperienza.'}
              </p>
            </details>

            <details className="bg-muted/30 rounded-lg p-6 group">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="font-semibold">
                  {language === 'cs' ? 'Je možné uspořádat soukromou akci?' : language === 'en' ? 'Can I organize a private event?' : 'Posso organizzare un evento privato?'}
                </span>
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-foreground/80">
                {language === 'cs' && <>Ano, organizujeme soukromé akce a oslavy. Pro více informací nás kontaktujte na <span className="whitespace-nowrap">+420 774 672 458</span>.</>}
                {language === 'en' && <>Yes, we organize private events and celebrations. For more information, contact us at <span className="whitespace-nowrap">+420 774 672 458</span>.</>}
                {language === 'it' && <>Sì, organizziamo eventi privati e celebrazioni. Per maggiori informazioni, contattateci al <span className="whitespace-nowrap">+420 774 672 458</span>.</>}
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}