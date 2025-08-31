import { useCountryStore } from '@/store';

const useCountry = () => {
  const { countries, currentCountry } = useCountryStore();

  const getCountryById = (countryId: string) => countries.find((country) => country.id === countryId);

  return {
    countries,
    currentCountry,
    getCountryById,
  };
};

export default useCountry;
