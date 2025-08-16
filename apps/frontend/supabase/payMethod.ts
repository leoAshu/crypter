import supabaseClient from './client';
import { convertToPayMethodKeys } from './mapUtils';

const fetchPayMethods = async (userId: string): Promise<PayMethod[]> => {
  const { data, error } = await supabaseClient.from('pay_methods').select('*').eq('user_id', userId);

  if (error) throw new Error(error.message);
  const payMethods = data.map((item) => convertToPayMethodKeys(item));
  return payMethods;
};

export { fetchPayMethods };
