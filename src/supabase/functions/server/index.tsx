import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import * as emailService from "./email-service.tsx";
import { STATIC_WEEKLY_MENU } from "./static-menu.ts";

// ✉️ Email Configuration: rezervace@altrodatony.com (Antonín Sahulka)
const app = new Hono();

// Force server restart log to pick up new secrets
console.log("Server starting/restarting... Loading configuration.");
console.log(`RESEND_API_KEY present: ${!!Deno.env.get('RESEND_API_KEY')}`);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

// Health check endpoint
app.get("/make-server-d880a0b3/health", (c) => {
  try {
    const emailStatus = emailService.getEmailStatus();
    return c.json({ 
      status: "ok",
      version: "2024-12-27-debug",
      email: emailStatus,
      features: {
        transactionalRollback: false, // We don't rollback anymore, we mark as failed
        marketingConsent: true,
        plainTextEmails: true,
        czechLocalization: true
      }
    });
  } catch (error) {
    console.error("Health check failed:", error);
    return c.json({ status: "error", error: String(error) }, 500);
  }
});

// ==================== RESERVATIONS ====================

// Create a new reservation
app.post("/make-server-d880a0b3/reservations", async (c) => {
  try {
    const body = await c.req.json();
    const { date, time, name, email, phone, message, guests, occasion, marketingConsent } = body;

    // Validate required fields
    if (!date || !time || !name || !email || !phone || !guests) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const reservation = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date,
      time,
      name,
      email,
      phone,
      guests,
      occasion: occasion || '',
      message: message || '',
      timestamp: new Date().toISOString(),
      status: 'pending_email', // Initial status
      email_owner_status: 'pending',
      email_customer_status: 'pending',
      logs: [] as string[]
    };

    // 1. Store reservation immediately
    await kv.set(`reservation:${reservation.id}`, reservation);
    console.log(`📝 Reservation created: ${reservation.id} (pending email)`);

    // Store/update contact (marketing logic)
    try {
      const existingContact = await kv.get(`contact:${email}`);
      if (marketingConsent) {
        if (existingContact) {
          existingContact.consent_status = 'CONSENT_GRANTED';
          existingContact.consent_timestamp = new Date().toISOString();
          existingContact.last_visit_at = new Date().toISOString();
          await kv.set(`contact:${email}`, existingContact);
        } else {
          await kv.set(`contact:${email}`, {
            email,
            source: 'reservation_form',
            created_at: new Date().toISOString(),
            last_visit_at: new Date().toISOString(),
            consent_status: 'CONSENT_GRANTED',
            consent_timestamp: new Date().toISOString(),
            tags: []
          });
        }
      } else {
        if (!existingContact) {
          await kv.set(`contact:${email}`, {
            email,
            source: 'reservation_form',
            created_at: new Date().toISOString(),
            last_visit_at: new Date().toISOString(),
            consent_status: 'TRANSACTIONAL_ONLY',
            tags: []
          });
        } else {
          existingContact.last_visit_at = new Date().toISOString();
          await kv.set(`contact:${email}`, existingContact);
        }
      }
    } catch (e) {
      console.error("Marketing consent error (non-blocking):", e);
    }

    // 2. Send Owner Notification
    console.log('🚀 Sending owner notification...');
    const ownerEmailResult = await emailService.sendOwnerNotification(reservation);
    
    if (ownerEmailResult.success) {
      reservation.email_owner_status = 'sent';
      reservation.email_owner_sent_at = new Date().toISOString();
      reservation.email_owner_id = ownerEmailResult.id;
      reservation.status = 'pending'; // Promoted from pending_email to pending
    } else {
      reservation.email_owner_status = 'failed';
      reservation.email_owner_error = ownerEmailResult.error;
      reservation.logs.push(`Owner email failed: ${ownerEmailResult.error}`);
    }

    // 3. Send Customer "Request Received" - SKIPPED as per user request (only confirmation/decline sent later)
    console.log('ℹ️ Skipping customer request received email (waiting for manual action)...');
    reservation.email_customer_status = 'pending_action'; 
    reservation.logs.push('Customer request received email skipped (policy: send only confirmation/decline)');

    // 4. Update reservation with email results
    await kv.set(`reservation:${reservation.id}`, reservation);

    if (reservation.email_owner_status === 'failed') {
      console.error("❌ CRITICAL: Owner notification failed. Reservation saved but needs attention.");
      return c.json({ 
        success: true, 
        reservation, 
        warning: "Reservation saved, but email notification failed. Please check admin." 
      });
    }

    return c.json({ success: true, reservation, message: "Reservation received" });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return c.json({ error: "Failed to create reservation", details: String(error) }, 500);
  }
});

app.get("/make-server-d880a0b3/reservations", async (c) => {
  try {
    const reservations = await kv.getByPrefix("reservation:");
    
    // Sort by timestamp descending (newest first)
    const sorted = reservations.sort((a: any, b: any) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return c.json({ success: true, reservations: sorted });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return c.json({ error: "Failed to fetch reservations", details: String(error) }, 500);
  }
});

// Delete a reservation
app.delete("/make-server-d880a0b3/reservations/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`reservation:${id}`);
    
    console.log(`Reservation deleted: ${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return c.json({ error: "Failed to delete reservation", details: String(error) }, 500);
  }
});

// Update reservation status
app.patch("/make-server-d880a0b3/reservations/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { status } = body;

    const existing = await kv.get(`reservation:${id}`);
    if (!existing) {
      return c.json({ error: "Reservation not found" }, 404);
    }

    const previousStatus = existing.status;
    let emailResult = null;

    // Check if status changed to confirmed or cancelled
    console.log(`Reservation ${id} update: status=${status}, previousStatus=${previousStatus}`);

    if (status === 'confirmed' && previousStatus !== 'confirmed') {
      console.log(`✅ Confirming reservation ${id}... Sending email to ${existing.email}`);
      emailResult = await emailService.sendCustomerConfirmation(existing);
    } else if (status === 'cancelled' && previousStatus !== 'cancelled') {
      console.log(`🚫 Cancelling reservation ${id}... Sending email to ${existing.email}`);
      emailResult = await emailService.sendCustomerDecline(existing);
    } else if (status === 'confirmed' && previousStatus === 'confirmed') {
      console.log(`ℹ️ Reservation ${id} already confirmed. Skipping email.`);
    }

    // Update reservation
    const updated = { ...existing, status };
    
    if (emailResult) {
      if (emailResult.success) {
        updated.last_email_status = 'sent';
        updated.last_email_sent_at = new Date().toISOString();
        updated.last_email_id = emailResult.id;
      } else {
        updated.last_email_status = 'failed';
        updated.last_email_error = emailResult.error;
        if (!updated.logs) updated.logs = [];
        updated.logs.push(`Status change (${status}) email failed: ${emailResult.error}`);
      }
    }

    await kv.set(`reservation:${id}`, updated);

    console.log(`Reservation updated: ${id}, status: ${status}`);
    return c.json({ success: true, reservation: updated, emailResult });
  } catch (error) {
    console.error("Error updating reservation:", error);
    return c.json({ error: "Failed to update reservation", details: String(error) }, 500);
  }
});

// ==================== ADMIN EMAIL TOOLS ====================

app.get("/make-server-d880a0b3/admin/dns-check", async (c) => {
  const domain = c.req.query('domain') || 'altrodatony.com';
  
  // Helper for Google DNS API
  const queryDns = async (name: string, type: string) => {
    try {
      const response = await fetch(`https://dns.google/resolve?name=${name}&type=${type}`);
      return await response.json();
    } catch (e) {
      return { error: String(e) };
    }
  };

  try {
    const [spfData, dmarcData, mxData, dkimData] = await Promise.all([
      queryDns(domain, 'TXT'),
      queryDns(`_dmarc.${domain}`, 'TXT'),
      queryDns(domain, 'MX'),
      queryDns(`resend._domainkey.${domain}`, 'TXT') // Standard Resend selector attempt
    ]);

    // Analyze SPF
    let spf = { status: 'missing', raw: null as string | null };
    if (spfData.Answer) {
      const spfRecord = spfData.Answer.find((r: any) => r.data && r.data.includes('v=spf1'));
      if (spfRecord) {
        spf.status = 'ok';
        spf.raw = spfRecord.data;
      }
    }

    // Analyze DMARC
    let dmarc = { status: 'missing', raw: null as string | null };
    if (dmarcData.Answer) {
      const dmarcRecord = dmarcData.Answer.find((r: any) => r.data && r.data.includes('v=DMARC1'));
      if (dmarcRecord) {
        dmarc.status = 'ok';
        dmarc.raw = dmarcRecord.data;
      }
    }
    
    // Analyze MX
    let mx = { status: 'missing', records: [] as string[] };
    if (mxData.Answer) {
      mx.status = 'ok';
      mx.records = mxData.Answer.map((r: any) => r.data);
    }

    // Analyze DKIM (heuristic check)
    let dkim = { status: 'unknown', raw: null as string | null };
    if (dkimData.Answer) {
      dkim.status = 'found';
      dkim.raw = dkimData.Answer[0]?.data;
    }

    return c.json({
      domain,
      spf,
      dmarc,
      mx,
      dkim
    });

  } catch (error) {
    return c.json({ error: 'Failed to resolve DNS' }, 500);
  }
});

