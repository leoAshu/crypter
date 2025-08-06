import supabaseClient from './client';
import { convertToStatKeys } from './mapUtils';

const fetchStat = async (userId: string): Promise<Stat> => {
  const { data, error } = await supabaseClient.from('stats').select('*').eq('user_id', userId).single();

  if (error) throw new Error(error.message);
  const stat = convertToStatKeys(data);
  return stat;
};

export { fetchStat };
