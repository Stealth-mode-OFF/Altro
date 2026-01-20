import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Shows a banner when user goes offline
 * Automatically hides when back online
 */
export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setWasOffline(true);
      // Hide "back online" message after 3 seconds
      setTimeout(() => setWasOffline(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-[100] bg-red-600 text-white py-3 px-4 shadow-lg"
        >
          <div className="container-custom flex items-center justify-center gap-3">
            <WifiOff className="w-5 h-5" />
            <p className="font-medium">
              Nejste připojeni k internetu. Některé funkce nemusí být dostupné.
            </p>
          </div>
        </motion.div>
      )}

      {isOnline && wasOffline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-[100] bg-green-600 text-white py-3 px-4 shadow-lg"
        >
          <div className="container-custom flex items-center justify-center gap-3">
            <Wifi className="w-5 h-5" />
            <p className="font-medium">
              Zpět online! Všechny funkce jsou dostupné.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
