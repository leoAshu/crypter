const statsToDbMap: Record<keyof Stats, string> = {
  userId: 'user_id',
  totalTrades: 'total_trades',
  buyTrades: 'buy_trades',
  sellTrades: 'sell_trades',
  avgPayTime: 'avg_pay_time',
  avgReleaseTime: 'avg_release_time',
  completionRate: 'completion_rate',
  approxVolume: 'approx_total_volume',
};

const dbToStatMap: Record<string, keyof Stats> = Object.entries(statsToDbMap).reduce(
  (acc, [camelKey, snakeKey]) => {
    acc[snakeKey] = camelKey as keyof Stats;
    return acc;
  },
  {} as Record<string, keyof Stats>,
);

// snake_case → camelCase
const convertToStatsKeys = (obj: Record<string, any>): Stats => {
  return Object.entries(obj).reduce((acc, [snakeKey, value]) => {
    const camelKey = dbToStatMap[snakeKey];
    if (camelKey) acc[camelKey] = value;
    return acc;
  }, {} as Partial<Stats>) as Stats;
};

export { convertToStatsKeys };
