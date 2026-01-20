import { useState } from 'react';
import { Mail, Gift, Calendar, Sparkles, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useLanguage } from '../contexts/LanguageContext';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { motion } from 'motion/react';

export function NewsletterSignup() {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error(language === 'cs' ? 'Zadejte platný email' : language === 'it' ? 'Inserisci un\'email valida' : 'Enter a valid email');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d880a0b3/newsletter/subscribe`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Subscription failed');
      }

      toast.success(
        language === 'cs' 
          ? '✅ Děkujeme! Odběr newsletteru byl aktivován.' 
          : language === 'it' 
          ? '✅ Grazie! Iscrizione alla newsletter attivata.' 
          : '✅ Thank you! Newsletter subscription activated.'
      );
      
      setSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error(
        language === 'cs' 
          ? 'Něco se pokazilo. Zkuste to prosím znovu.' 
          : language === 'it' 
          ? 'Qualcosa è andato storto. Riprova.' 
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const content = {
    cs: {
      title: 'Staňte se součástí naší rodiny',
      subtitle: 'Rezervujte si místo u našeho stolu',
      benefits: [
        { icon: Gift, text: 'Exkluzivní slevové vouchery pro naše věrné hosty' },
        { icon: Sparkles, text: 'První pozvánky na degustace sezonních specialit' },
        { icon: Calendar, text: 'Speciální večery s italienskou kuchyní & vínem' }
      ],
      noSpam: 'Píšeme jen 5–6× ročně – každý email je jako pozvánka k rodinnému stolu',
      placeholder: 'vas@email.cz',
      button: 'Chci být u stolu',
      buttonLoading: 'Odesílám...',
      privacy: 'Vaše údaje chráníme jako rodinné recepty. Odhlášení kdykoliv jedním kliknutím.'
    },
    en: {
      title: 'Become Part of Our Family',
      subtitle: 'Reserve your seat at our table',
      benefits: [
        { icon: Gift, text: 'Exclusive vouchers & discounts for our loyal guests' },
        { icon: Sparkles, text: 'First invites to seasonal specialties tastings' },
        { icon: Calendar, text: 'Special Italian cuisine & wine evenings' }
      ],
      noSpam: 'Only 5–6 emails per year – each one is like an invitation to the family table',
      placeholder: 'your@email.com',
      button: 'Reserve My Seat',
      buttonLoading: 'Sending...',
      privacy: 'We protect your data like family recipes. Unsubscribe anytime with one click.'
    },
    it: {
      title: 'Entra a Far Parte della Famiglia',
      subtitle: 'Prenota il tuo posto alla nostra tavola',
      benefits: [
        { icon: Gift, text: 'Voucher esclusivi e sconti per i nostri ospiti fedeli' },
        { icon: Sparkles, text: 'Prime inviti alle degustazioni delle specialità stagionali' },
        { icon: Calendar, text: 'Serate speciali con cucina e vino italiano' }
      ],
      noSpam: 'Solo 5–6 email all\'anno – ognuna è come un invito alla tavola di famiglia',
      placeholder: 'tua@email.it',
      button: 'Prenota il Mio Posto',
      buttonLoading: 'Invio...',
      privacy: 'Proteggiamo i tuoi dati come le ricette di famiglia. Annulla l\'iscrizione in qualsiasi momento con un clic.'
    }
  };

  const t = content[language as keyof typeof content] || content.en;

  if (subscribed) {
    return (
      <div className="section-padding bg-gradient-to-br from-green-50 via-white to-primary/5">
        <div className="container-custom max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl shadow-green-200/50 p-12 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-3xl font-serif text-gray-900 mb-3">
              {language === 'cs' && 'Vítejte v rodině Altro Da Tony!'}
              {language === 'en' && 'Welcome to the Altro Da Tony family!'}
              {language === 'it' && 'Benvenuto nella famiglia Altro Da Tony!'}
            </h3>
            <p className="text-gray-600 text-lg">
              {language === 'cs' && 'Brzy vás budeme kontaktovat s novinkami a exkluzivními nabídkami.'}
              {language === 'en' && 'We\'ll be in touch soon with news and exclusive offers.'}
              {language === 'it' && 'Ti contatteremo presto con novità e offerte esclusive.'}
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding bg-gradient-to-br from-primary/5 via-white to-blue-50/30">
      <div className="container-custom max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
              <Mail className="w-3 h-3" />
              Newsletter
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900">
              {t.title}
            </h2>
            
            <p className="text-xl text-stone-600 font-light">
              {t.subtitle}
            </p>

            <div className="space-y-4 pt-4">
              {t.benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-stone-700 font-medium">{benefit.text}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-green-50 border-2 border-green-100 rounded-2xl p-5 inline-block">
              <p className="text-sm text-green-800 font-medium flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                {t.noSpam}
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-stone-200/50 p-8 md:p-10 border border-stone-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <label className="block">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-stone-400 mb-3">
                    <Mail className="w-4 h-4" />
                    {language === 'cs' ? 'Váš email' : language === 'it' ? 'La tua email' : 'Your Email'}
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.placeholder}
                    required
                    disabled={loading}
                    className="w-full px-6 py-5 bg-stone-50 border-2 border-stone-100 focus:border-primary rounded-2xl outline-none font-medium text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </label>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-xs text-blue-800 leading-relaxed">
                    <strong className="block mb-1">
                      {language === 'cs' && 'GDPR & Ochrana osobních údajů'}
                      {language === 'en' && 'GDPR & Privacy Protection'}
                      {language === 'it' && 'GDPR & Protezione della privacy'}
                    </strong>
                    {t.privacy}
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t.buttonLoading}
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    {t.button}
                  </>
                )}
              </button>

              <p className="text-xs text-center text-stone-400 leading-relaxed">
                {language === 'cs' && 'Odesláním souhlasíte s příjímáním marketingových emailů. Odhlášení je možné kdykoliv.'}
                {language === 'en' && 'By submitting, you agree to receive marketing emails. Unsubscribe anytime.'}
                {language === 'it' && 'Inviando, accetti di ricevere email di marketing. Annulla l\'iscrizione in qualsiasi momento.'}
              </p>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}