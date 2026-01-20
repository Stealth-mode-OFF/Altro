import { useEffect, useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { UserX, Upload, AlertCircle, ShieldAlert, Home, ChevronRight } from 'lucide-react';
import { navigate } from '../utils/router';

interface SuppressedContact {
  email: string;
  reason: 'NO_MARKETING' | 'UNSUBSCRIBED';
  suppressed_at: string;
  source: string;
}

export function AdminSuppressionPage() {
  const [suppressedContacts, setSuppressedContacts] = useState<SuppressedContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [importText, setImportText] = useState('');
  const [showImport, setShowImport] = useState(false);

  useEffect(() => {
    document.title = 'Suppression List | Admin';
    loadSuppressed();
  }, []);

  const loadSuppressed = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d880a0b3/admin/suppression`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          }
        }
      );

      if (!response.ok) throw new Error('Failed to load suppression list');
      const data = await response.json();
      setSuppressedContacts(data.suppressed || []);
    } catch (error) {
      console.error('Error loading suppression list:', error);
    } finally {
      setLoading(false);
    }
  };

  const importSuppressionList = async () => {
    if (!importText.trim()) {
      alert('Please enter email addresses to import');
      return;
    }

    const emails = importText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && line.includes('@'));

    if (emails.length === 0) {
      alert('No valid email addresses found');
      return;
    }

    if (!confirm(`Import ${emails.length} email(s) to suppression list?\n\nThese contacts will NEVER receive marketing emails.`)) {
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d880a0b3/admin/suppression/import`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ emails })
        }
      );

      if (!response.ok) throw new Error('Import failed');

      alert(`✅ Successfully imported ${emails.length} email(s)`);
      setImportText('');
      setShowImport(false);
      loadSuppressed();
    } catch (error) {
      console.error('Import error:', error);
      alert('Failed to import suppression list');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Suppression List</h1>
          <p className="text-gray-600">Contacts who opted out or are blocked from marketing</p>
        </div>

        {/* Critical Warning */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <ShieldAlert className="w-8 h-8 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-red-900 mb-2">CRITICAL: Global Suppression</h3>
              <p className="text-red-800 mb-3">
                Contacts on this list will <strong>NEVER</strong> receive marketing emails, regardless of any other settings. 
                This is a legal requirement under GDPR and ePrivacy regulations.
              </p>
              <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                <li>These contacts are automatically excluded from all marketing campaigns</li>
                <li>They may still receive transactional emails (reservation confirmations, etc.)</li>
                <li>Once added, contacts should only be removed with explicit re-consent</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-red-700">{suppressedContacts.length}</div>
                <div className="text-sm text-gray-600">Total Suppressed</div>
              </div>
              <UserX className="w-12 h-12 text-red-200" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-3xl font-bold text-orange-700">
              {suppressedContacts.filter(c => c.reason === 'NO_MARKETING').length}
            </div>
            <div className="text-sm text-gray-600">No Marketing</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-3xl font-bold text-red-700">
              {suppressedContacts.filter(c => c.reason === 'UNSUBSCRIBED').length}
            </div>
            <div className="text-sm text-gray-600">Unsubscribed</div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <button
            onClick={() => setShowImport(!showImport)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Import Suppression List
          </button>
        </div>

        {/* Import Form */}
        {showImport && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Import Email Addresses</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter one email address per line. These contacts will be marked as UNSUBSCRIBED.
            </p>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="email1@example.com&#10;email2@example.com&#10;email3@example.com"
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary font-mono text-sm mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={importSuppressionList}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Import to Suppression List
              </button>
              <button
                onClick={() => {
                  setShowImport(false);
                  setImportText('');
                }}
                className="px-6 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Suppressed Contacts Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Reason</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Source</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date Suppressed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      Loading suppression list...
                    </td>
                  </tr>
                ) : suppressedContacts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center">
                      <UserX className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No suppressed contacts</p>
                    </td>
                  </tr>
                ) : (
                  suppressedContacts.map((contact) => (
                    <tr key={contact.email} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{contact.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          contact.reason === 'UNSUBSCRIBED'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {contact.reason}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{contact.source}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {new Date(contact.suppressed_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}