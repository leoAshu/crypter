import { fetchCryptos } from '@/supabase';
import { create } from 'zustand';

const useCryptotore = create<CryptoState>((set) => ({
  cryptos: [],
  p2pCryptos: [],
  isLoading: false,

  fetchCryptos: async () => {
    set({ isLoading: true });

    try {
      const cryptos = await fetchCryptos();
      set({ cryptos });

      const p2pCryptos = cryptos.filter((c) => c.isP2PActive);
      set({ p2pCryptos });
    } catch (err: any) {
      console.log('fetchCryptos error', err);
      throw new Error(err.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useCryptotore;
