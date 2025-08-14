import { useWalletStore } from '@/store';

const useWallet = () => {
  const { address, balances, deposit } = useWalletStore();

  return {
    address,
    balances,
    deposit,
  };
};

export default useWallet;
