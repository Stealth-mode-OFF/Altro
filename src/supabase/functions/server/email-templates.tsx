// Safe Email Templates for Altro Da Tony
// Optimized for Seznam.cz deliverability (no external fonts, inline styles only)

// Function to decline Czech names (vocative case - 5th case)
export function declineNameToVocative(fullName: string): string {
  if (!fullName) return "";
  
  const firstName = fullName.trim().split(' ')[0];
  
  // Common Czech name declensions
  const declensions: { [key: string]: string } = {
    'Petr': 'Petře', 'Pavel': 'Pavle', 'Jan': 'Jane', 'Tomáš': 'Tomáši',
    'Martin': 'Martine', 'Jakub': 'Jakube', 'Michal': 'Michale', 'David': 'Davide',
    'Jiří': 'Jiří', 'Ondřej': 'Ondřeji', 'Lukáš': 'Lukáši', 'Marek': 'Marku',
    'Daniel': 'Danieli', 'Josef': 'Josefe', 'Václav': 'Václave', 'Karel': 'Karle',
    'Milan': 'Milane', 'Radek': 'Radku', 'Filip': 'Filipe', 'Adam': 'Adame',
    'Patrik': 'Patriku', 'Matěj': 'Matěji', 'Antonín': 'Antoníne', 'Miroslav': 'Miroslave',
    'Jaroslav': 'Jaroslave', 'Vojtěch': 'Vojtěchu', 'Vladimír': 'Vladimíre',
    'Stanislav': 'Stanislave', 'Zdeněk': 'Zdeňku', 'Aleš': 'Aleši', 'Robert': 'Roberte',
    'Luboš': 'Luboši', 'Jaromír': 'Jaromíre', 'Vlastimil': 'Vlastimile', 'Richard': 'Richarde',
    'Eva': 'Evo', 'Anna': 'Anno', 'Jana': 'Jano', 'Marie': 'Marie', 'Petra': 'Petro',
    'Lenka': 'Lenko', 'Kateřina': 'Kateřino', 'Lucie': 'Lucie', 'Hana': 'Hano',
    'Tereza': 'Terezo', 'Veronika': 'Veroniko', 'Markéta': 'Markéto', 'Martina': 'Martino',
    'Monika': 'Moniko', 'Ivana': 'Ivano', 'Barbora': 'Barbaro', 'Alena': 'Aleno',
    'Michaela': 'Michaelo', 'Zuzana': 'Zuzano', 'Andrea': 'Andreo', 'Kristýna': 'Kristýno',
    'Simona': 'Simono', 'Nikola': 'Nikolo', 'Klára': 'Kláro', 'Pavla': 'Pavlo',
    'Pavlína': 'Pavlíno', 'Karolína': 'Karolíno', 'Adéla': 'Adélo', 'Natálie': 'Natálie',
    'Eliška': 'Eliško', 'Daniela': 'Danielo', 'Věra': 'Věro', 'Irena': 'Ireno',
    'Jitka': 'Jitko', 'Romana': 'Romano', 'Šárka': 'Šárko', 'Kamila': 'Kamilo'
  };
  
  if (declensions[firstName]) {
    return declensions[firstName];
  }
  
  const lower = firstName.toLowerCase();
  
  // Basic rules
  if (!lower.match(/[aeiouyáéíóúůýě]$/)) {
    return firstName + 'e'; // Male consonant ending usually takes -e
  }
  if (lower.endsWith('a')) {
    return firstName.slice(0, -1) + 'o'; // Female -a -> -o
  }
  
  return firstName; // Default fallback
}

// Common styles
const FONT_STACK = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif';
const SERIF_STACK = 'Georgia, "Times New Roman", Times, serif';
const MAPS_URL = "https://maps.app.goo.gl/2HSXVSZx1cJtphZGA?g_st=ipc";
const BRAND_COLOR = "#c94b4b"; // Italian red
const BRAND_COLOR_DARK = "#a03b3b";
const BG_COLOR = "#fafafa"; // Warm light grey for background
const CARD_BG = "#ffffff";

const commonHeader = `
  <!DOCTYPE html>
  <html lang="cs">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Altro da Tony</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: ${FONT_STACK}; background-color: ${BG_COLOR}; color: #333333; -webkit-font-smoothing: antialiased;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: ${BG_COLOR};">
      <tr>
        <td align="center" style="padding: 40px 10px;">
          <table width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: ${CARD_BG}; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
            <!-- Header -->
            <tr>
              <td align="center" style="padding: 40px 40px 30px 40px; border-bottom: 1px solid #f0f0f0;">
                <h1 style="margin: 0; font-family: ${SERIF_STACK}; color: #1a1a1a; font-size: 32px; font-weight: normal; letter-spacing: -0.5px;">Altro da Tony</h1>
                <p style="margin: 8px 0 0 0; color: ${BRAND_COLOR}; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Ristorante Italiano</p>
              </td>
            </tr>
`;

