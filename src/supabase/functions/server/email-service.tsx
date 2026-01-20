import { 
  getOwnerNotificationEmail, 
  getCustomerConfirmationEmail, 
  getCustomerRejectionEmail, 
  getRequestReceivedEmail 
} from "./email-templates.tsx";

// Configuration
const CONFIG = {
  // FIXED: Resend uses single global API endpoint for all regions (EU API keys work with api.resend.com)
  RESEND_API_URL: 'https://api.resend.com/emails',
  // FIXED: Using verified subdomain 'send.altrodatony.com' found in DNS records
  EMAIL_FROM: '"Altro da Tony (Rezervace)" <info@send.altrodatony.com>',
  EMAIL_REPLY_TO: 'info@altrodatony.com',
  EMAIL_BCC: 'antoniosahulka@seznam.cz',
  // Used for admin links
  BASE_URL: 'https://www.altrodatony.com' 
};

export interface EmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

// Helper for sleep
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Core email sending function with retry logic and detailed logging
 */
async function sendEmail(
  to: string, 
  subject: string, 
  html: string, 
  text: string, 
  tags: { name: string; value: string }[] = [],
  options: { skipBcc?: boolean } = {}
): Promise<EmailResult> {
  const rawApiKey = Deno.env.get('RESEND_API_KEY');
  // FIXED: Just trim whitespace. Do not strip other characters as it might corrupt valid keys.
  const apiKey = rawApiKey ? rawApiKey.trim() : '';
  
  if (!apiKey) {
    console.error('❌ CRITICAL: RESEND_API_KEY is missing');
    return { success: false, error: 'RESEND_API_KEY missing' };
  }

  // Debug API Key (safe log)
  console.log(`🔑 Using Resend API Key: ${apiKey.substring(0, 5)}... (Length: ${apiKey.length})`);

  const payload: any = {
    from: CONFIG.EMAIL_FROM,
    to: [to],
    reply_to: CONFIG.EMAIL_REPLY_TO,
    subject,
    html,
    text,
    tags,
    // CLEANUP: Removed complex headers (X-Entity-Ref-ID, List-Unsubscribe)
    // These extra headers often trigger Seznam.cz spam filters on new/flagged domains.
    // Keeping it "bare metal" improves deliverability.
  };

  // Add BCC for safety monitoring if defined and not skipped
  if (CONFIG.EMAIL_BCC && !options.skipBcc) {
    payload.bcc = [CONFIG.EMAIL_BCC];
  }

  // Retry logic: 2 retries (total 3 attempts) with exponential backoff (1s, 3s)
  const maxRetries = 2;
  let lastError: any;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        const delay = Math.pow(3, attempt - 1) * 1000;
        console.log(`⚠️ Retry attempt ${attempt}/${maxRetries} after ${delay}ms...`);
        await sleep(delay);
      }

      console.log(`📧 Sending email to ${to} [Attempt ${attempt + 1}]`);
      
      const response = await fetch(CONFIG.RESEND_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Rate limit handling
        if (response.status === 429) {
           console.warn(`⚠️ Rate limit hit (429). Waiting...`);
           await sleep(2000); // Extra wait for rate limit
           throw new Error(`Rate limit exceeded: ${JSON.stringify(errorData)}`);
        }
        throw new Error(`Resend API Error (${response.status}): ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log(`✅ Email sent successfully! Resend ID: ${data.id}`);
      
      return { success: true, id: data.id };

    } catch (error) {
      console.error(`❌ Send failure (Attempt ${attempt + 1}):`, error);
      lastError = error;
    }
  }

  return { 
    success: false, 
    error: lastError instanceof Error ? lastError.message : String(lastError) 
  };
}

/**
 * Send notification to restaurant owner
 */
export async function sendOwnerNotification(reservation: any): Promise<EmailResult> {
  const email = 'antoniosahulka@seznam.cz'; // Owner email updated
  // Conservative subject
  const dateStr = new Date(reservation.date).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric' });
  const subject = `Nová žádost o rezervaci – ${dateStr} ${reservation.time} – ${reservation.guests} hosté`;
  
  const html = getOwnerNotificationEmail(reservation);
  const text = `Nová rezervace: ${reservation.name}, ${dateStr} ${reservation.time}, ${reservation.guests} osob. Tel: ${reservation.phone}.`;

  return sendEmail(email, subject, html, text, [
    { name: 'category', value: 'owner_notification' },
    { name: 'reservation_id', value: reservation.id }
  ]);
}

/**
 * Send "Request Received" email to customer
 */
export async function sendCustomerRequestReceived(reservation: any): Promise<EmailResult> {
  const subject = "Potvrzení přijetí žádosti o rezervaci – Altro da Tony";
  const html = getRequestReceivedEmail(reservation);
  const text = `Dobrý den, přijali jsme Vaši žádost o rezervaci na ${reservation.date} v ${reservation.time}. Ozveme se Vám s potvrzením. Altro da Tony`;

  return sendEmail(reservation.email, subject, html, text, [
    { name: 'category', value: 'customer_request_received' },
    { name: 'reservation_id', value: reservation.id }
  ]);
}

/**
 * Send confirmation to customer
 */
export async function sendCustomerConfirmation(reservation: any): Promise<EmailResult> {
  const dateStr = new Date(reservation.date).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric' });
  // Removed special char ✓ to improve deliverability to Seznam.cz
  const subject = `Potvrzení rezervace – Altro da Tony`;
  const html = getCustomerConfirmationEmail(reservation);
  const text = `Dobrý den, Vaše rezervace na ${dateStr} v ${reservation.time} byla potvrzena. Těšíme se na Vás! Altro da Tony`;

  return sendEmail(reservation.email, subject, html, text, [
    { name: 'category', value: 'customer_confirmation' },
    { name: 'reservation_id', value: reservation.id }
  ]);
}

/**
 * Send decline email to customer
 */
export async function sendCustomerDecline(reservation: any): Promise<EmailResult> {
  const subject = "Informace k Vaší rezervaci – Altro da Tony";
  const html = getCustomerRejectionEmail(reservation);
  const text = `Dobrý den, je nám líto, ale Vaši rezervaci nemůžeme potvrdit. Prosím vyberte si jiný termín. Altro da Tony`;

  return sendEmail(reservation.email, subject, html, text, [
    { name: 'category', value: 'customer_decline' },
    { name: 'reservation_id', value: reservation.id }
  ]);
}

export async function sendTestEmail(targetEmail: string): Promise<EmailResult> {
  // SEZNAM.CZ OPTIMIZATION STRATEGY
  // 1. Use a very boring, human-like subject line. Avoid "Test", "Verification", "System".
  const subject = "Informace k rezervaci - Altro da Tony";
  
  // 2. Simple, clean HTML that mimics a standard Outlook/Gmail outgoing message.
  // No complex divs, no heavy styling.
  const html = `
    <p>Dobrý den,</p>
    <p>toto je zpráva pro ověření, že Vám dorazí potvrzení rezervace z našeho systému.</p>
    <p>Pokud tuto zprávu vidíte, spojení se Seznam.cz funguje.</p>
    <br>
    <p>S pozdravem,</p>
    <p>Tým Altro da Tony<br>
    <a href="https://altrodatony.com">altrodatony.com</a></p>
    <p style="font-size: 12px; color: #888; margin-top: 20px;">
      Restaurace Altro da Tony, Dlouhá 123, Praha<br>
      Toto je vyžádaná zpráva na základě požadavku z administrace.
    </p>
  `;

  // 3. Robust Plain Text version (Seznam prioritizes this for spam scoring)
  const text = `Dobrý den,\n\ntoto je zpráva pro ověření, že Vám dorazí potvrzení rezervace z našeho systému.\nPokud tuto zprávu vidíte, spojení se Seznam.cz funguje.\n\nS pozdravem,\n\nTým Altro da Tony\naltrodatony.com`;

  // 4. Send with STRICT minimalist headers
  // We temporarily override the Reply-To to match the From address exactly.
  // This reduces "spoofing" score on strict filters.
  
  const rawApiKey = Deno.env.get('RESEND_API_KEY');
  const apiKey = rawApiKey ? rawApiKey.replace(/[^a-zA-Z0-9_-]/g, '') : '';
  
  if (!apiKey) return { success: false, error: 'RESEND_API_KEY missing' };

  try {
    // FIXED: Use EU endpoint for EU API keys
    const res = await fetch(CONFIG.RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: CONFIG.EMAIL_FROM, // "Altro da Tony <info@altrodatony.com>"
        to: [targetEmail],
        reply_to: CONFIG.EMAIL_FROM, // INTENTIONAL: Match FROM exactly for higher trust
        subject,
        html,
        text,
        tags: [{ name: 'category', value: 'manual_test' }]
        // NO BCC, NO EXTRA HEADERS
      })
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.message || 'Unknown Resend error' };
    }

    return { success: true, id: data.id };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

/**
 * Check Resend configuration status
 */
export function getEmailStatus() {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  
  // Debug log to console (visible in Supabase logs)
  console.log(`[Health Check] Checking RESEND_API_KEY: ${apiKey ? 'Present (starts with ' + apiKey.substring(0, 4) + '...)' : 'MISSING'}`);
  
  return {
    configured: !!apiKey && apiKey.length > 5,
    provider: 'resend',
    from: CONFIG.EMAIL_FROM,
    replyTo: CONFIG.EMAIL_REPLY_TO
  };
}