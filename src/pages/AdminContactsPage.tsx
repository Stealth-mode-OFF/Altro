import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../utils/supabase/env';
import { Mail, Download, Tag, UserX, Search, Filter, AlertCircle, ShieldCheck, Calendar, Home, ChevronRight } from 'lucide-react';
import { navigate } from '../utils/router';

type ConsentStatus = 'TRANSACTIONAL_ONLY' | 'CONSENT_GRANTED' | 'SOFT_OPT_IN_ELIGIBLE' | 'NO_MARKETING' | 'UNSUBSCRIBED';
type ContactSource = 'reservation_form' | 'contact_form' | 'qr_signup' | 'manual_import';

interface Contact {
  email: string;
  source: ContactSource;
  created_at: string;
  last_visit_at?: string;
  consent_status: ConsentStatus;
  consent_timestamp?: string;
  soft_opt_in_basis_note?: string;
  tags?: string[];
}

const CONSENT_STATUS_INFO = {
  TRANSACTIONAL_ONLY: {
    label: 'Transactional Only',
    color: 'bg-gray-100 text-gray-700 border-gray-300',
    description: 'Only reservation/service emails',
    marketingAllowed: false
  },
  CONSENT_GRANTED: {
    label: 'Consent Granted',
    color: 'bg-green-100 text-green-700 border-green-300',
    description: 'Explicit marketing consent',
    marketingAllowed: true
  },
  SOFT_OPT_IN_ELIGIBLE: {
    label: 'Soft Opt-In',
    color: 'bg-blue-100 text-blue-700 border-blue-300',
    description: 'Customer, similar services, opt-out offered',
    marketingAllowed: true
  },
  NO_MARKETING: {
    label: 'No Marketing',
    color: 'bg-orange-100 text-orange-700 border-orange-300',
    description: 'Opted out from marketing',
    marketingAllowed: false
  },
  UNSUBSCRIBED: {
    label: 'Unsubscribed',
    color: 'bg-red-100 text-red-700 border-red-300',
    description: 'Globally unsubscribed',
    marketingAllowed: false
  }
};

const SOURCE_LABELS = {
  reservation_form: 'Reservation Form',
  contact_form: 'Contact Form',
  qr_signup: 'QR Code Signup',
  manual_import: 'Manual Import'
};

