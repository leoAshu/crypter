import { allFilterItem } from '@/constants';
import useCryptotore from '@/store/crypto.store';
import { useMemo } from 'react';

const useCrypto = () => {
  const { cryptos, p2pCryptos } = useCryptotore();

  const cryptoIds = useMemo(() => new Set(cryptos.map((c) => c.id)), [cryptos]);
  const p2pCryptoIds = useMemo(() => new Set(p2pCryptos.map((c) => c.id)), [p2pCryptos]);

  const cryptoLabels: Record<string, string> = useMemo(
    () => ({
      [allFilterItem.id]: allFilterItem.label,
      ...Object.fromEntries(cryptos.map((c) => [c.id, c.symbol])),
    }),
    [cryptos],
  );

  const createFilterItems = (cryptosList: CryptoCurrency[], labelKey: 'symbol' | 'name'): FilterItem[] => [
    allFilterItem,
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
    cryptoIds,
    p2pCryptos,
    p2pCryptoIds,
    cryptoLabels,
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
