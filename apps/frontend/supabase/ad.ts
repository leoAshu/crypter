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

export { fetchAds };
