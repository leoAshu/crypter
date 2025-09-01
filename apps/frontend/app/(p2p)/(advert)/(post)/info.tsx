import { icons } from '@/assets';
import {
  DividerX,
  NotificationModal,
  PaymentMethodChips,
  PayTimeLimitModal,
  PrimaryButton,
  SecondaryInputField,
  SelectPayMethodModal,
} from '@/components';
import { AlertStrings, ComponentStrings, Strings } from '@/constants';
import { useAds, useFilter, usePaymentTimeLimits, usePayMethod, usePayMethodType } from '@/hooks';
import cn from 'clsx';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PostAdvertInfo = () => {
  const { newAd } = useAds();
  const { getFilterItemById, cryptoNameFilterItemsStrict: cryptos, fiatSymbolFilterItemsStrict: fiats } = useFilter();
  const { getPayMethodTypeById, getFilteredPayMethodTypesByIds } = usePayMethodType();
  const { getActivePayMethodTypeIds } = usePayMethod();
  const {
    payTimeLimits,
    selectedPayTimeLimitData,
    isBottomSheetVisible: isPayTimeLimitBottomSheetVisible,
    selectPayTimeLimit,
    openBottomSheet: openPayTimeLimitBottomSheet,
    closeBottomSheet: closePayTimeLimitBottomSheet,
  } = usePaymentTimeLimits();

  const activeUserPayMethods = getActivePayMethodTypeIds();
  const isDark = useColorScheme() === 'dark';
  const params = useLocalSearchParams();
  const initialFormData = useMemo(() => {
    if (params.formData) {
      try {
        return JSON.parse(params.formData as string) as AdFormData;
      } catch (error) {
        console.error('Failed to parse form data:', error);
        return newAd;
      }
    }
    return newAd;
  }, [params.formData, newAd]);

  const [formData, setFormData] = useState<AdFormData>(initialFormData);
  const [selectedPayMethods, setSelectedPayMethods] = useState<string[]>([]);
  const [availablePayMethods, setAvailablePayMethods] = useState<string[]>(activeUserPayMethods);
  const [openBottomSheetPayMethod, setOpenBottomSheetPayMethod] = useState(false);
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);

  const selectedCrypto = getFilterItemById(cryptos, formData.cryptoId);
  const selectedFiat = getFilterItemById(fiats, formData.countryId);

  const updateForm = (key: keyof AdFormData, val: any) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleCreateAdvert = async () => {
    const finalFormData = {
      ...formData,
      minLimit: formData.minLimit,
      maxLimit: formData.maxLimit,
      available: formData.available,
      payMethodTypeIds: selectedPayMethods,
      releaseTime: selectedPayTimeLimitData?.value || '',
    };

    console.log('Final form data:', JSON.stringify(finalFormData, null, 2));
    setIsNotificationModalVisible(true);
  };

  const handleViewAdvert = () => {
    router.back();
    router.back();
  };

  const selectPayMethod = (id: string) => {
    setSelectedPayMethods((prev) => [...prev, id]);
    setAvailablePayMethods((prev) => prev.filter((item) => item !== id));
  };

  const deselectPayMethod = (id: string) => {
    setAvailablePayMethods((prev) => [...prev, id]);
    setSelectedPayMethods((prev) => prev.filter((item) => item !== id));
  };

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView keyboardShouldPersistTaps='handled'>
            <View className='content-wrapper form-group mt-4'>
              <View className='gap-y-4'>
                <SecondaryInputField
                  label='Total Amount'
                  secondarylabel={selectedCrypto?.label}
                  value={formData.available}
                  onChangeText={(val) => updateForm('available', val)}
                  keyboardType='numeric'
                />

                <View className='flex-row items-end gap-x-4'>
                  <View className='flex-1'>
                    <SecondaryInputField
                      label='Order Limit'
                      secondarylabel={selectedFiat?.label}
                      value={formData.minLimit}
                      onChangeText={(val) => updateForm('minLimit', val)}
                      keyboardType='numeric'
                    />
                  </View>

                  <View className='flex-1'>
                    <SecondaryInputField
                      label=''
                      secondarylabel={selectedFiat?.label}
                      value={formData.maxLimit}
                      onChangeText={(val) => updateForm('maxLimit', val)}
                      keyboardType='numeric'
                    />
                  </View>
                </View>
              </View>

              <DividerX style={cn('my-1', isDark ? 'opacity-75' : 'opacity-25')} />

              <PaymentMethodChips
                selectedPayMethods={selectedPayMethods.filter((id) => getPayMethodTypeById(id))}
                onRemovePayMethod={deselectPayMethod}
                onOpenBottomSheet={() => {
                  if (!activeUserPayMethods.length) {
                    Alert.alert(AlertStrings.TITLE.ERROR, Strings.postAd.PAYMENT_METHOD_ERROR);
                    return;
                  }
                  Keyboard.dismiss();
                  setOpenBottomSheetPayMethod(true);
                }}
                canAddMore={selectedPayMethods.length < 3 && activeUserPayMethods.length > 0}
                maxSelections={3}
              />

              <DividerX style={cn('my-1', isDark ? 'opacity-75' : 'opacity-25')} />

              <View className='gap-y-4'>
                <View className='flex-row items-center justify-between'>
                  <Text className='field-label'>{Strings.postAd.PAYMENT_TIME_LIMIT_LABEL}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      Keyboard.dismiss();
                      openPayTimeLimitBottomSheet();
                    }}
                  >
                    <View className='flex-row items-end'>
                      <Text className='font-satoshi text-sm text-body underline dark:text-body-dark'>
                        {selectedPayTimeLimitData ? selectedPayTimeLimitData.label : 'Select'}
                      </Text>

                      <Image
                        source={isDark ? icons.dark.arrowRight : icons.light.arrowRight}
                        className='size-4'
                        resizeMode='contain'
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View className='rounded-lg border border-dashed border-warning-500 bg-warning-500/10 px-3 py-4 dark:border-warning-100 dark:bg-warning-100/10'>
                  <Text className='font-satoshi text-sm text-label dark:text-label-dark'>
                    {Strings.postAd.ESTIMATED_FEE_LABEL} - 0.876 ALGO
                  </Text>
                </View>
              </View>

              <View className='mt-4'>
                <PrimaryButton title={Strings.postAd.PUBLISH_AD_LABEL} isLoading={false} onPress={handleCreateAdvert} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <SelectPayMethodModal
        payMethodTypes={getFilteredPayMethodTypesByIds(availablePayMethods)}
        visible={openBottomSheetPayMethod}
        onClose={() => setOpenBottomSheetPayMethod(false)}
        onTapPayMethodType={selectPayMethod}
      />
      <PayTimeLimitModal
        payTimeLimits={payTimeLimits}
        visible={isPayTimeLimitBottomSheetVisible}
        onClose={closePayTimeLimitBottomSheet}
        onSelectPayTimeLimit={selectPayTimeLimit}
      />
      <NotificationModal
        visible={isNotificationModalVisible}
        onClose={() => setIsNotificationModalVisible(false)}
        title={ComponentStrings.NotificationModal.AD_PUBLISHED}
        ctaLabel={ComponentStrings.NotificationModal.VIEW_AD_LABEL}
        ctaOnPress={handleViewAdvert}
        icon={isDark ? icons.dark.tickHalo : icons.light.tickHalo}
      />
    </SafeAreaView>
  );
};

export default PostAdvertInfo;
