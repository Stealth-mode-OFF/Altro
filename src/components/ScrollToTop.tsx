import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-[#C84A47] hover:bg-[#B43D3A] text-white p-4 rounded-full shadow-2xl hover:shadow-[#C84A47]/50 transition-all transform hover:-translate-y-1 z-40 group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </motion.button>
    </AnimatePresence>
  );
}
