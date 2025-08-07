import { PrimaryDropdown, ToggleButton } from '@/components';
import { screenContentWrapperStyle } from '@/constants';
import { useCrypto } from '@/hooks';
import cn from 'clsx';
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PostAdvert = () => {
  const { cryptoNameFilterItemsStrict, getCryptoNameById } = useCrypto();

  const [selectedCrypto, setSelectedCrypto] = useState<FilterItem | null>(null);
  const [adType, setAdType] = useState<AdType>('buy');

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
            labelStyle='text-base'
            wrapperStyle='w-5/6 h-10'
            options={['buy', 'sell']}
            labels={{ buy: 'Buy', sell: 'Sell' }}
            activeButtonColors={{ buy: 'bg-primary', sell: 'bg-error-500' }}
            activeLabelColors={{ buy: 'text-base-black', sell: 'text-base-white' }}
            onChange={(val) => setAdType(val)}
          />
        </View>

        <PrimaryDropdown<FilterItem>
          title='Select Cryptocurrency'
          items={cryptoNameFilterItemsStrict}
          value={selectedCrypto ?? { id: '', label: '' }}
          onSelect={(crypto) => setSelectedCrypto(getCryptoNameById(crypto.id) || null)}
          containerStyle='w-full max-w-sm'
        />
      </View>
    </SafeAreaView>
  );
};

export default PostAdvert;
