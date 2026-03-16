import { createClient } from '@supabase/supabase-js';
import { User } from '@supabase/supabase-js';

export type SupabaseUser = User;
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

);