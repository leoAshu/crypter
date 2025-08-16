import supabaseClient from './client';
import { convertPayMethodToDbKeys, convertToPayMethodKeys } from './mapUtils';

const fetchPayMethods = async (userId: string): Promise<PayMethod[]> => {
  const { data, error } = await supabaseClient.from('pay_methods').select('*').eq('user_id', userId);

  if (error) throw new Error(error.message);
  const payMethods = data.map((item) => convertToPayMethodKeys(item));
  return payMethods;
};

const addNewPayMethod = async (newPayMethod: PayMethod) => {
  const dbNewPayMethod = convertPayMethodToDbKeys(newPayMethod);
  const { error } = await supabaseClient.from('pay_methods').insert([dbNewPayMethod]);

  if (error) throw new Error(error.message);
};

const updatePayMethodStatus = async (payMethodId: string, isActive: boolean) => {
  const { error } = await supabaseClient.from('pay_methods').update({ is_active: isActive }).eq('id', payMethodId);

  if (error) throw new Error(error.message);
};

export { addNewPayMethod, fetchPayMethods, updatePayMethodStatus };
