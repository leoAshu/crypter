import { addNewPayMethod, fetchPayMethods, updatePayMethodStatus } from '@/supabase';
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

  addNewPayMethod: async (newPayMethod: PayMethod) => {
    set({ isLoading: true });

    try {
      await addNewPayMethod(newPayMethod);
      set((state) => ({
        payMethods: [newPayMethod, ...state.payMethods],
      }));
    } catch (error: any) {
      console.log('addNewPayMethod error', error);
      throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  updatePayMethodStatus: async (payMethodId: string, isActive: boolean) => {
    set({ isLoading: true });

    try {
      await updatePayMethodStatus(payMethodId, isActive);
      set((state) => ({
        payMethods: state.payMethods.map((item) => (item.id === payMethodId ? { ...item, isActive } : item)),
      }));
    } catch (error: any) {
      console.log('updatePayMethod error', error);
      throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default usePayMethodStore;
