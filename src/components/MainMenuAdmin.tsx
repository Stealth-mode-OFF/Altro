import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Edit2, X, Eye, EyeOff, Globe, RefreshCw } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { getMainMenu, saveMainMenu, deleteMainMenu } from '../hooks/useApi';
import { getDefaultMenuItems, MenuItem, LocalizedString } from '../data/defaultMenu';
import { useLanguage } from '../contexts/LanguageContext';

export function MainMenuAdmin() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [activeTab, setActiveTab] = useState<'cs' | 'en' | 'it'>('cs');
  
  // Use the hook, but for admin interface we primarily use Czech labels, 
  // though we might want to localize the interface itself.
  const { t } = useLanguage();

  useEffect(() => {
    loadMenu();
  }, []);

  async function loadMenu() {
    try {
      setIsLoading(true);
      const response = await getMainMenu();
      if (response.success && response.menu) {
        // Migration check: if loaded data has string name/desc, convert to object
        const migratedMenu = response.menu.map((item: any, index: number) => {
          // Ensure each item has a unique ID
          const uniqueId = item.id || `menu-item-${Date.now()}-${index}`;
          
          let processedItem;
          if (typeof item.name === 'string') {
            processedItem = {
              ...item,
              id: uniqueId,
              name: { cs: item.name, en: item.name, it: item.name },
              description: { cs: item.description, en: item.description, it: item.description }
            };
          } else {
            processedItem = {
              ...item,
              id: uniqueId
            };
          }
          
          // Ensure hidden property is explicitly set to false if undefined
          if (processedItem.hidden === undefined || processedItem.hidden === null) {
            processedItem.hidden = false;
          }
          
          return processedItem;
        });
        
        // Check for duplicate IDs and log them
        const ids = migratedMenu.map((item: any) => item.id);
        const duplicateIds = ids.filter((id: string, index: number) => ids.indexOf(id) !== index);
        if (duplicateIds.length > 0) {
          console.error('DUPLICATE IDs FOUND:', duplicateIds);
          toast.error('Varování: Nalezeny duplicitní ID v menu!');
        }
        
        console.log('Loaded menu items:', migratedMenu.map(i => ({ id: i.id, name: i.name.cs, hidden: i.hidden })));
        setMenuItems(migratedMenu);
      }
    } catch (error) {
      console.error('Error loading main menu:', error);
      toast.error('Chyba při načítání menu');
    } finally {
      setIsLoading(false);
    }
  }

  async function loadDefaultMenu() {
    if (!confirm('Opravdu chcete načíst výchozí menu? Toto přepíše všechna současná data!')) {
      return;
    }

    try {
      setIsSaving(true);
      
      // First, delete the existing menu from database
      await deleteMainMenu();
      console.log('Database cleared');
      
      // Then save the default menu
      const defaultItems = getDefaultMenuItems();
      const response = await saveMainMenu(defaultItems);
      
      if (response.success) {
        setMenuItems(defaultItems);
        toast.success(`Výchozí menu načteno! (${defaultItems.length} položek)`);
        
        // Trigger update event for frontend
        window.dispatchEvent(new CustomEvent('mainMenuUpdated', { detail: defaultItems }));
        
        // Reload the page to ensure fresh data
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Error loading default menu:', error);
      toast.error('Chyba při načítání výchozího menu');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSave() {
    try {
      setIsSaving(true);
      const response = await saveMainMenu(menuItems);
      if (response.success) {
        toast.success('Hlavní menu bylo úspěšně uloženo!');
        
        // Trigger update event for frontend
        window.dispatchEvent(new CustomEvent('mainMenuUpdated', { detail: menuItems }));
      }
    } catch (error) {
      console.error('Error saving main menu:', error);
      toast.error('Chyba při ukládání menu');
    } finally {
      setIsSaving(false);
    }
  }

  function handleAddItem() {
    const newItem: MenuItem = {
      id: `temp-${Date.now()}`,
      name: { cs: '', en: '', it: '' },
      description: { cs: '', en: '', it: '' },
      price: '',
      category: 'antipasti',
    };
    setEditingItem(newItem);
    setIsAddingNew(true);
    setActiveTab('cs');
  }

  async function handleSaveItem() {
    if (!editingItem) return;

    if (!editingItem.name.cs || !editingItem.price) {
      toast.error('Vyplňte alespoň český název a cenu');
      return;
    }

    let newItems: MenuItem[];

    if (isAddingNew) {
      newItems = [...menuItems, editingItem];
    } else {
      newItems = menuItems.map(item => 
        item.id === editingItem.id ? editingItem : item
      );
    }

    setMenuItems(newItems);
    setEditingItem(null);
    setIsAddingNew(false);
    
    // Auto-save
    try {
      setIsSaving(true);
      await saveMainMenu(newItems);
      toast.success(isAddingNew ? 'Položka přidána a uložena' : 'Položka upravena a uložena');
      
      // Trigger update event for frontend
      window.dispatchEvent(new CustomEvent('mainMenuUpdated', { detail: newItems }));
    } catch (error) {
      console.error('Error auto-saving item:', error);
      toast.error('Chyba při ukládání změny');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteItem(id: string) {
    if (confirm('Opravdu chcete smazat tuto položku?')) {
      const newItems = menuItems.filter(item => item.id !== id);
      setMenuItems(newItems);
      
      // Auto-save
      try {
        setIsSaving(true);
        await saveMainMenu(newItems);
        toast.success('Položka byla smazána a změna uložena');
        
        // Trigger update event for frontend
        window.dispatchEvent(new CustomEvent('mainMenuUpdated', { detail: newItems }));
      } catch (error) {
        console.error('Error deleting item:', error);
        toast.error('Chyba při mazání položky');
        // Revert local state on error?
      } finally {
        setIsSaving(false);
      }
    }
  }

  function handleEditItem(item: MenuItem) {
    // Ensure deep copy for nested objects
    setEditingItem(JSON.parse(JSON.stringify(item)));
    setIsAddingNew(false);
    setActiveTab('cs');
  }

  function cancelEdit() {
    setEditingItem(null);
    setIsAddingNew(false);
  }

  async function handleToggleVisibility(id: string) {
    const newItems = menuItems.map(item => 
      item.id === id ? { ...item, hidden: !item.hidden } : item
    );
    
    // Debug: Check if we're actually toggling only one item
    const toggledItems = newItems.filter((item, idx) => item.hidden !== menuItems[idx]?.hidden);
    if (toggledItems.length !== 1) {
      console.error('⚠️ WARNING: Expected to toggle 1 item, but toggled:', toggledItems.length);
      console.error('Toggled items:', toggledItems.map(i => ({ id: i.id, name: i.name.cs, hidden: i.hidden })));
    }
    
    setMenuItems(newItems);
    
    // Auto-save
    try {
      // Don't set global saving state for quick toggles to avoid UI flicker, just background save
      const response = await saveMainMenu(newItems);
      
      // If server returned deduplicated items with new IDs, use those
      if (response.success && response.menu) {
        setMenuItems(response.menu);
        window.dispatchEvent(new CustomEvent('mainMenuUpdated', { detail: response.menu }));
      } else {
        window.dispatchEvent(new CustomEvent('mainMenuUpdated', { detail: newItems }));
      }
      
      toast.success('Viditelnost položky změněna a uložena');
    } catch (error) {
      console.error('Error saving visibility:', error);
      toast.error('Chyba při ukládání změny');
    }
  }

  async function handleShowAll() {
    const newItems = menuItems.map(item => ({ ...item, hidden: false }));
    setMenuItems(newItems);
    
    try {
      setIsSaving(true);
      const response = await saveMainMenu(newItems);
      
      if (response.success && response.menu) {
        setMenuItems(response.menu);
        window.dispatchEvent(new CustomEvent('mainMenuUpdated', { detail: response.menu }));
      } else {
        window.dispatchEvent(new CustomEvent('mainMenuUpdated', { detail: newItems }));
      }
      
      toast.success('Všechny položky byly nastaveny jako viditelné');
    } catch (error) {
      console.error('Error showing all items:', error);
      toast.error('Chyba při ukládání změn');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleHideAll() {
    const newItems = menuItems.map(item => ({ ...item, hidden: true }));
    setMenuItems(newItems);
    
    try {
      setIsSaving(true);
      const response = await saveMainMenu(newItems);
      
      if (response.success && response.menu) {
        setMenuItems(response.menu);
        window.dispatchEvent(new CustomEvent('mainMenuUpdated', { detail: response.menu }));
      } else {
        window.dispatchEvent(new CustomEvent('mainMenuUpdated', { detail: newItems }));
      }
      
      toast.success('Všechny položky byly skryty');
    } catch (error) {
      console.error('Error hiding all items:', error);
      toast.error('Chyba při ukládání změn');
    } finally {
      setIsSaving(false);
    }
  }

  const categories = [
    { value: 'pizza', label: 'Pizza' },
    { value: 'pasta', label: 'Pasta' },
    { value: 'antipasti', label: 'Předkrmy' },
    { value: 'insalate', label: 'Saláty' },
    { value: 'secondi', label: 'Hlavní jídla' },
    { value: 'dolci', label: 'Dezerty' },
    { value: 'wines_white', label: 'Bílá vína' },
    { value: 'wines_red', label: 'Červená vína' },
    { value: 'wines_rose', label: 'Růžová vína' },
    { value: 'wines_sparkling', label: 'Prosecco & Šampaňské' },
    { value: 'beers', label: 'Piva' },
    { value: 'aperitivi', label: 'Aperitivy' },
    { value: 'digestivi', label: 'Digestivy' },
    { value: 'grappa', label: 'Grappa' },
    { value: 'coffee', label: 'Káva' },
    { value: 'nonalcoholic', label: 'Nealkoholické nápoje' },
  ];

  const displayGroups = [
    { label: 'Pizza', values: ['pizza'] },
    { label: 'Pasta', values: ['pasta'] },
    { label: 'Předkrmy', values: ['antipasti'] },
    { label: 'Saláty', values: ['insalate'] },
    { label: 'Hlavní jídla', values: ['secondi'] },
    { label: 'Dezerty', values: ['dolci'] },
    { label: 'Bílá vína', values: ['wines_white'] },
    { label: 'Červená vína', values: ['wines_red'] },
    { label: 'Růžová vína', values: ['wines_rose'] },
    { label: 'Prosecco & Šampaňské', values: ['wines_sparkling'] },
    { label: 'Nápoje', values: ['beers', 'aperitivi', 'digestivi', 'grappa', 'coffee', 'nonalcoholic'] },
  ];

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-gray-600">Načítání menu...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Cormorant Garamond' }}>
              Správa hlavního menu
            </h2>
            <p className="text-gray-600 mt-2">
              Spravujte položky hlavního jídelního lístku ve všech jazycích
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleShowAll}
              disabled={isSaving}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              title="Zobrazit všechny položky na webu"
            >
              <Eye className="w-5 h-5" />
              Zobrazit vše
            </button>
            <button
              onClick={handleHideAll}
              disabled={isSaving}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              title="Skrýt všechny položky z webu"
            >
              <EyeOff className="w-5 h-5" />
              Skrýt vše
            </button>
            <button
              onClick={handleAddItem}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Přidat položku
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'Ukládám...' : 'Uložit vše'}
            </button>
            <button
              onClick={loadDefaultMenu}
              disabled={isSaving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              <RefreshCw className="w-5 h-5" />
              {isSaving ? 'Načítám...' : 'Načíst výchozí'}
            </button>
          </div>
        </div>

        {/* Edit/Add Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold" style={{ fontFamily: 'Cormorant Garamond' }}>
                  {isAddingNew ? 'Přidat novou položku' : 'Upravit položku'}
                </h3>
                <button onClick={cancelEdit} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Language Tabs */}
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('cs')}
                    className={`px-4 py-2 font-medium text-sm transition-colors ${
                      activeTab === 'cs'
                        ? 'border-b-2 border-primary text-primary'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    🇨🇿 Česky
                  </button>
                  <button
                    onClick={() => setActiveTab('en')}
                    className={`px-4 py-2 font-medium text-sm transition-colors ${
                      activeTab === 'en'
                        ? 'border-b-2 border-primary text-primary'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    🇬🇧 Anglicky
                  </button>
                  <button
                    onClick={() => setActiveTab('it')}
                    className={`px-4 py-2 font-medium text-sm transition-colors ${
                      activeTab === 'it'
                        ? 'border-b-2 border-primary text-primary'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    🇮🇹 Italsky
                  </button>
                </div>

                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Název ({activeTab.toUpperCase()}) {activeTab === 'cs' && '*'}
                    </label>
                    <input
                      type="text"
                      value={editingItem.name[activeTab]}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        name: { ...editingItem.name, [activeTab]: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={`Název jídla v ${activeTab === 'cs' ? 'češtině' : activeTab === 'en' ? 'angličtině' : 'italštině'}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Popis ({activeTab.toUpperCase()})
                    </label>
                    <textarea
                      value={editingItem.description[activeTab]}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        description: { ...editingItem.description, [activeTab]: e.target.value }
                      })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder={`Popis jídla v ${activeTab === 'cs' ? 'češtině' : activeTab === 'en' ? 'angličtině' : 'italštině'}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cena *
                    </label>
                    <input
                      type="text"
                      value={editingItem.price}
                      onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="např. 220 Kč"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kategorie *
                    </label>
                    <select
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as MenuItem['category'] })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL obrázku (volitelné)
                  </label>
                  <input
                    type="text"
                    value={editingItem.image || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSaveItem}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    {isAddingNew ? 'Přidat' : 'Uložit změny'}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                  >
                    Zrušit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items by Category */}
        {menuItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-4">Zatím nemáte žádné položky v hlavním menu</p>
            <button
              onClick={handleAddItem}
              className="text-primary hover:underline font-medium"
            >
              Přidat první položku
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {displayGroups.map(group => {
              const items = group.values.flatMap(val => groupedItems[val] || []);
              if (items.length === 0) return null;

              const visibleCount = items.filter(item => !item.hidden).length;
              const hiddenCount = items.filter(item => item.hidden).length;

              return (
                <div key={group.label}>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-primary/20">
                    {group.label} ({visibleCount} viditelných{hiddenCount > 0 && `, ${hiddenCount} skrytých`})
                  </h3>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-start justify-between p-4 rounded-lg transition-colors ${
                          item.hidden 
                            ? 'bg-gray-200 opacity-60 border-2 border-dashed border-gray-400' 
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">
                              {/* Display Czech name as primary label, fallback to others if missing */}
                              {item.name.cs || item.name.it || item.name.en || '(Bez názvu)'}
                            </h4>
                            {item.hidden && (
                              <span className="px-2 py-0.5 bg-gray-500 text-white text-xs rounded-full">
                                Skryto
                              </span>
                            )}
                            {/* Show original category badge if in grouped section */}
                            {group.values.length > 1 && (
                              <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">
                                {categories.find(c => c.value === item.category)?.label}
                              </span>
                            )}
                            <div className="flex gap-1 ml-2">
                               {item.name.cs && <span key="cs" className="text-xs px-1 bg-blue-100 text-blue-800 rounded">CS</span>}
                               {item.name.en && <span key="en" className="text-xs px-1 bg-red-100 text-red-800 rounded">EN</span>}
                               {item.name.it && <span key="it" className="text-xs px-1 bg-green-100 text-green-800 rounded">IT</span>}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                             {item.description.cs || item.description.it || item.description.en}
                          </p>
                          <span className="text-primary font-semibold">{item.price}</span>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleToggleVisibility(item.id!)}
                            className={`p-2 rounded-lg transition-colors ${
                              item.hidden 
                                ? 'text-green-600 hover:bg-green-50' 
                                : 'text-orange-600 hover:bg-orange-50'
                            }`}
                            title={item.hidden ? 'Zobrazit na webu' : 'Skrýt z webu'}
                          >
                            {item.hidden ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                          </button>
                          <button
                            onClick={() => handleEditItem(item)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Upravit"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id!)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Smazat"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
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