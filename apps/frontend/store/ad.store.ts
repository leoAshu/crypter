import { fetchAds, updateAdStatus } from '@/supabase';
import { create } from 'zustand';

const useAdStore = create<AdState>((set) => ({
  ads: [],
  isLoading: false,

  fetchAds: async () => {
    set({ isLoading: true });

    try {
      const ads = await fetchAds();
      set({ ads });
    } catch (error: any) {
      console.log('fetchAds error', error);
      throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  updateAdStatus: async (adId: string, isActive: boolean) => {
    set({ isLoading: true });

    try {
      await updateAdStatus(adId, isActive);

      set((state) => ({
        ads: state.ads.map((ad) => (ad.id === adId ? { ...ad, isActive } : ad)),
      }));
    } catch (error: any) {
      console.log('updateStatus error', error);
      throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAdStore;
