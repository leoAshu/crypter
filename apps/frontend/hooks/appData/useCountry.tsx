import { useMemo } from 'react';

const useCountry = () => {
  const countries: Country[] = [
    {
      id: 'IN',
      name: 'India',
      iso2: 'IN',
      iso3: 'IND',
      phoneCode: '+91',
      currencyCode: 'INR',
      currencySymbol: '₹',
      currencyName: 'Indian Rupee',
      isActive: true,
      position: 1,
    },
  ];

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
    countryNameFilterItems,
    getCountryById,
    getCountryNameFilterItemById,
  };
};

export default useCountry;
