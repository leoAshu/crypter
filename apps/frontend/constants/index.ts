import Strings from './strings';
import SupabaseConfig from './supabase';
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX, PHONE_REGEX } from './validations';

// mock profile data from supabase store
const defaultProfileInfo = {
  name: 'Ashutosh Ojha',
  email: 'ashutosh.ojha2009@gmail.com',
  password: 'password',
  phone: '+16694996135',
  gender: 'Male',
  joined: '2025',
};

export { defaultProfileInfo, EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX, PHONE_REGEX, Strings, SupabaseConfig };
