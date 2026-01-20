import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { Flame, Award, Pizza, Utensils, Dessert, ChefHat, Wine, Coffee, Beer, GlassWater, Leaf, Soup, Martini } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getMainMenu } from '../hooks/useApi';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  signature?: boolean;
  spicy?: boolean;
  priceGlass?: string; // For wines
  subcategory?: string; // To distinguish red/white wines etc.
}

interface MenuData {
  pizza: MenuItem[];
  pasta: MenuItem[];
  antipasti: MenuItem[];
  insalate: MenuItem[];
  secondi: MenuItem[];
  dolci: MenuItem[];
  wines: MenuItem[]; // Merged wines
  drinks: MenuItem[]; // Merged drinks (beers, spirits, soft_drinks)
}

export function MenuShowcase() {
  const { t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState<'food' | 'drinks'>('food');
  const [activeCategory, setActiveCategory] = useState<keyof MenuData>('pizza');
  const [rawMenuData, setRawMenuData] = useState<any[]>([]);

  // Category images
  const categoryImages: Record<keyof MenuData, string> = {
    pizza: 'https://images.unsplash.com/photo-1680405620826-83b0f0f61b28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZWFwb2xpdGFuJTIwcGl6emElMjBtYXJnaGVyaXRhfGVufDF8fHx8MTc2NTMxNDExOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    pasta: 'https://images.unsplash.com/photo-1655662844229-d2c2a81f09ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGFzdGElMjBjYXJib25hcmF8ZW58MXx8fHwxNzY1MTM0MzUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    antipasti: 'https://images.unsplash.com/photo-1610657400673-7fc8941f403f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwYW50aXBhc3RpJTIwYnJ1c2NoZXR0YXxlbnwxfHx8fDE3NjUyMTA0NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    insalate: 'https://images.unsplash.com/photo-1622637012640-83ff490e189f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwc2FsYWQlMjBmcmVzaHxlbnwxfHx8fDE3NjYxNTE2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    secondi: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwbWFpbiUyMGNvdXJzZXxlbnwwfHx8fDE3NjUyMTA0NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    dolci: 'https://images.unsplash.com/photo-1710106519622-8c49d0bcff2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwdGlyYW1pc3UlMjBkZXNzZXJ0fGVufDF8fHx8MTc2NTIxMDQ0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    wines: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwd2luZXN8ZW58MXx8fHwxNzY1MTM0MzUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    drinks: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWV8ZW58MHx8fHwxNzY1MjEwNDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  };

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

  // Helper to get localized string from object or string
  const getLocalizedContent = (content: any, lang: string): string => {
    if (typeof content === 'string') return content;
    if (typeof content === 'object' && content !== null) {
      return content[lang] || content['cs'] || content['en'] || '';
    }
    return '';
  };

  // Helper to map old categories to new consolidated categories
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

  // Transform raw menu items to grouped MenuData based on current language
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
      // Skip hidden items
      if (item.hidden) return;

      const { key, subcategory } = mapCategory(item.category);
      
      if (groupedMenu[key]) {
        groupedMenu[key].push({
          name: getLocalizedContent(item.name, language),
          description: getLocalizedContent(item.description, 'cs'),
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

  // Load menu from API on mount and listen for updates
  useEffect(() => {
    const loadMenu = async () => {
      try {
        const response = await getMainMenu();
        
        if (response.success && response.menu && response.menu.length > 0) {
          setRawMenuData(response.menu);
        } else {
          console.log('No menu data loaded');
        }
        
      } catch (error) {
        console.error('Error loading menu:', error);
      }
    };

    // Initial load
    loadMenu();

    // Listen for menu updates from admin panel
    const handleMenuUpdate = (event: CustomEvent) => {
      if (event.detail) {
        setRawMenuData(event.detail);
      }
    };

    window.addEventListener('mainMenuUpdated', handleMenuUpdate as EventListener);

    return () => {
      window.removeEventListener('mainMenuUpdated', handleMenuUpdate as EventListener);
    };
  }, []);

  // Filter categories based on active section
  const foodCategories = categories.filter(cat => 
    ['pizza', 'pasta', 'antipasti', 'insalate', 'secondi', 'dolci'].includes(cat.key)
  );
  
  const drinkCategories = categories.filter(cat => 
    ['wines', 'drinks'].includes(cat.key)
  );
  
  const currentCategories = activeSection === 'food' ? foodCategories : drinkCategories;

  // Auto-select first category when switching sections
  useEffect(() => {
    if (activeSection === 'food') {
      setActiveCategory('pizza');
    } else {
      setActiveCategory('wines');
    }
  }, [activeSection]);

  return (
    <section id="menu" className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-24"
        >
          <div className="w-20 h-0.5 bg-primary mx-auto mb-10" />
          <h2 className="text-5xl md:text-6xl lg:text-7xl mb-8 font-serif">{t('menu.title')}</h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light leading-[1.8]">
            {t('menu.subtitle')}
          </p>
        </motion.div>

        {/* Section Tabs */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mb-12 sm:mb-20">
          <button
            onClick={() => setActiveSection('food')}
            className={`group w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 rounded-full transition-all duration-500 text-sm sm:text-base font-medium uppercase tracking-[0.1em] ${
              activeSection === 'food'
                ? 'bg-primary text-white shadow-xl scale-[1.02] sm:scale-105'
                : 'bg-card hover:bg-muted border border-border hover:scale-[1.02]'
            }`}
          >
            <ChefHat className={`inline-block w-4 h-4 sm:w-5 sm:h-5 mr-3 transition-transform duration-500 group-hover:scale-110 ${
              activeSection === 'food' ? 'text-white' : 'text-primary'
            }`} />
            {t('menu.food')}
          </button>
          <button
            onClick={() => setActiveSection('drinks')}
            className={`group w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 rounded-full transition-all duration-500 text-sm sm:text-base font-medium uppercase tracking-[0.1em] ${
              activeSection === 'drinks'
                ? 'bg-primary text-white shadow-xl scale-[1.02] sm:scale-105'
                : 'bg-card hover:bg-muted border border-border hover:scale-[1.02]'
            }`}
          >
            <Wine className={`inline-block w-4 h-4 sm:w-5 sm:h-5 mr-3 transition-transform duration-500 group-hover:scale-110 ${
              activeSection === 'drinks' ? 'text-white' : 'text-primary'
            }`} />
            {t('menu.drinks')}
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-4 gap-3 sm:gap-4 mb-12 sm:mb-20 -mx-4 px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory">
          {currentCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`group flex-shrink-0 snap-start px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-500 text-sm sm:text-base font-medium uppercase tracking-[0.08em] border whitespace-nowrap ${
                  activeCategory === category.key
                    ? 'bg-primary text-white shadow-xl scale-105 border-primary'
                    : 'bg-card hover:bg-muted border-border hover:scale-[1.02]'
                }`}
              >
                <Icon className={`inline-block w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 transition-transform duration-500 group-hover:scale-110 ${
                  activeCategory === category.key ? 'text-white' : 'text-primary'
                }`} />
                {t(category.labelKey)}
              </button>
            );
          })}
        </div>

        {/* Menu Items */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid lg:grid-cols-2 gap-8 md:gap-16 max-w-7xl mx-auto items-start"
        >
          {/* Category Image - Hidden on mobile, visible on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden lg:block sticky top-24 rounded-3xl overflow-hidden shadow-2xl group"
          >
            <ImageWithFallback
              src={categoryImages[activeCategory]}
              alt={t(`menu.${activeCategory}`)}
              className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </motion.div>

          {/* Menu List */}
          <div className="grid gap-6 md:gap-10">
            {menuData[activeCategory]?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                className="group"
              >
                {/* Subcategory Header */}
                {item.subcategory && (index === 0 || menuData[activeCategory]![index - 1].subcategory !== item.subcategory) && (
                  <h4 className="text-xl font-medium text-primary mt-6 mb-4 uppercase tracking-widest border-b border-primary/20 pb-2">
                    {t(item.subcategory)}
                  </h4>
                )}

                <div className="flex items-start justify-between gap-8 pb-8 border-b border-border group-hover:border-primary/40 transition-all duration-500">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-2xl font-medium transition-colors duration-400 group-hover:text-primary font-serif">
                        {item.name}
                      </h3>
                      {item.signature && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/20 text-accent rounded text-xs font-medium uppercase tracking-wide">
                          <Award className="w-3 h-3" />
                          Signature
                        </span>
                      )}
                      {item.spicy && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/20 text-primary rounded text-xs font-medium uppercase tracking-wide">
                          <Flame className="w-3 h-3" />
                          Spicy
                        </span>
                      )}
                    </div>
                    <p className="text-foreground/60 leading-[1.75]">{item.description}</p>
                  </div>
                  <div className="text-2xl font-semibold text-primary whitespace-nowrap font-serif">
                    {item.price}
                  </div>
                </div>
              </motion.div>
            ))}
            {(!menuData[activeCategory] || menuData[activeCategory].length === 0) && (
              <div className="text-center py-16 text-gray-400">
                <p>Pro tuto kategorii zatím nejsou žádné položky.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mt-24"
        >
          <p className="text-foreground/60 text-sm mb-10 leading-[1.7]">
            {t('menu.allergens')} - {t('menu.allergensText')}
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('reservation');
              if (element) {
                const offset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-12 py-6 rounded-full transition-all duration-500 shadow-xl hover:scale-105 active:scale-95"
          >
            <span className="font-medium text-lg">{t('menu.cta')}</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}