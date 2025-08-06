import useCryptotore from '@/store/crypto.store';

const useCrypto = () => {
  const { cryptos } = useCryptotore();

  const cryptoOptions = ['all', ...cryptos.map((c) => c.id)];
  const cryptoLabels: Record<string, string> = {
    all: 'All',
    ...Object.fromEntries(cryptos.map((c) => [c.id, c.symbol])),
  };

  const cryptoOptionsStrict = cryptoOptions.slice(1);
  const cryptoLabelsStrict: Record<string, string> = {
    ...Object.fromEntries(cryptos.map((c) => [c.id, c.symbol])),
  };

  return {
    cryptos,
    cryptoLabels,
    cryptoOptions,
    cryptoLabelsStrict,
    cryptoOptionsStrict,
  };
};

type CryptoOption = ReturnType<typeof useCrypto>['cryptoOptions'][number];
type CryptoOptionStrict = ReturnType<typeof useCrypto>['cryptoOptionsStrict'][number];

export default useCrypto;
export { CryptoOption, CryptoOptionStrict };