app.post("/make-server-d880a0b3/admin/test-email", async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;

    if (!email) return c.json({ error: "Email required" }, 400);

    const result = await emailService.sendTestEmail(email);

    return c.json(result);
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post("/make-server-d880a0b3/admin/retry-email", async (c) => {
  try {
    const body = await c.req.json();
    const { reservationId, type } = body; // type: 'owner', 'request', 'confirmation', 'decline'

    const reservation = await kv.get(`reservation:${reservationId}`);
    if (!reservation) return c.json({ error: "Reservation not found" }, 404);

    let result;
    if (type === 'owner') result = await emailService.sendOwnerNotification(reservation);
    else if (type === 'request') result = await emailService.sendCustomerRequestReceived(reservation);
    else if (type === 'confirmation') result = await emailService.sendCustomerConfirmation(reservation);
    else if (type === 'decline') result = await emailService.sendCustomerDecline(reservation);
    else return c.json({ error: "Invalid type" }, 400);

    // Update reservation status
    if (result.success) {
      if (!reservation.logs) reservation.logs = [];
      reservation.logs.push(`Manual retry (${type}) success: ${result.id}`);
      // Clear error flags if needed
    } else {
      if (!reservation.logs) reservation.logs = [];
      reservation.logs.push(`Manual retry (${type}) failed: ${result.error}`);
    }
    await kv.set(`reservation:${reservationId}`, reservation);

    return c.json(result);
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ==================== WEEKLY MENU ====================

// Get weekly menu
app.get("/make-server-d880a0b3/weekly-menu/:weekStart", async (c) => {
  const weekStart = c.req.param("weekStart");
  console.log(`👉 GET /weekly-menu/${weekStart} request received`);
  try {
    let menu;
    try {
      menu = await kv.get(`weekly-menu:${weekStart}`);
    } catch (e) {
      console.error(`KV get failed for weekly-menu:${weekStart}:`, e);
      menu = null;
    }
    
    // Fallback to static data if KV is empty for the current week
    // This ensures data integrity even if backend storage was wiped or is unreliable
    if (!menu && weekStart === STATIC_WEEKLY_MENU.weekStart) {
        console.log(`Weekly menu missing for ${weekStart}, using static fallback and seeding KV.`);
        menu = STATIC_WEEKLY_MENU;
        // Propagate to KV (backend "propis")
        try {
            await kv.set(`weekly-menu:${weekStart}`, STATIC_WEEKLY_MENU);
        } catch (e) {
            console.error("Failed to seed KV with static menu:", e);
        }
    }
    
    if (!menu) {
      return c.json({ success: true, menu: { weekStart, items: [] } });
    }

    return c.json({ success: true, menu });
  } catch (error) {
    console.error("Error fetching weekly menu:", error);
    return c.json({ error: "Failed to fetch weekly menu", details: String(error) }, 500);
  }
});

// Save weekly menu
app.post("/make-server-d880a0b3/weekly-menu", async (c) => {
  try {
    const body = await c.req.json();
    const { weekStart, items } = body;

    if (!weekStart) {
      return c.json({ error: "Missing weekStart" }, 400);
    }

    const menu = { weekStart, items: items || [] };
    await kv.set(`weekly-menu:${weekStart}`, menu);

    console.log(`Weekly menu saved for week: ${weekStart}`);
    return c.json({ success: true, menu });
  } catch (error) {
    console.error("Error saving weekly menu:", error);
    return c.json({ error: "Failed to save weekly menu", details: String(error) }, 500);
  }
});

// ==================== MAIN MENU ====================

// Helper function to get default menu items with full localization
function getDefaultMenuItems() {
  return [
    // ===== ANTIPASTI – PŘEDKRMY =====
    { 
      id: 'antipasti-1', 
      name: { cs: 'ZUPPA DEL GIORNO', en: 'ZUPPA DEL GIORNO', it: 'ZUPPA DEL GIORNO' }, 
      description: { cs: 'denní polévka', en: 'soup of the day', it: 'zuppa del giorno' }, 
      price: '75 Kč', 
      category: 'antipasti' 
    },
    { 
      id: 'antipasti-2', 
      name: { cs: 'BRUSCHETTA AL POMODORO CON STRACCIATELLA', en: 'BRUSCHETTA AL POMODORO CON STRACCIATELLA', it: 'BRUSCHETTA AL POMODORO CON STRACCIATELLA' }, 
      description: { cs: 'pečená rajčata, bazalka, stracciatella, česnek', en: 'roasted tomatoes, basil, stracciatella, garlic', it: 'pomodorini arrosto, basilico, stracciatella, aglio' }, 
      price: '185 Kč', 
      category: 'antipasti' 
    },
    { 
      id: 'antipasti-3', 
      name: { cs: 'CARPACCIO DI MANZO', en: 'CARPACCIO DI MANZO', it: 'CARPACCIO DI MANZO' }, 
      description: { cs: '50g hovězího masa, olivy, cherry rajčata, rukola, parmazán', en: '50g beef, olives, cherry tomatoes, arugula, parmesan', it: '50g di manzo, olive, pomodorini, rucola, parmigiano' }, 
      price: '255 Kč', 
      category: 'antipasti' 
    },
    { 
      id: 'antipasti-4', 
      name: { cs: 'TARTAR DI MANZO', en: 'TARTAR DI MANZO', it: 'TARTAR DI MANZO' }, 
      description: { cs: '70g hovězího masa, kapary, dijonská hořčice', en: '70g beef, capers, Dijon mustard', it: '70g di manzo, capperi, senape di Digione' }, 
      price: '275 Kč', 
      category: 'antipasti' 
    },
    { 
      id: 'antipasti-5', 
      name: { cs: 'GAMBERI AL LIMONE IN PADELLA', en: 'GAMBERI AL LIMONE IN PADELLA', it: 'GAMBERI AL LIMONE IN PADELLA' }, 
      description: { cs: 'krevety, česnek, citron, chilli', en: 'shrimp, garlic, lemon, chilli', it: 'gamberi, aglio, limone, peperoncino' }, 
      price: '295 Kč', 
      category: 'antipasti' 
    },
    
    // ===== INSALATE – SALÁTY =====
    { 
      id: 'insalate-1', 
      name: { cs: 'INSALATA DI POLLO E AVOCADO', en: 'INSALATA DI POLLO E AVOCADO', it: 'INSALATA DI POLLO E AVOCADO' }, 
      description: { cs: 'mix salátů, grilované kuřecí prso, avokado, cherry rajčata, medovo-hořčičný dressing', en: 'mixed salad, grilled chicken breast, avocado, cherry tomatoes, honey-mustard dressing', it: 'insalata mista, petto di pollo grigliato, avocado, pomodorini, condimento miele e senape' }, 
      price: '265 Kč', 
      category: 'insalate' 
    },
    { 
      id: 'insalate-2', 
      name: { cs: 'INSALATA FRUTTI DI MARE', en: 'INSALATA FRUTTI DI MARE', it: 'INSALATA FRUTTI DI MARE' }, 
      description: { cs: 'mix salátů, mořské plody, česnek, citrónový dressing', en: 'mixed salad, seafood, garlic, lemon dressing', it: 'insalata mista, frutti di mare, aglio, condimento al limone' }, 
      price: '295 Kč', 
      category: 'insalate' 
    },
    { 
      id: 'insalate-3', 
      name: { cs: 'INSALATA CON FORMAGGIO DI CAPRA', en: 'INSALATA CON FORMAGGIO DI CAPRA', it: 'INSALATA CON FORMAGGIO DI CAPRA' }, 
      description: { cs: 'mix salátů, grilovaný kozí sýr, vlašské ořechy, granátové jablko, balsamikový krém', en: 'mixed salad, grilled goat cheese, walnuts, pomegranate, balsamic cream', it: 'insalata mista, formaggio di capra grigliato, noci, melograno, crema di balsamico' }, 
      price: '275 Kč', 
      category: 'insalate' 
    },
    
    // ===== PASTA FRESCA – ČERSTVÉ TĚSTOVINY =====
    { 
      id: 'pasta-1', 
      name: { cs: 'SPAGHETTI ALLA CARBONARA', en: 'SPAGHETTI ALLA CARBONARA', it: 'SPAGHETTI ALLA CARBONARA' }, 
      description: { cs: 'vejce, guanciale, pecorino', en: 'eggs, guanciale, pecorino', it: 'uova, guanciale, pecorino' }, 
      price: '245 Kč', 
      category: 'pasta' 
    },
    { 
      id: 'pasta-2', 
      name: { cs: 'SPAGHETTI AGLIO, OLIO E PEPERONCINO', en: 'SPAGHETTI AGLIO, OLIO E PEPERONCINO', it: 'SPAGHETTI AGLIO, OLIO E PEPERONCINO' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '225 Kč', 
      category: 'pasta' 
    },
    { 
      id: 'pasta-3', 
      name: { cs: 'SPAGHETTI AGLIO, OLIO E PEPERONCINO - s pancettou', en: 'SPAGHETTI AGLIO, OLIO E PEPERONCINO - with pancetta', it: 'SPAGHETTI AGLIO, OLIO E PEPERONCINO - con pancetta' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '245 Kč', 
      category: 'pasta' 
    },
    { 
      id: 'pasta-4', 
      name: { cs: 'SPAGHETTI AGLIO, OLIO E PEPERONCINO - s krevetami', en: 'SPAGHETTI AGLIO, OLIO E PEPERONCINO - with shrimps', it: 'SPAGHETTI AGLIO, OLIO E PEPERONCINO - con gamberi' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '275 Kč', 
      category: 'pasta' 
    },
    { 
      id: 'pasta-5', 
      name: { cs: 'SPAGHETTI ALL´AMATRICIANA', en: 'SPAGHETTI ALL´AMATRICIANA', it: 'SPAGHETTI ALL´AMATRICIANA' }, 
      description: { cs: 'guanciale, san Marzano, pecorino romano, chilli', en: 'guanciale, san Marzano, pecorino romano, chilli', it: 'guanciale, san Marzano, pecorino romano, peperoncino' }, 
      price: '255 Kč', 
      category: 'pasta' 
    },
    { 
      id: 'pasta-6', 
      name: { cs: 'LASAGNE NAPOLETANE', en: 'LASAGNE NAPOLETANE', it: 'LASAGNE NAPOLETANE' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '295 Kč', 
      category: 'pasta' 
    },
    { 
      id: 'pasta-7', 
      name: { cs: 'RIGATONI ALLA BOSCAIOLA', en: 'RIGATONI ALLA BOSCAIOLA', it: 'RIGATONI ALLA BOSCAIOLA' }, 
      description: { cs: 'hříbky, pancetta, smetana, česnek, parmazán', en: 'porcini mushrooms, pancetta, cream, garlic, parmesan', it: 'funghi porcini, pancetta, panna, aglio, parmigiano' }, 
      price: '265 Kč', 
      category: 'pasta' 
    },
    { 
      id: 'pasta-8', 
      name: { cs: 'RIGATONI BURRATA, POMODORO E BASILICO', en: 'RIGATONI BURRATA, POMODORO E BASILICO', it: 'RIGATONI BURRATA, POMODORO E BASILICO' }, 
      description: { cs: 'san Marzano, burrata, bazalka', en: 'san Marzano, burrata, basil', it: 'san Marzano, burrata, basilico' }, 
      price: '255 Kč', 
      category: 'pasta' 
    },
    { 
      id: 'pasta-9', 
      name: { cs: 'TAGLIATELLE SALSICCIA E ROSMARINO', en: 'TAGLIATELLE SALSICCIA E ROSMARINO', it: 'TAGLIATELLE SALSICCIA E ROSMARINO' }, 
      description: { cs: 'salsiccia, červené víno, česnek, rozmarýn', en: 'salsiccia, red wine, garlic, rosemary', it: 'salsiccia, vino rosso, aglio, rosmarino' }, 
      price: '265 Kč', 
      category: 'pasta' 
    },
    { 
      id: 'pasta-10', 
      name: { cs: 'TAGLIATELLE AL TARTUFO', en: 'TAGLIATELLE AL TARTUFO', it: 'TAGLIATELLE AL TARTUFO' }, 
      description: { cs: 'černý lanýž, lanýžové máslo', en: 'black truffle, truffle butter', it: 'tartufo nero, burro al tartufo' }, 
      price: '295 Kč', 
      category: 'pasta' 
    },
    { 
      id: 'pasta-11', 
      name: { cs: 'RISOTTO FRUTTI DI MARE', en: 'RISOTTO FRUTTI DI MARE', it: 'RISOTTO FRUTTI DI MARE' }, 
      description: { cs: 'mořské plody, víno, cherry rajčata, česnek', en: 'seafood, wine, cherry tomatoes, garlic', it: 'frutti di mare, vino, pomodorini, aglio' }, 
      price: '325 Kč', 
      category: 'pasta' 
    },
    
    // ===== PIZZA =====
    { 
      id: 'pizza-1', 
      name: { cs: 'MARGHERITA', en: 'MARGHERITA', it: 'MARGHERITA' }, 
      description: { cs: 'rajčata san Marzano, mozzarella fior di latte, grana Padano, bazalka', en: 'san Marzano tomatoes, mozzarella fior di latte, grana Padano, basil', it: 'pomodori san Marzano, mozzarella fior di latte, grana Padano, basilico' }, 
      price: '255 Kč', 
      category: 'pizza' 
    },
    { 
      id: 'pizza-2', 
      name: { cs: 'DIAVOLA', en: 'DIAVOLA', it: 'DIAVOLA' }, 
      description: { cs: 'rajčata san Marzano, mozzarella fior di latte, grana Padano, pikantní salám ventricina, bazalka', en: 'san Marzano tomatoes, mozzarella fior di latte, grana Padano, spicy ventricina salami, basil', it: 'pomodori san Marzano, mozzarella fior di latte, grana Padano, salame ventricina piccante, basilico' }, 
      price: '275 Kč', 
      category: 'pizza' 
    },
    { 
      id: 'pizza-3', 
      name: { cs: 'LA PROVOLA NAPOLETANA E SALSICCIA', en: 'LA PROVOLA NAPOLETANA E SALSICCIA', it: 'LA PROVOLA NAPOLETANA E SALSICCIA' }, 
      description: { cs: 'rajčata san Marzano, uzený sýr provola affumicata, pecorino romano, grana Padano', en: 'san Marzano tomatoes, smoked provola affumicata cheese, pecorino romano, grana Padano', it: 'pomodori san Marzano, provola affumicata, pecorino romano, grana Padano' }, 
      price: '295 Kč', 
      category: 'pizza' 
    },
    { 
      id: 'pizza-4', 
      name: { cs: 'QUATTRO FORMAGGI', en: 'QUATTRO FORMAGGI', it: 'QUATTRO FORMAGGI' }, 
      description: { cs: 'mozzarella fior di latte, taleggio, uzený sýr provola affumicata, gorgonzola, pecorino romano, grana Padano', en: 'mozzarella fior di latte, taleggio, smoked provola affumicata cheese, gorgonzola, pecorino romano, grana Padano', it: 'mozzarella fior di latte, taleggio, provola affumicata, gorgonzola, pecorino romano, grana Padano' }, 
      price: '285 Kč', 
      category: 'pizza' 
    },
    { 
      id: 'pizza-5', 
      name: { cs: 'NDUJA CALABRESE', en: 'NDUJA CALABRESE', it: 'NDUJA CALABRESE' }, 
      description: { cs: 'rajčata san Marzano, Nduja spillinga, žlutá rajčata Vesuvio, mozzarella fior di latte, stracciatella, grana Padano, bazalka', en: 'san Marzano tomatoes, Nduja spillinga, yellow Vesuvio tomatoes, mozzarella fior di latte, stracciatella, grana Padano, basil', it: 'pomodori san Marzano, Nduja spillinga, pomodorini gialli del Vesuvio, mozzarella fior di latte, stracciatella, grana Padano, basilico' }, 
      price: '285 Kč', 
      category: 'pizza' 
    },
    { 
      id: 'pizza-6', 
      name: { cs: 'SALAME NAPOLI', en: 'SALAME NAPOLI', it: 'SALAME NAPOLI' }, 
      description: { cs: 'rajčata san Marzano, mozzarella fior di latte, salame Napoli, grana Padano, bazalka', en: 'san Marzano tomatoes, mozzarella fior di latte, salame Napoli, grana Padano, basil', it: 'pomodori san Marzano, mozzarella fior di latte, salame Napoli, grana Padano, basilico' }, 
      price: '265 Kč', 
      category: 'pizza' 
    },
    { 
      id: 'pizza-7', 
      name: { cs: 'CAPRICCIOSA', en: 'CAPRICCIOSA', it: 'CAPRICCIOSA' }, 
      description: { cs: 'rajčata san Marzano, mozzarella fior di latte, šunka, houby, grana Padano, bazalka', en: 'san Marzano tomatoes, mozzarella fior di latte, ham, mushrooms, grana Padano, basil', it: 'pomodori san Marzano, mozzarella fior di latte, prosciutto, funghi, grana Padano, basilico' }, 
      price: '285 Kč', 
      category: 'pizza' 
    },
    { 
      id: 'pizza-8', 
      name: { cs: 'MORTADELLA E PISTACCHIO', en: 'MORTADELLA E PISTACCHIO', it: 'MORTADELLA E PISTACCHIO' }, 
      description: { cs: 'mozzarella fior di latte, mortadella, pistácie, grana Padano, bazalka', en: 'mozzarella fior di latte, mortadella, pistachios, grana Padano, basil', it: 'mozzarella fior di latte, mortadella, pistacchi, grana Padano, basilico' }, 
      price: '295 Kč', 
      category: 'pizza' 
    },
    { 
      id: 'pizza-9', 
      name: { cs: 'BUFALA DI CAMPAGNIA', en: 'BUFALA DI CAMPAGNIA', it: 'BUFALA DI CAMPAGNIA' }, 
      description: { cs: 'rajčata san Marzano, mozzarella fior di latte, grana Padano, bazalka', en: 'san Marzano tomatoes, mozzarella fior di latte, grana Padano, basil', it: 'pomodori san Marzano, mozzarella fior di latte, grana Padano, basilico' }, 
      price: '295 Kč', 
      category: 'pizza' 
    },
    { 
      id: 'pizza-10', 
      name: { cs: 'NAPOLETANA', en: 'NAPOLETANA', it: 'NAPOLETANA' }, 
      description: { cs: 'rajčata san Marzano, mozzarella fior di latte, ančovičky, olivy taggiasche, grana Padano, oregáno', en: 'san Marzano tomatoes, mozzarella fior di latte, anchovies, Taggiasca olives, grana Padano, oregano', it: 'pomodori san Marzano, mozzarella fior di latte, acciughe, olive taggiasche, grana Padano, origano' }, 
      price: '285 Kč', 
      category: 'pizza' 
    },
    
    // ===== SECONDI – HLAVNÍ JÍDLA =====
    { 
      id: 'secondi-1', 
      name: { cs: 'PETTO DI POLLO IN CROSTA DI PARMIGIANO CON SPAGHETTI AL POMODORO', en: 'PETTO DI POLLO IN CROSTA DI PARMIGIANO CON SPAGHETTI AL POMODORO', it: 'PETTO DI POLLO IN CROSTA DI PARMIGIANO CON SPAGHETTI AL POMODORO' }, 
      description: { cs: '200g kuřecí prsa v parmazánové krustě, spaghetti s rajčatovou omáčkou san Marzano', en: '200g chicken breast in parmesan crust, spaghetti with san Marzano tomato sauce', it: '200g petto di pollo in crosta di parmigiano, spaghetti al pomodoro san Marzano' }, 
      price: '325 Kč', 
      category: 'secondi' 
    },
    { 
      id: 'secondi-2', 
      name: { cs: 'FILETTO DI MAIALE ALLA GRIGLIA CON GNOCCHI, RUCOLA E SALSA AL PEPE VERDE', en: 'FILETTO DI MAIALE ALLA GRIGLIA CON GNOCCHI, RUCOLA E SALSA AL PEPE VERDE', it: 'FILETTO DI MAIALE ALLA GRIGLIA CON GNOCCHI, RUCOLA E SALSA AL PEPE VERDE' }, 
      description: { cs: '200g grilované vepřové panenky, gnocchi, rukola, omáčka ze zeleného pepře', en: '200g grilled pork tenderloin, gnocchi, arugula, green pepper sauce', it: '200g filetto di maiale alla griglia, gnocchi, rucola, salsa al pepe verde' }, 
      price: '375 Kč', 
      category: 'secondi' 
    },
    { 
      id: 'secondi-3', 
      name: { cs: 'LOMBO DI VITELLO CON SALSA AL TARTUFO, GRENAILE E VERDURE GRIGLIATE', en: 'LOMBO DI VITELLO CON SALSA AL TARTUFO, GRENAILE E VERDURE GRIGLIATE', it: 'LOMBO DI VITELLO CON SALSA AL TARTUFO, GRENAILE E VERDURE GRIGLIATE' }, 
      description: { cs: '200g telecí karé, lanýžová omáčka, pečené grenaile, grilovaná zelenina', en: '200g veal loin, truffle sauce, roasted grenaille potatoes, grilled vegetables', it: '200g lombo di vitello, salsa al tartufo, patate grenaille, verdure grigliate' }, 
      price: '485 Kč', 
      category: 'secondi' 
    },
    { 
      id: 'secondi-4', 
      name: { cs: 'FLAP STEAK ALLA GRIGLIA CON SALSA CHIMICHURRI E PATATE ALLE VERDURE', en: 'FLAP STEAK ALLA GRIGLIA CON SALSA CHIMICHURRI E PATATE ALLE VERDURE', it: 'FLAP STEAK ALLA GRIGLIA CON SALSA CHIMICHURRI E PATATE ALLE VERDURE' }, 
      description: { cs: '200g flap steak, omáčka Chimichurri, zeleninové brambory', en: '200g flap steak, Chimichurri sauce, vegetable potatoes', it: '200g flap steak, salsa Chimichurri, patate alle verdure' }, 
      price: '425 Kč', 
      category: 'secondi' 
    },
    
    // ===== DOLCI – DEZERTY =====
    { 
      id: 'dolci-1', 
      name: { cs: 'TIRAMISÚ', en: 'TIRAMISÚ', it: 'TIRAMISÚ' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '145 Kč', 
      category: 'dolci' 
    },
    { 
      id: 'dolci-2', 
      name: { cs: 'CANNOLLI FATTI IN CASA', en: 'CANNOLLI FATTI IN CASA', it: 'CANNOLLI FATTI IN CASA' }, 
      description: { cs: 'Naše Cannolli plněné ricottou, pistáciové oříšky, čokoláda', en: 'Our homemade Cannoli filled with ricotta, pistachios, chocolate', it: 'I nostri Cannoli fatti in casa ripieni di ricotta, pistacchi, cioccolato' }, 
      price: '165 Kč', 
      category: 'dolci' 
    },
    { 
      id: 'dolci-3', 
      name: { cs: 'BROWNIE AL CARAMELLO SALATO, PECAN NOCI E GELATO ALLA VANIGLIA', en: 'BROWNIE AL CARAMELLO SALATO, PECAN NOCI E GELATO ALLA VANIGLIA', it: 'BROWNIE AL CARAMELLO SALATO, PECAN NOCI E GELATO ALLA VANIGLIA' }, 
      description: { cs: 'Brownie se slaným karamelem, pekanové ořechy, vanilková zmrzlina', en: 'Salted caramel brownie, pecans, vanilla ice cream', it: 'Brownie al caramello salato, noci pecan, gelato alla vaniglia' }, 
      price: '175 Kč', 
      category: 'dolci' 
    },
    { 
      id: 'dolci-4', 
      name: { cs: 'GELATO', en: 'GELATO', it: 'GELATO' }, 
      description: { cs: 'zmrzlina dle denní nabídky', en: 'ice cream of the day', it: 'gelato del giorno' }, 
      price: '85 Kč', 
      category: 'dolci' 
    },
    { 
      id: 'dolci-5', 
      name: { cs: 'TIRAMISÚ AL PISTACCHIO', en: 'TIRAMISÚ AL PISTACCHIO', it: 'TIRAMISÚ AL PISTACCHIO' }, 
      description: { cs: 'Naše pistáciové tiramisú (SPECIALE ALTRO DA TONY)', en: 'Our pistachio tiramisu (SPECIALE ALTRO DA TONY)', it: 'Il nostro tiramisù al pistacchio (SPECIALE ALTRO DA TONY)' }, 
      price: '185 Kč', 
      category: 'dolci' 
    },
    
    // ===== PROSECCO =====
    { 
      id: 'prosecco-1', 
      name: { cs: 'ASOLO SUPERIORE DOCG ASTORIA', en: 'ASOLO SUPERIORE DOCG ASTORIA', it: 'ASOLO SUPERIORE DOCG ASTORIA' }, 
      description: { cs: '0,1L', en: '0,1L', it: '0,1L' }, 
      price: '95 Kč', 
      category: 'wines_sparkling' 
    },
    { 
      id: 'prosecco-2', 
      name: { cs: 'ASOLO SUPERIORE DOCG ASTORIA', en: 'ASOLO SUPERIORE DOCG ASTORIA', it: 'ASOLO SUPERIORE DOCG ASTORIA' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '650 Kč', 
      category: 'wines_sparkling' 
    },
    { 
      id: 'prosecco-3', 
      name: { cs: 'FRANCIACORTA BRUT DOCG CASTALDI', en: 'FRANCIACORTA BRUT DOCG CASTALDI', it: 'FRANCIACORTA BRUT DOCG CASTALDI' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '1200 Kč', 
      category: 'wines_sparkling' 
    },
    
    // ===== BÍLÁ VÍNA =====
    { 
      id: 'wine-white-1', 
      name: { cs: 'PINOT GRIGIO IGT GORGO', en: 'PINOT GRIGIO IGT GORGO', it: 'PINOT GRIGIO IGT GORGO' }, 
      description: { cs: '0,15L', en: '0,15L', it: '0,15L' }, 
      price: '105 Kč', 
      category: 'wines_white' 
    },
    { 
      id: 'wine-white-2', 
      name: { cs: 'PINOT GRIGIO IGT GORGO', en: 'PINOT GRIGIO IGT GORGO', it: 'PINOT GRIGIO IGT GORGO' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '490 Kč', 
      category: 'wines_white' 
    },
    { 
      id: 'wine-white-3', 
      name: { cs: 'VERMENTINO IGP SALENTO TIMO', en: 'VERMENTINO IGP SALENTO TIMO', it: 'VERMENTINO IGP SALENTO TIMO' }, 
      description: { cs: '0,15L', en: '0,15L', it: '0,15L' }, 
      price: '100 Kč', 
      category: 'wines_white' 
    },
    { 
      id: 'wine-white-4', 
      name: { cs: 'VERMENTINO IGP SALENTO TIMO', en: 'VERMENTINO IGP SALENTO TIMO', it: 'VERMENTINO IGP SALENTO TIMO' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '470 Kč', 
      category: 'wines_white' 
    },
    { 
      id: 'wine-white-5', 
      name: { cs: 'CHARDONNAY DOC LANGHE PIEMONTE', en: 'CHARDONNAY DOC LANGHE PIEMONTE', it: 'CHARDONNAY DOC LANGHE PIEMONTE' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '560 Kč', 
      category: 'wines_white' 
    },
    { 
      id: 'wine-white-6', 
      name: { cs: 'SATRICO IGT', en: 'SATRICO IGT', it: 'SATRICO IGT' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '640 Kč', 
      category: 'wines_white' 
    },
    { 
      id: 'wine-white-7', 
      name: { cs: 'LUGANA PRESTIGE D.O.P.', en: 'LUGANA PRESTIGE D.O.P.', it: 'LUGANA PRESTIGE D.O.P.' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '690 Kč', 
      category: 'wines_white' 
    },
    
    // ===== RŮŽOVÉ VÍNO =====
    { 
      id: 'wine-rose-1', 
      name: { cs: 'MERLOT CALALENTA FANTINI', en: 'MERLOT CALALENTA FANTINI', it: 'MERLOT CALALENTA FANTINI' }, 
      description: { cs: '0,15L', en: '0,15L', it: '0,15L' }, 
      price: '125 Kč', 
      category: 'wines_rose' 
    },
    { 
      id: 'wine-rose-2', 
      name: { cs: 'MERLOT CALALENTA FANTINI', en: 'MERLOT CALALENTA FANTINI', it: 'MERLOT CALALENTA FANTINI' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '590 Kč', 
      category: 'wines_rose' 
    },
    
    // ===== ČERVENÁ VÍNA =====
    { 
      id: 'wine-red-1', 
      name: { cs: 'PRIMITIVO PUGLIA IGT SAN M. PUMO', en: 'PRIMITIVO PUGLIA IGT SAN M. PUMO', it: 'PRIMITIVO PUGLIA IGT SAN M. PUMO' }, 
      description: { cs: '0,15L', en: '0,15L', it: '0,15L' }, 
      price: '100 Kč', 
      category: 'wines_red' 
    },
    { 
      id: 'wine-red-2', 
      name: { cs: 'PRIMITIVO PUGLIA IGT SAN M. PUMO', en: 'PRIMITIVO PUGLIA IGT SAN M. PUMO', it: 'PRIMITIVO PUGLIA IGT SAN M. PUMO' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '480 Kč', 
      category: 'wines_red' 
    },
    { 
      id: 'wine-red-3', 
      name: { cs: 'MONTECUCCO DOC RIGOLETTO', en: 'MONTECUCCO DOC RIGOLETTO', it: 'MONTECUCCO DOC RIGOLETTO' }, 
      description: { cs: '0,15L', en: '0,15L', it: '0,15L' }, 
      price: '120 Kč', 
      category: 'wines_red' 
    },
    { 
      id: 'wine-red-4', 
      name: { cs: 'CANNONAU SARDEGNA DOC', en: 'CANNONAU SARDEGNA DOC', it: 'CANNONAU SARDEGNA DOC' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '510 Kč', 
      category: 'wines_red' 
    },
    { 
      id: 'wine-red-5', 
      name: { cs: 'MONTECUCCO DOC RIGOLETTO', en: 'MONTECUCCO DOC RIGOLETTO', it: 'MONTECUCCO DOC RIGOLETTO' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '540 Kč', 
      category: 'wines_red' 
    },
    { 
      id: 'wine-red-6', 
      name: { cs: 'BARBERA ASTI DOCG', en: 'BARBERA ASTI DOCG', it: 'BARBERA ASTI DOCG' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '600 Kč', 
      category: 'wines_red' 
    },
    { 
      id: 'wine-red-7', 
      name: { cs: 'SANGIOVESE DON CAMILLO', en: 'SANGIOVESE DON CAMILLO', it: 'SANGIOVESE DON CAMILLO' }, 
      description: { cs: '0,75L', en: '0,75L', it: '0,75L' }, 
      price: '690 Kč', 
      category: 'wines_red' 
    },
    
    // ===== KÁVA - TEPLÉ NÁPOJE =====
    { 
      id: 'coffee-1', 
      name: { cs: 'ESPRESSO', en: 'ESPRESSO', it: 'ESPRESSO' }, 
      description: { cs: 'KÁVU MÁME Z RODINNÉ PRAŽÍRNY COFFEE LIMIT', en: 'We serve coffee from the family roastery Coffee Limit', it: 'Serviamo caffè della torrefazione di famiglia Coffee Limit' }, 
      price: '58 Kč', 
      category: 'coffee' 
    },
    { 
      id: 'coffee-2', 
      name: { cs: 'RISTRETTO', en: 'RISTRETTO', it: 'RISTRETTO' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '58 Kč', 
      category: 'coffee' 
    },
    { 
      id: 'coffee-3', 
      name: { cs: 'ESPRESSO DOPPIO', en: 'ESPRESSO DOPPIO', it: 'ESPRESSO DOPPIO' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '78 Kč', 
      category: 'coffee' 
    },
    { 
      id: 'coffee-4', 
      name: { cs: 'ESPRESSO MACHIATO', en: 'ESPRESSO MACHIATO', it: 'ESPRESSO MACHIATO' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '68 Kč', 
      category: 'coffee' 
    },
    { 
      id: 'coffee-5', 
      name: { cs: 'CAPPUCCINO', en: 'CAPPUCCINO', it: 'CAPPUCCINO' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '75 Kč', 
      category: 'coffee' 
    },
    { 
      id: 'coffee-6', 
      name: { cs: 'CAFFÉ LATTE', en: 'CAFFÉ LATTE', it: 'CAFFÉ LATTE' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '85 Kč', 
      category: 'coffee' 
    },
    { 
      id: 'coffee-7', 
      name: { cs: 'ČAJ HARNEY & SONS', en: 'TEA HARNEY & SONS', it: 'TÈ HARNEY & SONS' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '68 Kč', 
      category: 'coffee' 
    },
    { 
      id: 'coffee-8', 
      name: { cs: 'ČAJ ČERSTVÝ (ZÁZVOROVÝ, MÁTOVÝ)', en: 'FRESH TEA (GINGER, MINT)', it: 'TÈ FRESCO (ZENZERO, MENTA)' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '78 Kč', 
      category: 'coffee' 
    },
    
    // ===== NEALKO =====
    { 
      id: 'nonalc-1', 
      name: { cs: 'COCA COLA / ZERO', en: 'COCA COLA / ZERO', it: 'COCA COLA / ZERO' }, 
      description: { cs: '0,2L', en: '0,2L', it: '0,2L' }, 
      price: '75 Kč', 
      category: 'nonalcoholic' 
    },
    { 
      id: 'nonalc-2', 
      name: { cs: 'TONIC THOMAS HENRY', en: 'TONIC THOMAS HENRY', it: 'TONIC THOMAS HENRY' }, 
      description: { cs: '0,2L', en: '0,2L', it: '0,2L' }, 
      price: '78 Kč', 
      category: 'nonalcoholic' 
    },
    { 
      id: 'nonalc-3', 
      name: { cs: 'DOMÁCÍ LIMONÁDY (DENNÍ NABÍDKA)', en: 'HOMEMADE LEMONADES (DAILY OFFER)', it: 'LIMONATE FATTE IN CASA (OFFERTA GIORNALIERA)' }, 
      description: { cs: '0,3L', en: '0,3L', it: '0,3L' }, 
      price: '85 Kč', 
      category: 'nonalcoholic' 
    },
    { 
      id: 'nonalc-4', 
      name: { cs: 'VODA FILTROVANÁ (PERLIVÁ, NEPERLIVÁ, JEMNĚ PERLIVÁ)', en: 'FILTERED WATER (SPARKLING, STILL, GENTLY SPARKLING)', it: 'ACQUA FILTRATA (FRIZZANTE, NATURALE, LEGGERMENTE FRIZZANTE)' }, 
      description: { cs: '0,7L', en: '0,7L', it: '0,7L' }, 
      price: '65 Kč', 
      category: 'nonalcoholic' 
    },
    
    // ===== PIVO =====
    { 
      id: 'beer-1', 
      name: { cs: 'PILSNER URQUELL', en: 'PILSNER URQUELL', it: 'PILSNER URQUELL' }, 
      description: { cs: '0,33L', en: '0,33L', it: '0,33L' }, 
      price: '75 Kč', 
      category: 'beers' 
    },
    { 
      id: 'beer-2', 
      name: { cs: 'BIRELL SVĚTLÝ NEALKO', en: 'BIRELL NON-ALCOHOLIC', it: 'BIRELL ANALCOLICA' }, 
      description: { cs: '0,33L', en: '0,33L', it: '0,33L' }, 
      price: '55 Kč', 
      category: 'beers' 
    },
    
    // ===== APERITIVY/MÍCHANÉ NÁPOJE =====
    { 
      id: 'aperitivo-1', 
      name: { cs: 'CRODINO NEALKO', en: 'CRODINO NON-ALCOHOLIC', it: 'CRODINO ANALCOLICO' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '85 Kč', 
      category: 'aperitivi' 
    },
    { 
      id: 'aperitivo-2', 
      name: { cs: 'CAMPARI', en: 'CAMPARI', it: 'CAMPARI' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '95 Kč', 
      category: 'aperitivi' 
    },
    { 
      id: 'aperitivo-3', 
      name: { cs: 'APEROL', en: 'APEROL', it: 'APEROL' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '95 Kč', 
      category: 'aperitivi' 
    },
    { 
      id: 'aperitivo-4', 
      name: { cs: 'APEROL SPRITZ', en: 'APEROL SPRITZ', it: 'APEROL SPRITZ' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '150 Kč', 
      category: 'aperitivi' 
    },
    { 
      id: 'aperitivo-5', 
      name: { cs: 'LIMONCELLO SPRITZ', en: 'LIMONCELLO SPRITZ', it: 'LIMONCELLO SPRITZ' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '150 Kč', 
      category: 'aperitivi' 
    },
    { 
      id: 'aperitivo-6', 
      name: { cs: 'NEGRONI', en: 'NEGRONI', it: 'NEGRONI' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '165 Kč', 
      category: 'aperitivi' 
    },
    { 
      id: 'aperitivo-7', 
      name: { cs: 'BOB GIMLET', en: 'BOB GIMLET', it: 'BOB GIMLET' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '175 Kč', 
      category: 'aperitivi' 
    },
    { 
      id: 'aperitivo-8', 
      name: { cs: 'GIN TONIC', en: 'GIN TONIC', it: 'GIN TONIC' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '185 Kč', 
      category: 'aperitivi' 
    },
    { 
      id: 'aperitivo-9', 
      name: { cs: 'BLUE GIN TONIC', en: 'BLUE GIN TONIC', it: 'BLUE GIN TONIC' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '195 Kč', 
      category: 'aperitivi' 
    },
    { 
      id: 'aperitivo-10', 
      name: { cs: 'VODKA SODA LIMETA', en: 'VODKA SODA LIME', it: 'VODKA SODA LIME' }, 
      description: { cs: '', en: '', it: '' }, 
      price: '185 Kč', 
      category: 'aperitivi' 
    },
    
    // ===== LIKÉRY/DESTILÁTY =====
    { 
      id: 'digestivo-1', 
      name: { cs: 'LIMONCELLO BACIO DELLE MUSE', en: 'LIMONCELLO BACIO DELLE MUSE', it: 'LIMONCELLO BACIO DELLE MUSE' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '75 Kč', 
      category: 'digestivi' 
    },
    { 
      id: 'digestivo-2', 
      name: { cs: 'SAMBUCA LAZZARONI', en: 'SAMBUCA LAZZARONI', it: 'SAMBUCA LAZZARONI' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '85 Kč', 
      category: 'digestivi' 
    },
    { 
      id: 'digestivo-3', 
      name: { cs: 'AMARO MONTENEGRO', en: 'AMARO MONTENEGRO', it: 'AMARO MONTENEGRO' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '115 Kč', 
      category: 'digestivi' 
    },
    { 
      id: 'digestivo-4', 
      name: { cs: 'GLORIA – KÁVOVÝ LIKÉR', en: 'GLORIA – COFFEE LIQUEUR', it: 'GLORIA – LIQUORE AL CAFFÈ' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '155 Kč', 
      category: 'digestivi' 
    },
    { 
      id: 'digestivo-5', 
      name: { cs: 'WILLIAMS HRUŠKA RISERVA', en: 'WILLIAMS PEAR RISERVA', it: 'WILLIAMS PERA RISERVA' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '150 Kč', 
      category: 'digestivi' 
    },
    { 
      id: 'digestivo-6', 
      name: { cs: 'FASSBIND MALINOVICE', en: 'FASSBIND RASPBERRY', it: 'FASSBIND LAMPONE' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '145 Kč', 
      category: 'digestivi' 
    },
    { 
      id: 'digestivo-7', 
      name: { cs: 'VODKA BELUGA CELEBRATION', en: 'VODKA BELUGA CELEBRATION', it: 'VODKA BELUGA CELEBRATION' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '145 Kč', 
      category: 'digestivi' 
    },
    { 
      id: 'digestivo-8', 
      name: { cs: 'NÁŠ VÝBĚR RUMŮ', en: 'OUR SELECTION OF RUMS', it: 'LA NOSTRA SELEZIONE DI RUM' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '140 Kč', 
      category: 'digestivi' 
    },
    
    // ===== GRAPPA =====
    { 
      id: 'grappa-1', 
      name: { cs: 'GRAPPA RISERVA BACIO DELLE MUSE', en: 'GRAPPA RISERVA BACIO DELLE MUSE', it: 'GRAPPA RISERVA BACIO DELLE MUSE' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '85 Kč', 
      category: 'grappa' 
    },
    { 
      id: 'grappa-2', 
      name: { cs: 'GRAPPA MOSCATO BACIO DELLE MUSE', en: 'GRAPPA MOSCATO BACIO DELLE MUSE', it: 'GRAPPA MOSCATO BACIO DELLE MUSE' }, 
      description: { cs: '0,04L', en: '0,04L', it: '0,04L' }, 
      price: '85 Kč', 
      category: 'grappa' 
    },
  ];
}

// Get main menu
app.get("/make-server-d880a0b3/main-menu", async (c) => {
  console.log("👉 GET /main-menu request received");
  try {
    let menu;
    try {
      menu = await kv.get("main-menu");
    } catch (e) {
      console.error("KV get failed for main-menu:", e);
      menu = null;
    }
    
    // If menu is empty or doesn't exist, initialize with default data
    if (!menu || (Array.isArray(menu) && menu.length === 0)) {
      console.log("📋 Menu is empty, initializing with default menu items...");
      const defaultMenu = getDefaultMenuItems();
      try {
        await kv.set("main-menu", defaultMenu);
      } catch (e) {
        console.error("KV set failed for main-menu:", e);
      }
      menu = defaultMenu;
      console.log(`✅ Initialized menu with ${defaultMenu.length} items`);
    } else {
      // Logic to restore missing items (e.g. reverse deletion) or fix categories
      // This is a safety mechanism to ensure the menu is always complete if requested
      
      const defaultMenu = getDefaultMenuItems();
      let changed = false;
      let currentMenu = Array.isArray(menu) ? [...menu] : [];
      
      // 1. Fix 'primi' -> 'pasta' migration
      currentMenu = currentMenu.map((item: any) => {
        if (item.category === 'primi') {
          changed = true;
          return { ...item, category: 'pasta' };
        }
        return item;
      });

      // 2. Check for missing categories and restore them if they are completely missing
      // (This handles the 'reverse deletion' request conservatively)
      const categoriesToCheck = ['pasta', 'insalate', 'antipasti', 'pizza', 'secondi', 'dolci'];
      
      categoriesToCheck.forEach(cat => {
        const hasCategory = currentMenu.some((item: any) => item.category === cat);
        if (!hasCategory) {
          console.log(`⚠️ Category '${cat}' is missing from DB. Restoring default items...`);
          const itemsToRestore = defaultMenu.filter(item => item.category === cat);
          currentMenu = [...currentMenu, ...itemsToRestore];
          changed = true;
        }
      });
      
      if (changed) {
         console.log("♻️ Menu auto-repaired/migrated");
         await kv.set("main-menu", currentMenu);
         menu = currentMenu;
      }
    }

    return c.json({ success: true, menu });
  } catch (error) {
    console.error("Error fetching main menu:", error);
    return c.json({ error: "Failed to fetch main menu", details: String(error) }, 500);
  }
});

// Save main menu
app.post("/make-server-d880a0b3/main-menu", async (c) => {
  try {
    const body = await c.req.json();
    const { items } = body;

    // Ensure all items have unique IDs and hidden property
    const itemsWithIds = (items || []).map((item: any, index: number) => {
      const processedItem = { ...item };
      
      // Generate a new unique ID if missing
      if (!processedItem.id || processedItem.id === '') {
        processedItem.id = `menu-item-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`;
      }
      
      // Ensure hidden property is explicitly set to false if undefined
      if (processedItem.hidden === undefined || processedItem.hidden === null) {
        processedItem.hidden = false;
      }
      
      return processedItem;
    });

    // Check for duplicate IDs and fix them
    const ids = new Set();
    const deduplicatedItems = itemsWithIds.map((item: any, index: number) => {
      if (ids.has(item.id)) {
        console.warn(`⚠️ Duplicate ID found: ${item.id}. Generating new ID.`);
        const newId = `menu-item-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`;
        ids.add(newId);
        return { ...item, id: newId };
      }
      ids.add(item.id);
      return item;
    });

    await kv.set("main-menu", deduplicatedItems);

    console.log(`Main menu saved with ${deduplicatedItems.length} items`);
    return c.json({ success: true, menu: deduplicatedItems });
  } catch (error) {
    console.error("Error saving main menu:", error);
    return c.json({ error: "Failed to save main menu", details: String(error) }, 500);
  }
});

// Seed main menu with complete data (including drinks)
app.post("/make-server-d880a0b3/menu/seed", async (c) => {
  try {
    const body = await c.req.json();
    const { menuItems } = body;

    if (!menuItems || !Array.isArray(menuItems)) {
      return c.json({ error: "Invalid menu items format" }, 400);
    }

    await kv.set("main-menu", menuItems);

    console.log(`Menu seeded with ${menuItems.length} items`);
    return c.json({ success: true, count: menuItems.length, menu: menuItems });
  } catch (error) {
    console.error("Error seeding menu:", error);
    return c.json({ error: "Failed to seed menu", details: String(error) }, 500);
  }
});

// Delete main menu (force reinit)
app.delete("/make-server-d880a0b3/main-menu", async (c) => {
  try {
    await kv.del("main-menu");
    console.log("Main menu deleted - will reinitialize on next GET");
    return c.json({ success: true, message: "Menu deleted" });
  } catch (error) {
    console.error("Error deleting main menu:", error);
    return c.json({ error: "Failed to delete main menu", details: String(error) }, 500);
  }
});

// ==================== NEWSLETTER & CONTACT MANAGEMENT ====================

// Newsletter subscription (public endpoint)
app.post("/make-server-d880a0b3/newsletter/subscribe", async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return c.json({ error: "Valid email is required" }, 400);
    }

    // Check if contact already exists
    const existingContact = await kv.get(`contact:${email}`);
    
    if (existingContact) {
      // Update consent status if needed
      if (existingContact.consent_status === 'CONSENT_GRANTED') {
        return c.json({ success: true, message: "Already subscribed" });
      }
      
      // Update to CONSENT_GRANTED
      existingContact.consent_status = 'CONSENT_GRANTED';
      existingContact.consent_timestamp = new Date().toISOString();
      await kv.set(`contact:${email}`, existingContact);
      
      console.log(`✅ Newsletter: Updated consent for ${email}`);
      return c.json({ success: true, message: "Subscription activated" });
    }

    // Create new contact with consent
    const contact = {
      email,
      source: 'newsletter_signup',
      created_at: new Date().toISOString(),
      consent_status: 'CONSENT_GRANTED',
      consent_timestamp: new Date().toISOString(),
      tags: []
    };

    await kv.set(`contact:${email}`, contact);
    
    // Log audit
    await kv.set(`audit:newsletter-${Date.now()}`, {
      actor: 'system',
      action: 'newsletter_subscribe',
      details: `New newsletter subscription: ${email}`,
      timestamp: new Date().toISOString()
    });

    console.log(`✅ Newsletter: New subscription from ${email}`);
    return c.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return c.json({ error: "Failed to subscribe", details: String(error) }, 500);
  }
});

// ==================== ADMIN ENDPOINTS ====================

// Get all contacts
app.get("/make-server-d880a0b3/admin/contacts", async (c) => {
  try {
    const contacts = await kv.getByPrefix('contact:');
    
    console.log(`📋 Admin: Retrieved ${contacts.length} contacts`);
    return c.json({ contacts });
  } catch (error) {
    console.error("Error loading contacts:", error);
    return c.json({ error: "Failed to load contacts", details: String(error) }, 500);
  }
});

// Get contact count with filters
app.get("/make-server-d880a0b3/admin/contacts/count", async (c) => {
  try {
    const status = c.req.query('status');
    const contacts = await kv.getByPrefix('contact:');
    
    let filteredContacts = contacts;
    if (status && status !== 'ALL') {
      filteredContacts = contacts.filter((c: any) => c.consent_status === status);
    }
    
    const eligibleCount = contacts.filter((c: any) => 
      c.consent_status === 'CONSENT_GRANTED'
    ).length;
    
    return c.json({ 
      count: filteredContacts.length,
      eligible_count: eligibleCount 
    });
  } catch (error) {
    console.error("Error counting contacts:", error);
    return c.json({ error: "Failed to count contacts", details: String(error) }, 500);
  }
});

// Export contacts as CSV
app.post("/make-server-d880a0b3/admin/contacts/export", async (c) => {
  try {
    const body = await c.req.json();
    const { emails } = body;

    const contacts = await kv.getByPrefix('contact:');
    const filtered = emails && emails.length > 0
      ? contacts.filter((c: any) => emails.includes(c.email))
      : contacts;

    // Generate CSV
    const csvHeader = 'Email,Source,Created At,Consent Status,Consent Timestamp,Tags\n';
    const csvRows = filtered.map((c: any) => {
      return `${c.email},${c.source},${c.created_at},${c.consent_status},${c.consent_timestamp || ''},${(c.tags || []).join('|')}`;
    }).join('\n');
    
    const csv = csvHeader + csvRows;

    // Log audit
    await kv.set(`audit:export-${Date.now()}`, {
      actor: 'admin',
      action: 'export_csv',
      details: `Exported ${filtered.length} contacts`,
      timestamp: new Date().toISOString()
    });

    console.log(`📥 Admin: Exported ${filtered.length} contacts`);
    
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="contacts-${new Date().toISOString().split('T')[0]}.csv"`
      }
    });
  } catch (error) {
    console.error("Export error:", error);
    return c.json({ error: "Failed to export contacts", details: String(error) }, 500);
  }
});

// Mark contacts as NO_MARKETING
app.post("/make-server-d880a0b3/admin/contacts/mark-no-marketing", async (c) => {
  try {
    const body = await c.req.json();
    const { emails } = body;

    if (!emails || emails.length === 0) {
      return c.json({ error: "No emails provided" }, 400);
    }

    for (const email of emails) {
      const contact = await kv.get(`contact:${email}`);
      if (contact) {
        contact.consent_status = 'NO_MARKETING';
        contact.suppressed_at = new Date().toISOString();
        await kv.set(`contact:${email}`, contact);
      }
    }

    // Log audit
    await kv.set(`audit:no-marketing-${Date.now()}`, {
      actor: 'admin',
      action: 'mark_no_marketing',
      details: `Marked ${emails.length} contacts as NO_MARKETING`,
      timestamp: new Date().toISOString()
    });

    console.log(`🚫 Admin: Marked ${emails.length} contacts as NO_MARKETING`);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error marking NO_MARKETING:", error);
    return c.json({ error: "Failed to update contacts", details: String(error) }, 500);
  }
});

// Get campaigns
app.get("/make-server-d880a0b3/admin/campaigns", async (c) => {
  try {
    const campaigns = await kv.getByPrefix('campaign:');
    
    console.log(`📧 Admin: Retrieved ${campaigns.length} campaigns`);
    return c.json({ campaigns });
  } catch (error) {
    console.error("Error loading campaigns:", error);
    return c.json({ error: "Failed to load campaigns", details: String(error) }, 500);
  }
});

// Send campaign
app.post("/make-server-d880a0b3/admin/campaigns/send", async (c) => {
  try {
    const body = await c.req.json();
    const { name, type, filter_status, subject, html_content, from_name, from_email, reply_to } = body;

    if (!name || !type || !subject || !html_content) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Get contacts based on filter
    const allContacts = await kv.getByPrefix('contact:');
    
    let recipients = [];
    if (type === 'MARKETING') {
      // Marketing: Only CONSENT_GRANTED
      recipients = allContacts.filter((c: any) => c.consent_status === 'CONSENT_GRANTED');
    } else {
      // SERVICE: Exclude suppression list
      if (filter_status === 'ALL') {
        recipients = allContacts.filter((c: any) => 
          c.consent_status !== 'NO_MARKETING' && 
          c.consent_status !== 'UNSUBSCRIBED'
        );
      } else {
        recipients = allContacts.filter((c: any) => c.consent_status === filter_status);
      }
    }

    if (recipients.length === 0) {
      return c.json({ error: "No eligible recipients found" }, 400);
    }

    // Create campaign record
    const campaign = {
      id: `campaign-${Date.now()}`,
      name,
      type,
      status: 'sent',
      created_at: new Date().toISOString(),
      sent_at: new Date().toISOString(),
      recipient_count: recipients.length,
      subject,
      filter_status
    };

    await kv.set(`campaign:${campaign.id}`, campaign);

    // Send emails via Resend (batch mode)
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    
    if (RESEND_API_KEY) {
      console.log(`📧 Sending campaign "${name}" to ${recipients.length} recipients...`);
      
      // Send in batches of 50 (Resend limit)
      const batchSize = 50;
      for (let i = 0; i < recipients.length; i += batchSize) {
        const batch = recipients.slice(i, i + batchSize);
        
        try {
          const response = await fetch('https://api.resend.com/emails/batch', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              batch.map((contact: any) => ({
                from: `${from_name} <${from_email}>`,
                to: [contact.email],
                subject,
                html: html_content,
                reply_to: reply_to
              }))
            ),
          });

          if (!response.ok) {
            const error = await response.json();
            console.error(`❌ Batch ${i / batchSize + 1} failed:`, error);
          } else {
            console.log(`✅ Batch ${i / batchSize + 1} sent (${batch.length} emails)`);
          }
        } catch (error) {
          console.error(`❌ Error sending batch ${i / batchSize + 1}:`, error);
        }
      }
    } else {
      console.warn('⚠️ RESEND_API_KEY not configured - campaign recorded but emails not sent');
    }

    // Log audit
    await kv.set(`audit:campaign-${Date.now()}`, {
      actor: 'admin',
      action: 'send_campaign',
      details: `Sent campaign "${name}" to ${recipients.length} recipients`,
      timestamp: new Date().toISOString()
    });

    console.log(`✅ Campaign "${name}" completed`);
    return c.json({ success: true, campaign, recipients_sent: recipients.length });
  } catch (error) {
    console.error("Campaign send error:", error);
    return c.json({ error: "Failed to send campaign", details: String(error) }, 500);
  }
});

// Get suppression list
app.get("/make-server-d880a0b3/admin/suppression", async (c) => {
  try {
    const contacts = await kv.getByPrefix('contact:');
    const suppressed = contacts.filter((c: any) => 
      c.consent_status === 'NO_MARKETING' || 
      c.consent_status === 'UNSUBSCRIBED'
    );

    const formatted = suppressed.map((c: any) => ({
      email: c.email,
      reason: c.consent_status,
      suppressed_at: c.suppressed_at || c.created_at,
      source: c.source
    }));

    console.log(`🚫 Admin: Retrieved ${formatted.length} suppressed contacts`);
    return c.json({ suppressed: formatted });
  } catch (error) {
    console.error("Error loading suppression list:", error);
    return c.json({ error: "Failed to load suppression list", details: String(error) }, 500);
  }
});

// Import suppression list
app.post("/make-server-d880a0b3/admin/suppression/import", async (c) => {
  try {
    const body = await c.req.json();
    const { emails } = body;

    if (!emails || emails.length === 0) {
      return c.json({ error: "No emails provided" }, 400);
    }

    let imported = 0;
    for (const email of emails) {
      const existing = await kv.get(`contact:${email}`);
      
      if (existing) {
        existing.consent_status = 'UNSUBSCRIBED';
        existing.suppressed_at = new Date().toISOString();
        await kv.set(`contact:${email}`, existing);
      } else {
        // Create new suppressed contact
        await kv.set(`contact:${email}`, {
          email,
          source: 'manual_import',
          created_at: new Date().toISOString(),
          consent_status: 'UNSUBSCRIBED',
          suppressed_at: new Date().toISOString(),
          tags: []
        });
      }
      imported++;
    }

    // Log audit
    await kv.set(`audit:suppression-import-${Date.now()}`, {
      actor: 'admin',
      action: 'import_suppression',
      details: `Imported ${imported} emails to suppression list`,
      timestamp: new Date().toISOString()
    });

    console.log(`🚫 Admin: Imported ${imported} emails to suppression list`);
    return c.json({ success: true, imported });
  } catch (error) {
    console.error("Suppression import error:", error);
    return c.json({ error: "Failed to import suppression list", details: String(error) }, 500);
  }
});

// Log audit entry
app.post("/make-server-d880a0b3/admin/audit-log", async (c) => {
  try {
    const body = await c.req.json();
    const { actor, action, details, timestamp } = body;

    await kv.set(`audit:${action}-${Date.now()}`, {
      actor,
      action,
      details,
      timestamp
    });

    return c.json({ success: true });
  } catch (error) {
    console.error("Audit log error:", error);
    return c.json({ error: "Failed to log audit", details: String(error) }, 500);
  }
});

Deno.serve(app.fetch);
