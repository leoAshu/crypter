import supabaseClient from './client';

const fetchCryptos = async () => {
  const { data, error } = await supabaseClient.from('cryptocurrencies').select('*').eq('is_active', true);

  if (error) throw new Error(error.message);
  return data;
};

export { fetchCryptos };
