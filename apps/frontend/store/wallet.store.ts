import { create } from 'zustand';

const useWalletStore = create<WalletState>((set, get) => ({
  address: '0xMockedWalletAddress',

  balances: {
    usdt: { available: 10, escrowed: 0 },
    eth: { available: 0.5, escrowed: 0 },
    btc: { available: 0.1, escrowed: 0 },
  },

  deposit: (assetId: string, amount: number) => {
    set((state) => ({
      balances: {
        ...state.balances,
        [assetId]: {
          ...state.balances[assetId],
          available: state.balances[assetId].available + amount,
        },
      },
    }));
  },
}));

export default useWalletStore;
