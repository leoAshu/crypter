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

  return {
    fiatSymbols,
    currentFiatId,
    currentFiatSymbol,
  };
};

export default useFiat;
