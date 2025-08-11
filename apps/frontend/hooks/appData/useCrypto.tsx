import useCryptotore from '@/store/crypto.store';
import { useMemo } from 'react';

const useCrypto = () => {
  const { cryptos, p2pCryptos } = useCryptotore();

  const cryptoOptions = useMemo(() => ['all', ...cryptos.map((c) => c.id)], [cryptos]);

  const cryptoLabels: Record<string, string> = useMemo(
    () => ({
      all: 'All',
      ...Object.fromEntries(cryptos.map((c) => [c.id, c.symbol])),
    }),
    [cryptos],
  );

  const createFilterItems = (cryptosList: CryptoCurrency[], labelKey: 'symbol' | 'name'): FilterItem[] => [
    { id: 'all', label: 'All' },
    ...cryptosList.map((c) => ({ id: c.id, label: c[labelKey] })),
  ];

  const cryptoSymbolFilterItems = useMemo(() => createFilterItems(cryptos, 'symbol'), [cryptos]);
  const cryptoSymbolFilterItemsStrict = useMemo(() => cryptoSymbolFilterItems.slice(1), [cryptoSymbolFilterItems]);

  const cryptoNameFilterItems = useMemo(() => createFilterItems(cryptos, 'name'), [cryptos]);
  const cryptoNameFilterItemsStrict = useMemo(() => cryptoNameFilterItems.slice(1), [cryptoNameFilterItems]);

  const p2pCryptosSymbolFilterItems = useMemo(() => createFilterItems(p2pCryptos, 'symbol'), [p2pCryptos]);
  const p2pCryptoSymbolFilterItemsStrict = useMemo(
    () => p2pCryptosSymbolFilterItems.slice(1),
    [p2pCryptosSymbolFilterItems],
  );

  const getCryptoNameFilterItemById = useMemo(
    () => (id: string) => cryptoNameFilterItems.find((c) => c.id === id),
    [cryptoNameFilterItems],
  );

  return {
    cryptos,
    cryptoLabels,
    cryptoOptions,
    cryptoNameFilterItems,
    cryptoNameFilterItemsStrict,
    cryptoSymbolFilterItems,
    cryptoSymbolFilterItemsStrict,
    p2pCryptosSymbolFilterItems,
    p2pCryptoSymbolFilterItemsStrict,
    getCryptoNameFilterItemById,
  };
};

export default useCrypto;
