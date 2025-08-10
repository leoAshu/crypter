import { fetchTickers } from '@/utils';
import { create } from 'zustand';

let pollingId: number | null = null;

const useMarketStore = create<MarketState>((set, get) => ({
  tickers: {},
  isLoading: false,

  fetchTickers: async (cryptoIds: string[], fiatId: string) => {
    set({ isLoading: true });

    try {
      const tickers = await fetchTickers(cryptoIds, fiatId);
      set({ tickers });
    } catch (error: any) {
      console.log('fetchTickers error', error);
      throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  startPolling: (interval = 10000, cryptoIds: string[], fiatId: string) => {
    if (pollingId) return;
    pollingId = setInterval(() => get().fetchTickers(cryptoIds, fiatId), interval);
  },

  stopPolling: () => {
    if (pollingId) {
      clearInterval(pollingId);
      pollingId = null;
    }
  },
}));

export default useMarketStore;
