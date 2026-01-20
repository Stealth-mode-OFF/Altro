import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { getWeeklyMenu, saveWeeklyMenu } from '../hooks/useApi';
import { weeklyMenuData } from '../data/weeklyMenu';

interface DailyMenuItem {
  id: string;
  name_cs: string;
  name_en: string;
  name_it: string;
  description_cs: string;
  description_en: string;
  description_it: string;
  price: string;
  category: 'soup' | 'main' | 'dessert';
}

interface WeeklyMenu {
  weekStart: string;
  items: DailyMenuItem[];
}

export function AdminDashboard() {
  const [weeklyMenu, setWeeklyMenu] = useState<WeeklyMenu>({
    weekStart: getCurrentWeekStart(),
    items: []
  });
  const [newItem, setNewItem] = useState<Omit<DailyMenuItem, 'id'>>({
    name_cs: '',
    name_en: '',
    name_it: '',
    description_cs: '',
    description_en: '',
    description_it: '',
    price: '',
    category: 'main'
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadWeeklyMenu();
  }, []);

  async function loadWeeklyMenu() {
    try {
      setIsLoading(true);
      const weekStart = getCurrentWeekStart();
      
      try {
        const response = await getWeeklyMenu(weekStart);
        if (response.success && response.menu) {
          // Ensure all items have unique IDs (critical for React keys)
          const menuWithIds = {
            ...response.menu,
            items: (response.menu.items || []).map((item: any, index: number) => ({
              ...item,
              id: item.id || `item-${index}-${Date.now()}` // Fallback ID if missing
            }))
          };
          
          setWeeklyMenu(menuWithIds);
          return;
        }
      } catch (e) {
        console.warn('API failed, using static data');
      }

      // Fallback to static data
      console.log('Loading static weekly menu data');
      const staticItems = weeklyMenuData.weeklyMenu.items.map((item, index) => ({
        ...item,
        id: `static-${index}`
      })) as DailyMenuItem[];

      setWeeklyMenu({
        weekStart: weeklyMenuData.weeklyMenu.weekStart,
        items: staticItems
      });

    } catch (error) {
      console.error('Error loading weekly menu:', error);
      toast.error('Chyba při načítání denního menu');
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

  const handleSaveItem = async () => {
    if (!newItem.name_cs || !newItem.price) {
      toast.error('Vyplňte název a cenu');
      return;
    }

    let updatedItems: DailyMenuItem[];

    if (editingId) {
      // Update existing
      updatedItems = weeklyMenu.items.map(item => 
        item.id === editingId 
          ? { ...newItem, id: editingId } as DailyMenuItem
          : item
      );
    } else {
      // Add new
      const item: DailyMenuItem = {
        ...newItem,
        id: Date.now().toString()
      };
      updatedItems = [...weeklyMenu.items, item];
    }

    const updated = {
      ...weeklyMenu,
      items: updatedItems
    };

    try {
      setIsSaving(true);
      // Save to database
      const response = await saveWeeklyMenu(updated.weekStart, updated.items);
      if (response.success) {
        setWeeklyMenu(updated);
        
        // Reset form
        setNewItem({
          name_cs: '',
          name_en: '',
          name_it: '',
          description_cs: '',
          description_en: '',
          description_it: '',
          price: '',
          category: newItem.category // Keep last used category
        });
        setEditingId(null);

        toast.success(editingId ? 'Položka upravena!' : 'Položka přidána!');
        
        // Trigger custom event for real-time sync with public view
        window.dispatchEvent(new CustomEvent('menuUpdated', { detail: updated }));
      } else {
        toast.error('Chyba při ukládání: Server neodpověděl success=true');
      }
    } catch (error) {
      console.error('Error saving item:', error);
      toast.error(`Chyba při ukládání: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditItem = (item: DailyMenuItem) => {
    setNewItem({
      name_cs: item.name_cs,
      name_en: item.name_en,
      name_it: item.name_it,
      description_cs: item.description_cs,
      description_en: item.description_en,
      description_it: item.description_it,
      price: item.price,
      category: item.category
    });
    setEditingId(item.id);
    
    // Smooth scroll to form
    const formElement = document.getElementById('item-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCancelEdit = () => {
    setNewItem({
      name_cs: '',
      name_en: '',
      name_it: '',
      description_cs: '',
      description_en: '',
      description_it: '',
      price: '',
      category: 'main'
    });
    setEditingId(null);
  };

  const handleDeleteItem = async (id: string) => {
    const updated = {
      ...weeklyMenu,
      items: weeklyMenu.items.filter(item => item.id !== id)
    };

    try {
      // Save to database
      const response = await saveWeeklyMenu(updated.weekStart, updated.items);
      if (response.success) {
        setWeeklyMenu(updated);
        toast.success('Položka odstraněna');
        
        // Trigger custom event for real-time sync with public view
        window.dispatchEvent(new CustomEvent('menuUpdated', { detail: updated }));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Chyba při mazání položky');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Info */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Cormorant Garamond' }}>
          Správa týdenního menu
        </h2>
        <p className="text-gray-600">
          Týden od: {new Date(weeklyMenu.weekStart).toLocaleDateString('cs-CZ')}
        </p>
      </div>

      {/* Add/Edit Item Form */}
      <div id="item-form" className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold" style={{ fontFamily: 'Cormorant Garamond' }}>
            {editingId ? 'Upravit položku' : 'Přidat novou položku'}
          </h3>
          {editingId && (
            <button 
              onClick={handleCancelEdit}
              className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Czech fields */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            🇨🇿 Čeština
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Název jídla *
              </label>
              <input
                type="text"
                value={newItem.name_cs}
                onChange={(e) => setNewItem({ ...newItem, name_cs: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="např. Kuřecí parmigiana"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Popis
              </label>
              <input
                type="text"
                value={newItem.description_cs}
                onChange={(e) => setNewItem({ ...newItem, description_cs: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="krátký popis (volitelné)"
              />
            </div>
          </div>
        </div>

        {/* English fields */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            🇬🇧 English
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dish Name
              </label>
              <input
                type="text"
                value={newItem.name_en}
                onChange={(e) => setNewItem({ ...newItem, name_en: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g. Chicken Parmigiana"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                value={newItem.description_en}
                onChange={(e) => setNewItem({ ...newItem, description_en: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="short description (optional)"
              />
            </div>
          </div>
        </div>

        {/* Italian fields */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            🇮🇹 Italiano
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome del Piatto
              </label>
              <input
                type="text"
                value={newItem.name_it}
                onChange={(e) => setNewItem({ ...newItem, name_it: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="es. Pollo Parmigiana"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrizione
              </label>
              <input
                type="text"
                value={newItem.description_it}
                onChange={(e) => setNewItem({ ...newItem, description_it: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="breve descrizione (opzionale)"
              />
            </div>
          </div>
        </div>

        {/* Common fields */}
        <div className="grid md:grid-cols-2 gap-4 mb-4 pt-4 border-t border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cena *
            </label>
            <input
              type="text"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="např. 165 Kč"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategorie *
            </label>
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="soup">Polévka</option>
              <option value="main">Hlavní jídlo</option>
              <option value="dessert">Dezert</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSaveItem}
            disabled={isSaving}
            className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              'Ukládám...'
            ) : (
              <>
                {editingId ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {editingId ? 'Uložit změny' : 'Přidat položku'}
              </>
            )}
          </button>
          
          {editingId && (
            <button
              onClick={handleCancelEdit}
              disabled={isSaving}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
            >
              Zrušit
            </button>
          )}
        </div>
      </div>

      {/* Current Daily Menu */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-bold mb-6" style={{ fontFamily: 'Cormorant Garamond' }}>
          Speciality tohoto týdne ({weeklyMenu.items.length} položek)
        </h3>

        {weeklyMenu.items.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">Zatím nebyly přidány žádné položky</p>
            <p className="text-sm mt-2">Začněte přidáním první položky výše</p>
          </div>
        ) : (
          <div className="space-y-4">
            {['soup', 'main', 'dessert'].map(category => {
              const categoryItems = weeklyMenu.items.filter(item => item.category === category);
              if (categoryItems.length === 0) return null;

              const categoryNames = {
                soup: 'Polévky',
                main: 'Hlavní jídla',
                dessert: 'Dezerty'
              };

              return (
                <div key={category}>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    {categoryNames[category as keyof typeof categoryNames]}
                  </h4>
                  <div className="grid gap-3">
                    {categoryItems.map(item => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                      >
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">{item.name_cs}</h5>
                          {item.description_cs && (
                            <p className="text-sm text-gray-600 mt-1">{item.description_cs}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-semibold text-primary">
                            {item.price}
                          </span>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEditItem(item)}
                              className="p-2 hover:bg-blue-100 rounded-lg text-blue-600 transition-colors"
                              title="Upravit"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
                              title="Smazat"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}