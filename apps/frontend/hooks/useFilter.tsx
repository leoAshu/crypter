import { allFilterItem } from '@/constants';
import { capitalizeWords } from '@/utils';
import { useMemo } from 'react';
import { useAds, useCountry, useCrypto, useNetwork, usePriceTypes } from './appData';

const useFilter = () => {
  const { adTypes } = useAds();
  const { priceTypes } = usePriceTypes();
  const { networks } = useNetwork();
  const { countries } = useCountry();
  const { cryptos, p2pCryptos } = useCrypto();

  const createFilterItems = <T extends { id: string }>(
    items: T[],
    labelKey: keyof T,
    secondaryLabelKey?: keyof T,
  ): FilterItem[] => [
    ...items.map((c) => ({
      id: c.id,
      label: String(c[labelKey] ?? ''),
      secondaryLabel: secondaryLabelKey ? String(c[secondaryLabelKey] ?? '') : undefined,
    })),
  ];

  const adTypeFilterItems = useMemo(
    () =>
      adTypes.map((e) => ({
        id: e,
        label: capitalizeWords(e),
      })),
    [adTypes],
  );

  const cryptoNameFilterItemsStrict: FilterItem[] = useMemo(() => createFilterItems(cryptos, 'name'), [cryptos]);
  const cryptoSymbolFilterItemsStrict: FilterItem[] = useMemo(() => createFilterItems(cryptos, 'symbol'), [cryptos]);
  const p2pCryptoSymbolFilterItemsStrict = useMemo(() => createFilterItems(p2pCryptos, 'symbol'), [p2pCryptos]);

  const cryptoSymbolFilterItems: FilterItem[] = useMemo(
    () => [allFilterItem, ...cryptoSymbolFilterItemsStrict],
    [cryptoSymbolFilterItemsStrict],
  );
  const p2pCryptoSymbolFilterItems: FilterItem[] = useMemo(
    () => [allFilterItem, ...p2pCryptoSymbolFilterItemsStrict],
    [p2pCryptoSymbolFilterItemsStrict],
  );

  const countryNameFilterItems: FilterItem[] = useMemo(() => createFilterItems(countries, 'name'), [countries]);
  const countryPhoneCodeFilterItems: FilterItem[] = useMemo(
    () => createFilterItems(countries, 'iso3', 'phoneCode'),
    [countries],
  );

  const fiatSymbolFilterItemsStrict = useMemo(() => createFilterItems(countries, 'fiatSymbol'), [countries]);

  const networkFilterItems: FilterItem[] = useMemo(
    () => networks.map((n) => ({ id: n.id, label: `${n.name} (${n.code})` })),
    [networks],
  );

  const priceTypeFilterItems = useMemo(
    () =>
      priceTypes.map((e) => ({
        id: e,
        label: capitalizeWords(e),
      })),
    [priceTypes],
  );

  const getFilterItemById = useMemo(
    () => (filterItems: FilterItem[], filterId: string) => filterItems.find((filter) => filter.id === filterId),
    [],
  );

  return {
    adTypeFilterItems,
    cryptoSymbolFilterItems,
    p2pCryptoSymbolFilterItems,
    cryptoNameFilterItemsStrict,
    cryptoSymbolFilterItemsStrict,
    p2pCryptoSymbolFilterItemsStrict,
    countryNameFilterItems,
    countryPhoneCodeFilterItems,
    fiatSymbolFilterItemsStrict,
    networkFilterItems,
    priceTypeFilterItems,
    getFilterItemById,
  };
};

export default useFilter;
