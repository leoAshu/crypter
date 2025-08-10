import { Dropdown, ToggleButton } from '@/components';
import { screenContentWrapperStyle } from '@/constants';
import { useAds, useCrypto } from '@/hooks';
import cn from 'clsx';
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PostAdvert = () => {
  const { adTypeFilterItems } = useAds();
  const { cryptoNameFilterItemsStrict, getCryptoNameById } = useCrypto();

  const [adType, setAdType] = useState<FilterItem>(adTypeFilterItems[0]);
  const [selectedCrypto, setSelectedCrypto] = useState<FilterItem>();

  const handleCreateAdvert = async () => {
    if (!selectedCrypto) {
      // Show error - no crypto selected
      return;
    }

    const advertData = {
      type: adType,
      cryptoId: selectedCrypto.id,
      // we will add more fields here later
    };

    try {
      // we will call API to create the advert
      console.log('Creating advert:', advertData);
    } catch (error) {
      console.error('Error creating advert:', error);
    }
  };

  return (
    <SafeAreaView className='screen-wrapper'>
      <View className={cn('content-wrapper', screenContentWrapperStyle)}>
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

        <Dropdown
          title='Select Cryptocurrency'
          items={cryptoNameFilterItemsStrict}
          value={selectedCrypto}
          onSelect={(crypto) => setSelectedCrypto(getCryptoNameById(crypto.id))}
        />
      </View>
    </SafeAreaView>
  );
};

export default PostAdvert;
