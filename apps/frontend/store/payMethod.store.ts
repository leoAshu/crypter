import { create } from 'zustand';

const usePayMethodStore = create<PayMethodState>((set) => ({
  payMethods: [],
  isLoading: false,

  fetchPayMethods: async () => {},

  addNewPayMethod: async (detail) => {
    set({ isLoading: true });

    set((state) => ({
      payMethods: [detail, ...state.payMethods],
    }));

    set({ isLoading: false });
  },
}));

export default usePayMethodStore;
