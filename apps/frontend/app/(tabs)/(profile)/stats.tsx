import { DividerX, ToggleButton, VerticalGradient } from '@/components';
import { screenContentWrapperStyle, Strings } from '@/constants';
import { useStats } from '@/hooks';
import { useStatsStore } from '@/store';
import cn from 'clsx';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const stats = () => {
  const { stats } = useStatsStore();
  const { statsTypeFilterItems } = useStats();

  const [statsType, setStatsTypeFilter] = useState<FilterItem>(statsTypeFilterItems[0]);

  return (
    <SafeAreaView className='screen-wrapper'>
      <ScrollView>
        <View className={cn('content-wrapper gap-y-4', screenContentWrapperStyle)}>
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
            labelStyle='text-sm'
            wrapperStyle='h-9 w-36'
            onChange={(val) => setStatsTypeFilter(val)}
          />

          <View>
            <VerticalGradient />

            <View className='stats-wrapper'>
              <View className='stats-group'>
                <View className='stats-row'>
                  <Text className='stats-label'>{Strings.stats.TRADE_LABEL}</Text>
                  <Text className='stats-value'>5 times</Text>
                </View>

                <View className='stats-row'>
                  <Text className='stats-label'>{Strings.stats.BUY_LABEL}</Text>
                  <Text className='stats-value'>5 times</Text>
                </View>

                <View className='stats-row'>
                  <Text className='stats-label'>{Strings.stats.SELL_LABEL}</Text>
                  <Text className='stats-value'>2 times</Text>
                </View>

                <View className='stats-row'>
                  <Text className='stats-label'>{Strings.stats.COMPLETION_RATE_LABEL}</Text>
                  <Text className='font-clashDisplay text-title dark:text-title-dark'>
                    {stats?.completionRate.toFixed(0)}%
                  </Text>
                </View>
              </View>

              <DividerX />

              <View className='stats-group'>
                <View className='stats-row'>
                  <Text className='stats-label'>{Strings.stats.AVG_RELEASE_LABEL}</Text>
                  <Text className='font-clashDisplay text-title dark:text-title-dark'>
                    {stats?.avgReleaseTime} Minutes
                  </Text>
                </View>

                <View className='stats-row'>
                  <Text className='stats-label'>{Strings.stats.AVG_PAY_LABEL}</Text>
                  <Text className='font-clashDisplay text-title dark:text-title-dark'>{stats?.avgPayTime} Minutes</Text>
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
                  <Text className='font-clashDisplay text-title dark:text-title-dark'>0.00567 JSR</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default stats;
