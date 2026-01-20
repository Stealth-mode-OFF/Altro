import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { Flame, Award, Pizza, Utensils, Dessert, ChefHat, Wine, Coffee, Beer, GlassWater, Leaf, Soup, Martini, ChevronDown, ChevronRight } from 'lucide-react';
import { getMainMenu } from '../hooks/useApi';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  signature?: boolean;
  spicy?: boolean;
  priceGlass?: string;
  subcategory?: string;
}

interface MenuData {
  pizza: MenuItem[];
  pasta: MenuItem[];
  antipasti: MenuItem[];
  insalate: MenuItem[];
  secondi: MenuItem[];
  dolci: MenuItem[];
  wines: MenuItem[];
  drinks: MenuItem[];
}

export function MenuAccordion() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<keyof MenuData | null>(null);
  const [rawMenuData, setRawMenuData] = useState<any[]>([]);

  const categories = [
    { key: 'pizza' as const, labelKey: 'menu.pizza', icon: Pizza },
    { key: 'pasta' as const, labelKey: 'menu.pasta', icon: Utensils },
    { key: 'antipasti' as const, labelKey: 'menu.antipasti', icon: Soup },
    { key: 'insalate' as const, labelKey: 'menu.insalate', icon: Leaf },
    { key: 'secondi' as const, labelKey: 'menu.secondi', icon: ChefHat },
    { key: 'dolci' as const, labelKey: 'menu.dolci', icon: Dessert },
    { key: 'wines' as const, labelKey: 'menu.wines', icon: Wine },
    { key: 'drinks' as const, labelKey: 'menu.drinks', icon: GlassWater },
  ];

  const getLocalizedContent = (content: any, lang: string): string => {
    if (typeof content === 'string') return content;
    if (typeof content === 'object' && content !== null) {
      return content[lang] || content['cs'] || content['en'] || '';
    }
    return '';
  };

  const mapCategory = (oldCategory: string): { key: keyof MenuData, subcategory?: string } => {
    switch (oldCategory) {
      case 'wines_white': return { key: 'wines', subcategory: 'menu.wines_white' };
      case 'wines_red': return { key: 'wines', subcategory: 'menu.wines_red' };
      case 'wines_rose': return { key: 'wines', subcategory: 'menu.wines_rose' };
      case 'wines_sparkling': return { key: 'wines', subcategory: 'menu.wines_sparkling' };
      case 'beers': return { key: 'drinks', subcategory: 'menu.beers' };
      case 'aperitivi': return { key: 'drinks', subcategory: 'menu.aperitivi' };
      case 'digestivi': return { key: 'drinks', subcategory: 'menu.digestivi' };
      case 'grappa': return { key: 'drinks', subcategory: 'menu.grappa' };
      case 'coffee': return { key: 'drinks', subcategory: 'menu.coffee' };
      case 'nonalcoholic': return { key: 'drinks', subcategory: 'menu.nonalcoholic' };
      case 'spirits': return { key: 'drinks', subcategory: 'menu.spirits' };
      case 'soft_drinks': return { key: 'drinks', subcategory: 'menu.soft_drinks' };
      default: return { key: oldCategory as keyof MenuData };
    }
  };

  const menuData = useMemo(() => {
    const groupedMenu: MenuData = {
      pizza: [],
      pasta: [],
      antipasti: [],
      insalate: [],
      secondi: [],
      dolci: [],
      wines: [],
      drinks: [],
    };
    
    rawMenuData.forEach((item: any) => {
      if (item.hidden) return;
      const { key, subcategory } = mapCategory(item.category);
      if (groupedMenu[key]) {
        groupedMenu[key].push({
          name: getLocalizedContent(item.name, language),
          description: getLocalizedContent(item.description, language),
          price: item.price,
          signature: item.signature,
          spicy: item.spicy,
          priceGlass: item.priceGlass,
          subcategory: subcategory,
        });
      }
    });
    return groupedMenu;
  }, [rawMenuData, language]);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const response = await getMainMenu();
        if (response.success && response.menu) setRawMenuData(response.menu);
      } catch (error) {
        console.error('Error loading menu:', error);
      }
    };
    loadMenu();
    window.addEventListener('mainMenuUpdated', ((e: CustomEvent) => setRawMenuData(e.detail)) as EventListener);
    return () => window.removeEventListener('mainMenuUpdated', ((e: CustomEvent) => setRawMenuData(e.detail)) as EventListener);
  }, []);

  const toggleCategory = (key: keyof MenuData) => {
    if (activeCategory === key) {
      setActiveCategory(null);
    } else {
      setActiveCategory(key);
    }
  };

  return (
    <section id="menu" className="bg-background min-h-[50vh]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-serif mb-4">{t('menu.title')}</h2>
          <p className="text-foreground/60">{t('menu.subtitle')}</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {categories.map((category) => {
            const Icon = category.icon;
            const isOpen = activeCategory === category.key;
            const items = menuData[category.key];
            const hasItems = items && items.length > 0;

            if (!hasItems) return null;

            return (
              <motion.div
                key={category.key}
                initial={false}
                className={`overflow-hidden rounded-3xl border transition-all duration-300 ${
                  isOpen ? 'bg-white border-primary/20 shadow-xl' : 'bg-white/50 border-border hover:border-primary/20 hover:bg-white/80'
                }`}
              >
                <button
                  onClick={() => toggleCategory(category.key)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                >
                  <div className="flex items-center gap-5">
                    <div className={`p-3 rounded-full transition-colors duration-300 ${isOpen ? 'bg-primary text-white' : 'bg-primary/10 text-primary group-hover:bg-primary/20'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xl font-medium uppercase tracking-wide transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-foreground'}`}>
                      {t(category.labelKey)}
                    </span>
                  </div>
                  <ChevronDown className={`w-6 h-6 text-foreground/40 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'group-hover:text-primary/60'}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 }
                      }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-2 space-y-8">
                        {items.map((item, index) => (
                          <div key={index} className="border-b border-border/40 last:border-0 pb-6 last:pb-0 group/item">
                            {item.subcategory && (index === 0 || items[index - 1].subcategory !== item.subcategory) && (
                              <h4 className="text-sm font-medium text-primary mb-4 uppercase tracking-[0.15em] flex items-center gap-4 mt-4">
                                <div className="h-px w-8 bg-primary/20" />
                                {t(item.subcategory)}
                              </h4>
                            )}
                            <div className="flex justify-between items-start gap-8">
                              <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-3 flex-wrap">
                                  <h3 className="font-serif text-xl md:text-2xl leading-tight group-hover/item:text-primary transition-colors duration-300">
                                    {item.name}
                                  </h3>
                                  {item.signature && (
                                    <span title="Signature Dish">
                                      <Award className="w-5 h-5 text-accent" />
                                    </span>
                                  )}
                                  {item.spicy && (
                                    <span title="Spicy">
                                      <Flame className="w-5 h-5 text-primary" />
                                    </span>
                                  )}
                                </div>
                                <p className="text-base text-foreground/60 font-light leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                              <div className="text-xl font-semibold text-primary whitespace-nowrap font-serif">
                                {item.price}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}