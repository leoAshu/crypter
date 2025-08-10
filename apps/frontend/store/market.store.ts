import { fetchTickers } from '@/utils';
import { create } from 'zustand';

let pollingId: NodeJS.Timeout | null = null;

const useMarketStore = create<MarketState>((set) => ({
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

  startPolling: (intervalMS = 10000) => {},

  stopPolling: () => {},
}));

export default useMarketStore;
