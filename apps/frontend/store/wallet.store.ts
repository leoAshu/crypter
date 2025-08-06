import { create } from 'zustand';

interface WalletState {
  address: string;
  balance: number;
}

const useWallet = create<WalletState>((set, get) => ({
  address: '0xMockedWalletAddress',
  balance: 1000,
}));

export default useWallet;
