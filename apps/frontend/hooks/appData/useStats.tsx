import { StatsType } from '@/models';

const useStats = () => {
  const statsTypes = Object.values(StatsType);

  const statsTypeFilterItems = [
    {
      id: StatsType.Last30Days,
      label: '30 days',
    },
    {
      id: StatsType.AllTime,
      label: 'All time',
    },
  ];

  return {
    statsTypes,
    statsTypeFilterItems,
  };
};

export default useStats;
