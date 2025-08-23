import supabaseClient from './client';
import { convertToCountryKeys } from './mapUtils';

const fetchCountries = async (): Promise<Country[]> => {
  const { data, error } = await supabaseClient.from('countries').select('*').eq('is_active', true);

  if (error) throw new Error(error.message);
  const countries = data.map((country) => convertToCountryKeys(country));
  return countries;
};

export { fetchCountries };
