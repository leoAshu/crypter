import { useMemo } from 'react';
import useCountry from './useCountry';

const useFiat = () => {
  const { countries } = useCountry();

  // needs refactor
  const defaultFiat: FiatCurrency = useMemo(() => {
    const defaultCountry = countries.find((country) => country.id === 'IN');
    return {
      id: defaultCountry?.id ?? '',
      code: defaultCountry?.currencyCode ?? '',
      country: defaultCountry?.name ?? '',
      name: defaultCountry?.currencyName ?? '',
      position: defaultCountry?.position ?? 1,
      isActive: defaultCountry?.isActive ?? true,
      symbol: defaultCountry?.currencySymbol ?? '',
    };
  }, [countries]);

  const fiatSymbols: Record<string, string> = useMemo(
    () => Object.fromEntries(countries.map((country) => [country.id, country.currencySymbol])),
    [countries],
  );

  return {
    fiatSymbols,
    defaultFiat,
  };
};

export default useFiat;
