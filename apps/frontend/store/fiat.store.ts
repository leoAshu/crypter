import { fetchFiats } from '@/supabase';
import { create } from 'zustand';

const useFiatStore = create<FiatState>((set, get) => ({
  fiats: [],
  isLoading: false,
  defaultFiat: null,

  setDefaultFiat: (fiat: FiatCurrency) => set({ defaultFiat: fiat }),

  fetchFiats: async () => {
    set({ isLoading: true });

    try {
      const fiats = await fetchFiats();
      set({ fiats });

      set((state) => ({
        defaultFiat: state.defaultFiat ?? fiats.find((f) => f.code === 'inr') ?? fiats[0] ?? null,
      }));
    } catch (err: any) {
      console.log('fetchFiats error', err);
      throw new Error(err.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useFiatStore;
