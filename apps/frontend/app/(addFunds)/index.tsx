import { icons, images } from '@/assets';
import { CopyIconButton, DividerX, PrimaryButton } from '@/components';
import { screenContentWrapperStyle } from '@/constants';
import { useCrypto } from '@/hooks';
import { CryptoOptionStrict } from '@/hooks/appData/useCrypto';
import { useWallet } from '@/store';
import cn from 'clsx';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Deposit = () => {
  const isDark = useColorScheme() === 'dark';

  const { cryptoLabelsStrict, cryptoOptionsStrict } = useCrypto();
  const { deposit } = useWallet();

  const [crypto, setCrypto] = useState<CryptoOptionStrict>(cryptoOptionsStrict[0]);

  const savePicture = async () => {
    deposit('usdt', Number((Math.random() * (15 - 1) + 1).toFixed(2)));

    setTimeout(() => router.back(), 500);
  };

  return (
    <SafeAreaView className='screen-wrapper'>
      <ScrollView>
        <View className={cn('content-wrapper', screenContentWrapperStyle)}>
          <View className='deposit-form'>
            <View className='qr-wrapper'>
              <Image source={images.qr} className='h-48 w-48 rounded-lg' resizeMode='contain' />
            </View>

            <View className='deposit-form-content'>
              <View className='gap-y-2'>
                <Text className='deposit-form-label'>Deposit Address</Text>

                <View className='deposit-form-row'>
                  <View className='deposit-form-value-wrapper'>
                    <Text className='deposit-form-value' numberOfLines={1} ellipsizeMode='middle'>
                      0x5a3c2E1B53F1a871bE8B7F442Ead61a9F2cEb94A
                    </Text>
                  </View>
                  <View className='deposit-form-icon-wrapper'>
                    <CopyIconButton iconStyle='size-6' />
                  </View>
                </View>
              </View>

              <View className='gap-y-2'>
                <Text className='deposit-form-label'>Network</Text>

                <View className='deposit-form-row'>
                  <View className='deposit-form-value-wrapper'>
                    <Text className='deposit-form-value' numberOfLines={1} ellipsizeMode='tail'>
                      BNB Smart Chain (BEP20)
                    </Text>
                  </View>
                  <View className='deposit-form-icon-wrapper'>
                    <Image
                      source={isDark ? icons.dark.arrowDown : icons.light.arrowDown}
                      className='size-8'
                      resizeMode='contain'
                    />
                  </View>
                </View>
              </View>

              <View className='deposit-form-footer'>
                <Text className='deposit-form-footer-title'>Additional Info</Text>
                <View className='deposit-form-footer-wrapper'>
                  <View className='flex-row items-center justify-between'>
                    <Text className='deposit-form-label'>Minimum Deposit</Text>
                    <Text className='text-body dark:text-body-dark font-clashDisplay text-lg'>1 USDT</Text>
                  </View>

                  <View className='gap-y-2'>
                    <View className='gap-y-1'>
                      <Text className='text-body dark:text-body-dark font-clashDisplay'>Deposit Advisory</Text>
                      <DividerX style='opacity-30' />
                    </View>
                    <View className='gap-y-2'>
                      <Text className='deposit-form-label text-sm'>
                        Please deposit the exact amount to the address provided above. The platform will not be
                        responsible for any loss of funds resulting from incorrect or abnormal deposit amounts.
                      </Text>
                      <Text className='deposit-form-label text-sm'>
                        Only TRC20-USDT deposits are supported — do not deposit any other asset type to this address, as
                        those funds cannot be recovered.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className='absolute-bottom-cta'>
        <PrimaryButton title='Save Picture' onPress={savePicture} />
      </View>
    </SafeAreaView>
  );
};

export default Deposit;
