import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import chefImage from "../assets/e22ac4c178d2bbab1324e57e3d6e56436f52bc40.png";
import { Users, Calendar, Clock, User, Phone, Mail, MessageSquare, Check, ChevronRight, Star, GlassWater, ChevronDown } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useLanguage } from '../contexts/LanguageContext';
import { createReservation } from '../hooks/useApi';
import { FlowingSection } from './premium/FlowingSection';
import { SmoothReveal } from './premium/SmoothReveal';

export function Reservation() {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1: Details (Guests, Date, Time), 2: Contact
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [formData, setFormData] = useState({
    guests: '2',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    occasion: '',
    message: ''
  });

  // Time slots generation
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 11; hour <= 22; hour++) {
      slots.push(`${hour}:00`);
      if (hour !== 22) slots.push(`${hour}:30`);
    }
    return slots;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Phone number formatting
    if (name === 'phone') {
      // Remove all non-numeric characters
      const cleaned = value.replace(/\D/g, '');
      
      // Limit to 9 digits
      const limited = cleaned.slice(0, 9);
      
      // Format: XXX XXX XXX
      let formatted = '';
      for (let i = 0; i < limited.length; i++) {
        if (i === 3 || i === 6) {
          formatted += ' ';
        }
        formatted += limited[i];
      }
      
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    // Email suggestions
    if (name === 'email') {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Check if user has typed something but no @ yet, or is typing after @
      if (value && !value.includes('@')) {
        // Suggest completing with popular domains
        setEmailSuggestions([
          `${value}@gmail.com`,
          `${value}@seznam.cz`,
        ]);
        setShowSuggestions(true);
      } else if (value.includes('@') && value.split('@')[1].length < 10) {
        // User is typing after @, suggest domains
        const localPart = value.split('@')[0];
        const domainPart = value.split('@')[1] || '';
        
        const suggestions = [];
        if ('gmail.com'.startsWith(domainPart)) {
          suggestions.push(`${localPart}@gmail.com`);
        }
        if ('seznam.cz'.startsWith(domainPart)) {
          suggestions.push(`${localPart}@seznam.cz`);
        }
        
        if (suggestions.length > 0) {
          setEmailSuggestions(suggestions);
          setShowSuggestions(true);
        } else {
          setShowSuggestions(false);
        }
      } else {
        setShowSuggestions(false);
      }
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectEmailSuggestion = (suggestion: string) => {
    setFormData(prev => ({ ...prev, email: suggestion }));
    setShowSuggestions(false);
  };

  const selectGuest = (num: string) => {
    setFormData(prev => ({ ...prev, guests: num }));
  };

  const selectTime = (time: string) => {
    setFormData(prev => ({ ...prev, time }));
  };

  const nextStep = () => {
    if (!formData.date) {
      toast.error(t('reservation.date') + ' ' + t('reservation.fillAll'));
      return;
    }
    if (!formData.time) {
      toast.error(t('reservation.time') + ' ' + t('reservation.fillAll'));
      return;
    }
    setStep(2);
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.name || !formData.phone || !formData.email) {
        toast.error(t('reservation.fillAll') || "Please fill all fields");
        setIsSubmitting(false);
        return;
      }

      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (phoneDigits.length !== 9) {
        toast.error(language === 'cs' ? 'Telefon musí mít 9 číslic.' : language === 'it' ? 'Il numero di telefono deve avere 9 cifre.' : 'Phone number must contain 9 digits.');
        setIsSubmitting(false);
        return;
      }

      const response = await createReservation({
        ...formData,
        marketingConsent
      });

      if (response.success) {
        toast.success(
          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start w-full pt-1">
            <div className="relative w-16 h-16 shrink-0 rounded-full overflow-hidden border-2 border-primary/20 shadow-md">
              <ImageWithFallback 
                src={chefImage} 
                alt="Chef" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <p className="text-base font-medium leading-relaxed text-stone-800 dark:text-stone-200">
                {t('reservation.success')} <span className="font-bold">
                  {language === 'cs' && 'Prosím vyčkejte na potvrzení v e-mailu.'}
                  {language === 'en' && 'Please wait for confirmation via email.'}
                  {language === 'it' && 'Si prega di attendere la conferma via email.'}
                </span>
              </p>
            </div>
          </div>, 
          { 
            duration: 8000,
            className: "p-4 sm:p-6",
            style: {
              fontSize: '1rem',
            }
          }
        );
        setStep(1);
        setMarketingConsent(false);
        setFormData({
          guests: '2',
          date: '',
          time: '',
          name: '',
          phone: '',
          email: '',
          occasion: '',
          message: ''
        });
      } else {
        throw new Error('Reservation failed');
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : '';
      toast.error(errorMessage || t('reservation.error') || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <FlowingSection id="reservation" variant="subtle" className="section-padding overflow-hidden">
      <div className="container-custom px-4 max-w-5xl mx-auto">
        
        <SmoothReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Star className="w-3 h-3 fill-primary" />
              {t('nav.reserve')}
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-stone-900 mb-6">{t('reservation.title')}</h2>
            <p className="text-stone-500 max-w-xl mx-auto text-lg font-light leading-relaxed">
              {t('reservation.subtitle')}
            </p>
          </div>
        </SmoothReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: The Form */}
          <div className="lg:col-span-7">
            <motion.div 
              layout
              className="bg-white rounded-[2rem] shadow-2xl shadow-stone-200/50 overflow-hidden border border-stone-100"
            >
              {/* Progress Bar */}
              <div className="w-full h-2 bg-stone-100 flex">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-out" 
                  style={{ width: step === 1 ? '50%' : '100%' }}
                />
              </div>

              <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-10">
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      {/* Section: Guests */}
                      <div className="space-y-4">
                        <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-stone-400">
                          <Users className="w-4 h-4" />
                          {t('reservation.guests')}
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {['1', '2', '3', '4', '5', '6+'].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => selectGuest(num)}
                              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                                formData.guests === num
                                  ? 'bg-stone-900 text-white shadow-lg scale-110'
                                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Section: Date */}
                      <div className="space-y-4">
                        <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-stone-400">
                          <Calendar className="w-4 h-4" />
                          {t('reservation.date')}
                        </label>
                        <div className="relative group cursor-pointer">
                          <input
                            type="date"
                            name="date"
                            min={today}
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full bg-stone-50 hover:bg-stone-100 focus:bg-white border-2 border-stone-100 focus:border-primary rounded-2xl px-6 py-5 text-xl font-medium outline-none transition-all cursor-pointer text-stone-800 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400 transition-colors group-hover:text-primary">
                            <Calendar className="w-6 h-6" />
                          </div>
                        </div>
                      </div>

                      {/* Section: Time */}
                      <div className="space-y-4">
                        <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-stone-400">
                          <Clock className="w-4 h-4" />
                          {t('reservation.time')}
                        </label>
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                          {timeSlots.map(time => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => selectTime(time)}
                              className={`py-2 px-1 rounded-xl text-sm font-semibold transition-all duration-200 border-2 ${
                                formData.time === time
                                  ? 'border-primary bg-primary/5 text-primary'
                                  : 'border-transparent bg-stone-100 text-stone-600 hover:bg-stone-200'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={nextStep}
                        className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-black transition-colors flex items-center justify-center gap-2 mt-8"
                      >
                        {t('reservation.continue')}
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      <button 
                        type="button" 
                        onClick={prevStep}
                        className="text-sm font-bold text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-1 uppercase tracking-wide mb-2"
                      >
                        <ChevronRight className="w-4 h-4 rotate-180" />
                        {t('reservation.back')}
                      </button>

                      <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 mb-6">
                        <h4 className="font-serif text-xl mb-2 text-primary">{t('reservation.summary')}</h4>
                        <div className="flex flex-wrap gap-4 text-stone-600 font-medium">
                          <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(formData.date).toLocaleDateString(language === 'cs' ? 'cs-CZ' : 'en-US')}</span>
                          <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {formData.time}</span>
                          <span className="flex items-center gap-2"><Users className="w-4 h-4" /> {formData.guests} os.</span>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div className="group relative">
                          <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-primary transition-colors" />
                          <input
                            type="text"
                            name="name"
                            placeholder={t('reservation.name')}
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-14 pr-6 py-5 bg-stone-50 border-2 border-transparent focus:border-primary rounded-2xl outline-none font-medium text-lg transition-all"
                          />
                        </div>

                        <div className="group relative">
                          <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-primary transition-colors" />
                          <input
                            type="tel"
                            name="phone"
                            placeholder={t('reservation.phone')}
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full pl-14 pr-6 py-5 bg-stone-50 border-2 border-transparent focus:border-primary rounded-2xl outline-none font-medium text-lg transition-all tracking-wider"
                          />
                          {formData.phone && formData.phone.replace(/\D/g, '').length === 9 && (
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                              <Check className="w-5 h-5 text-green-500" />
                            </div>
                          )}
                        </div>

                        <div className="group relative">
                          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-primary transition-colors" />
                          <input
                            type="email"
                            name="email"
                            placeholder={t('reservation.email')}
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => {
                              if (formData.email && emailSuggestions.length > 0) {
                                setShowSuggestions(true);
                              }
                            }}
                            onBlur={() => {
                              // Delay to allow click on suggestion
                              setTimeout(() => setShowSuggestions(false), 200);
                            }}
                            required
                            className="w-full pl-14 pr-6 py-5 bg-stone-50 border-2 border-transparent focus:border-primary rounded-2xl outline-none font-medium text-lg transition-all"
                          />
                          {showSuggestions && emailSuggestions.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute left-0 right-0 top-full mt-2 bg-white border-2 border-primary/20 rounded-2xl shadow-2xl shadow-stone-200/50 overflow-hidden z-20"
                            >
                              {emailSuggestions.map((suggestion, index) => (
                                <button
                                  key={suggestion}
                                  type="button"
                                  onClick={() => selectEmailSuggestion(suggestion)}
                                  className="w-full px-6 py-3 text-left hover:bg-primary/5 transition-colors border-b border-stone-100 last:border-b-0 flex items-center gap-3 group/suggestion"
                                >
                                  <Mail className="w-4 h-4 text-primary/40 group-hover/suggestion:text-primary transition-colors" />
                                  <span className="font-medium text-stone-700 group-hover/suggestion:text-primary transition-colors">{suggestion}</span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </div>

                        <div className="group relative">
                          <GlassWater className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-primary transition-colors" />
                          <select
                            name="occasion"
                            value={formData.occasion}
                            onChange={handleChange}
                            className={`w-full pl-14 pr-6 py-5 bg-stone-50 border-2 border-transparent focus:border-primary rounded-2xl outline-none font-medium text-lg transition-all appearance-none ${
                              !formData.occasion ? 'text-stone-400' : 'text-stone-700'
                            }`}
                          >
                            <option value="" disabled>{t('reservation.occasionPlaceholder')}</option>
                            <option value="business">{t('reservation.occasionBusiness')}</option>
                            <option value="romance">{t('reservation.occasionRomance')}</option>
                            <option value="friends">{t('reservation.occasionFriends')}</option>
                            <option value="family">{t('reservation.occasionFamily')}</option>
                            <option value="celebration">{t('reservation.occasionCelebration')}</option>
                            <option value="other">{t('reservation.occasionOther')}</option>
                          </select>
                          <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
                        </div>

                        <div className="group relative">
                          <MessageSquare className="absolute left-5 top-6 w-5 h-5 text-stone-400 group-focus-within:text-primary transition-colors" />
                          <textarea
                            name="message"
                            placeholder={t('reservation.message')}
                            value={formData.message}
                            onChange={handleChange}
                            rows={3}
                            className="w-full pl-14 pr-6 py-5 bg-stone-50 border-2 border-transparent focus:border-primary rounded-2xl outline-none font-medium text-lg transition-all resize-none"
                          />
                        </div>
                      </div>

                      {/* Marketing Consent Checkbox - GDPR Compliant */}
                      <motion.div 
                        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200/60 p-6 shadow-sm hover:shadow-md transition-all duration-300"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        {/* Decorative background pattern */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl -z-0" />
                        
                        <label className="flex items-start gap-4 cursor-pointer group relative z-10">
                          {/* Custom styled checkbox */}
                          <div className="relative mt-0.5">
                            <input
                              type="checkbox"
                              checked={marketingConsent}
                              onChange={(e) => setMarketingConsent(e.target.checked)}
                              className="peer sr-only"
                            />
                            <div className="w-6 h-6 rounded-lg border-2 border-blue-400 bg-white peer-checked:bg-gradient-to-br peer-checked:from-blue-500 peer-checked:to-indigo-600 peer-checked:border-blue-600 transition-all duration-300 flex items-center justify-center group-hover:border-blue-500 group-hover:shadow-md">
                              <motion.div
                                initial={false}
                                animate={{ 
                                  scale: marketingConsent ? 1 : 0,
                                  opacity: marketingConsent ? 1 : 0 
                                }}
                                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                              >
                                <Check className="w-4 h-4 text-white" strokeWidth={3} />
                              </motion.div>
                            </div>
                          </div>
                          
                          <div className="flex-1 select-none">
                            <div className="flex items-center gap-2 mb-2">
                              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                              <p className="text-base font-semibold text-gray-900">
                                {language === 'cs' && 'Staňte se součástí naší rodiny'}
                                {language === 'en' && 'Become part of our family'}
                                {language === 'it' && 'Entra a far parte della nostra famiglia'}
                              </p>
                            </div>
                            
                            <p className="text-sm text-gray-700 leading-relaxed mb-3">
                              {language === 'cs' && (
                                <>
                                  Přidejte se k <strong className="text-blue-900">Altro Da Tony</strong> a získávejte exkluzivní slevy, novinky o sezonních specialitách a pozvánky na speciální akce. Pouze <strong>5–6× ročně</strong>.
                                </>
                              )}
                              {language === 'en' && (
                                <>
                                  Join <strong className="text-blue-900">Altro Da Tony</strong> and receive exclusive discounts, seasonal specialties updates and special event invitations. Only <strong>5–6 times per year</strong>.
                                </>
                              )}
                              {language === 'it' && (
                                <>
                                  Unisciti a <strong className="text-blue-900">Altro Da Tony</strong> e ricevi sconti esclusivi, aggiornamenti sulle specialità stagionali e inviti ad eventi speciali. Solo <strong>5–6 volte all'anno</strong>.
                                </>
                              )}
                            </p>
                            
                            <div className="flex flex-wrap gap-3 text-xs">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-br from-amber-50 to-orange-50 backdrop-blur-sm rounded-full text-orange-700 border border-orange-200">
                                <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" strokeWidth={2.5} />
                                {language === 'cs' && 'Slevové vouchery'}
                                {language === 'en' && 'Discount vouchers'}
                                {language === 'it' && 'Voucher sconto'}
                              </span>
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-sm rounded-full text-blue-700 border border-blue-200">
                                <GlassWater className="w-3.5 h-3.5" strokeWidth={2.5} />
                                {language === 'cs' && 'Speciální nabídky'}
                                {language === 'en' && 'Special offers'}
                                {language === 'it' && 'Offerte speciali'}
                              </span>
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-br from-green-50 to-emerald-50 backdrop-blur-sm rounded-full text-green-700 border border-green-200">
                                <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                                {language === 'cs' && 'Sezónní speciality'}
                                {language === 'en' && 'Seasonal specialties'}
                                {language === 'it' && 'Specialità stagionali'}
                              </span>
                            </div>
                          </div>
                        </label>
                      </motion.div>

                      <p className="text-xs text-stone-400 text-center px-4 leading-relaxed mt-4 mb-2">
                        {language === 'cs' && 'Odesláním formuláře souhlasíte se zpracováním osobních údajů pro účely rezervace.'}
                        {language === 'en' && 'By submitting the form, you agree to the processing of personal data for reservation purposes.'}
                        {language === 'it' && 'Inviando il modulo, accetti il trattamento dei dati personali ai fini della prenotazione.'}
                      </p>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          t('reservation.sending')
                        ) : (
                          <>
                            {t('reservation.submit')}
                            <Check className="w-6 h-6" />
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>

          {/* Right Panel: Info & Atmosphere (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-5 space-y-8 sticky top-32">
            
            {/* Chef Card */}
            <div className="relative group overflow-hidden rounded-[2.5rem] shadow-xl shadow-stone-200/50 h-80">
              <ImageWithFallback
                src={chefImage}
                alt="Antonín Sahulka"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                <p className="text-primary font-bold uppercase tracking-widest text-xs mb-2">{t('hero.chef')}</p>
                <h3 className="text-white text-3xl font-serif mb-2">{t('hero.chefName')}</h3>
                <p className="text-white/80 text-sm font-light italic">"{t('about.ownerQuoteShort')}"</p>
              </div>
            </div>

            <div className="bg-stone-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <div>
                  <h3 className="text-2xl font-serif mb-2">Altro Da Tony</h3>
                  <p className="text-white/60">{t('contact.addressLine1')}, 120 00 Praha 2</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-full">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{t('hero.hours')}</h4>
                      <p className="text-sm text-white/70">{t('contact.days')}</p>
                      <p className="text-sm text-white/70">11:00 - 23:00</p>
                      <p className="text-xs text-white/50 mt-1 italic">{t('footer.kitchenUntil')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-full">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{t('contact.phone')}</h4>
                      <p className="text-sm text-white/70 whitespace-nowrap">+420 774 672 458</p>
                      <p className="text-xs text-white/50 mt-1">{t('reservation.groups')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Circle */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            </div>


          </div>
        </div>
      </div>
    </FlowingSection>
  );
}