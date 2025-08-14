import { DividerX, ToggleButton, VerticalGradient } from '@/components';
import { Strings } from '@/constants';
import { useCrypto, useStats } from '@/hooks';
import { useStatsStore } from '@/store';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stats = () => {
  const { stats } = useStatsStore();
  const { cryptos } = useCrypto();
  const { statsTypeFilterItems } = useStats();

  const [statsType, setStatsTypeFilter] = useState<FilterItem>(statsTypeFilterItems[0]);

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <ScrollView>
        <View className='content-wrapper mt-4'>
          <ToggleButton
            value={statsType}
            items={[statsTypeFilterItems[0], statsTypeFilterItems[1]]}
            activeButtonColors={{
              [statsTypeFilterItems[0].id]: 'bg-primary',
              [statsTypeFilterItems[1].id]: 'bg-primary',
            }}
            activeLabelColors={{
              [statsTypeFilterItems[0].id]: 'text-base-dark',
              [statsTypeFilterItems[1].id]: 'text-base-dark',
            }}
            labelStyle='text-[10px]'
            wrapperStyle='h-9 w-36'
            onChange={(val) => setStatsTypeFilter(val)}
          />

          <View>
            <VerticalGradient />

            <View className='stats-wrapper'>
              <View className='stats-group'>
                <View className='stats-row'>
                  <Text className='stats-label'>{Strings.stats.TRADE_LABEL}</Text>
                  <Text className='stats-value'>{stats?.totalTrades} times</Text>
                </View>

                <View className='stats-row'>
                  <Text className='stats-label'>{Strings.stats.BUY_LABEL}</Text>
                  <Text className='stats-value'>{stats?.buyTrades} times</Text>
                </View>

                <View className='stats-row'>
                  <Text className='stats-label'>{Strings.stats.SELL_LABEL}</Text>
                  <Text className='stats-value'>{stats?.sellTrades} times</Text>
                </View>

                <View className='stats-row'>
                  <Text className='stats-label'>{Strings.stats.COMPLETION_RATE_LABEL}</Text>
                  <Text className='stats-value-bold'>{stats?.completionRate.toFixed(0)}%</Text>
                </View>
              </View>

              <DividerX />

              <View className='stats-group'>
                <View className='stats-row'>
                  <Text className='stats-label'>{Strings.stats.AVG_RELEASE_LABEL}</Text>
                  <Text className='stats-value-bold'>{stats?.avgReleaseTime} Minutes</Text>
                </View>

                <View className='stats-row'>
                  <Text className='stats-label'>{Strings.stats.AVG_PAY_LABEL}</Text>
                  <Text className='stats-value-bold'>{stats?.avgPayTime} Minutes</Text>
                </View>
              </View>

              <DividerX />

              <View className='stats-group'>
                <View className='stats-row'>
                  <Text className='stats-label'>{Strings.stats.FEEDBACK_POSITIVE_LABEL}</Text>
                  <Text className='stats-value'>1</Text>
                </View>

                <View className='stats-row'>
                  <Text className='stats-label'>{Strings.stats.FEEDBACK_NEGATIVE_LABEL}</Text>
                  <Text className='stats-value'>0</Text>
                </View>
              </View>

              <DividerX />

              <View className='stats-group'>
                <View className='stats-row'>
                  <Text className='stats-label'>{Strings.stats.TOTAL_VOLUME_LABEL}</Text>
                  <Text className='stats-value-bold tracking-widest'>
                    {stats?.approxVolume} {cryptos[0].symbol}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Stats;
