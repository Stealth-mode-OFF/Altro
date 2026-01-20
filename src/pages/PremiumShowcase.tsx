import { FlowingSection } from '../components/premium/FlowingSection';
import { GlassCard } from '../components/premium/GlassCard';
import { PremiumInput } from '../components/premium/PremiumInput';
import { PremiumTextarea } from '../components/premium/PremiumTextarea';
import { PremiumButton } from '../components/premium/PremiumButton';
import { SmoothReveal } from '../components/premium/SmoothReveal';
import { ElegantCalculator } from '../components/premium/ElegantCalculator';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Premium Showcase Page - 2026 Design System
 * 
 * Demonstrates:
 * - Seamless section flow
 * - Glass morphism cards
 * - Elegant calculator/configurator
 * - Smooth scroll animations
 * - Premium interactions
 * 
 * Reusable for: restaurants, numerology, luxury brands, boutiques
 */
export function PremiumShowcase() {
  const { language } = useLanguage();

  const calculatorSteps = [
    {
      id: 'guests',
      label: language === 'cs' ? 'Počet hostů' : language === 'it' ? 'Numero di ospiti' : 'Number of guests',
      description: language === 'cs' ? 'Pro kolik lidí rezervujete?' : language === 'it' ? 'Per quante persone?' : 'How many people are you booking for?',
      type: 'number' as const,
      unit: language === 'cs' ? 'osob' : language === 'it' ? 'persone' : 'people',
    },
    {
      id: 'occasion',
      label: language === 'cs' ? 'Příležitost' : language === 'it' ? 'Occasione' : 'Occasion',
      type: 'select' as const,
      options: language === 'cs' 
        ? ['Romantická večeře', 'Oslava narozenin', 'Obchodní schůzka', 'Rodinná oslava', 'Pouze večeře']
        : language === 'it'
        ? ['Cena romantica', 'Compleanno', 'Incontro di lavoro', 'Celebrazione familiare', 'Solo cena']
        : ['Romantic dinner', 'Birthday celebration', 'Business meeting', 'Family celebration', 'Just dinner'],
    },
    {
      id: 'duration',
      label: language === 'cs' ? 'Očekávaná délka' : language === 'it' ? 'Durata prevista' : 'Expected duration',
      type: 'select' as const,
      options: language === 'cs'
        ? ['1 hodina', '2 hodiny', '3+ hodiny']
        : language === 'it'
        ? ['1 ora', '2 ore', '3+ ore']
        : ['1 hour', '2 hours', '3+ hours'],
    },
  ];

  const handleCalculate = (values: Record<string, string>) => {
    const guests = parseInt(values.guests) || 0;
    const occasionMultiplier = values.occasion?.includes('Romantic') || values.occasion?.includes('Romantická') || values.occasion?.includes('romantica') ? 1.2 : 1;
    const basePrice = guests * 800;
    const total = Math.round(basePrice * occasionMultiplier);
    
    return `${total.toLocaleString()} Kč`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero - Soft, breathable introduction */}
      <FlowingSection variant="default" className="section-padding" gradientFrom="bottom">
        <div className="container-custom">
          <SmoothReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h1 
                className="mb-6"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(3rem, 8vw, 7rem)',
                  fontWeight: 600,
                  color: 'var(--foreground)',
                  letterSpacing: '-0.035em',
                  lineHeight: 1,
                }}
              >
                {language === 'cs' ? 'Prémium Zážitek' : language === 'it' ? 'Esperienza Premium' : 'Premium Experience'}
              </h1>
              
              <p 
                className="mb-8"
                style={{
                  color: 'var(--foreground-muted)',
                  fontSize: '1.25rem',
                  lineHeight: 1.8,
                  maxWidth: '42rem',
                  margin: '0 auto 2rem',
                }}
              >
                {language === 'cs' 
                  ? 'Elegantní, bezešvý digitální prostor, kde každá interakce působí přirozeně a luxusně.'
                  : language === 'it'
                  ? 'Uno spazio digitale elegante e fluido dove ogni interazione è naturale e lussuosa.'
                  : 'An elegant, seamless digital space where every interaction feels natural and luxurious.'
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PremiumButton variant="primary" size="lg">
                  {language === 'cs' ? 'Rezervovat stůl' : language === 'it' ? 'Prenota un tavolo' : 'Book a table'}
                </PremiumButton>
                <PremiumButton variant="ghost" size="lg">
                  {language === 'cs' ? 'Zobrazit menu' : language === 'it' ? 'Visualizza il menu' : 'View menu'}
                </PremiumButton>
              </div>
            </div>
          </SmoothReveal>
        </div>
      </FlowingSection>

      {/* Glass Cards Grid - Elegant product showcase */}
      <FlowingSection variant="subtle" className="section-padding">
        <div className="container-custom">
          <SmoothReveal>
            <h2 
              className="text-center mb-16"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 600,
                color: 'var(--foreground)',
              }}
            >
              {language === 'cs' ? 'Naše Filosofie' : language === 'it' ? 'La Nostra Filosofia' : 'Our Philosophy'}
            </h2>
          </SmoothReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: language === 'cs' ? 'Autentičnost' : language === 'it' ? 'Autenticità' : 'Authenticity',
                desc: language === 'cs' ? 'Tradiční italské chuti s moderním přístupem' : language === 'it' ? 'Sapori italiani tradizionali con approccio moderno' : 'Traditional Italian flavors with modern approach',
              },
              {
                title: language === 'cs' ? 'Kvalita' : language === 'it' ? 'Qualità' : 'Quality',
                desc: language === 'cs' ? 'Pouze nejlepší ingredience přímo z Itálie' : language === 'it' ? 'Solo i migliori ingredienti direttamente dall\'Italia' : 'Only the finest ingredients from Italy',
              },
              {
                title: language === 'cs' ? 'Pohostinnost' : language === 'it' ? 'Ospitalità' : 'Hospitality',
                desc: language === 'cs' ? 'Teplé italské přijetí v srdci Prahy' : language === 'it' ? 'Calorosa accoglienza italiana nel cuore di Praga' : 'Warm Italian welcome in the heart of Prague',
              },
            ].map((item, index) => (
              <SmoothReveal key={item.title} delay={index * 150}>
                <GlassCard hover elevation="medium" className="p-8 h-full">
                  <div 
                    className="w-12 h-12 rounded-full mb-6"
                    style={{
                      background: 'linear-gradient(135deg, var(--primary-soft), var(--accent-soft))',
                    }}
                  />
                  
                  <h3 
                    className="mb-4"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.75rem',
                      fontWeight: 600,
                      color: 'var(--foreground)',
                    }}
                  >
                    {item.title}
                  </h3>
                  
                  <p style={{ color: 'var(--foreground-muted)' }}>
                    {item.desc}
                  </p>
                </GlassCard>
              </SmoothReveal>
            ))}
          </div>
        </div>
      </FlowingSection>

      {/* Elegant Calculator - The centerpiece */}
      <FlowingSection variant="accent" className="section-padding">
        <div className="container-custom">
          <ElegantCalculator
            title={language === 'cs' ? 'Plánujte Svou Návštěvu' : language === 'it' ? 'Pianifica la Tua Visita' : 'Plan Your Visit'}
            subtitle={language === 'cs' 
              ? 'Pomůžeme vám vytvořit perfektní večer'
              : language === 'it'
              ? 'Ti aiuteremo a creare la serata perfetta'
              : 'We\'ll help you create the perfect evening'
            }
            steps={calculatorSteps}
            onCalculate={handleCalculate}
            resultLabel={language === 'cs' ? 'Odhadovaná cena' : language === 'it' ? 'Prezzo stimato' : 'Estimated price'}
          />
        </div>
      </FlowingSection>

      {/* Premium Form Example */}
      <FlowingSection variant="elevated" className="section-padding" gradientFrom="top">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <SmoothReveal>
              <div className="text-center mb-12">
                <h2 
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: 600,
                    color: 'var(--foreground)',
                    marginBottom: '1rem',
                  }}
                >
                  {language === 'cs' ? 'Zůstaňte v Kontaktu' : language === 'it' ? 'Rimani in Contatto' : 'Stay Connected'}
                </h2>
                <p style={{ color: 'var(--foreground-muted)', fontSize: '1.125rem' }}>
                  {language === 'cs' 
                    ? 'Přihlaste se k odběru exkluzivních nabídek a událostí'
                    : language === 'it'
                    ? 'Iscriviti per offerte ed eventi esclusivi'
                    : 'Subscribe for exclusive offers and events'
                  }
                </p>
              </div>
            </SmoothReveal>

            <GlassCard elevation="high" className="p-8 md:p-12">
              <form className="space-y-6">
                <SmoothReveal delay={100}>
                  <PremiumInput 
                    label={language === 'cs' ? 'Jméno' : language === 'it' ? 'Nome' : 'Name'}
                    type="text"
                    placeholder={language === 'cs' ? 'Vaše jméno' : language === 'it' ? 'Il tuo nome' : 'Your name'}
                  />
                </SmoothReveal>

                <SmoothReveal delay={200}>
                  <PremiumInput 
                    label="Email"
                    type="email"
                    placeholder={language === 'cs' ? 'vas@email.cz' : language === 'it' ? 'tua@email.it' : 'your@email.com'}
                  />
                </SmoothReveal>

                <SmoothReveal delay={300}>
                  <PremiumTextarea
                    label={language === 'cs' ? 'Zpráva' : language === 'it' ? 'Messaggio' : 'Message'}
                    placeholder={language === 'cs' ? 'Vaše zpráva' : language === 'it' ? 'Il tuo messaggio' : 'Your message'}
                  />
                </SmoothReveal>

                <SmoothReveal delay={400}>
                  <PremiumButton variant="primary" size="lg" className="w-full">
                    {language === 'cs' ? 'Odeslat' : language === 'it' ? 'Invia' : 'Submit'}
                  </PremiumButton>
                </SmoothReveal>
              </form>
            </GlassCard>
          </div>
        </div>
      </FlowingSection>
    </div>
  );
}