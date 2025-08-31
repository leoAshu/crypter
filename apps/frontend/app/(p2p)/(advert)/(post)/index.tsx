import { Dropdown, PrimaryButton, StepperInput, ToggleButton } from '@/components';
import { Strings } from '@/constants';
import { useAds, useFilter, usePriceTypes } from '@/hooks';
import { priceIndex } from '@/models';
import { capitalizeWords } from '@/utils';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PostAdvert = () => {
  const { newAd } = useAds();
  const { getPriceRangeById } = usePriceTypes();
  const {
    adTypeFilterItems: adTypes,
    cryptoNameFilterItemsStrict: cryptos,
    fiatSymbolFilterItemsStrict: fiats,
    priceTypeFilterItems: priceTypes,
    getFilterItemById,
  } = useFilter();

  const [formData, setFormData] = useState<AdFormData>(newAd);
  const [priceIndices, setPriceIndices] = useState<Record<string, number>>(priceIndex);

  const adType = getFilterItemById(adTypes, formData.type) ?? adTypes[0];
  const selectedCrypto = getFilterItemById(cryptos, formData.cryptoId);
  const selectedFiat = getFilterItemById(fiats, formData.countryId) ?? fiats[0];
  const priceType = getFilterItemById(priceTypes, formData.priceType) ?? priceTypes[0];
  const currentIndex = priceIndices[priceType.id];

  const updateForm = (key: keyof AdFormData, val: any) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

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
      return;
    }

    router.push({
      pathname: '/(p2p)/(advert)/(post)/info',
      params: { formData: JSON.stringify(formData) },
    });
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      cryptoId: selectedCrypto?.id ?? '',
      countryId: selectedFiat?.id ?? '',
      type: adType.id,
      priceType: priceType.id,
      priceTypeValue: getPriceRangeById(priceType.id)[priceIndices[priceType.id]],
    }));
  }, []);

  useEffect(() => {
    updateForm('priceTypeValue', getPriceRangeById(priceType.id)[priceIndices[priceType.id]]);
  }, [priceIndices]);

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <View className='content-wrapper form-group mt-4'>
        <ToggleButton
          title={Strings.postAd.AD_TYPE_LABEL}
          value={adType}
          items={[adTypes[0], adTypes[1]]}
          activeButtonColors={{
            [adTypes[0].id]: 'bg-primary',
            [adTypes[1].id]: 'bg-error-500',
          }}
          activeLabelColors={{
            [adTypes[0].id]: 'text-base-dark',
            [adTypes[1].id]: 'text-base-white',
          }}
          wrapperStyle='w-full h-10'
          onChange={(val) => updateForm('type', val.id)}
        />

        <Dropdown
          title='Select Cryptocurrency'
          items={cryptos}
          value={selectedCrypto}
          onSelect={(crypto) => updateForm('cryptoId', crypto.id)}
        />

        <Dropdown
          title='Select Fiat'
          items={fiats}
          value={selectedFiat}
          onSelect={(fiat) => updateForm('countryId', fiat.id)}
        />

        <ToggleButton
          title={Strings.postAd.PRICE_SETTING}
          value={priceType}
          items={[priceTypes[0], priceTypes[1]]}
          activeButtonColors={{
            [priceTypes[0].id]: 'bg-base-white dark:bg-card-info',
            [priceTypes[1].id]: 'bg-base-white dark:bg-card-info',
          }}
          activeLabelColors={{
            [priceTypes[0].id]: 'text-title',
            [priceTypes[1].id]: 'text-title',
          }}
          wrapperStyle='w-full h-10'
          onChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              priceType: val.id,
              priceTypeValue: getPriceRangeById(val.id)[priceIndices[val.id]],
            }))
          }
        />

        <StepperInput
          index={currentIndex}
          items={getPriceRangeById(priceType.id)}
          label={capitalizeWords(priceType.label)}
          onIncrement={() => handlePriceChange(true)}
          onDecrement={() => handlePriceChange(false)}
        />

        <View className='mt-4'>
          <PrimaryButton title={Strings.postAd.BUTTON_NEXT_LABEL} isLoading={false} onPress={handleCreateAdvert} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PostAdvert;
