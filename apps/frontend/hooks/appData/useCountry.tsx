import { useCountryStore } from '@/store';
import { useMemo } from 'react';

const useCountry = () => {
  const { countries, currentCountry } = useCountryStore();

  const getCountryById = (countryId: string) => countries.find((country) => country.id === countryId);

  const createFilterItems = (
    countries: Country[],
    labelKey: keyof Country,
    secondaryLabelKey?: keyof Country,
  ): FilterItem[] => [
    ...countries.map((c) => ({
      id: c.id,
      label: String(c[labelKey] ?? ''),
      secondaryLabel: secondaryLabelKey ? `(${String(c[secondaryLabelKey] ?? '')})` : undefined,
    })),
  ];

  const countryNameFilterItems: FilterItem[] = useMemo(() => createFilterItems(countries, 'name'), [countries]);
  const countryPhoneCodeFilterItems: FilterItem[] = useMemo(
    () => createFilterItems(countries, 'iso3', 'phoneCode'),
    [countries],
  );

  const getCountryFilterItemById = useMemo(
    () => (countryFilters: FilterItem[], id: string) => countryNameFilterItems.find((c) => c.id === id),
    [countryNameFilterItems],
  );

  return {
    countries,
    currentCountry,
    countryNameFilterItems,
    countryPhoneCodeFilterItems,
    getCountryById,
    getCountryFilterItemById,
  };
};

export default useCountry;
