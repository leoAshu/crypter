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

  const cryptoFilterItems = useMemo(() => cryptos.map((c) => ({ id: c.id, label: c.name })), [cryptos]);

  const getCryptoFilterById = useMemo(() => (id: string) => cryptoFilterItems.find((c) => c.id === id), [cryptos]);

  return {
    cryptos,
    cryptoLabels,
    cryptoOptions,
    cryptoLabelsStrict,
    cryptoOptionsStrict,
    cryptoFilterItems,
    getCryptoFilterById,
  };
};

type CryptoOption = ReturnType<typeof useCrypto>['cryptoOptions'][number];
type CryptoOptionStrict = ReturnType<typeof useCrypto>['cryptoOptionsStrict'][number];
type CryptoFilterItem = ReturnType<typeof useCrypto>['cryptoFilterItems'][number];

export default useCrypto;
export { CryptoFilterItem, CryptoOption, CryptoOptionStrict };
