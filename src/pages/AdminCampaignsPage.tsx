import { useEffect, useState } from 'react';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../utils/supabase/env';
import { Mail, Send, AlertTriangle, ShieldCheck, Users, Calendar, ArrowLeft, Home, ChevronRight } from 'lucide-react';
import { navigate } from '../utils/router';

type CampaignType = 'SERVICE' | 'MARKETING';
type ConsentStatus = 'TRANSACTIONAL_ONLY' | 'CONSENT_GRANTED' | 'SOFT_OPT_IN_ELIGIBLE' | 'NO_MARKETING' | 'UNSUBSCRIBED';

interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  status: 'draft' | 'sent';
  created_at: string;
  sent_at?: string;
  recipient_count?: number;
}

export function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateWizard, setShowCreateWizard] = useState(false);

  useEffect(() => {
    document.title = 'Campaign Management | Admin';
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${SUPABASE_URL}/functions/v1/make-server-d880a0b3/admin/campaigns`, {
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to load campaigns');
      const data = await response.json();
      setCampaigns(data.campaigns || []);
    } catch (error) {
      console.error('Error loading campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {showCreateWizard ? (
          <CampaignWizard onClose={() => setShowCreateWizard(false)} onComplete={loadCampaigns} />
        ) : (
          <>
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Campaigns</h1>
                <p className="text-gray-600">Create and manage email campaigns with GDPR compliance</p>
              </div>
              <button
                onClick={() => setShowCreateWizard(true)}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                <Mail className="w-5 h-5" />
                Create Campaign
              </button>
            </div>

            {/* Campaigns List */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Campaign Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Recipients</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          Loading campaigns...
                        </td>
                      </tr>
                    ) : campaigns.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center">
                          <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500 mb-2">No campaigns yet</p>
                          <button
                            onClick={() => setShowCreateWizard(true)}
                            className="text-primary hover:underline"
                          >
                            Create your first campaign
                          </button>
                        </td>
                      </tr>
                    ) : (
                      campaigns.map((campaign) => (
                        <tr key={campaign.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{campaign.name}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              campaign.type === 'MARKETING' 
                                ? 'bg-purple-100 text-purple-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {campaign.type}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              campaign.status === 'sent' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {campaign.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {campaign.recipient_count || 0}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {new Date(campaign.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CampaignWizard({ onClose, onComplete }: { onClose: () => void; onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [campaignType, setCampaignType] = useState<CampaignType>('SERVICE');
  const [campaignName, setCampaignName] = useState('');
  const [filterStatus, setFilterStatus] = useState<ConsentStatus | 'ALL'>('CONSENT_GRANTED');
  const [subject, setSubject] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [fromName, setFromName] = useState('Altro Da Tony');
  const [fromEmail, setFromEmail] = useState('tony@altrodatony.com');
  const [replyTo, setReplyTo] = useState('tony@altrodatony.com');
  const [recipientCount, setRecipientCount] = useState(0);
  const [eligibleCount, setEligibleCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (step === 2) {
      loadRecipientCount();
    }
  }, [step, filterStatus]);

  const loadRecipientCount = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d880a0b3/admin/contacts/count?status=${filterStatus}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          }
        }
      );
      const data = await response.json();
      setRecipientCount(data.count || 0);
      setEligibleCount(data.eligible_count || 0);
    } catch (error) {
      console.error('Error loading count:', error);
    }
  };

  const canProceedToStep2 = campaignType && campaignName.trim().length > 0;
  const canProceedToStep3 = recipientCount > 0;
  const canProceedToStep4 = subject.trim().length > 0 && htmlContent.trim().length > 0;

  const handleSendCampaign = async () => {
    if (!confirm(`⚠️ CONFIRM SEND\n\nYou are about to send a ${campaignType} campaign to ${recipientCount} recipients.\n\nThis action cannot be undone.\n\nContinue?`)) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d880a0b3/admin/campaigns/send`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: campaignName,
            type: campaignType,
            filter_status: filterStatus,
            subject,
            html_content: htmlContent,
            from_name: fromName,
            from_email: fromEmail,
            reply_to: replyTo
          })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send campaign');
      }

      alert('✅ Campaign sent successfully!');
      onComplete();
      onClose();
    } catch (error) {
      console.error('Send error:', error);
      alert(`Failed to send campaign: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Campaigns
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Campaign</h1>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary font-medium' : ''}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>1</div>
            Type
          </div>
          <div className="w-8 h-px bg-gray-300" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary font-medium' : ''}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>2</div>
            Segment
          </div>
          <div className="w-8 h-px bg-gray-300" />
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-primary font-medium' : ''}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>3</div>
            Content
          </div>
          <div className="w-8 h-px bg-gray-300" />
          <div className={`flex items-center gap-2 ${step >= 4 ? 'text-primary font-medium' : ''}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 4 ? 'bg-primary text-white' : 'bg-gray-200'}`}>4</div>
            Confirm
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        {/* Step 1: Type & Name */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">Campaign Name</label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="e.g., Spring Menu 2025"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">Campaign Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setCampaignType('SERVICE')}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    campaignType === 'SERVICE'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-lg font-semibold text-gray-900 mb-2">Service Email</div>
                  <p className="text-sm text-gray-600">Post-visit feedback, updates about reservations</p>
                </button>
                <button
                  onClick={() => setCampaignType('MARKETING')}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    campaignType === 'MARKETING'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-lg font-semibold text-gray-900 mb-2">Marketing Email</div>
                  <p className="text-sm text-gray-600">Promotions, events, news (requires consent)</p>
                </button>
              </div>
            </div>

            {campaignType === 'MARKETING' && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-orange-900">
                  <p className="font-semibold mb-1">Marketing Email Requirements (GDPR/ePrivacy)</p>
                  <ul className="list-disc list-inside space-y-1 text-orange-800">
                    <li>Can only be sent to contacts with explicit CONSENT_GRANTED status</li>
                    <li>Must include sender identification and easy unsubscribe</li>
                    <li>Contacts in suppression list (NO_MARKETING, UNSUBSCRIBED) are automatically excluded</li>
                  </ul>
                </div>
              </div>
            )}

            {campaignType === 'MARKETING' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-2">💡 Italian Family Style Tips (5–6 emails per year)</p>
                  <ul className="space-y-1 text-blue-800">
                    <li><strong>Spring/Summer:</strong> "Nuove specialità di stagione" – Fresh seasonal menu</li>
                    <li><strong>Autumn:</strong> "Voucher esclusivo per i nostri ospiti" – Exclusive voucher</li>
                    <li><strong>Winter Holidays:</strong> "Invito ad una serata speciale" – Special event invitation</li>
                    <li><strong>Tone:</strong> Warm, family invitation ("parte della famiglia", "tavola di famiglia")</li>
                    <li><strong>Focus:</strong> Exclusive access, seasonal ingredients, authentic Italian tradition</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={!canProceedToStep2}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next: Select Recipients
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Segment */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">Recipient Filter</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {campaignType === 'MARKETING' ? (
                  <>
                    <option value="CONSENT_GRANTED">Only Consent Granted (GDPR Safe)</option>
                  </>
                ) : (
                  <>
                    <option value="ALL">All Contacts (excluding suppression list)</option>
                    <option value="CONSENT_GRANTED">Consent Granted</option>
                    <option value="TRANSACTIONAL_ONLY">Transactional Only</option>
                  </>
                )}
              </select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="text-3xl font-bold text-blue-900">{recipientCount}</div>
                    <div className="text-sm text-blue-700">Recipients will receive this email</div>
                  </div>
                </div>
                <ShieldCheck className="w-12 h-12 text-blue-300" />
              </div>
              {campaignType === 'MARKETING' && (
                <div className="text-sm text-blue-800 border-t border-blue-200 pt-4">
                  ✓ All recipients have explicit marketing consent<br />
                  ✓ Suppression list automatically excluded
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4 border-t">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2 text-gray-700 hover:text-gray-900"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!canProceedToStep3}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next: Create Content
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Content */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">From Name</label>
                <input
                  type="text"
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">From Email</label>
                <input
                  type="email"
                  value={fromEmail}
                  onChange={(e) => setFromEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Reply-To Email</label>
              <input
                type="email"
                value={replyTo}
                onChange={(e) => setReplyTo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Subject Line</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Email Content (HTML)</label>
              <textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                placeholder="Paste your HTML email content here..."
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">
                Note: Unsubscribe link will be automatically added by the email provider
              </p>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2 text-gray-700 hover:text-gray-900"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!canProceedToStep4}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next: Review & Send
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Campaign Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Campaign Name</div>
                  <div className="font-semibold text-gray-900">{campaignName}</div>
                </div>
                <div>
                  <div className="text-gray-600">Type</div>
                  <div className="font-semibold text-gray-900">{campaignType}</div>
                </div>
                <div>
                  <div className="text-gray-600">Recipients</div>
                  <div className="font-semibold text-gray-900">{recipientCount} contacts</div>
                </div>
                <div>
                  <div className="text-gray-600">Subject</div>
                  <div className="font-semibold text-gray-900">{subject}</div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-green-900 mb-2">Compliance Checklist</p>
                  <div className="space-y-1 text-green-800">
                    <div>✓ Recipients have appropriate consent status</div>
                    <div>✓ Suppression list automatically excluded</div>
                    <div>✓ Sender identification included</div>
                    <div>✓ Unsubscribe link will be added by provider</div>
                    <div>✓ Audit log will record this action</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2 text-gray-700 hover:text-gray-900"
              >
                Back
              </button>
              <button
                onClick={handleSendCampaign}
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
              >
                <Send className="w-5 h-5" />
                {loading ? 'Sending...' : `Send to ${recipientCount} Recipients`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}