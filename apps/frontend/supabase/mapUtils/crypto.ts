const crpytoToDbMap: Record<keyof CryptoCurrency, string> = {
  id: 'id',
  name: 'name',
  symbol: 'symbol',
  logoUrl: 'logo_url',
  network: 'network',
  category: 'category',
  decimals: 'decimals',
  contractAddress: 'contract_address',
  isActive: 'is_active',
  isP2PActive: 'is_p2p_active',
  position: 'position',
  createdAt: 'created_at',
};

const dbToCryptoMap: Record<string, keyof CryptoCurrency> = Object.entries(crpytoToDbMap).reduce(
  (acc, [camelKey, snakeKey]) => {
    acc[snakeKey] = camelKey as keyof CryptoCurrency;
    return acc;
  },
  {} as Record<string, keyof CryptoCurrency>,
);

// snake_case → camelCase
const convertToCryptoKeys = (obj: Record<string, any>): CryptoCurrency => {
  return Object.entries(obj).reduce((acc, [snakeKey, value]) => {
    const camelKey = dbToCryptoMap[snakeKey];
    if (camelKey) acc[camelKey] = value;
    return acc;
  }, {} as Partial<CryptoCurrency>) as CryptoCurrency;
};

export { convertToCryptoKeys };
