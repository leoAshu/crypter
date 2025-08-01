import { AdCard, ToggleButton } from '@/components';
import { contentWrapperStyle, P2P_LISTINGS } from '@/constants';
import cn from 'clsx';
import { useEffect, useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const isIOS = Platform.OS === 'ios';
  const [adTypeFilter, setAdTypeFilter] = useState<AdType>('buy');
  const [adsList, setAdsList] = useState(P2P_LISTINGS);

  useEffect(() => {
    setAdsList(P2P_LISTINGS.filter((item) => item['type'] === adTypeFilter));
  }, [adTypeFilter]);

  return (
    <SafeAreaView className='screen-wrapper'>
      <View className={cn('content-wrapper gap-y-4', contentWrapperStyle)}>
        <View className='flex-row justify-center'>
          <ToggleButton
            value={adTypeFilter}
            labelStyle='text-sm'
            wrapperStyle='w-80 h-10'
            options={['buy', 'sell']}
            labels={{ buy: 'Buy', sell: 'Sell' }}
            activeButtonColors={{ buy: 'bg-primary', sell: 'bg-error-500' }}
            activeLabelColors={{ buy: 'text-base-black', sell: 'text-base-white' }}
            onChange={(val) => setAdTypeFilter(val)}
          />
        </View>

        <FlatList
          className={cn(isIOS ? 'mb-20' : 'mb-24')}
          data={adsList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item, index }) => <AdCard ad={item} index={index} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
