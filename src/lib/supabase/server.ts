import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-lumina.supabase.co';
// Never expose service role key to the browser; accessed solely in Node.js server context
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-supabase-anon-key-villa-lumina-showroom';

/**
 * Server-Side Supabase Client (For Next.js Server Actions & API Route Handlers)
 * Utilizes the elevated Service Role Key when performing administrative mutations
 * (e.g. order finalization, inventory deduction) strictly inside server execution.
 */
export function createServerSupabaseClient() {
  const key = supabaseServiceRoleKey || supabaseAnonKey;
  return createClient(supabaseUrl, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
