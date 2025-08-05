// import SupabaseConfig from '@/constants';
import SupabaseConfig from '@/constants/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseClient = createClient(SupabaseConfig.URL, SupabaseConfig.KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabaseClient;
