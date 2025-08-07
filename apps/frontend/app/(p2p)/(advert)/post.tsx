import { PrimaryDropdown, ToggleButton } from '@/components';
import { screenContentWrapperStyle } from '@/constants';
import { useCrypto } from '@/hooks';
import cn from 'clsx';
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PostAdvert = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency | null>(null);
  const [adType, setAdType] = useState<AdType>('buy');
  const { cryptos } = useCrypto();

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
        <PrimaryDropdown<CryptoCurrency>
          title='Select Cryptocurrency'
          items={cryptos}
          selectedId={selectedCrypto?.id}
          onSelect={(crypto) => setSelectedCrypto(crypto)}
          renderItem={(crypto) => `${crypto.name} (${crypto.symbol})`}
          containerStyle='w-full max-w-sm'
        />
      </View>
    </SafeAreaView>
  );
};

export default PostAdvert;
