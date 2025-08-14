import { StatsType } from '@/models';
import { useStatsStore } from '@/store';

const useStats = () => {
  const { stats } = useStatsStore();
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
    stats,
    statsTypes,
    statsTypeFilterItems,
  };
};

export default useStats;
