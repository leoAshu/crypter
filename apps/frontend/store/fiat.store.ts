import { fetchFiats } from '@/supabase';
import { create } from 'zustand';

interface FiatState {
  fiats: FiatCurrency[];
  isLoading: boolean;

  fetchFiats: () => Promise<void>;
}

const useFiatStore = create<FiatState>((set) => ({
  fiats: [],
  isLoading: false,

  fetchFiats: async () => {
    set({ isLoading: true });

    try {
      const fiats = await fetchFiats();
      set({ fiats });
    } catch (err: any) {
      console.log('fetchFiats error', err);
      throw new Error(err.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useFiatStore;
