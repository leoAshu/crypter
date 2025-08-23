const countryToDbMap: Record<keyof Country, string> = {
  id: 'id',
  name: 'name',
  iso2: 'iso2',
  iso3: 'iso3',
  phoneCode: 'phone_code',
  fiatCode: 'fiat_code',
  fiatSymbol: 'fiat_symbol',
  fiatName: 'fiat_name',
  isActive: 'is_active',
  position: 'position',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
};

const dbToCountryMap: Record<string, keyof Country> = Object.entries(countryToDbMap).reduce(
  (acc, [camelKey, snakeKey]) => {
    acc[snakeKey] = camelKey as keyof Country;
    return acc;
  },
  {} as Record<string, keyof Country>,
);

// snake_case → camelCase
const convertToCountryKeys = (obj: Record<string, any>): Country => {
  return Object.entries(obj).reduce((acc, [snakeKey, value]) => {
    const camelKey = dbToCountryMap[snakeKey];
    if (camelKey) acc[camelKey] = value;
    return acc;
  }, {} as Partial<Country>) as Country;
};

export { convertToCountryKeys };
