import supabaseClient from './client';

const emailExists = async (email: string) => {
  const { data, error } = await supabaseClient.from('profiles').select('*').eq('email', email).maybeSingle();

  if (error) throw new Error(error.message);

  if (data) return true;
  return false;
};

export { emailExists };
