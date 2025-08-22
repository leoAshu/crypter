import { useMemo } from 'react';

const useCountry = () => {
  const countries: Country[] = [{ id: 'ind', name: 'India', code: '+91', symbol: 'IND' }];

  const createFilterItems = (countries: Country[], labelKey: 'name' | 'symbol'): FilterItem[] => [
    ...countries.map((c) => ({ id: c.id, label: c[labelKey] })),
  ];

  const countryNameFilterItems = useMemo(() => createFilterItems(countries, 'name'), [countries]);
  const countrySymbolFilterItems = useMemo(() => createFilterItems(countries, 'symbol'), [countries]);

  return {
    countries,
    countryNameFilterItems,
    countrySymbolFilterItems,
  };
};

export default useCountry;
