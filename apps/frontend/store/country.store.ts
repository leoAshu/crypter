import { fetchCountries } from '@/supabase';
import { create } from 'zustand';

const useCountryStore = create<CountryState>((set) => ({
  countries: [],
  currentCountry: undefined,
  isLoading: false,

  fetchCountries: async () => {
    set({ isLoading: true });

    try {
      const countries = await fetchCountries();
      set({ countries, currentCountry: countries.find((country) => country.id === 'ind') });
    } catch (error: any) {
      console.log('fetchCountries error', error);
      throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useCountryStore;
