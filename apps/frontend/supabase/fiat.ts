import supabaseClient from './client';
import { convertToFiatKeys } from './mapUtils';

const fetchFiats = async (): Promise<FiatCurrency[]> => {
  const { data, error } = await supabaseClient.from('fiat_currencies').select('*').eq('is_active', true);

  if (error) throw new Error(error.message);
  const fiats = data.map((fiat) => convertToFiatKeys(fiat));
  return fiats;
};

export { fetchFiats };
