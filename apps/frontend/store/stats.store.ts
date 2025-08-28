import { createStats, fetchStats } from '@/supabase';
import { create } from 'zustand';

const useStatsStore = create<StatState>((set) => ({
  stats: null,
  isLoading: false,

  createStats: async (userId: string) => {
    set({ isLoading: true });

    try {
      await createStats(userId);
    } catch (err: any) {
      console.log('fetchStats error', err);
      throw new Error(err.message);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchStats: async (userId: string) => {
    set({ isLoading: true });

    try {
      const stat = await fetchStats(userId);
      set({ stats: stat });
    } catch (err: any) {
      console.log('fetchStats error', err);
      throw new Error(err.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useStatsStore;
