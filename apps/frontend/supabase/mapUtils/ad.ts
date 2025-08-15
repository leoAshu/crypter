const adToDbMap: Record<keyof Ad, string> = {
  id: 'id',
  price: 'price',
  cryptoId: 'crypto_id',
  fiatId: 'fiat_id',
  minLimit: 'min_limit',
  maxLimit: 'max_limit',
  available: 'available',
  payMethodTypeIds: 'pay_method_type_ids',
  releaseTime: 'release_time',
  type: 'type',
  isActive: 'is_active',
  userId: 'user_id',
  userFullName: 'full_name',
  userAvatar: 'avatar_url',
  userVerified: 'verified',
  userTotalTrades: 'total_trades',
  userCompletionRate: 'completion_rate',
  createdAt: 'created_at',
};

const dbToAdMap: Record<string, keyof Ad> = Object.entries(adToDbMap).reduce(
  (acc, [camelKey, snakeKey]) => {
    acc[snakeKey] = camelKey as keyof Ad;
    return acc;
  },
  {} as Record<string, keyof Ad>,
);

// snake_case → camelCase
const convertToAdKeys = (obj: Record<string, any>): Ad => {
  return Object.entries(obj).reduce((acc, [snakeKey, value]) => {
    const camelKey = dbToAdMap[snakeKey];
    if (camelKey) acc[camelKey] = value;
    return acc;
  }, {} as Partial<Ad>) as Ad;
};

export { convertToAdKeys };