const commonFooter = (reservationId: string) => `
            <!-- Footer -->
            <tr>
              <td style="padding: 20px 40px 30px 40px; background-color: #ffffff;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" style="padding-top: 20px; border-top: 1px dashed #eeeeee;">
                      <p style="margin: 0; color: #aaaaaa; font-size: 11px;">ID rezervace: ${reservationId}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <!-- Space below card -->
          <table width="600" border="0" cellspacing="0" cellpadding="0">
            <tr><td height="40"></td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;

// 1. Owner Notification (Kept functional/internal style)
export function getOwnerNotificationEmail(reservation: any): string {
  const dateStr = new Date(reservation.date).toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  
  return `
    ${commonHeader}
    <tr>
      <td style="padding: 40px;">
        <h2 style="margin: 0 0 25px 0; font-family: ${SERIF_STACK}; color: #333333; font-size: 20px;">Nová žádost o rezervaci</h2>
        
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #fafafa; border-radius: 8px; padding: 25px;">
          <tr>
            <td style="padding-bottom: 15px; border-bottom: 1px solid #eeeeee;">
              <p style="margin: 0 0 5px 0; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Kdy</p>
              <p style="margin: 0; font-size: 16px; color: #111111; font-weight: 600;">${dateStr}</p>
              <p style="margin: 0; font-size: 16px; color: ${BRAND_COLOR}; font-weight: 600;">${reservation.time}</p>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 15px;">
              <p style="margin: 0 0 5px 0; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Kdo</p>
              <p style="margin: 0; font-size: 16px; color: #111111;">${reservation.name}</p>
              <p style="margin: 0; font-size: 14px; color: #555555;">${reservation.guests} ${reservation.guests === '1' ? 'osoba' : 'osob'}</p>
              <div style="margin-top: 10px; font-size: 14px;">
                <a href="tel:${reservation.phone}" style="color: #333333; text-decoration: none;">${reservation.phone}</a><br>
                <a href="mailto:${reservation.email}" style="color: #333333; text-decoration: none;">${reservation.email}</a>
              </div>
            </td>
          </tr>
          ${reservation.message ? `
          <tr>
            <td style="padding-top: 15px; border-top: 1px solid #eeeeee;">
              <p style="margin: 0 0 5px 0; color: #888888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Poznámka</p>
              <p style="margin: 0; font-size: 14px; color: #333333; font-style: italic;">"${reservation.message}"</p>
            </td>
          </tr>
          ` : ''}
        </table>
        
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 30px;">
          <tr>
            <td align="center">
              <a href="${Deno.env.get('BASE_URL') || 'https://www.altrodatony.com'}/#admin" style="display: inline-block; padding: 12px 30px; background-color: #333333; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 500; font-size: 14px;">Spravovat v Adminu</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    ${commonFooter(reservation.id)}
  `;
}

// 2. Customer Request Received (Polished)
export function getRequestReceivedEmail(reservation: any): string {
  const dateStr = new Date(reservation.date).toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const vocative = declineNameToVocative(reservation.name);
  const greeting = vocative ? `Dobrý den, ${vocative},` : `Dobrý den,`;
  
  return `
    ${commonHeader}
    <tr>
      <td style="padding: 40px 40px 20px 40px;">
        <h2 style="margin: 0 0 20px 0; font-family: ${SERIF_STACK}; color: #1a1a1a; font-size: 24px; text-align: center;">Děkujeme za vaši žádost</h2>
        
        <p style="margin: 0 0 25px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a; text-align: center;">
          ${greeting} <br>
          evidujeme vaši poptávku rezervace. Nyní ověřujeme dostupnost kapacity v restauraci a brzy se vám ozveme s potvrzením.
        </p>
        
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #fafafa; border: 1px solid #f0f0f0; border-radius: 4px; padding: 20px;">
          <tr>
            <td align="center">
              <p style="margin: 0 0 5px 0; color: #999999; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">Termín</p>
              <p style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">${dateStr} v ${reservation.time}</p>
              
              <p style="margin: 0 0 5px 0; color: #999999; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">Hosté</p>
              <p style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">${reservation.guests} ${reservation.guests === '1' ? 'osoba' : 'osob'}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    ${commonFooter(reservation.id)}
  `;
}

// 3. Customer Confirmation (Updated with User Text)
export function getCustomerConfirmationEmail(reservation: any): string {
  const dateStr = new Date(reservation.date).toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const vocative = declineNameToVocative(reservation.name);
  const greeting = vocative ? `Dobrý den, ${vocative},` : `Dobrý den,`;
  
  return `
    ${commonHeader}
    <tr>
      <td style="padding: 40px 40px 30px 40px;">
        <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6; color: #333333;">${greeting}</p>
        
        <p style="margin: 0 0 25px 0; font-size: 16px; line-height: 1.6; color: #333333;">
          s radostí vám potvrzujeme rezervaci v našem Ristorante Italiano Altro da Tony!
        </p>
        
        <!-- Details Box -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #fafafa; border: 1px solid #eeeeee; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
          <tr>
            <td>
              <p style="margin: 0 0 15px 0; color: #333333; font-size: 16px; font-weight: bold;">Detaily vaší rezervace:</p>
              
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="120" style="padding-bottom: 8px; color: #666666; font-size: 14px; font-weight: bold;">Datum a čas:</td>
                  <td style="padding-bottom: 8px; color: #333333; font-size: 14px;">${dateStr} v ${reservation.time}</td>
                </tr>
                <tr>
                  <td width="120" style="padding-bottom: 8px; color: #666666; font-size: 14px; font-weight: bold;">Počet hostů:</td>
                  <td style="padding-bottom: 8px; color: #333333; font-size: 14px;">${reservation.guests} ${reservation.guests === '1' ? 'osoba' : 'osob'}</td>
                </tr>
                <tr>
                  <td width="120" style="color: #666666; font-size: 14px; font-weight: bold;">ID rezervace:</td>
                  <td style="color: #333333; font-size: 14px;">${reservation.id}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        
        <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
          Stůl pro vás připravíme a už se těšíme, že vás přivítáme. Pokud budete potřebovat cokoli změnit nebo máte speciální přání, klidně nás kontaktujte.
        </p>
        
        <p style="margin: 0 0 5px 0; font-size: 16px; line-height: 1.6; color: #333333; font-weight: bold;">
          Altro da Tony
        </p>
        <p style="margin: 0 0 25px 0; font-size: 14px; line-height: 1.5; color: #666666;">
          Korunní 48, 120 00 Praha 2 - Vinohrady<br>
          Tel: +420 774 672 458
        </p>

        <p style="margin: 0 0 5px 0; font-size: 16px; font-weight: bold; color: #333333;">Těšíme se na vás!</p>
        <p style="margin: 0; font-size: 16px; color: #333333; font-style: italic; font-family: ${SERIF_STACK};">Antonín Sahulka a jeho tým Altro da Tony</p>
        
        <!-- CTA -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 35px;">
          <tr>
            <td align="center">
              <a href="${MAPS_URL}" style="display: inline-block; padding: 14px 32px; background-color: ${BRAND_COLOR}; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 10px rgba(201, 75, 75, 0.25);">Otevřít v Google Maps</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    ${commonFooter(reservation.id)}
  `;
}

// 4. Customer Decline (Updated with User Text)
export function getCustomerRejectionEmail(reservation: any): string {
  const dateStr = new Date(reservation.date).toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const vocative = declineNameToVocative(reservation.name);
  const greeting = vocative ? `Dobrý den, ${vocative},` : `Dobrý den,`;
  // Fixed link to point to the correct ID #reservation
  const reservationLink = `${Deno.env.get('BASE_URL') || 'https://www.altrodatony.com'}/#reservation`;
  
  return `
    ${commonHeader}
    <tr>
      <td style="padding: 40px 40px 30px 40px;">
        <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6; color: #333333;">${greeting}</p>
        
        <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
          děkujeme za váš zájem o návštěvu naší restaurace Altro da Tony.
        </p>
        
        <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
          Je nám líto, ale v termínu <strong>${dateStr} v ${reservation.time}</strong> máme plně obsazeno a nemůžeme vaši rezervaci pro ${reservation.guests} ${reservation.guests === '1' ? 'osobu' : 'osoby'} přijmout.
        </p>
        
        <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
          Můžeme vám nabídnout jiné termíny. Rezervační formulář najdete <a href="${reservationLink}" style="color: ${BRAND_COLOR}; text-decoration: none; font-weight: bold; border-bottom: 1px solid ${BRAND_COLOR};">zde</a>.
        </p>
        
        <p style="margin: 0 0 25px 0; font-size: 16px; line-height: 1.6; color: #333333;">
          Pokud vám některý z jiných termínů vyhovuje, stačí odpovědět na tento e-mail nebo nás kontaktovat telefonicky na <strong>+420 774 672 458</strong>. Rádi pro vás stůl připravíme.
        </p>
        
        <p style="margin: 0 0 25px 0; font-size: 16px; line-height: 1.6; color: #333333;">
          Děkujeme za pochopení a doufáme, že se brzy uvidíme.
        </p>
        
        <p style="margin: 0 0 5px 0; font-size: 16px; line-height: 1.6; color: #333333; font-weight: bold;">
          Altro da Tony
        </p>
        <p style="margin: 0 0 25px 0; font-size: 14px; line-height: 1.5; color: #666666;">
          Korunní 48, 120 00 Praha 2 - Vinohrady<br>
          Tel: +420 774 672 458
        </p>

        <p style="margin: 0 0 5px 0; font-size: 16px; color: #333333;">S pozdravem,</p>
        <p style="margin: 0; font-size: 16px; color: #333333; font-style: italic; font-family: ${SERIF_STACK};">Antonín Sahulka a jeho tým Altro da Tony</p>
      </td>
    </tr>
    ${commonFooter(reservation.id)}
  `;
}