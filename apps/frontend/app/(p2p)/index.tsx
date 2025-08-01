import { AdCard, ChipFilter, ToggleButton } from '@/components';
import { adsListStyle, P2P_LISTINGS, screenContentWrapperStyle } from '@/constants';
import { cryptoLabels, cryptoOptions } from '@/models';
import cn from 'clsx';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const [adType, setAdType] = useState<AdType>('buy');
  const [crypto, setCrypto] = useState<CryptoOptions>('all');
  const [adsList, setAdsList] = useState(P2P_LISTINGS);

  useEffect(() => {
    setAdsList(P2P_LISTINGS.filter((item) => item['type'] === adType));
  }, [adType]);

  return (
    <SafeAreaView className='screen-wrapper'>
      <View className={cn('content-wrapper gap-y-4', screenContentWrapperStyle)}>
        <View className='flex gap-y-3'>
          <View className='flex-row justify-center'>
            <ToggleButton
              value={adType}
              labelStyle='text-sm'
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
          className={adsListStyle}
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
