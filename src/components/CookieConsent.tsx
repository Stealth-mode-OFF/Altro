import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { navigate } from '../utils/router';
import { AnimatePresence, motion } from 'motion/react';

export const CONSENT_KEY = 'altro_da_tony_consent_v2'; // New key version
const CONSENT_IP_KEY = 'altro_da_tony_consent_ip';
// Helper to get public IP address
async function fetchPublicIP(): Promise<string | null> {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    if (!res.ok) return null;
    const data = await res.json();
    return data.ip || null;
  } catch {
    return null;
  }
}
const EXPIRATION_DAYS = 365;

// --- Helper Functions ---

export function setCookie(name: string, value: string, days: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

export function getCookie(name: string) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Hybrid storage system (Cookie + LocalStorage backup)
export function saveConsent(value: string, ip?: string) {
  setCookie(CONSENT_KEY, value, EXPIRATION_DAYS);
  try {
    localStorage.setItem(CONSENT_KEY, value);
    if (ip) {
      localStorage.setItem(CONSENT_IP_KEY, ip);
      setCookie(CONSENT_IP_KEY, ip, EXPIRATION_DAYS);
    }
  } catch (e) {
    console.warn('LocalStorage access denied', e);
  }
}

export function checkConsent(): string | null {
  // 1. Check Cookies first
  const cookieVal = getCookie(CONSENT_KEY);
  if (cookieVal) return cookieVal;
  // 2. Check LocalStorage fallback
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch (e) {
    return null;
  }
}

export function getStoredConsentIP(): string | null {
  // 1. Check Cookies first
  const cookieVal = getCookie(CONSENT_IP_KEY);
  if (cookieVal) return cookieVal;
  // 2. Check LocalStorage fallback
  try {
    return localStorage.getItem(CONSENT_IP_KEY);
  } catch (e) {
    return null;
  }
}

export function CookieConsent() {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [ip, setIp] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    // Fetch IP and check consent
    fetchPublicIP().then(userIp => {
      if (cancelled) return;
      setIp(userIp);
      const storedConsent = checkConsent();
      const storedIp = getStoredConsentIP();
      // If consent exists and IP matches, do not show banner
      if (storedConsent && storedIp && userIp && storedIp === userIp) {
        setIsVisible(false);
        return;
      }
      // If no consent or IP does not match, show banner
      if (!storedConsent || !storedIp || storedIp !== userIp) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const handleAccept = () => {
    saveConsent('accepted', ip || undefined);
    setIsVisible(false);
  };

  const handleDecline = () => {
    saveConsent('declined', ip || undefined);
    setIsVisible(false);
  };

  const openCookiesPage = () => {
    navigate('/cookies');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6" // Increased z-index
        >
          <div className="max-w-4xl mx-auto bg-[#0c0c0c] text-stone-200 rounded-2xl shadow-2xl border border-stone-800 p-5 md:p-6 flex flex-col md:flex-row items-center gap-6 ring-1 ring-white/10">
            
            <div className="flex-1 space-y-2 text-center md:text-left">
              <h3 className="font-serif font-bold text-lg text-white">
                {language === 'cs' ? 'Vaše soukromí je pro nás důležité' : language === 'en' ? 'Your privacy matters to us' : 'La tua privacy è importante per noi'} 🍪
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                {language === 'cs' && 'Používáme cookies k vylepšení vašeho zážitku a analýze návštěvnosti. Vaše volba zůstane uložena po dobu jednoho roku.'}
                {language === 'en' && 'We use cookies to enhance your experience and analyze traffic. Your choice will be saved for one year.'}
                {language === 'it' && 'Utilizziamo i cookie per migliorare la tua esperienza e analizzare il traffico. La tua scelta sarà salvata per un anno.'}
                {' '}
                <button 
                  onClick={openCookiesPage}
                  className="text-primary hover:text-white underline underline-offset-2 transition-colors"
                >
                  {language === 'cs' ? 'Více informací' : language === 'en' ? 'More info' : 'Maggiori informazioni'}
                </button>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={handleDecline}
                className="px-6 py-2.5 rounded-xl border border-stone-700 hover:bg-stone-800 text-stone-400 hover:text-white transition-all text-sm font-medium"
              >
                {language === 'cs' ? 'Odmítnout vše' : language === 'en' ? 'Decline all' : 'Rifiuta tutto'}
              </button>
              <button
                onClick={handleAccept}
                className="px-8 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all text-sm font-bold"
              >
                {language === 'cs' ? 'Přijmout vše' : language === 'en' ? 'Accept all' : 'Accetta tutto'}
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
