import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock } from 'lucide-react';
import { getWeeklyMenu } from '../hooks/useApi';
import { useLanguage } from '../contexts/LanguageContext';
import { weeklyMenuData } from '../data/weeklyMenu';

interface DailyMenuItem {
  id: string;
  name_cs: string;
  name_en: string;
  name_it: string;
  description_cs?: string;
  description_en?: string;
  description_it?: string;
  price: string;
  category: 'soup' | 'starter' | 'main' | 'dessert';
}

interface WeeklyMenu {
  weekStart: string;
  items: DailyMenuItem[];
}

export function DailyMenu() {
  const { t, language } = useLanguage();
  const [dailyMenu, setDailyMenu] = useState<DailyMenuItem[]>([]);
  const [currentDate, setCurrentDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get current date
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const localeMap = { cs: 'cs-CZ', en: 'en-US', it: 'it-IT' };
    setCurrentDate(now.toLocaleDateString(localeMap[language], options));

    // Load menu from database
    loadMenu();

    // Listen for menu updates from admin panel
    const handleMenuUpdate = (event: CustomEvent) => {
      if (event.detail && event.detail.items) {
        setDailyMenu(event.detail.items);
      }
    };

    window.addEventListener('menuUpdated', handleMenuUpdate as EventListener);

    return () => {
      window.removeEventListener('menuUpdated', handleMenuUpdate as EventListener);
    };
  }, [language]);

  async function loadMenu() {
    try {
      setIsLoading(true);
      const weekStart = getCurrentWeekStart();
      let items: DailyMenuItem[] = [];

      try {
        const response = await getWeeklyMenu(weekStart);
        if (response.success && response.menu && response.menu.items && response.menu.items.length > 0) {
          items = response.menu.items;
        }
      } catch (error) {
        console.warn('API fetch failed, checking fallback data');
      }

      // If API returned no items, use local fallback data
      if (items.length === 0) {
        // Check if the fallback data is for the current week or if we should just show it
        // The user specifically asked for "that weekly menu", so we prioritize showing it
        // even if the dates might slightly mismatch in some edge cases.
        // We assign temporary IDs since they are missing in the JSON
        items = weeklyMenuData.weeklyMenu.items.map((item, index) => ({
          ...item,
          id: `local-${index}`,
          category: item.category as 'soup' | 'starter' | 'main' | 'dessert'
        }));
      }

      setDailyMenu(items);
    } catch (error) {
      console.error('Error loading daily menu:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function getCurrentWeekStart(): string {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    return monday.toISOString().split('T')[0];
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      soup: t('daily.soup'),
      starter: t('daily.starter'),
      main: t('daily.main'),
      dessert: t('daily.dessert'),
    };
    return labels[category] || category;
  };

  // Helper to get translated field
  const getTranslatedField = (item: DailyMenuItem, field: 'name' | 'description'): string => {
    const fieldKey = `${field}_${language}` as keyof DailyMenuItem;
    return (item[fieldKey] as string) || '';
  };

  const groupedMenu = dailyMenu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, DailyMenuItem[]>);

  if (dailyMenu.length === 0 && !isLoading) {
    return null; // Don't show section if no daily menu
  }

  return (
    <section id="daily-menu" className="section-padding bg-gradient-to-b from-background to-muted/50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-3 rounded-full mb-8">
              <Calendar className="w-5 h-5" />
              <span className="font-medium uppercase tracking-[0.12em] text-sm">
                {currentDate}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6">{t('daily.title')}</h2>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
          >
            <div className="space-y-10">
              {Object.entries(groupedMenu).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-sm uppercase tracking-[0.15em] text-primary font-medium mb-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-primary/20" />
                    {getCategoryLabel(category)}
                    <div className="h-px flex-1 bg-primary/20" />
                  </h3>
                  
                  <div className="space-y-6">
                    {items.map((item, index) => (
                      <div 
                        key={item.id || `item-${category}-${index}`}
                        className="flex items-start justify-between gap-8 group transition-all duration-400"
                      >
                        <div className="flex-1">
                          <h4 
                            className="text-xl md:text-2xl mb-2 group-hover:text-primary transition-colors duration-400 font-serif"
                          >
                            {getTranslatedField(item, 'name')}
                          </h4>
                          {item.description_cs && (
                            <p className="text-foreground/60 text-sm leading-[1.7]">
                              {item.description_cs}
                            </p>
                          )}
                        </div>
                        <div 
                          className="text-2xl font-semibold text-primary whitespace-nowrap font-serif"
                        >
                          {item.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 pt-10 border-t border-border text-center">
              <p className="text-foreground/50 text-sm leading-[1.7]">
                {t('daily.disclaimer')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}