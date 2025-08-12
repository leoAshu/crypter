import supabaseClient from './client';
import { convertToAdKeys } from './mapUtils';

const fetchAds = async (): Promise<Ad[]> => {
  const { data, error } = await supabaseClient
    .from('ads_details')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  const ads = data.map((ad) => convertToAdKeys(ad));
  return ads;
};

const updateAdStatus = async (adId: string, isActive: boolean) => {
  const { error } = await supabaseClient.from('ads').update({ is_active: isActive }).eq('id', adId);

  if (error) throw new Error(error.message);
};

export { fetchAds, updateAdStatus };
