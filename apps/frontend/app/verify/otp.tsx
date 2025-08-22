import { PrimaryButton } from '@/components';
import { Strings } from '@/constants';
import { RequirementType } from '@/models';
import cn from 'clsx';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Keyboard, Pressable, Text, View } from 'react-native';
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { SafeAreaView } from 'react-native-safe-area-context';

const OTP = () => {
  const { reqId } = useLocalSearchParams<{ reqId: RequirementType }>();

  const [timer, setTimer] = useState(30);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  const ctaDisabled = useMemo(() => value.length < 4, [value]);

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

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
                    isFocused ? 'elevation-md border-primary' : 'border-stroke dark:border-stroke-dark',
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
            <PrimaryButton title={Strings.otp.CTA} disabled={ctaDisabled} />
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default OTP;
