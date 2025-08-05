import { fetchCryptos } from '@/supabase';
import { create } from 'zustand';

const useCryptotore = create<CryptoState>((set) => ({
  cryptos: [],
  isLoading: false,

  fetchCryptos: async () => {
    set({ isLoading: true });

    try {
      const cryptos = await fetchCryptos();
      set({ cryptos });
    } catch (err: any) {
      console.log('fetchCryptos error', err);
      throw new Error(err.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useCryptotore;
