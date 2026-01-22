export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Fail fast in development; in production rely on correct env config
  // eslint-disable-next-line no-console
  console.warn('[Supabase] Missing SUPABASE env vars. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}
