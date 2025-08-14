import { ChipFilter, MyAds, ToggleButton } from '@/components';
import { useAds, useCrypto } from '@/hooks';
import { AdType } from '@/models';
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyAdvert = () => {
  const { p2pCryptosSymbolFilterItems } = useCrypto();
  const { myAds: myP2PAds, adsLoading, adTypeFilterItems, filterAdsByType, updateAdStatus } = useAds();

  const [adType, setAdType] = useState<FilterItem>(adTypeFilterItems[0]);
  const [crypto, setCrypto] = useState<FilterItem>(p2pCryptosSymbolFilterItems[0]);

  const myAds = useMemo(
    () => filterAdsByType(myP2PAds, adType.id as AdType, crypto.id),
    [myP2PAds, adType, crypto, filterAdsByType],
  );

  const isAdActive = useMemo(() => myAds.some((ad) => ad.isActive), [myAds]);

  const toggleAdStatus = async (adId: string, newIsActive: boolean) => {
    try {
      await updateAdStatus(adId, newIsActive);
    } catch (e) {
      console.log('Failed to update ad status:', e);
    }
  };

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <View className='content-wrapper'>
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

        <MyAds myAds={myAds} isAdActive={adsLoading || isAdActive} toggleAdStatus={toggleAdStatus} />
      </View>
    </SafeAreaView>
  );
};

export default MyAdvert;
