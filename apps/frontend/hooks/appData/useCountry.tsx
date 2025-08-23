import { useCountryStore } from '@/store';
import { useMemo } from 'react';

const useCountry = () => {
  const { countries, currentCountry } = useCountryStore();

  const getCountryById = (countryId: string) => countries.find((country) => country.id === countryId);

  const createFilterItems = (countries: Country[], labelKey: 'name'): FilterItem[] => [
    ...countries.map((c) => ({ id: c.id, label: c[labelKey] })),
  ];

  const countryNameFilterItems = useMemo(() => createFilterItems(countries, 'name'), [countries]);

  const getCountryNameFilterItemById = useMemo(
    () => (id: string) => countryNameFilterItems.find((c) => c.id === id),
    [countryNameFilterItems],
  );

  return {
    countries,
    currentCountry,
    countryNameFilterItems,
    getCountryById,
    getCountryNameFilterItemById,
  };
};

export default useCountry;
