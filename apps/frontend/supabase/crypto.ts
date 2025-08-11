import supabaseClient from './client';
import { convertToCryptoKeys } from './mapUtils';

const fetchCryptos = async (): Promise<CryptoCurrency[]> => {
  const { data, error } = await supabaseClient
    .from('crypto_currencies')
    .select('*')
    .eq('is_active', true)
    .order('position', { ascending: true });

  if (error) throw new Error(error.message);
  const cryptos = data.map((crypto) => convertToCryptoKeys(crypto));
  return cryptos;
};

export { fetchCryptos };
