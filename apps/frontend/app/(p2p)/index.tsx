import { AdCard, ChipFilter, DividerX, ToggleButton } from '@/components';
import { screenContentWrapperStyle } from '@/constants';
import { useAds, useCrypto } from '@/hooks';
import cn from 'clsx';
import { useEffect, useState } from 'react';
import { FlatList, Platform, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const isDark = useColorScheme() === 'dark';

  const { filterAdsByType } = useAds();
  const { cryptoSymbolFilterItems } = useCrypto();

  const [adType, setAdType] = useState<AdType>('buy');
  const [crypto, setCrypto] = useState<FilterItem>(cryptoSymbolFilterItems[0]);
  const [ads, setAds] = useState(filterAdsByType(adType, crypto.id));

  const adsListStyle = Platform.select({
    ios: 'pb-20',
    android: 'pb-24',
  });

  useEffect(() => {
    setAds(filterAdsByType(adType, crypto.id));
  }, [adType, crypto]);

  return (
    <SafeAreaView className='screen-wrapper'>
      <View className={cn('content-wrapper', screenContentWrapperStyle)}>
        <View className='flex gap-y-3'>
          <View className='flex-row justify-center'>
            <ToggleButton
              value={adType}
              labelStyle='text-base'
              wrapperStyle='w-5/6 h-10'
              options={['buy', 'sell']}
              labels={{ buy: 'Buy', sell: 'Sell' }}
              activeButtonColors={{ buy: 'bg-primary', sell: 'bg-error-500' }}
              activeLabelColors={{ buy: 'text-base-black', sell: 'text-base-white' }}
              onChange={(val) => setAdType(val)}
            />
          </View>

          <ChipFilter value={crypto} items={cryptoSymbolFilterItems} onChange={(item) => setCrypto(item)} />
        </View>

        <FlatList
          data={ads}
          initialNumToRender={0}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id.toString()}
          contentContainerClassName={adsListStyle}
          renderItem={({ item, index }) => <AdCard ad={item} index={index} animationStyle='fadeFloatUp' />}
          ItemSeparatorComponent={() => <DividerX style={cn('mb-4', isDark ? 'opacity-40' : 'opacity-25')} />}
          ListFooterComponent={() => <DividerX style={isDark ? 'opacity-40' : 'opacity-25'} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
