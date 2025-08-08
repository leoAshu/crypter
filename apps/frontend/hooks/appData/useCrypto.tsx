import useCryptotore from '@/store/crypto.store';
import { useMemo } from 'react';

const useCrypto = () => {
  const { cryptos } = useCryptotore();

  const cryptoOptions = useMemo(() => ['all', ...cryptos.map((c) => c.id)], [cryptos]);
  const cryptoOptionsStrict = useMemo(() => cryptoOptions.slice(1), [cryptoOptions]);

  const cryptoLabels: Record<string, string> = useMemo(
    () => ({
      all: 'All',
      ...Object.fromEntries(cryptos.map((c) => [c.id, c.symbol])),
    }),
    [cryptos],
  );

  const cryptoLabelsStrict: Record<string, string> = useMemo(
    () => ({
      ...Object.fromEntries(cryptos.map((c) => [c.id, c.symbol])),
    }),
    [cryptos],
  );

  const createFilterItems = (labelKey: 'symbol' | 'name'): FilterItem[] => [
    { id: 'all', label: 'All' },
    ...cryptos.map((c) => ({ id: c.id, label: c[labelKey] })),
  ];

  const cryptoSymbolFilterItems = useMemo(() => createFilterItems('symbol'), [cryptos]);
  const cryptoSymbolFilterItemsStrict = useMemo(() => cryptoSymbolFilterItems.slice(1), [cryptoSymbolFilterItems]);

  const cryptoNameFilterItems = useMemo(() => createFilterItems('name'), [cryptos]);
  const cryptoNameFilterItemsStrict = useMemo(() => cryptoNameFilterItems.slice(1), [cryptoNameFilterItems]);

  const getCryptoNameById = useMemo(
    () => (id: string) => cryptoNameFilterItems.find((c) => c.id === id),
    [cryptoNameFilterItems],
  );

  return {
    cryptos,
    cryptoLabels,
    cryptoOptions,
    cryptoLabelsStrict,
    cryptoOptionsStrict,
    cryptoNameFilterItems,
    cryptoNameFilterItemsStrict,
    cryptoSymbolFilterItems,
    cryptoSymbolFilterItemsStrict,
    getCryptoNameById,
  };
};

export default useCrypto;
