import { AdCard, ToggleButton } from '@/components';
import { P2P_LISTINGS } from '@/constants';
import cn from 'clsx';
import { useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const isIOS = Platform.OS === 'ios';
  const [filter, setFilter] = useState<'buy' | 'sell'>('buy');

  return (
    <SafeAreaView className='screen-wrapper'>
      <View className='content-wrapper mt-20 gap-y-4'>
        <View>
          <ToggleButton
            value={filter}
            onChange={(val) => setFilter(val)}
            options={['buy', 'sell']}
            labels={{ buy: 'Buy', sell: 'Sell' }}
            activeColors={{ buy: 'bg-success-dark', sell: 'bg-error-dark' }}
          />
        </View>

        <FlatList
          className={cn(isIOS ? 'mb-20' : 'mb-24')}
          data={P2P_LISTINGS}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => <AdCard {...item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
