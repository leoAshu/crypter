import { AdCard, ChipFilter, DividerX, ToggleButton } from '@/components';
import { screenContentWrapperStyle } from '@/constants';
import { cryptoLabels, cryptoOptions, getFilteredAds } from '@/models';
import cn from 'clsx';
import { useEffect, useState } from 'react';
import { FlatList, Platform, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const isDark = useColorScheme() === 'dark';
  const [adType, setAdType] = useState<AdType>('buy');
  const [crypto, setCrypto] = useState<CryptoOptions>('all');
  const [adsList, setAdsList] = useState<Ad[]>(getFilteredAds(adType, crypto));

  const adsListStyle = Platform.select({
    ios: 'pb-20',
    android: 'pb-24',
  });

  useEffect(() => {
    setAdsList(getFilteredAds(adType, crypto));
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

          <ChipFilter value={crypto} options={cryptoOptions} labels={cryptoLabels} onChange={(val) => setCrypto(val)} />
        </View>

        <FlatList
          data={adsList}
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
