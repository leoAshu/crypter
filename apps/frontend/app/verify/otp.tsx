import { icons } from '@/assets';
import { NotificationModal, PrimaryButton } from '@/components';
import { Strings, ToastStrings } from '@/constants';
import { useKyc } from '@/hooks';
import { RequirementStatus, RequirementType } from '@/models';
import cn from 'clsx';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Keyboard, Pressable, Text, useColorScheme, View } from 'react-native';
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const OTP = () => {
  const isDark = useColorScheme() === 'dark';
  const { isLoading, verifyOtp: verify, updateKyc } = useKyc();
  const { reqId } = useLocalSearchParams<{ reqId: RequirementType }>();

  const [timer, setTimer] = useState(30);
  const [value, setValue] = useState('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [verificationFailed, setVerificationFailed] = useState<boolean>(false);

  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  const ctaDisabled = value.length < 4;

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const verifyOtp = async () => {
    if (value.length < 4) return;

    const result = await verify(value);

    if (result) {
      setModalVisible(true);
    } else {
      setVerificationFailed(true);
      Toast.show({
        type: 'error',
        text1: ToastStrings.Error.TITLE,
        text2: ToastStrings.Error.OTP_ERROR,
        position: 'bottom',
        bottomOffset: 112,
        autoHide: false,
        onHide: () => {
          setValue('');
          setVerificationFailed(false);
        },
      });
    }
  };

  useEffect(() => {
    verifyOtp();
  }, [value]);

  const onModalClose = () => {
    setModalVisible(false);
    updateKyc(`${reqId}Status`, RequirementStatus.Verified);
    router.back();
    router.back();
  };

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <Pressable className='flex-1' onPress={Keyboard.dismiss}>
        <View className='content-wrapper items-center gap-y-6'>
          <View className='items-center gap-y-1'>
            <Text className='font-clashDisplay-medium text-2xl text-title dark:text-title-dark'>
              {Strings.otp.TITLE}
            </Text>
            <Text className='font-satoshi text-label dark:text-label-dark'>
              {Strings.otp.SUBTITLE} {reqId}
            </Text>
          </View>

          <View className='items-center gap-y-4'>
            <CodeField
              autoFocus
              ref={ref}
              {...props}
              value={value}
              cellCount={4}
              onChangeText={setValue}
              keyboardType='number-pad'
              textContentType='oneTimeCode'
              renderCell={({ index, symbol, isFocused }) => (
                <View
                  key={index}
                  className={cn(
                    'mx-2 size-16 items-center justify-center rounded-xl border-2 bg-card dark:bg-card-dark',
                    verificationFailed
                      ? 'border-error-500'
                      : isFocused
                        ? 'elevation-md border-primary'
                        : 'border-stroke dark:border-stroke-dark',
                  )}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  <Text className='font-satoshi-medium text-2xl text-title dark:text-title-dark'>{symbol}</Text>
                </View>
              )}
            />

            <View className='flex-row items-center gap-x-1'>
              <Text className='font-satoshi text-sm text-label dark:text-label-dark'>
                {Strings.otp.CODE_NOT_RECEIVED}
              </Text>
              {timer > 0 ? (
                <Text className='font-satoshi text-sm text-label dark:text-label-dark'>
                  {Strings.otp.RESEND_IN} {timer}s
                </Text>
              ) : (
                <Pressable hitSlop={20} onPress={() => setTimer(30)}>
                  <Text className='font-satoshi-medium text-sm text-primary underline'>{Strings.otp.RESEND_CODE}</Text>
                </Pressable>
              )}
            </View>
          </View>

          <View className='mt-12 w-full'>
            <PrimaryButton title={Strings.otp.CTA} isLoading={isLoading} disabled={ctaDisabled} onPress={verifyOtp} />
          </View>
        </View>
      </Pressable>

      <NotificationModal
        title={Strings.otp.OTP_SUCCESS}
        icon={isDark ? icons.dark.tickHalo : icons.light.tickHalo}
        label={reqId === RequirementType.Email ? Strings.otp.EMAIL_SUCCESS : Strings.otp.PHONE_SUCCESS}
        visible={modalVisible}
        onClose={onModalClose}
      />
    </SafeAreaView>
  );
};

export default OTP;
