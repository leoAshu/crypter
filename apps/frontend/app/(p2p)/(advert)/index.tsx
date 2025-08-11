import { AdCard, ChipFilter, DividerX, PrimaryButton, ToggleButton } from '@/components';
import { screenContentWrapperStyle, Strings } from '@/constants';
import { useAds, useCrypto } from '@/hooks';
import { AdType } from '@/models';
import cn from 'clsx';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Platform, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyAdvert = () => {
  const isDark = useColorScheme() === 'dark';

  const { myAds: myP2PAds, adTypeFilterItems, filterAdsByType } = useAds();
  const { p2pCryptosSymbolFilterItems } = useCrypto();

  const [adType, setAdType] = useState<FilterItem>(adTypeFilterItems[0]);
  const [crypto, setCrypto] = useState<FilterItem>(p2pCryptosSymbolFilterItems[0]);
  const [myAds, setMyAds] = useState(filterAdsByType(myP2PAds, adType.id as AdType, crypto.id));
  const isAdsEmpty = myAds.length === 0;

  const adsListStyle = Platform.select({
    ios: 'pb-20',
    android: 'pb-24',
  });

  useEffect(() => {
    setMyAds(filterAdsByType(myP2PAds, adType.id as AdType, crypto.id));
  }, [adType, crypto]);

  const EmptyState = () => (
    <View className='items-center justify-center'>
      <Text className={cn('header-txt', isDark ? 'text-base-white' : 'text-base-dark')}>
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
              items={[adTypeFilterItems[0], adTypeFilterItems[1]]}
              activeButtonColors={{
                [adTypeFilterItems[0].id]: 'bg-primary',
                [adTypeFilterItems[1].id]: 'bg-error-500',
              }}
              activeLabelColors={{
                [adTypeFilterItems[0].id]: 'text-base-black',
                [adTypeFilterItems[1].id]: 'text-base-white',
              }}
              onChange={(val) => setAdType(val)}
            />
          </View>

          <ChipFilter value={crypto} items={p2pCryptosSymbolFilterItems} onChange={(item) => setCrypto(item)} />
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
