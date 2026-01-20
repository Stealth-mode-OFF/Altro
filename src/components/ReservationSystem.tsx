import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, User, Mail, Phone, Users, MessageSquare, ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';
import { createReservation } from '../hooks/useApi';

interface ReservationData {
  date: string;
  time: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

type Step = 'date' | 'time' | 'details' | 'confirmation';

export function ReservationSystem() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<Step>('date');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ReservationData>({
    date: '',
    time: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Generate available dates (next 60 days, excluding Mondays - closed day)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip Mondays (day 1)
      if (date.getDay() !== 1) {
        dates.push({
          date: date,
          dateString: date.toISOString().split('T')[0],
          dayName: date.toLocaleDateString('cs-CZ', { weekday: 'short' }),
          day: date.getDate(),
          month: date.toLocaleDateString('cs-CZ', { month: 'short' }),
          isToday: i === 0,
        });
      }
    }
    
    return dates;
  };

  // Generate available time slots
  const getAvailableTimeSlots = () => {
    const slots = [];
    
    // Lunch: 11:30 - 14:30
    for (let hour = 11; hour <= 14; hour++) {
      if (hour === 11) {
        slots.push({ time: '11:30', period: 'lunch', label: 'Oběd' });
      } else if (hour < 14) {
        slots.push({ time: `${hour}:00`, period: 'lunch', label: 'Oběd' });
        slots.push({ time: `${hour}:30`, period: 'lunch', label: 'Oběd' });
      } else {
        slots.push({ time: '14:30', period: 'lunch', label: 'Oběd' });
      }
    }
    
    // Dinner: 17:00 - 21:30
    for (let hour = 17; hour <= 21; hour++) {
      slots.push({ time: `${hour}:00`, period: 'dinner', label: 'Večeře' });
      if (hour < 21) {
        slots.push({ time: `${hour}:30`, period: 'dinner', label: 'Večeře' });
      }
    }
    
    return slots;
  };

  const availableDates = getAvailableDates();
  const availableTimeSlots = getAvailableTimeSlots();

  const handleDateSelect = (dateString: string) => {
    setFormData({ ...formData, date: dateString });
    setTimeout(() => setCurrentStep('time'), 300);
  };

