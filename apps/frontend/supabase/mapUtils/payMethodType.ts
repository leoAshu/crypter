const crpytoToDbMap: Record<keyof PayMethodType, string> = {
  id: 'id',
  name: 'name',
  isActive: 'is_active',
  logoUrl: 'logo_url',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
};

const dbToPayMethodTypeMap: Record<string, keyof PayMethodType> = Object.entries(crpytoToDbMap).reduce(
  (acc, [camelKey, snakeKey]) => {
    acc[snakeKey] = camelKey as keyof PayMethodType;
    return acc;
  },
  {} as Record<string, keyof PayMethodType>,
);

// snake_case → camelCase
const convertToPayMethodTypeKeys = (obj: Record<string, any>): PayMethodType => {
  return Object.entries(obj).reduce((acc, [snakeKey, value]) => {
    const camelKey = dbToPayMethodTypeMap[snakeKey];
    if (camelKey) acc[camelKey] = value;
    return acc;
  }, {} as Partial<PayMethodType>) as PayMethodType;
};

export { convertToPayMethodTypeKeys };
