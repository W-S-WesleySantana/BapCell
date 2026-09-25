import { createClient } from '@supabase/supabase-js';

// URL de API 
const supabaseUrl = 'https://fxlirceldjzedzrnxjnj.supabase.co';

// Sua Publishable Key 
const supabaseAnonKey = 'sb_publishable_wPHfnp3wZSgH0PnIWUwflQ_dD6xKLGo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);