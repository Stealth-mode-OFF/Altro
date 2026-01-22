import { createClient, SupabaseClient } from '@jsr/supabase__supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './env';

let client: SupabaseClient | null = null;

export function getSupabaseClient() {
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return client;
}
