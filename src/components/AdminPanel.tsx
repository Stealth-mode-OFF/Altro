import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, Edit2, Calendar, Lock, Unlock, UtensilsCrossed, Users, Book, Home, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { AdminDashboard } from './AdminDashboard';
import { ReservationManager } from './ReservationManager';
import { MainMenuAdmin } from './MainMenuAdmin';
import { EmailDeliverability } from './EmailDeliverability';

const getAdminPassword = () => {
  try {
    // Bezpečný přístup k env proměnným
    const envPass = (import.meta as any).env?.VITE_ADMIN_PASSWORD;
    if (envPass) return envPass;
  } catch {
    // Ignorujeme chybu přístupu k env
  }
  // Fallback pro vývoj/preview, pokud se nenačte .env
  return 'menicka2026';
};

const ADMIN_PASSWORD = getAdminPassword();

export function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  // Načteme stav přihlášení ihned při inicializaci (lazy initialization)
  // Tím zabráníme probliknutí přihlašovací obrazovky
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('adminAuth') === 'true' || sessionStorage.getItem('adminAuth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'daily' | 'main' | 'reservations' | 'email'>('reservations');
  const [rememberMe, setRememberMe] = useState(true);

  // Handle URL hash changes
  useEffect(() => {
    if (window.location.hash.includes('reservations')) {
      setActiveTab('reservations');
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ADMIN_PASSWORD) {
      toast.error('Admin heslo není nastaveno v prostředí (VITE_ADMIN_PASSWORD)');
      return;
    }

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      
      if (rememberMe) {
        localStorage.setItem('adminAuth', 'true'); // Trvalé uložení (přežije zavření prohlížeče)
      } else {
        sessionStorage.setItem('adminAuth', 'true'); // Dočasné uložení (jen pro tuto relaci)
      }
      
      toast.success('Přihlášení úspěšné!');
      setPassword('');
    } else {
      toast.error('Nesprávné heslo!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    sessionStorage.removeItem('adminAuth');
    setPassword('');
    setIsOpen(false);
    toast.success('Odhlášení úspěšné');
  };

  const handleBackToWebsite = () => {
    window.location.href = '/';
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Cormorant Garamond' }}>
              Admin
            </h2>
            <p className="text-gray-600">Přihlaste se pro správu restaurace</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heslo
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Zadejte heslo"
                autoFocus
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer select-none">
                Zůstat přihlášen na tomto zařízení
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Přihlásit se
            </button>

            <button
              type="button"
              onClick={handleBackToWebsite}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Zpět na web
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Main admin panel
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation */}
      <div className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-3 md:mb-0">
            <h1 className="text-xl md:text-2xl" style={{ fontFamily: 'Cormorant Garamond' }}>
              Admin Panel
            </h1>
            
            <div className="flex gap-2">
              <button
                onClick={handleBackToWebsite}
                className="flex items-center gap-1 md:gap-2 bg-primary hover:bg-primary/90 text-white px-3 md:px-4 py-2 rounded-lg text-sm md:text-base transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Zpět</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 md:gap-2 bg-gray-600 hover:bg-gray-700 text-white px-3 md:px-4 py-2 rounded-lg text-sm md:text-base transition-colors"
              >
                <Unlock className="w-4 h-4" />
                <span className="hidden sm:inline">Odhlásit</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation - Mobile Optimized */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
            <button
              onClick={() => setActiveTab('reservations')}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm md:text-base whitespace-nowrap transition-colors ${
                activeTab === 'reservations'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Rezervace</span>
            </button>
            <button
              onClick={() => setActiveTab('daily')}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm md:text-base whitespace-nowrap transition-colors ${
                activeTab === 'daily'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Týdenní menu</span>
            </button>
            <button
              onClick={() => setActiveTab('main')}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm md:text-base whitespace-nowrap transition-colors ${
                activeTab === 'main'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Book className="w-4 h-4" />
              <span>Hlavní menu</span>
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm md:text-base whitespace-nowrap transition-colors ${
                activeTab === 'email'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Deliverability</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 md:p-6 max-w-7xl mx-auto">
        {activeTab === 'reservations' && <ReservationManager />}
        {activeTab === 'daily' && <AdminDashboard />}
        {activeTab === 'main' && <MainMenuAdmin />}
        {activeTab === 'email' && <EmailDeliverability />}
      </div>
    </div>
  );
}
