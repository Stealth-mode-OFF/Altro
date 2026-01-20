import { useEffect } from 'react';
import { MenuAccordion } from '../components/MenuAccordion';
import { DailyMenu } from '../components/DailyMenu';
import { InstagramCTA } from '../components/InstagramCTA';
import { useLanguage } from '../contexts/LanguageContext';
import { UtensilsCrossed, Clock, CheckCircle2 } from 'lucide-react';

export function MenuPage() {
  const { language, t } = useLanguage();

  useEffect(() => {
    document.title = language === 'cs' 
      ? 'Menu | Italská Restaurace Altro Da Tony Praha'
      : language === 'en'
      ? 'Menu | Italian Restaurant Altro Da Tony Prague'
      : 'Menu | Ristorante Italiano Altro Da Tony Praga';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const description = language === 'cs'
        ? 'Kompletní menu italské restaurace Altro Da Tony: Neapolská pizza, domácí pasta, antipasti, dezerty. Týdenní menu od Po-Pá. Praha 2 - Vinohrady.'
        : language === 'en'
        ? 'Complete menu of Altro Da Tony Italian restaurant: Neapolitan pizza, homemade pasta, antipasti, desserts. Weekly menu Mon-Fri. Prague 2 - Vinohrady.'
        : 'Menu completo del ristorante italiano Altro Da Tony: Pizza napoletana, pasta fatta in casa, antipasti, dolci. Menu settimanale Lun-Ven. Praga 2 - Vinohrady.';
      metaDescription.setAttribute('content', description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://altrodatony.com/menu');
    }

    window.scrollTo(0, 0);
  }, [language]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
        <div className="container-custom px-6 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <UtensilsCrossed className="w-4 h-4" />
              <span className="uppercase tracking-wide">
                {language === 'cs' ? 'Naše Menu' : language === 'en' ? 'Our Menu' : 'Il Nostro Menu'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif mb-4">
              {language === 'cs' && 'Italská Kuchyně v Srdci Vinohrad'}
              {language === 'en' && 'Italian Cuisine in the Heart of Vinohrady'}
              {language === 'it' && 'Cucina Italiana nel Cuore di Vinohrady'}
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
              {language === 'cs' && (
                <>
                  Autentické italské speciality připravované s láskou a péčí. 
                  Neapolská pizza z pece Morello Forni, domácí čerstvá pasta a tradiční recepty z Itálie.
                </>
              )}
              {language === 'en' && (
                <>
                  Authentic Italian specialties prepared with love and care. 
                  Neapolitan pizza from Morello Forni oven, fresh homemade pasta and traditional recipes from Italy.
                </>
              )}
              {language === 'it' && (
                <>
                  Specialità italiane autentiche preparate con amore e cura. 
                  Pizza napoletana dal forno Morello Forni, pasta fresca fatta in casa e ricette tradizionali dall'Italia.
                </>
              )}
            </p>
          </div>

          {/* Key Features - Premium Design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {/* Feature 1 - Morello Forni */}
            <div className="group relative bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10">
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div className="pr-12">
                <h3 className="font-serif text-xl mb-2 text-primary">
                  Morello Forni
                </h3>
                <p className="text-sm leading-relaxed text-foreground/70">
                  {language === 'cs' ? 'Stejná profesionální pec jako mají v Neapoli. 450 stupňů, 90 vteřin a máte pizzu s křupavým okrajem a měkkou uvnitř. Tohle v Praze má málokdo.' : language === 'en' ? 'The same professional oven they use for pizza in Naples. 450 degrees, 90 seconds and you have pizza with crispy edges and soft center. Almost nobody in Prague has this.' : 'Lo stesso forno professionale che usano per la pizza a Napoli. 450 gradi, 90 secondi e hai una pizza con bordi croccanti e centro morbido. Quasi nessuno a Praga ce l\'ha.'}
                </p>
              </div>
            </div>

            {/* Feature 2 - Domácí Pasta */}
            <div className="group relative bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-6 border border-accent/20 hover:border-accent/40 transition-all duration-500 hover:shadow-lg hover:shadow-accent/10">
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <CheckCircle2 className="w-6 h-6 text-accent" />
              </div>
              <div className="pr-12">
                <h3 className="font-serif text-xl mb-2 text-accent">
                  {language === 'cs' ? 'Domácí Pasta' : language === 'en' ? 'Homemade Pasta' : 'Pasta Fatta in Casa'}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/70">
                  {language === 'cs' ? (
                    <>
                      <span className="text-foreground/90">Neděláme to z pytlíku.</span> Každý den ráno válíme těstoviny z italské mouky a čerstvých vajec.<br />
                      <span className="text-foreground/80 italic">Poznáte to hned - čerstvá pasta chutná úplně jinak než sušená z obchodu.</span>
                    </>
                  ) : language === 'en' ? (
                    <>
                      <span className="text-foreground/90">We don't make it from a package.</span> Every morning we roll pasta from Italian flour and fresh eggs.<br />
                      <span className="text-foreground/80 italic">You'll taste the difference - fresh pasta tastes completely different than dried from the store.</span>
                    </>
                  ) : (
                    <>
                      <span className="text-foreground/90">Non la facciamo da una confezione.</span> Ogni mattina stendiamo la pasta con farina italiana e uova fresche.<br />
                      <span className="text-foreground/80 italic">Sentirai la differenza - la pasta fresca ha un sapore completamente diverso da quella secca del negozio.</span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Feature 3 - Týdenní Menu */}
            <div className="group relative bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10">
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div className="pr-12">
                <h3 className="font-serif text-xl mb-2 text-primary">
                  {language === 'cs' ? 'Týdenní Menu' : language === 'en' ? 'Weekly Menu' : 'Menu Settimanale'}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/70">
                  {language === 'cs' ? 'Každé pondělí nové jídlo. Vaříme podle toho, co je zrovna v sezóně a co nás napadne. Pokud vám něco chutná, vraťte se rychle - příští týden už to nebude.' : language === 'en' ? 'Every Monday a new dish. We cook based on what\'s in season and what comes to mind. If you like something, come back quickly - it won\'t be here next week.' : 'Ogni lunedì un nuovo piatto. Cuciniamo in base a ciò che è di stagione e a ciò che ci viene in mente. Se ti piace qualcosa, torna presto - la prossima settimana non ci sarà più.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Menu */}
      <DailyMenu />

      {/* Full Menu */}
      <MenuAccordion />

      {/* Disclaimer - Allergens & Weights */}
      <div className="container-custom px-6 max-w-4xl mx-auto mt-8 mb-12 text-center">
      </div>

      {/* FAQ Section */}
      <section className="py-12 bg-muted/30">
        <div className="container-custom px-6 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">
            {language === 'cs' ? 'Časté dotazy k menu' : language === 'en' ? 'Menu FAQ' : 'Domande frequenti sul menu'}
          </h2>
          
          <div className="space-y-6">
            <details className="bg-white rounded-lg p-6 shadow-sm border border-border group">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="font-semibold">
                  {language === 'cs' ? 'Nabízíte bezlepkové varianty?' : language === 'en' ? 'Do you offer gluten-free options?' : 'Offrite opzioni senza glutine?'}
                </span>
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-foreground/80">
                {language === 'cs' && 'Ano, nabízíme bezlepková rizota nebo saláty. Bezlepkovou pizzu a těstoviny bohužel nemáme. Informujte nás prosím o vaší alergii při objednávce.'}
                {language === 'en' && 'Yes, we offer gluten-free risotto or salads. Unfortunately, we don\'t have gluten-free pizza and pasta. Please inform us about your allergy when ordering.'}
                {language === 'it' && 'Sì, offriamo risotti o insalate senza glutine. Purtroppo non abbiamo pizza e pasta senza glutine. Vi preghiamo di informarci della vostra allergia quando ordinate.'}
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm border border-border group">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="font-semibold">
                  {language === 'cs' ? 'Nabízíte vegetariánské a veganské pokrmy?' : language === 'en' ? 'Do you offer vegetarian and vegan dishes?' : 'Offrite piatti vegetariani e vegani?'}
                </span>
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-foreground/80">
                {language === 'cs' && 'Ano, máme širokou nabídku vegetariánských pokrmů. Veganské varianty můžeme na požádání upravit podle vašich potřeb.'}
                {language === 'en' && 'Yes, we have a wide selection of vegetarian dishes. We can adapt vegan options upon request according to your needs.'}
                {language === 'it' && 'Sì, abbiamo un\'ampia selezione di piatti vegetariani. Possiamo adattare opzioni vegane su richiesta secondo le vostre esigenze.'}
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm border border-border group">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="font-semibold">
                  {language === 'cs' ? 'Jaké způsoby platby přijímáte?' : language === 'en' ? 'What payment methods do you accept?' : 'Quali metodi di pagamento accettate?'}
                </span>
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-foreground/80">
                {language === 'cs' && 'Přijímáme hotovost i platební karty (Visa, Mastercard).'}
                {language === 'en' && 'We accept cash and credit cards (Visa, Mastercard).'}
                {language === 'it' && 'Accettiamo contanti e carte di credito (Visa, Mastercard).'}
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm border border-border group">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="font-semibold">
                  {language === 'cs' ? 'Nabízíte rozvoz jídla nebo takeaway?' : language === 'en' ? 'Do you offer food delivery or takeaway?' : 'Offrite consegna a domicilio o da asporto?'}
                </span>
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-foreground/80">
                {language === 'cs' && 'Ano, nabízíme takeaway. Rozvoz pizzy možná budeme nabízet - zatím to připravujeme.'}
                {language === 'en' && 'Yes, we offer takeaway. We may offer pizza delivery in the future - we are currently preparing it.'}
                {language === 'it' && 'Sì, offriamo da asporto. Potremmo offrire consegna della pizza in futuro - lo stiamo preparando.'}
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm border border-border group">
              <summary className="cursor-pointer list-none flex items-center justify-between">
                <span className="font-semibold">
                  {language === 'cs' ? 'Jaké víno doporučujete k pizze?' : language === 'en' ? 'What wine do you recommend with pizza?' : 'Quale vino consigliate con la pizza?'}
                </span>
                <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-foreground/80">
                {language === 'cs' && 'K pizze doporučujeme italská červená vína jako Chianti nebo Montepulciano. Náš personál vám rád poradí.'}
                {language === 'en' && 'With pizza we recommend Italian red wines like Chianti or Montepulciano. Our staff will be happy to advise you.'}
                {language === 'it' && 'Con la pizza consigliamo vini rossi italiani come Chianti o Montepulciano. Il nostro personale sarà lieto di consigliarvi.'}
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <InstagramCTA />
    </div>
  );
}