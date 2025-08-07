import supabaseClient from './client';
import { convertToAdKeys } from './mapUtils';

const fetchAds = async () => {
  const { data, error } = await supabaseClient.from('ads_details').select('*');

  if (error) throw new Error(error.message);
  const ads = data.map((ad) => convertToAdKeys(ad));
  return ads;
};

export { fetchAds };