  const handleTimeSelect = (time: string) => {
    setFormData({ ...formData, time });
    setTimeout(() => setCurrentStep('details'), 300);
  };

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < digits.length && i < 9; i++) {
      if (i === 3 || i === 6) formatted += ' ';
      formatted += digits[i];
    }
    setFormData({ ...formData, phone: formatted });
  };

  const handleSubmit = async () => {
    // Validate
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 9) {
      toast.error('Telefonní číslo musí mít 9 číslic');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to database via API
      const response = await createReservation(formData);

      if (response.success) {
        // Format date for display
        const dateObj = new Date(formData.date);
        const formattedDate = dateObj.toLocaleDateString('cs-CZ', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });

        toast.success('Rezervace byla úspěšně vytvořena!', {
          description: `${formattedDate} v ${formData.time} pro ${formData.guests} ${formData.guests === '1' ? 'osobu' : formData.guests <= '4' ? 'osoby' : 'osob'}`,
          duration: 5000,
        });

        setCurrentStep('confirmation');
      } else {
        throw new Error('Failed to create reservation');
      }
    } catch (error) {
      toast.error('Nastala chyba při vytváření rezervace. Zkuste to prosím znovu.');
      console.error('Reservation error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      date: '',
      time: '',
      guests: '2',
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    setCurrentStep('date');
  };

  const getStepNumber = (step: Step) => {
    const steps: Step[] = ['date', 'time', 'details', 'confirmation'];
    return steps.indexOf(step) + 1;
  };

  const currentStepNumber = getStepNumber(currentStep);
  const selectedDate = availableDates.find(d => d.dateString === formData.date);

  return (
    <section id="reservation" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-primary text-sm uppercase tracking-[0.2em] font-medium">
              {t('reservation.title')}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-4"
          >
            {t('reservation.heading')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60 max-w-2xl mx-auto"
          >
            {t('reservation.description')}
          </motion.p>
        </div>

        {/* Progress Bar */}
        {currentStep !== 'confirmation' && (
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-between mb-4">
              {['Datum', 'Čas', 'Údaje'].map((label, index) => (
                <div key={label} className="flex items-center flex-1">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    currentStepNumber > index + 1
                      ? 'bg-primary border-primary text-white'
                      : currentStepNumber === index + 1
                      ? 'border-primary text-primary'
                      : 'border-border text-foreground/30'
                  }`}>
                    {currentStepNumber > index + 1 ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className={`flex-1 h-0.5 mx-2 transition-all ${
                    index < 2 && (currentStepNumber > index + 1 ? 'bg-primary' : 'bg-border')
                  } ${index === 2 ? 'hidden' : ''}`} />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm">
              <span className={currentStepNumber >= 1 ? 'text-foreground' : 'text-foreground/30'}>Datum</span>
              <span className={currentStepNumber >= 2 ? 'text-foreground' : 'text-foreground/30'}>Čas</span>
              <span className={currentStepNumber >= 3 ? 'text-foreground' : 'text-foreground/30'}>Údaje</span>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Date Selection */}
            {currentStep === 'date' && (
              <motion.div
                key="date"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                  <h3 className="mb-8 text-center">Vyberte datum návštěvy</h3>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
                    {availableDates.slice(0, 28).map((date) => (
                      <motion.button
                        key={date.dateString}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDateSelect(date.dateString)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          date.isToday
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary hover:bg-primary/5'
                        }`}
                      >
                        <div className="text-xs text-foreground/60 uppercase mb-1">
                          {date.dayName}
                        </div>
                        <div className="text-2xl font-semibold text-foreground mb-1" style={{ fontFamily: 'Cormorant Garamond' }}>
                          {date.day}
                        </div>
                        <div className="text-xs text-foreground/60">
                          {date.month}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-6 text-center text-sm text-foreground/60">
                    <p>💡 Pondělí jsme zavřeni</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Time Selection */}
            {currentStep === 'time' && (
              <motion.div
                key="time"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                  <div className="flex items-center justify-between mb-8">
                    <button
                      onClick={() => setCurrentStep('date')}
                      className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Zpět
                    </button>
                    <div className="text-center">
                      <div className="text-sm text-foreground/60 mb-1">Vybrané datum</div>
                      <div className="font-semibold text-primary">
                        {selectedDate && `${selectedDate.dayName} ${selectedDate.day}. ${selectedDate.month}`}
                      </div>
                    </div>
                    <div className="w-16" /> {/* Spacer */}
                  </div>

                  <h3 className="mb-8 text-center">Vyberte čas</h3>

                  {/* Lunch Times */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-primary" />
                      <h4 className="text-lg">Oběd (11:30 - 15:00)</h4>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {availableTimeSlots.filter(s => s.period === 'lunch').map((slot) => (
                        <motion.button
                          key={slot.time}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleTimeSelect(slot.time)}
                          className="p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all"
                        >
                          <div className="text-xl font-semibold" style={{ fontFamily: 'Cormorant Garamond' }}>
                            {slot.time}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Dinner Times */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-primary" />
                      <h4 className="text-lg">Večeře (17:00 - 22:00)</h4>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {availableTimeSlots.filter(s => s.period === 'dinner').map((slot) => (
                        <motion.button
                          key={slot.time}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleTimeSelect(slot.time)}
                          className="p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all"
                        >
                          <div className="text-xl font-semibold" style={{ fontFamily: 'Cormorant Garamond' }}>
                            {slot.time}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Details */}
            {currentStep === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                  <div className="flex items-center justify-between mb-8">
                    <button
                      onClick={() => setCurrentStep('time')}
                      className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Zpět
                    </button>
                    <div className="text-center">
                      <div className="text-sm text-foreground/60 mb-1">Rezervace</div>
                      <div className="font-semibold text-primary">
                        {selectedDate && `${selectedDate.day}. ${selectedDate.month}`} • {formData.time}
                      </div>
                    </div>
                    <div className="w-16" /> {/* Spacer */}
                  </div>

                  <h3 className="mb-8 text-center">Vaše kontaktní údaje</h3>

                  <div className="max-w-2xl mx-auto space-y-6">
                    {/* Number of Guests */}
                    <div>
                      <label className="block text-foreground/70 mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        Počet hostů *
                      </label>
                      <div className="grid grid-cols-4 gap-3">
                        {['1', '2', '3', '4', '5', '6', '7', '8'].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setFormData({ ...formData, guests: num })}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              formData.guests === num
                                ? 'border-primary bg-primary text-white'
                                : 'border-border hover:border-primary'
                            }`}
                          >
                            <span className="text-xl font-semibold" style={{ fontFamily: 'Cormorant Garamond' }}>
                              {num}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-foreground/70 mb-3 flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        Jméno a příjmení *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-4 bg-input-background border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-all"
                        placeholder="Jan Novák"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-foreground/70 mb-3 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-4 bg-input-background border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-all"
                        placeholder="jan@example.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-foreground/70 mb-3 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary" />
                        Telefon *
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none">
                          +420
                        </span>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          className="w-full px-4 py-4 pl-16 bg-input-background border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-all"
                          placeholder="123 456 789"
                          maxLength={11}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-foreground/70 mb-3 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        Poznámka (volitelné)
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-4 bg-input-background border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-all resize-none"
                        placeholder="Speciální přání, alergie, preference místa..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !formData.name || !formData.email || !formData.phone}
                      className="w-full bg-primary text-white py-4 px-8 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          Odesílám...
                        </>
                      ) : (
                        <>
                          Potvrdit rezervaci
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 'confirmation' && (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="w-10 h-10 text-green-600" />
                  </motion.div>

                  <h3 className="mb-4">Děkujeme za rezervaci!</h3>
                  
                  <p className="text-foreground/60 mb-8 max-w-md mx-auto">
                    Vaše rezervace byla úspěšně vytvořena. Brzy vás budeme kontaktovat pro potvrzení.
                  </p>

                  {/* Reservation Summary */}
                  <div className="bg-muted rounded-xl p-6 max-w-md mx-auto mb-8">
                    <div className="space-y-4 text-left">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-sm text-foreground/60">Datum</div>
                          <div className="font-semibold">
                            {selectedDate && `${selectedDate.dayName} ${selectedDate.day}. ${selectedDate.month}`}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-sm text-foreground/60">Čas</div>
                          <div className="font-semibold">{formData.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-sm text-foreground/60">Počet hostů</div>
                          <div className="font-semibold">
                            {formData.guests} {formData.guests === '1' ? 'osoba' : formData.guests <= '4' ? 'osoby' : 'osob'}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-sm text-foreground/60">Jméno</div>
                          <div className="font-semibold">{formData.name}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="bg-secondary text-white py-3 px-8 rounded-xl hover:bg-secondary/90 transition-all"
                  >
                    Vytvořit novou rezervaci
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}