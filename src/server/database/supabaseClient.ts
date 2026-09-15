import { createClient } from '@supabase/supabase-js';

// Deklarasi aman untuk kompatibilitas browser dan node runtime
declare const process: any;

const getEnv = (key: string): string => {
  if (typeof process !== 'undefined' && process?.env?.[key]) {
    return process.env[key];
  }
  if (typeof import.meta !== 'undefined' && (import.meta as any).env?.[key]) {
    return (import.meta as any).env[key];
  }
  return '';
};

const supabaseUrl = getEnv('SUPABASE_URL') || getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY') || getEnv('VITE_SUPABASE_ANON_KEY');

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper untuk backend dengan Service Role Key (akses penuh bypass RLS)
export function getSupabaseAdmin() {
  const serviceKey = getEnv('SUPABASE_SERVICE_ROLE_KEY');
  const url = supabaseUrl;
  
  if (!url || !serviceKey) {
    return null;
  }
  return createClient(url, serviceKey);
}
