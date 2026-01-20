import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'cs' as const, label: 'Čeština', flag: '🇨🇿', native: 'Čeština' },
    { code: 'en' as const, label: 'English', flag: '🇬🇧', native: 'English' },
    { code: 'it' as const, label: 'Italiano', flag: '🇮🇹', native: 'Italiano' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (code: 'cs' | 'en' | 'it') => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-card hover:bg-primary/10 border border-border transition-all hover:shadow-lg hover:border-primary/30 group"
        aria-label="Change language"
      >
        <span className="text-2xl group-hover:scale-110 transition-transform">{currentLanguage?.flag}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-50"
          >
            {languages.map((lang, index) => (
              <motion.button
                key={lang.code}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center justify-center w-12 h-12 text-left transition-all ${
                  language === lang.code
                    ? 'bg-primary text-white shadow-inner'
                    : 'hover:bg-primary/10 text-foreground hover:scale-105'
                }`}
              >
                <span className="text-3xl">{lang.flag}</span>
                {language === lang.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-2 w-2 h-2 bg-white rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}