import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface SignUpSubmission {
  id?: string;
  full_name: string;
  phone_number: string;
  email: string;
  transaction_amount: number;
  transaction_id: string;
  aadhaar_file_path: string;
  signature_file_path: string;
  agree_terms: boolean;
  created_at?: string;
}
