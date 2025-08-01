import { AdCard, ChipFilter, ToggleButton } from '@/components';
import { adsListStyle, screenContentWrapperStyle } from '@/constants';
import { ads, cryptoLabels, cryptoOptions, cryptos } from '@/models';
import cn from 'clsx';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const [adType, setAdType] = useState<AdType>('buy');
  const [crypto, setCrypto] = useState<CryptoOptions>('all');
  const [adsList, setAdsList] = useState(ads);

  useEffect(() => {
    const filtered = ads.filter((item) => {
      if (item.type !== adType) return false;

      const cryptoMeta = cryptos.find((c) => c.id === item.cryptoId);

      if (!cryptoMeta || !cryptoMeta.isActive) return false;

      if (crypto === 'all') return true;

      return item.cryptoId === crypto;
    });

    setAdsList(filtered);
  }, [adType, crypto]);

  return (
    <SafeAreaView className='screen-wrapper'>
      <View className={cn('content-wrapper gap-y-4', screenContentWrapperStyle)}>
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
          className={adsListStyle}
          data={adsList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item, index }) => <AdCard ad={item} index={index} animationStyle='fadeFloatUp' />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
