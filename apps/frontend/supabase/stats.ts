import supabaseClient from './client';
import { convertToStatsKeys } from './mapUtils';

const fetchStats = async (userId: string): Promise<Stats> => {
  const { data, error } = await supabaseClient.from('stats').select('*').eq('user_id', userId).single();

  if (error) throw new Error(error.message);
  const stats = convertToStatsKeys(data);
  return stats;
};

const createStats = async (userId: string) => {
  const { error } = await supabaseClient.from('stats').insert({ user_id: userId });
  if (error) throw new Error(error.message);
};

export { createStats, fetchStats };
