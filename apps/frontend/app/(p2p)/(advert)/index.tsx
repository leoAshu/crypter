import { AdCard, ChipFilter, DividerX, PrimaryButton, ToggleButton } from '@/components';
import { screenContentWrapperStyle, Strings } from '@/constants';
import { useAds, useCrypto } from '@/hooks';
import { useAuthStore } from '@/store';
import cn from 'clsx';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Platform, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyAdvert = () => {
  const isDark = useColorScheme() === 'dark';

  const { user } = useAuthStore();
  const { filterAdsByUserId } = useAds();
  const { cryptoSymbolFilterItems } = useCrypto();

  const [adType, setAdType] = useState<AdType>('buy');
  const [crypto, setCrypto] = useState<FilterItem>(cryptoSymbolFilterItems[0]);
  const [myAds, setMyAds] = useState(filterAdsByUserId(adType, crypto.id, user?.id ?? ''));
  const isAdsEmpty = myAds.length === 0;

  const adsListStyle = Platform.select({
    ios: 'pb-20',
    android: 'pb-24',
  });

  useEffect(() => {
    setMyAds(filterAdsByUserId(adType, crypto.id, user?.id ?? ''));
  }, [adType, crypto]);

  const EmptyState = () => (
    <View className='items-center justify-center'>
      <Text className={cn('header-txt', isDark ? 'text-base-white' : 'text-base-black')}>
        {Strings.postAd.EMPTY_STATE}
      </Text>
      <PrimaryButton title='Post Advert' onPress={() => router.push('/(p2p)/(advert)/post')} />
    </View>
  );

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
          data={myAds}
          initialNumToRender={0}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id.toString()}
          contentContainerClassName={cn(!isAdsEmpty ? adsListStyle : 'flex-1 items-center justify-center pb-48')}
          renderItem={({ item, index }) => <AdCard ad={item} index={index} animationStyle='fadeFloatUp' />}
          ItemSeparatorComponent={() => <DividerX style={cn('mb-4', isDark ? 'opacity-40' : 'opacity-25')} />}
          ListFooterComponent={() => (!isAdsEmpty ? <DividerX style={isDark ? 'opacity-40' : 'opacity-25'} /> : null)}
          ListEmptyComponent={EmptyState}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyAdvert;
