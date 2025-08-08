import supabaseClient from './client';
import { convertToStatsKeys } from './mapUtils';

const fetchStat = async (userId: string): Promise<Stats> => {
  const { data, error } = await supabaseClient.from('stats').select('*').eq('user_id', userId).single();

  if (error) throw new Error(error.message);
  const stats = convertToStatsKeys(data);
  return stats;
};

export { fetchStat };
