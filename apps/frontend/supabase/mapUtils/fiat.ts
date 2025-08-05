const fiatToDbMap: Record<keyof FiatCurrency, string> = {
  id: 'id',
  name: 'name',
  symbol: 'symbol',
  country: 'country',
  code: 'code',
  isActive: 'is_active',
  position: 'position',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
};

const dbToFiatMap: Record<string, keyof FiatCurrency> = Object.entries(fiatToDbMap).reduce(
  (acc, [camelKey, snakeKey]) => {
    acc[snakeKey] = camelKey as keyof FiatCurrency;
    return acc;
  },
  {} as Record<string, keyof FiatCurrency>,
);

// snake_case → camelCase
const convertToFiatKeys = (obj: Record<string, any>): FiatCurrency => {
  return Object.entries(obj).reduce((acc, [snakeKey, value]) => {
    const camelKey = dbToFiatMap[snakeKey];
    if (camelKey) acc[camelKey] = value;
    return acc;
  }, {} as Partial<FiatCurrency>) as FiatCurrency;
};

export { convertToFiatKeys };
