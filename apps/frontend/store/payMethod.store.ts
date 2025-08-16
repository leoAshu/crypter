import { fetchPayMethods } from '@/supabase';
import { create } from 'zustand';

const usePayMethodStore = create<PayMethodState>((set) => ({
  payMethods: [],
  isLoading: false,

  fetchPayMethods: async (userId: string) => {
    set({ isLoading: true });

    try {
      const payMethods = await fetchPayMethods(userId);
      set({ payMethods });
    } catch (error: any) {
      console.log('fetchPayMethods error', error);
      throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  addNewPayMethod: async (detail) => {
    set({ isLoading: true });

    set((state) => ({
      payMethods: [detail, ...state.payMethods],
    }));

    set({ isLoading: false });
  },
}));

export default usePayMethodStore;
