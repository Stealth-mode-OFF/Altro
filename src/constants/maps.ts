// Google Maps constants for Altro Da Tony restaurant
// Last updated: 2026-01-22

// Shortened Google Maps link (preferred for sharing)
export const GOOGLE_MAPS_SHORT_URL = 'https://maps.app.goo.gl/2HSXVSZx1cJtphZGA?g_st=ipc';

// Full Google Maps Place URL
export const GOOGLE_MAPS_PLACE_URL = 
  'https://www.google.com/maps/place/Altro+Da+Tony/@50.0751789,14.4450923,17z/data=!3m1!4b1!4m6!3m5!1s0x470b95ded05abb61:0x9135fb520cd7c526!8m2!3d50.0751789!4d14.4450923!16s%2Fg%2F11x0r9srl2!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDEyMC4wIKXMDSoASAFQAw%3D%3D';

// Direct link to write a review
export const GOOGLE_MAPS_REVIEW_URL = 
  'https://www.google.com/maps/place/Altro+Da+Tony/@50.0751789,14.4450923,17z/data=!4m8!3m7!1s0x470b95ded05abb61:0x9135fb520cd7c526!8m2!3d50.0751789!4d14.4450923!9m1!1b1!16s%2Fg%2F11x0r9srl2?entry=ttu&g_ep=EgoyMDI2MDEyMC4wIKXMDSoASAFQAw%3D%3D#:~:text=%EE%A2%8E-,%EE%95%A0,-Write%20a%20review';

// Coordinates
export const RESTAURANT_COORDINATES = {
  lat: 50.0751789,
  lng: 14.4450923,
} as const;

// Address
export const RESTAURANT_ADDRESS = 'Korunní 48, 120 00 Praha 2-Vinohrady' as const;

// Google Maps embed URL for iframe
export const GOOGLE_MAPS_EMBED_URL = 
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.4668279366596!2d14.4425174!3d50.0751789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b95ded05abb61%3A0x9135fb520cd7c526!2sAltro%20Da%20Tony!5e0!3m2!1sen!2scz!4v1737504000000!5m2!1sen!2scz';

// Place ID for Google APIs
export const GOOGLE_PLACE_ID = '0x470b95ded05abb61:0x9135fb520cd7c526' as const;

// Google Reviews Stats
// ⚠️ AKTUALIZUJTE TYTO HODNOTY PRAVIDELNĚ Z GOOGLE MAPS
// Poslední aktualizace: 2026-01-22
export const GOOGLE_REVIEWS = {
  averageRating: 4.9,
  totalReviews: 104, // Aktualizováno 2026-01-22
  lastUpdated: '2026-01-22',
} as const;
