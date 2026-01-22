import { useState, useEffect } from 'react';
import { Check, AlertTriangle, XCircle, RefreshCw, Send, Shield, Info, Server, Search, ExternalLink } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { apiJson } from '../utils/apiClient';

interface EmailStatus {
  configured: boolean;
  provider: string;
  from: string;
  replyTo: string;
}

interface HealthData {
  status: string;
  version: string;
  email: EmailStatus;
}

export function EmailDeliverability() {
  const [loading, setLoading] = useState(false);
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [testEmail, setTestEmail] = useState('');
  const [sendingTest, setSendingTest] = useState(false);
  const [lastTestResult, setLastTestResult] = useState<any>(null);
  
  // DNS Check States
  const [checkingDns, setCheckingDns] = useState(false);
  const [dnsData, setDnsData] = useState<any>(null);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const data = await apiJson<HealthData>('/health');
      setHealthData(data);
    } catch (error) {
      console.error('Failed to fetch health:', error);
      toast.error(error instanceof Error ? error.message : 'Nepodařilo se načíst stav serveru');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const handleSendTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail) return;

    setSendingTest(true);
    setLastTestResult(null);
    try {
      const data = await apiJson<any>(
        '/admin/test-email',
        { method: 'POST', body: { email: testEmail } },
        { authRequired: true }
      );
      setLastTestResult(data);
      
      if (data.success) {
        toast.success(`Testovací email odeslán (ID: ${data.id})`);
      } else {
        toast.error(`Chyba odeslání: ${data.error}`);
      }
    } catch (error) {
      toast.error('Chyba komunikace se serverem');
    } finally {
      setSendingTest(false);
    }
  };

  const handleDnsCheck = async () => {
    setCheckingDns(true);
    setDnsData(null);
    try {
      const data = await apiJson<any>(
        '/admin/dns-check?domain=altrodatony.com',
        {},
        { authRequired: true }
      );
      setDnsData(data);
      toast.success('DNS diagnostika dokončena');
    } catch (error) {
      toast.error('Chyba při kontrole DNS');
      console.error(error);
    } finally {
      setCheckingDns(false);
    }
  };

  const getStatusColor = (configured: boolean) => {
    return configured ? 'text-green-600 bg-green-50 border-green-200' : 'text-red-600 bg-red-50 border-red-200';
  };

  const StatusIcon = ({ status }: { status: 'ok' | 'missing' | 'found' | 'unknown' }) => {
    if (status === 'ok' || status === 'found') return <Check className="w-5 h-5 text-green-600" />;
    if (status === 'missing') return <XCircle className="w-5 h-5 text-red-600" />;
    return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-display text-gray-900 flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          Email Deliverability Status
        </h2>
        <button 
          onClick={fetchHealth}
          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          title="Obnovit stav"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Connection Status */}
      <div className={`p-6 rounded-xl border ${healthData?.email?.configured ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'}`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full ${healthData?.email?.configured ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {healthData?.email?.configured ? <Check className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {healthData?.email?.configured ? 'Resend API je aktivní' : 'Resend API není nakonfigurováno'}
            </h3>
            <p className="text-gray-600 mb-4">
              {healthData?.email?.configured 
                ? 'Systém je připraven k odesílání emailů přes Resend.' 
                : 'Chybí RESEND_API_KEY v nastavení serveru. Emaily nebudou odesílány.'}
            </p>
            
            {healthData?.email && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-3 rounded border border-gray-200">
                  <span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">Provider</span>
                  <span className="font-medium text-gray-900 flex items-center gap-2">
                    <Server className="w-3 h-3" /> {healthData.email.provider}
                  </span>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">Server Version</span>
                  <span className="font-medium text-gray-900">{healthData.version}</span>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">Odesílatel (From)</span>
                  <span className="font-medium text-gray-900">{healthData.email.from}</span>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">Odpovědi (Reply-To)</span>
                  <span className="font-medium text-gray-900">{healthData.email.replyTo}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DNS Diagnostic Tool */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-500" />
              Diagnostika DNS Záznamů
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Ověří, jak svět vidí vaši doménu. Data pochází přímo z veřejných DNS serverů Google.
            </p>
          </div>
          <button
            onClick={handleDnsCheck}
            disabled={checkingDns}
            className="px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 disabled:opacity-50 flex items-center gap-2"
          >
            {checkingDns ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Spustit kontrolu
          </button>
        </div>

        {dnsData ? (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* SPF Check */}
            <div className={`p-4 rounded-lg border ${dnsData.spf.status === 'ok' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <div className="flex items-center gap-2 mb-2">
                <StatusIcon status={dnsData.spf.status} />
                <h4 className="font-bold text-gray-900">SPF Záznam</h4>
              </div>
              {dnsData.spf.raw ? (
                <code className="block bg-white/50 p-2 rounded text-xs font-mono break-all text-gray-800">
                  {dnsData.spf.raw}
                </code>
              ) : (
                <p className="text-sm text-red-700">SPF záznam nenalezen! Emaily budou padat do spamu.</p>
              )}
            </div>

            {/* DMARC Check */}
            <div className={`p-4 rounded-lg border ${dnsData.dmarc.status === 'ok' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <div className="flex items-center gap-2 mb-2">
                <StatusIcon status={dnsData.dmarc.status} />
                <h4 className="font-bold text-gray-900">DMARC Záznam</h4>
              </div>
              {dnsData.dmarc.raw ? (
                <code className="block bg-white/50 p-2 rounded text-xs font-mono break-all text-gray-800">
                  {dnsData.dmarc.raw}
                </code>
              ) : (
                <p className="text-sm text-red-700">DMARC záznam nenalezen (nebo se ještě nepropsal). Seznam.cz jej vyžaduje.</p>
              )}
            </div>

            {/* MX Records */}
            <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <Server className="w-4 h-4 text-gray-500" />
                <h4 className="font-bold text-gray-900">MX Záznamy (Příjem pošty)</h4>
              </div>
              <ul className="list-disc list-inside text-xs font-mono text-gray-600">
                {dnsData.mx.records.length > 0 ? (
                  dnsData.mx.records.map((r: string, i: number) => <li key={i}>{r}</li>)
                ) : (
                  <li>Žádné MX záznamy (emaily vám nebudou chodit)</li>
                )}
              </ul>
            </div>
            
             {/* DKIM Warning */}
             <div className="p-4 rounded-lg border border-orange-200 bg-orange-50">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-orange-600" />
                <h4 className="font-bold text-orange-900">DKIM Poznámka</h4>
              </div>
              <p className="text-xs text-orange-800 mb-2">
                DKIM záznamy nelze snadno ověřit zvnějšku, protože používají unikátní selektory.
                Ověřte stav "Verified" přímo v administraci Resend.
              </p>
              <a 
                href="https://resend.com/domains" 
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium text-orange-700 hover:underline flex items-center gap-1"
              >
                Přejít do Resend Dashboard <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <Search className="w-10 h-10 mx-auto mb-2 opacity-20" />
            <p>Klikněte na "Spustit kontrolu" pro ověření DNS záznamů</p>
          </div>
        )}
      </div>

      {/* Test Email Tool */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Send className="w-5 h-5 text-gray-500" />
          Testovací email
        </h3>
        <p className="text-gray-600 mb-4 text-sm">
          Odešle skutečný transakční email (potvrzení) na zadanou adresu pro ověření doručitelnosti.
          Doporučujeme testovat na Seznam.cz, Gmail a Outlook.
        </p>

        <form onSubmit={handleSendTest} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email příjemce</label>
            <input 
              type="email" 
              required
              placeholder="vasho.jmeno@seznam.cz"
              value={testEmail}
              onChange={e => setTestEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button 
            type="submit" 
            disabled={sendingTest || !healthData?.email?.configured}
            className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {sendingTest ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Odesílám...
              </>
            ) : (
              <>
                Odeslat test
              </>
            )}
          </button>
        </form>

        {lastTestResult && (
          <div className={`mt-4 p-4 rounded-lg border ${lastTestResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <h4 className={`font-bold text-sm ${lastTestResult.success ? 'text-green-800' : 'text-red-800'}`}>
              {lastTestResult.success ? '✅ Odesláno úspěšně' : '❌ Chyba odeslání'}
            </h4>
            <div className="mt-2 text-xs font-mono space-y-1">
              {lastTestResult.id && <p>Resend ID: {lastTestResult.id}</p>}
              {lastTestResult.error && <p className="text-red-600">Error: {lastTestResult.error}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
