import { AdCard, ChipFilter, DividerX, ToggleButton } from '@/components';
import { screenContentWrapperStyle } from '@/constants';
import { useAds, useCrypto } from '@/hooks';
import { AdType } from '@/models';
import cn from 'clsx';
import { useEffect, useState } from 'react';
import { FlatList, Platform, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const isDark = useColorScheme() === 'dark';

  const { adTypeFilterItems, filterAdsByType } = useAds();
  const { cryptoSymbolFilterItems } = useCrypto();

  const [adType, setAdType] = useState<FilterItem>(adTypeFilterItems[0]);
  const [crypto, setCrypto] = useState<FilterItem>(cryptoSymbolFilterItems[0]);
  const [ads, setAds] = useState(filterAdsByType(adType.id as AdType, crypto.id));

  const adsListStyle = Platform.select({
    ios: 'pb-20',
    android: 'pb-24',
  });

  useEffect(() => {
    setAds(filterAdsByType(adType.id as AdType, crypto.id));
  }, [adType, crypto]);

  return (
    <SafeAreaView className='screen-wrapper'>
      <View className={cn('content-wrapper', screenContentWrapperStyle)}>
        <View className='flex gap-y-3'>
          <View className='flex-row justify-center'>
            <ToggleButton
              value={adType}
              items={[adTypeFilterItems[0], adTypeFilterItems[1]]}
              activeButtonColors={{
                [adTypeFilterItems[0].id]: 'bg-primary',
                [adTypeFilterItems[1].id]: 'bg-error-500',
              }}
              activeLabelColors={{
                [adTypeFilterItems[0].id]: 'text-base-dark',
                [adTypeFilterItems[1].id]: 'text-base-white',
              }}
              labelStyle='text-base'
              wrapperStyle='w-5/6 h-10'
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