export function AdminContactsPage() {
  const { language } = useLanguage();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<ConsentStatus | 'ALL'>('ALL');
  const [filterSource, setFilterSource] = useState<ContactSource | 'ALL'>('ALL');
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);

  useEffect(() => {
    document.title = 'Contact Management | Admin';
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${SUPABASE_URL}/functions/v1/make-server-d880a0b3/admin/contacts`, {
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to load contacts');
      const data = await response.json();
      setContacts(data.contacts || []);
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || contact.consent_status === filterStatus;
    const matchesSource = filterSource === 'ALL' || contact.source === filterSource;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const marketingEligibleCount = filteredContacts.filter(
    c => CONSENT_STATUS_INFO[c.consent_status].marketingAllowed
  ).length;

  const toggleSelectAll = () => {
    if (selectedContacts.size === filteredContacts.length) {
      setSelectedContacts(new Set());
    } else {
      setSelectedContacts(new Set(filteredContacts.map(c => c.email)));
    }
  };

  const toggleSelectContact = (email: string) => {
    const newSelected = new Set(selectedContacts);
    if (newSelected.has(email)) {
      newSelected.delete(email);
    } else {
      newSelected.add(email);
    }
    setSelectedContacts(newSelected);
  };

  const exportCSV = async () => {
    const contactsToExport = selectedContacts.size > 0 
      ? filteredContacts.filter(c => selectedContacts.has(c.email))
      : filteredContacts;

    if (!confirm(`⚠️ SECURITY WARNING\n\nYou are about to export ${contactsToExport.length} contacts.\n\n• Handle this data securely\n• Do not forward or share publicly\n• Delete after use\n\nContinue?`)) {
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d880a0b3/admin/contacts/export`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            emails: contactsToExport.map(c => c.email)
          })
        }
      );

      if (!response.ok) throw new Error('Export failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contacts-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      // Log audit
      await logAudit('export_csv', `Exported ${contactsToExport.length} contacts`);
    } catch (error) {
      console.error('Export error:', error);
      alert('Export failed. Please try again.');
    }
  };

  const markAsNoMarketing = async () => {
    if (selectedContacts.size === 0) {
      alert('Please select contacts first');
      return;
    }

    if (!confirm(`Mark ${selectedContacts.size} contacts as NO_MARKETING?\n\nThey will never receive marketing emails.`)) {
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d880a0b3/admin/contacts/mark-no-marketing`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            emails: Array.from(selectedContacts)
          })
        }
      );

      if (!response.ok) throw new Error('Failed to update');
      
      await logAudit('mark_no_marketing', `Marked ${selectedContacts.size} contacts as NO_MARKETING`);
      setSelectedContacts(new Set());
      loadContacts();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update contacts');
    }
  };

  const logAudit = async (action: string, details: string) => {
    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d880a0b3/admin/audit-log`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            actor: 'admin',
            action,
            details,
            timestamp: new Date().toISOString()
          })
        }
      );
    } catch (error) {
      console.error('Audit log error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <button onClick={() => navigate('/admin')} className="hover:text-primary flex items-center gap-1">
            <Home className="w-4 h-4" />
            Admin
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Contacts</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Management</h1>
          <p className="text-gray-600">GDPR-compliant contact database with consent tracking</p>
        </div>

        {/* Compliance Warning */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-semibold text-blue-900 mb-1">GDPR & ePrivacy Compliance</p>
            <p className="text-blue-800">
              Marketing emails can only be sent to contacts with <strong>CONSENT_GRANTED</strong> status. 
              Contacts marked as NO_MARKETING or UNSUBSCRIBED are in the suppression list and will never receive marketing.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{contacts.length}</div>
            <div className="text-sm text-gray-600">Total Contacts</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="text-2xl font-bold text-green-700">{marketingEligibleCount}</div>
            <div className="text-sm text-green-800">Marketing Eligible</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{filteredContacts.length}</div>
            <div className="text-sm text-gray-600">Filtered Results</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="text-2xl font-bold text-blue-700">{selectedContacts.size}</div>
            <div className="text-sm text-blue-800">Selected</div>
          </div>
        </div>

        {/* Recent Consent Signups - Highlighted Section */}
        {(() => {
          const last7Days = new Date();
          last7Days.setDate(last7Days.getDate() - 7);
          const recentConsents = contacts
            .filter(c => c.consent_status === 'CONSENT_GRANTED' && c.consent_timestamp)
            .filter(c => new Date(c.consent_timestamp!) > last7Days)
            .sort((a, b) => new Date(b.consent_timestamp!).getTime() - new Date(a.consent_timestamp!).getTime())
            .slice(0, 5);

          if (recentConsents.length === 0) return null;

          return (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-green-900 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    🎉 Recent Marketing Consent Signups
                  </h3>
                  <p className="text-sm text-green-700 mt-1">
                    New members of the Altro Da Tony famiglia (last 7 days)
                  </p>
                </div>
                <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                  +{recentConsents.length}
                </div>
              </div>
              <div className="space-y-2">
                {recentConsents.map(contact => (
                  <div key={contact.email} className="bg-white/80 backdrop-blur rounded-lg p-4 flex items-center justify-between hover:bg-white transition-colors border border-green-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{contact.email}</div>
                        <div className="text-xs text-gray-600">
                          {SOURCE_LABELS[contact.source]} • {new Date(contact.consent_timestamp!).toLocaleString('cs-CZ', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-300">
                        ✓ CONSENT GRANTED
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Filters & Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="w-4 h-4 inline mr-1" />
                Search Email
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by email..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Consent Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="ALL">All Statuses</option>
                {Object.keys(CONSENT_STATUS_INFO).map(status => (
                  <option key={status} value={status}>{CONSENT_STATUS_INFO[status as ConsentStatus].label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Source
              </label>
              <select
                value={filterSource}
                onChange={(e) => setFilterSource(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="ALL">All Sources</option>
                {Object.keys(SOURCE_LABELS).map(source => (
                  <option key={source} value={source}>{SOURCE_LABELS[source as ContactSource]}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedContacts.size > 0 && (
          <div className="bg-gray-900 text-white rounded-lg p-4 mb-6 flex items-center justify-between">
            <span className="font-medium">{selectedContacts.size} contacts selected</span>
            <div className="flex gap-3">
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export Selected
              </button>
              <button
                onClick={markAsNoMarketing}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <UserX className="w-4 h-4" />
                Mark No Marketing
              </button>
            </div>
          </div>
        )}

        {/* Actions Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 flex justify-between items-center">
          <div className="flex gap-3">
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export All Filtered
            </button>
          </div>
          <div className="text-sm text-gray-600">
            {filteredContacts.length} contacts • {marketingEligibleCount} marketing-eligible
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedContacts.size === filteredContacts.length && filteredContacts.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Consent Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Source</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Created</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Marketing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      Loading contacts...
                    </td>
                  </tr>
                ) : filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      No contacts found
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((contact) => {
                    const statusInfo = CONSENT_STATUS_INFO[contact.consent_status];
                    return (
                      <tr key={contact.email} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedContacts.has(contact.email)}
                            onChange={() => toggleSelectContact(contact.email)}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{contact.email}</div>
                          {contact.consent_timestamp && (
                            <div className="text-xs text-gray-500">
                              Consent: {new Date(contact.consent_timestamp).toLocaleDateString()}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                          <div className="text-xs text-gray-500 mt-1">{statusInfo.description}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-700">{SOURCE_LABELS[contact.source]}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-700">
                            {new Date(contact.created_at).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(contact.created_at).toLocaleTimeString()}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {statusInfo.marketingAllowed ? (
                            <span className="inline-flex items-center text-green-700 text-sm font-medium">
                              ✓ Allowed
                            </span>
                          ) : (
                            <span className="inline-flex items-center text-red-700 text-sm font-medium">
                              ✗ Blocked
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}