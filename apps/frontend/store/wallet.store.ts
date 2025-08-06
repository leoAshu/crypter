import { CryptoOptionStrict } from '@/hooks/appData/useCrypto';
import { create } from 'zustand';

const useWallet = create<WalletState>((set, get) => ({
  address: '0xMockedWalletAddress',

  balances: {
    usdt: { available: 10, escrowed: 0 },
    eth: { available: 0.5, escrowed: 0 },
    btc: { available: 0.1, escrowed: 0 },
  },

  deposit: (asset: CryptoOptionStrict, amount: number) => {
    set((state) => ({
      balances: {
        ...state.balances,
        [asset]: {
          ...state.balances[asset],
          available: state.balances[asset].available + amount,
        },
      },
    }));
  },
}));

export default useWallet;
