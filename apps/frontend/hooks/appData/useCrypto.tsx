import useCryptotore from '@/store/crypto.store';

const useCrypto = () => {
  const { cryptos } = useCryptotore();

  const cryptoOptions = ['all', ...cryptos.map((c) => c.id)];

  const cryptoLabels: Record<string, string> = {
    all: 'All',
    ...Object.fromEntries(cryptos.map((c) => [c.id, c.symbol])),
  };

  return {
    cryptos,
    cryptoLabels,
    cryptoOptions,
  };
};

type CryptoOption = ReturnType<typeof useCrypto>['cryptoOptions'][number];

export default useCrypto;
export { CryptoOption };
