import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Users, Mail, Phone, User, CheckCircle, X, Trash2, RefreshCw, Ticket, Send, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { getReservations, deleteReservation as apiDeleteReservation, updateReservationStatus, getContacts } from '../hooks/useApi';
import { apiJson } from '../utils/apiClient';

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests?: string; // Optional for backward compatibility
  occasion?: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  timestamp: string;
  // Email fields
  email_owner_status?: 'pending' | 'sent' | 'failed';
  email_customer_status?: 'pending' | 'sent' | 'failed' | 'pending_action';
  email_owner_error?: string;
  email_customer_error?: string;
  last_email_status?: 'pending' | 'sent' | 'failed';
  last_email_error?: string;
}

interface Contact {
  email: string;
  consent_status?: 'CONSENT_GRANTED' | 'TRANSACTIONAL_ONLY';
  source?: string;
  created_at?: string;
  last_visit_at?: string;
  tags?: string[];
}

const occasionMap: Record<string, string> = {
  business: 'Pracovní',
  romance: 'Romantika',
  friends: 'Přátelé',
  family: 'Rodina',
  celebration: 'Oslava',
  other: 'Jiné'
};

export function ReservationManager() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [retryingEmail, setRetryingEmail] = useState<string | null>(null);
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [emailHealth, setEmailHealth] = useState<any>(null);
  const [showDnsInfo, setShowDnsInfo] = useState(false);

  useEffect(() => {
    loadReservations();
    checkEmailHealth();
  }, []);

  const checkEmailHealth = async () => {
    try {
      const data = await apiJson<any>('/health');
      setEmailHealth(data.email);
      
      // If not configured, automatically show DNS info
      if (!data.email?.configured) {
        setShowDnsInfo(true);
      }
    } catch (error) {
      console.error('Failed to check email health:', error);
    }
  };

  const loadReservations = async () => {
    try {
      setIsLoading(true);
      const [reservationsResponse, contactsResponse] = await Promise.all([
        getReservations(),
        getContacts()
      ]);

      if (reservationsResponse.success && reservationsResponse.reservations) {
        setReservations(reservationsResponse.reservations);
      }

      if (contactsResponse.contacts) {
        setContacts(contactsResponse.contacts);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Chyba při načítání dat');
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: Reservation['status']) => {
    try {
      console.log(`📝 Updating reservation ${id} to status: ${status}`);
      // Optimistic update
      const originalReservations = [...reservations];
      setReservations(reservations.map(r => 
        r.id === id ? { ...r, status } : r
      ));

      const response = await updateReservationStatus(id, status);
      if (response.success) {
        // Update with server response (which might contain new email statuses)
        if (response.reservation) {
           setReservations(prev => prev.map(r => r.id === id ? response.reservation : r));
        }
        
        const statusText = {
          confirmed: 'potvrzena',
          cancelled: 'zrušena',
          pending: 'čeká na potvrzení'
        };
        toast.success(`Rezervace ${statusText[status]}`);
      } else {
        // Revert on error
        setReservations(originalReservations);
        throw new Error(response.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error updating reservation:', error);
      toast.error(`Chyba při aktualizaci rezervace: ${error instanceof Error ? error.message : 'Neznámá chyba'}`);
      loadReservations(); // Reload to be safe
    }
  };

  const deleteReservationHandler = async (id: string) => {
    if (!confirm('Opravdu chcete smazat tuto rezervaci?')) return;

    try {
      const response = await apiDeleteReservation(id);
      if (response.success) {
        setReservations(reservations.filter(r => r.id !== id));
        toast.success('Rezervace smazána');
      }
    } catch (error) {
      console.error('Error deleting reservation:', error);
      toast.error('Chyba při mazání rezervace');
    }
  };

  const handleRetryEmail = async (reservation: Reservation, type: 'owner' | 'request' | 'confirmation' | 'decline') => {
    if (retryingEmail) return;
    setRetryingEmail(`${reservation.id}-${type}`);
    
    try {
      const result = await apiJson<any>(
        '/admin/retry-email',
        { method: 'POST', body: { reservationId: reservation.id, type } },
        { authRequired: true }
      );
      
      if (result.success) {
        toast.success('Email úspěšně odeslán');
        // Refresh reservations to see updated status
        loadReservations();
      } else {
        toast.error(`Chyba odeslání: ${result.error}`);
      }
    } catch (error) {
      toast.error('Chyba komunikace se serverem');
    } finally {
      setRetryingEmail(null);
    }
  };

  const handleTestEmail = async () => {
    const email = prompt('Zadejte e-mailovou adresu pro test doručitelnosti:', 'antoniosahulka@seznam.cz');
    if (!email) return;

    setIsTestingEmail(true);
    try {
      const result = await apiJson<any>(
        '/admin/test-email',
        { method: 'POST', body: { email } },
        { authRequired: true }
      );
      
      if (result.success) {
        toast.success(`Testovací e-mail odeslán na ${email}. Zkontrolujte schránku (i spam).`);
      } else {
        toast.error(`Chyba odeslání: ${result.error}`);
      }
    } catch (error) {
      toast.error('Chyba komunikace se serverem');
    } finally {
      setIsTestingEmail(false);
    }
  };

  const filteredReservations = filter === 'all' 
    ? reservations 
    : reservations.filter(r => r.status === filter);

  const stats = {
    total: reservations.length,
    pending: reservations.filter(r => r.status === 'pending').length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    cancelled: reservations.filter(r => r.status === 'cancelled').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl mb-2" style={{ fontFamily: 'Cormorant Garamond' }}>
              Správa rezervací
            </h1>
            <p className="text-gray-600 text-sm md:text-base">Přehled všech rezervací</p>
          </div>
          <div className="flex flex-col gap-2">
            {/* Email Health Status */}
            {emailHealth && (
              <div 
                className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer ${
                  emailHealth.configured 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
                onClick={() => !emailHealth.configured && setShowDnsInfo(!showDnsInfo)}
              >
                {emailHealth.configured ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Email API: Aktivní ({emailHealth.provider})</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Email API: Není nakonfigurováno (klikněte pro info)</span>
                  </>
                )}
              </div>
            )}
            <button
              onClick={handleTestEmail}
              disabled={isTestingEmail || !emailHealth?.configured}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium disabled:opacity-50"
            >
              {isTestingEmail ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Odeslat testovací e-mail
            </button>
          </div>
        </div>

        {/* DNS Configuration Alert */}
        {showDnsInfo && !emailHealth?.configured && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-bold text-red-900 mb-2">
                  ⚠️ Doména send.altrodatony.com není verifikována v Resend
                </h3>
                <p className="text-sm text-red-800 mb-4">
                  Email systém nemůže odesílat zprávy, protože Resend nevidí doménu jako verifikovanou.
                </p>
                
                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="font-semibold text-gray-900 mb-2">🔧 Co udělat:</p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>
                      Přihlaste se do <a href="https://resend.com/domains" target="_blank" rel="noopener" className="text-blue-600 underline">Resend Dashboard → Domains</a>
                    </li>
                    <li>
                      Zkontrolujte, zda je tam doména <code className="bg-gray-100 px-2 py-0.5 rounded">send.altrodatony.com</code>
                    </li>
                    <li>
                      Pokud <strong>ANO</strong>: Klikněte na "Verify" a počkejte 5-60 minut
                    </li>
                    <li>
                      Pokud <strong>NE</strong>: Nový API klíč patří k jinému účtu! Buď použijte starý API klíč, nebo přidejte doménu do nového účtu.
                    </li>
                  </ol>
                </div>

                <div className="flex gap-3">
                  <a
                    href="https://resend.com/domains"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Otevřít Resend Dashboard
                  </a>
                  <button
                    onClick={() => setShowDnsInfo(false)}
                    className="text-sm px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 border border-gray-300 transition-colors"
                  >
                    Zavřít
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-xl shadow-lg p-3 md:p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs md:text-sm">Celkem</p>
                <p className="text-xl md:text-3xl mt-1">{stats.total}</p>
              </div>
              <div className="hidden md:flex w-12 h-12 bg-blue-100 rounded-full items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-3 md:p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs md:text-sm">Čekající</p>
                <p className="text-xl md:text-3xl mt-1">{stats.pending}</p>
              </div>
              <div className="hidden md:flex w-12 h-12 bg-yellow-100 rounded-full items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-3 md:p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs md:text-sm">Potvrzené</p>
                <p className="text-xl md:text-3xl mt-1">{stats.confirmed}</p>
              </div>
              <div className="hidden md:flex w-12 h-12 bg-green-100 rounded-full items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Reservations List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {isLoading ? (
            <div className="text-center py-16 text-gray-400">
              <RefreshCw className="w-16 h-16 mx-auto mb-4 opacity-50 animate-spin" />
              <p className="text-lg">Načítání rezervací...</p>
            </div>
          ) : filteredReservations.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Zatím nebyly vytvořeny žádné rezervace</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Host
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kontakt
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Akce
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredReservations.map((reservation) => (
                      <motion.tr
                        key={reservation.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-gray-900">{reservation.name}</p>
                                {reservation.occasion && occasionMap[reservation.occasion] && (
                                  <span className="text-[10px] uppercase font-bold tracking-wider bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full border border-purple-200">
                                    {occasionMap[reservation.occasion]}
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-1">
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(reservation.date).toLocaleDateString('cs-CZ')}</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {reservation.time}</span>
                                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {reservation.guests}</span>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {reservation.message && (
                                  <span className="text-xs text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 max-w-[200px] truncate" title={reservation.message}>
                                    {reservation.message}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="w-4 h-4" />
                              <span>{reservation.email}</span>
                              {contacts.some(c => c.email === reservation.email && c.consent_status === 'CONSENT_GRANTED') && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 text-amber-800 border border-amber-200" title="Zákazník má zájem o novinky/vouchery">
                                  <Ticket className="w-3 h-3" /> Voucher
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-4 h-4" />
                              {reservation.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={reservation.status === 'pending_email' ? 'pending' : reservation.status}
                            onChange={(e) => updateStatus(reservation.id, e.target.value as any)}
                            className={`px-3 py-1 rounded-full text-xs font-bold border-0 focus:ring-2 focus:ring-primary cursor-pointer transition-colors ${
                              reservation.status === 'confirmed'
                                ? 'bg-green-100 text-green-700'
                                : reservation.status === 'cancelled'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            <option value="pending" className="bg-yellow-50 text-yellow-700">⏳ Čeká na potvrzení</option>
                            <option value="confirmed" className="bg-green-50 text-green-700">✓ Potvrzeno</option>
                            <option value="cancelled" className="bg-red-50 text-red-700">✕ Zrušeno</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => deleteReservationHandler(reservation.id)}
                            className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
                            title="Smazat rezervaci"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-gray-200">
                {filteredReservations.map((reservation) => (
                  <motion.div
                    key={reservation.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 space-y-3"
                  >
                    {/* Header with name and status */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-900 truncate">{reservation.name}</p>
                            {contacts.some(c => c.email === reservation.email && c.consent_status === 'CONSENT_GRANTED') && (
                                <Ticket className="w-3 h-3 text-amber-600 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500">
                             {new Date(reservation.date).toLocaleDateString('cs-CZ')} {reservation.time} • {reservation.guests} os.
                          </p>
                          {reservation.occasion && occasionMap[reservation.occasion] && (
                              <span className="text-[10px] text-purple-700 bg-purple-50 px-1 rounded mt-0.5 inline-block">
                                {occasionMap[reservation.occasion]}
                              </span>
                          )}
                        </div>
                      </div>
                      <select
                        value={reservation.status}
                        onChange={(e) => updateStatus(reservation.id, e.target.value as any)}
                        className={`px-2 py-1 rounded-full text-xs font-bold border-0 focus:ring-2 focus:ring-primary flex-shrink-0 ${
                          reservation.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : reservation.status === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        <option value="pending" className="bg-yellow-50 text-yellow-700">⏳</option>
                        <option value="confirmed" className="bg-green-50 text-green-700">✓</option>
                        <option value="cancelled" className="bg-red-50 text-red-700">✕</option>
                      </select>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteReservationHandler(reservation.id)}
                      className="w-full flex items-center justify-center gap-2 p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 transition-colors text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Smazat</span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
