import { useEffect } from 'react';
import { navigate } from '../utils/router';
import { Users, Mail, UserX, BarChart3, ShieldCheck } from 'lucide-react';

export function AdminPage() {
  useEffect(() => {
    document.title = 'Admin Dashboard | Altro Da Tony';
  }, []);

  const adminSections = [
    {
      title: 'Restaurant Operations',
      description: 'Reservations, weekly menu and main menu management',
      icon: BarChart3,
      path: '/admin/panel',
      color: 'green'
    },
    {
      title: 'Contact Management',
      description: 'View, filter, and export contacts with GDPR consent tracking',
      icon: Users,
      path: '/admin/contacts',
      color: 'blue'
    },
    {
      title: 'Email Campaigns',
      description: 'Create and send marketing campaigns with compliance checks',
      icon: Mail,
      path: '/admin/campaigns',
      color: 'purple'
    },
    {
      title: 'Suppression List',
      description: 'Manage unsubscribed and blocked contacts',
      icon: UserX,
      path: '/admin/suppression',
      color: 'red'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 text-lg">GDPR-compliant contact and campaign management</p>
        </div>

        {/* Compliance Banner */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-green-900 mb-2">GDPR & ePrivacy Compliant System</h3>
              <p className="text-green-800 mb-3">
                This admin system follows Czech Republic and EU regulations for email marketing and data protection.
              </p>
              <ul className="text-sm text-green-700 space-y-1">
                <li>✓ Explicit opt-in consent tracking (zákon 480/2004 Sb.)</li>
                <li>✓ Suppression list management (GDPR Article 21)</li>
                <li>✓ Audit logging for all actions</li>
                <li>✓ CSV export with security warnings</li>
                <li>✓ Marketing emails only to CONSENT_GRANTED contacts</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Admin Sections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => {
            const Icon = section.icon;
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
              purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
              red: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
              green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
            }[section.color];

            return (
              <button
                key={section.path}
                onClick={() => navigate(section.path)}
                className={`bg-gradient-to-br ${colorClasses} text-white rounded-2xl p-8 text-left transition-all hover:scale-105 hover:shadow-2xl group`}
              >
                <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  {section.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">System Information</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">KV Store</div>
              <div className="text-sm text-gray-600">Database Type</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">Resend API</div>
              <div className="text-sm text-gray-600">Email Provider</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">GDPR Safe</div>
              <div className="text-sm text-gray-600">Compliance Status</div>
            </div>
          </div>
        </div>

        {/* Documentation */}
        <div className="mt-8 bg-gray-900 text-white rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-4">Important Guidelines</h3>
          <div className="space-y-3 text-sm text-gray-300">
            <p>
              <strong className="text-white">Marketing Emails (5–6 per year):</strong> Can only be sent to contacts with CONSENT_GRANTED status. 
              Focus on exclusive vouchers, seasonal specialties, and special event invitations. Each email should feel like an invitation to the family table.
            </p>
            <p>
              <strong className="text-white">Transactional Emails:</strong> Reservation confirmations and service emails 
              can be sent to all contacts (except suppression list).
            </p>
            <p>
              <strong className="text-white">Suppression List:</strong> Contacts marked as NO_MARKETING or UNSUBSCRIBED 
              are globally blocked from marketing. They can still receive transactional emails.
            </p>
            <p>
              <strong className="text-white">Italian Family Style:</strong> Marketing should emphasize famiglia, tradizione, autenticità. 
              We protect customer data "like family recipes" and invite guests to be "part of the family table."
            </p>
            <p>
              <strong className="text-white">Data Security:</strong> When exporting CSV files, handle them securely. 
              Do not forward or store publicly. Delete after use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
