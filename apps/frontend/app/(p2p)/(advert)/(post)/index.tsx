import { Dropdown, PrimaryButton, StepperInput, ToggleButton } from '@/components';
import { Strings } from '@/constants';
import { useAds, useCrypto, useFiat, usePriceTypes } from '@/hooks';
import { priceIndex } from '@/models';
import { capitalizeWords } from '@/utils';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PostAdvert = () => {
  const { adTypeFilterItems } = useAds();
  const { priceTypeFilterItems, getPriceRangeById } = usePriceTypes();
  const { cryptoNameFilterItemsStrict, getCryptoNameFilterItemById } = useCrypto();
  const { fiatSymbolFilterItemsStrict } = useFiat();
  const [selectedFiat, setSelectedFiat] = useState<FilterItem>(fiatSymbolFilterItemsStrict[0]);

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
      type: JSON.stringify(adType.label),
      priceType: JSON.stringify(priceType.label),
      selectedCrypto: JSON.stringify(selectedCrypto.id.toUpperCase()),
      selectedFiat: selectedFiat ? JSON.stringify(selectedFiat.label) : undefined,
    };

    router.push({
      pathname: '/(p2p)/(advert)/(post)/info',
      params: advertData,
    });

    try {
      // we will call API to create the advert
      console.log('Creating advert:', advertData);
    } catch (error) {
      console.error('Error creating advert:', error);
    }
  };

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <View className='content-wrapper'>
        <Text className='font-clashDisplay text-sm text-label dark:text-label-dark'>
          {Strings.postAd.AD_TYPE_LABEL}
        </Text>
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
          wrapperStyle='w-full h-10'
          onChange={(val) => setAdType(val)}
        />
        <Dropdown
          title='Select Cryptocurrency'
          items={cryptoNameFilterItemsStrict}
          value={selectedCrypto}
          onSelect={(crypto) => setSelectedCrypto(getCryptoNameFilterItemById(crypto.id)!)}
        />
        <Dropdown
          title='Select Fiat'
          items={fiatSymbolFilterItemsStrict}
          value={selectedFiat}
          onSelect={(fiat) => setSelectedFiat(fiat)}
        />
        <Text className='font-clashDisplay text-sm text-label dark:text-label-dark'>
          {Strings.postAd.PRICE_SETTING}
        </Text>
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
        <View className='mt-8'>
          <PrimaryButton title={Strings.postAd.BUTTON_NEXT_LABEL} isLoading={false} onPress={handleCreateAdvert} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PostAdvert;
