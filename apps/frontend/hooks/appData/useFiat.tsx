import { allFilterItem } from '@/constants';
import { useMemo } from 'react';
import useCountry from './useCountry';

const useFiat = () => {
  const { countries, currentCountry } = useCountry();

  const currentFiatId = useMemo(() => (currentCountry?.fiatCode ?? '').toLowerCase(), [currentCountry]);

  const currentFiatSymbol = useMemo(() => currentCountry?.fiatSymbol, [currentCountry]);

  const fiatSymbols: Record<string, string> = useMemo(
    () => Object.fromEntries(countries.map((country) => [country.id, country.fiatSymbol])),
    [countries],
  );

  const createFilterItems = (countriesList: Country[]): FilterItem[] => [
    allFilterItem,
    ...countriesList.map((c) => ({ id: c.id, label: c.fiatSymbol })),
  ];

  const fiatSymbolFilterItems = useMemo(() => createFilterItems(countries), [countries]);
  const fiatSymbolFilterItemsStrict = useMemo(() => fiatSymbolFilterItems.slice(1), [fiatSymbolFilterItems]);

  return {
    fiatSymbols,
    currentFiatId,
    currentFiatSymbol,
    fiatSymbolFilterItems,
    fiatSymbolFilterItemsStrict,
  };
};

export default useFiat;
