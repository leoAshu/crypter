import { create } from 'zustand';

const useWallet = create<WalletState>((set, get) => ({
  address: '0xMockedWalletAddress',

  balances: {
    usdt: { available: 1000, escrowed: 0 },
    eth: { available: 0.5, escrowed: 0 },
    btc: { available: 0.1, escrowed: 0 },
  },
}));

export default useWallet;
