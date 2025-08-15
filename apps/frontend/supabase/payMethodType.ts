import supabaseClient from './client';
import { convertToPayMethodTypeKeys } from './mapUtils';

const fetchPayMethodTypes = async (): Promise<PayMethodType[]> => {
  const { data, error } = await supabaseClient.from('pay_method_types').select('*').eq('is_active', true);

  if (error) throw new Error(error.message);
  const payMethodTypes = data.map((p) => convertToPayMethodTypeKeys(p));
  return payMethodTypes;
};

export { fetchPayMethodTypes };
