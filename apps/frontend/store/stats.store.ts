import { fetchStat } from '@/supabase';
import { create } from 'zustand';

const useStatsStore = create<StatState>((set) => ({
  stats: null,
  isLoading: false,

  fetchStat: async (userId: string) => {
    set({ isLoading: true });

    try {
      const stat = await fetchStat(userId);
      set({ stats: stat });
    } catch (err: any) {
      console.log('fetchCryptos error', err);
      throw new Error(err.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useStatsStore;
