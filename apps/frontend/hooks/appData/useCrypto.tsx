import useCryptotore from '@/store/crypto.store';
import { useMemo } from 'react';

const useCrypto = () => {
  const { cryptos } = useCryptotore();

  const cryptoOptions = useMemo(() => ['all', ...cryptos.map((c) => c.id)], [cryptos]);
  const cryptoLabels: Record<string, string> = useMemo(
    () => ({
      all: 'All',
      ...Object.fromEntries(cryptos.map((c) => [c.id, c.symbol])),
    }),
    [cryptos],
  );

  const cryptoOptionsStrict = useMemo(() => cryptoOptions.slice(1), [cryptos]);
  const cryptoLabelsStrict: Record<string, string> = useMemo(
    () => ({
      ...Object.fromEntries(cryptos.map((c) => [c.id, c.symbol])),
    }),
    [cryptos],
  );

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
