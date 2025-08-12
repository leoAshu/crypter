import { ChipFilter, P2PAds, ToggleButton } from '@/components';
import { screenContentWrapperStyle } from '@/constants';
import { useAds, useCrypto } from '@/hooks';
import { AdType } from '@/models';
import cn from 'clsx';
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const { activeAds, adTypeFilterItems, filterAdsByType } = useAds();
  const { p2pCryptosSymbolFilterItems } = useCrypto();

  const [adType, setAdType] = useState<FilterItem>(adTypeFilterItems[0]);
  const [crypto, setCrypto] = useState<FilterItem>(p2pCryptosSymbolFilterItems[0]);

  const p2pAds = useMemo(() => filterAdsByType(activeAds, adType.id as AdType, crypto.id), [activeAds, adType, crypto]);

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
              onChange={(val) => setAdType(val)}
            />
          </View>

          <ChipFilter value={crypto} items={p2pCryptosSymbolFilterItems} onChange={(item) => setCrypto(item)} />
        </View>

        <P2PAds p2pAds={p2pAds} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
