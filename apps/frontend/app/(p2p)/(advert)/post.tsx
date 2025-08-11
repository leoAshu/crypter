import { Dropdown, StepperInput, ToggleButton } from '@/components';
import { screenContentWrapperStyle, Strings } from '@/constants';
import { useAds, useCrypto, usePriceTypes } from '@/hooks';
import { priceIndex } from '@/models';
import { capitalizeWords } from '@/utils';
import cn from 'clsx';
import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PostAdvert = () => {
  const { adTypeFilterItems } = useAds();
  const { priceTypeFilterItems, getPriceRangeById } = usePriceTypes();
  const { cryptoNameFilterItemsStrict, getCryptoNameFilterItemById } = useCrypto();
  const [adType, setAdType] = useState<FilterItem>(adTypeFilterItems[0]);
  const [priceType, setpriceType] = useState<FilterItem>(priceTypeFilterItems[0]);
  const [selectedCrypto, setSelectedCrypto] = useState<FilterItem>();
  const [priceIndices, setPriceIndices] = useState<Record<string, number>>(priceIndex);

  const currentIndex = priceIndices[priceType.id];

  const handlePriceChange = useCallback(
    (increment: boolean) => {
      setPriceIndices((prev) => ({
        ...prev,
        [priceType.id]: prev[priceType.id] + (increment ? 1 : -1),
      }));
    },
    [priceType.id],
  );

  const handleCreateAdvert = async () => {
    if (!selectedCrypto) {
      // Show error - no crypto selected
      return;
    }

    const advertData = {
      type: adType,
      cryptoId: selectedCrypto.id,
      priceType: priceType,
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
          onSelect={(crypto) => setSelectedCrypto(getCryptoNameFilterItemById(crypto.id))}
        />
        <Text className='text-label'>{Strings.postAd.PRICE_SETTING}</Text>
        <ToggleButton
          value={priceType}
          items={[priceTypeFilterItems[0], priceTypeFilterItems[1]]}
          activeButtonColors={{
            [priceTypeFilterItems[0].id]: 'bg-card-info',
            [priceTypeFilterItems[1].id]: 'bg-card-info',
          }}
          activeLabelColors={{
            [priceTypeFilterItems[0].id]: 'text-base-dark',
            [priceTypeFilterItems[1].id]: 'text-base-dark',
          }}
          wrapperStyle='w-full h-10'
          onChange={(val) => setpriceType(val)}
        />
        <StepperInput
          label={capitalizeWords(priceType.label)}
          onIncrement={() => handlePriceChange(true)}
          onDecrement={() => handlePriceChange(false)}
          index={currentIndex}
          items={getPriceRangeById(priceType.id)}
        />
      </View>
    </SafeAreaView>
  );
};

export default PostAdvert;
