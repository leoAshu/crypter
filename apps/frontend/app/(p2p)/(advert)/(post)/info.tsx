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
import { Strings } from '@/constants';
import { usePaymentTimeLimits, usePayMethodType } from '@/hooks';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
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
  const { payMethodTypes, getPayMethodTypeById } = usePayMethodType();
  const [selectedPayMethods, setSelectedPayMethods] = useState<string[]>([]);
  const [availablePayMethods, setAvailablePayMethods] = useState<string[]>(payMethodTypes.map((item) => item.id));
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

  const orderMap: Record<string, number> = {};
  payMethodTypes.forEach((item, idx) => {
    orderMap[item.id] = idx;
  });

  const handleCreateAdvert = async () => {
    setIsNotificationModalVisible(true);
  };

  const handleViewAdvert = () => {
    router.back();
    router.back();
  };

  const sortByOriginal = (arr: string[]) => arr.sort((a, b) => orderMap[a] - orderMap[b]);

  const selectPayMethod = (id: string) => {
    setSelectedPayMethods((prev) => [...prev, id]);
    setAvailablePayMethods((prev) => prev.filter((item) => item !== id));
  };

  const deselectPayMethod = (id: string) => {
    setAvailablePayMethods((prev) => sortByOriginal([...prev, id]));
    setSelectedPayMethods((prev) => sortByOriginal(prev.filter((item) => item !== id)));
  };

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView keyboardShouldPersistTaps='handled'>
            <View className='content-wrapper pt-6'>
              <SecondaryInputField
                label='Total Amount'
                secondarylabel={receivedCrypto}
                value={totalAmount}
                onChangeText={setTotalAmount}
                keyboardType='numeric'
              />
              <View className='mt-4 flex-row items-end gap-4'>
                <View style={{ flex: 1 }}>
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
              <DividerX style='my-4' />
              <PaymentMethodChips
                selectedPayMethods={selectedPayMethods.map((id) => getPayMethodTypeById(id)!.id)}
                onRemovePayMethod={deselectPayMethod}
                onOpenBottomSheet={() => {
                  Keyboard.dismiss();
                  setOpenBottomSheetPayMethod(true);
                }}
                canAddMore={selectedPayMethods.length < 3}
                maxSelections={3}
              />
              <DividerX style='my-4' />
              <View className='flex-row items-center justify-between'>
                <Text className='input-label text-title dark:text-title-dark'>Payment TimeLimit</Text>
                <TouchableOpacity
                  onPress={() => {
                    Keyboard.dismiss();
                    openPayTimeLimitBottomSheet();
                  }}
                >
                  <Text className='mt-1 font-satoshi text-sm text-label dark:text-label-dark'>
                    {selectedPayTimeLimitData ? selectedPayTimeLimitData.label : 'Select'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View className='mt-4 rounded-lg border border-dashed border-warning-500 bg-warning-500/10 px-3 py-4 dark:border-warning-100 dark:bg-warning-100/10'>
                <Text className='font-satoshi text-sm text-label dark:text-label-dark'>Estimated Fee - 0.876 ALGO</Text>
              </View>
              <View className='mt-8'>
                <PrimaryButton title={Strings.postAd.PUBLISH_AD_LABEL} isLoading={false} onPress={handleCreateAdvert} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <SelectPayMethodModal
        payMethodTypes={availablePayMethods.map((id) => getPayMethodTypeById(id)!)}
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
