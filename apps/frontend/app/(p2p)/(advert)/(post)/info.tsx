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
import { AlertStrings, Strings } from '@/constants';
import { usePaymentTimeLimits, usePayMethod, usePayMethodType } from '@/hooks';
import cn from 'clsx';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
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
  const isDark = useColorScheme() === 'dark';
  const params = useLocalSearchParams();
  const receivedCrypto = params.selectedCrypto ? JSON.parse(params.selectedCrypto as string) : null;
  const receivedFiat = params.selectedFiat ? JSON.parse(params.selectedFiat as string) : null;
  const [totalAmount, setTotalAmount] = useState<string>('');
  const [orderLimitFrom, setOrderLimitFrom] = useState<string>('');
  const [orderLimitTo, setOrderLimitTo] = useState<string>('');
  const { getPayMethodTypeById, payMethodTypes } = usePayMethodType();
  const { getActivePayMethodTypeIds } = usePayMethod();
  const [selectedPayMethods, setSelectedPayMethods] = useState<string[]>([]);
  const activeUserPayMethods = getActivePayMethodTypeIds();
  const [availablePayMethods, setAvailablePayMethods] = useState<string[]>(activeUserPayMethods);

  const [openBottomSheetPayMethod, setOpenBottomSheetPayMethod] = useState(false);
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);
  const {
    payTimeLimits,
    selectedPayTimeLimitData,
    isBottomSheetVisible: isPayTimeLimitBottomSheetVisible,
    selectPayTimeLimit,
    openBottomSheet: openPayTimeLimitBottomSheet,
    closeBottomSheet: closePayTimeLimitBottomSheet,
  } = usePaymentTimeLimits();

  const handleCreateAdvert = async () => {
    setIsNotificationModalVisible(true);
  };

  const handleViewAdvert = () => {
    router.back();
    router.back();
  };

  const sortByOriginal = (arr: string[]) => {
    return arr.sort();
  };

  const selectPayMethod = (id: string) => {
    setSelectedPayMethods((prev) => sortByOriginal([...prev, id]));
    setAvailablePayMethods((prev) => sortByOriginal(prev.filter((item) => item !== id)));
  };

  const deselectPayMethod = (id: string) => {
    setAvailablePayMethods((prev) => sortByOriginal([...prev, id]));
    setSelectedPayMethods((prev) => sortByOriginal(prev.filter((item) => item !== id)));
  };

  useEffect(() => {
    // To Parse: JSON.parse(params.formData as string) as AdFormData

    console.log(
      params.formData ? JSON.stringify(JSON.parse(params.formData as string) as AdFormData, null, 2) : 'no form data',
    );
  }, []);

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView keyboardShouldPersistTaps='handled'>
            <View className='content-wrapper form-group mt-4'>
              <View className='gap-y-4'>
                <SecondaryInputField
                  label='Total Amount'
                  secondarylabel={receivedCrypto}
                  value={totalAmount}
                  onChangeText={setTotalAmount}
                  keyboardType='numeric'
                />

                <View className='flex-row items-end gap-x-4'>
                  <View className='flex-1'>
                    <SecondaryInputField
                      label='Order Limit'
                      secondarylabel={receivedFiat}
                      value={orderLimitFrom}
                      onChangeText={setOrderLimitFrom}
                      keyboardType='numeric'
                    />
                  </View>

                  <View className='flex-1'>
                    <SecondaryInputField
                      label=''
                      secondarylabel={receivedFiat}
                      value={orderLimitTo}
                      onChangeText={setOrderLimitTo}
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
                    Alert.alert(
                      AlertStrings.TITLE.ERROR,
                      'Please add a payment method first to continue posting your ad.',
                    );
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
                  <Text className='field-label'>Payment Time Limit</Text>
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
                    Estimated Fee - 0.876 ALGO
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
        payMethodTypes={sortByOriginal(availablePayMethods)
          .map((payMethodTypeId) => getPayMethodTypeById(payMethodTypeId))
          .filter((payMethodType): payMethodType is PayMethodType => payMethodType !== undefined)}
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
        title='Your ad has been published'
        label='View Advert here'
        onLabelPress={handleViewAdvert}
        icon={isDark ? icons.dark.tickHalo : icons.light.tickHalo}
      />
    </SafeAreaView>
  );
};

export default PostAdvertInfo;
