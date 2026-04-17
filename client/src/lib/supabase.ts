import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
// Support both naming conventions (anon key = publishable key)
const key = (import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) as string;

export const ADMIN_EMAIL =
  (import.meta.env.VITE_ADMIN_EMAIL as string) || 'lisgraphix17@gmail.com';

export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  key || 'placeholder',
);

export const isSupabaseConfigured = Boolean(url && key);
