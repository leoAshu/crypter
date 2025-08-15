import { fetchPayMethodTypes } from '@/supabase';
import { create } from 'zustand';

interface PayMethodTypeState {
  payMethodTypes: PayMethodType[];
  isLoading: boolean;

  fetchPayMethodTypes: () => Promise<void>;
}

const usePayMethodTypeStore = create<PayMethodTypeState>((set) => ({
  payMethodTypes: [],
  isLoading: false,

  fetchPayMethodTypes: async () => {
    set({ isLoading: true });

    try {
      const payMethodTypes = await fetchPayMethodTypes();
      set({ payMethodTypes });
    } catch (error: any) {
      console.log('fetchPayMethodTypes error', error);
      throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default usePayMethodTypeStore;
