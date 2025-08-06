const statToDbMap: Record<keyof Stat, string> = {
  userId: 'user_id',
  totalTrades: 'total_trades',
  completionRate: 'completion_rate',
  avgReleaseTime: 'avg_release_time',
  avgPayTime: 'avg_pay_time',
};

const dbToStatMap: Record<string, keyof Stat> = Object.entries(statToDbMap).reduce(
  (acc, [camelKey, snakeKey]) => {
    acc[snakeKey] = camelKey as keyof Stat;
    return acc;
  },
  {} as Record<string, keyof Stat>,
);

// snake_case → camelCase
const convertToStatKeys = (obj: Record<string, any>): Stat => {
  return Object.entries(obj).reduce((acc, [snakeKey, value]) => {
    const camelKey = dbToStatMap[snakeKey];
    if (camelKey) acc[camelKey] = value;
    return acc;
  }, {} as Partial<Stat>) as Stat;
};

export { convertToStatKeys };
