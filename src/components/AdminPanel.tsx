import { useState, useEffect } from 'react';
import { Calendar, Unlock, Users, Book, Home, Shield } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { AdminDashboard } from './AdminDashboard';
import { ReservationManager } from './ReservationManager';
import { MainMenuAdmin } from './MainMenuAdmin';
import { EmailDeliverability } from './EmailDeliverability';
import { supabase } from '../utils/supabase/client';

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'daily' | 'main' | 'reservations' | 'email'>('reservations');

  // Handle URL hash changes
  useEffect(() => {
    if (window.location.hash.includes('reservations')) {
      setActiveTab('reservations');
    }
  }, []);

  const handleLogout = () => {
    supabase.auth.signOut();
    toast.success('Odhlášení úspěšné');
  };

  const handleBackToWebsite = () => {
    window.location.href = '/';
  };

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
