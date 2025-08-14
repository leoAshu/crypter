import { images } from '@/assets';
import { CopyIconButton, DividerX, Dropdown, PrimaryButton } from '@/components';
import { useNetwork, useWallet } from '@/hooks';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Deposit = () => {
  const { deposit } = useWallet();
  const { networkFilterItems, getNetworkById } = useNetwork();

  const [network, setNetwork] = useState<FilterItem>(networkFilterItems[0]);

  const savePicture = async () => {
    deposit('usdt', Number((Math.random() * (15 - 1) + 1).toFixed(2)));
    setTimeout(() => router.back(), 500);
  };

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='content-wrapper mb-32 mt-2'>
          <View className='deposit-form'>
            <View className='qr-wrapper'>
              <Image source={images.qr} className='size-48 rounded-lg' resizeMode='contain' />
            </View>

            <View className='deposit-form-content'>
              <View className='gap-y-2'>
                <Text className='deposit-form-label'>Deposit Address</Text>

                <View className='deposit-form-row'>
                  <View className='deposit-form-value-wrapper'>
                    <Text className='deposit-form-value' numberOfLines={1} ellipsizeMode='middle'>
                      {getNetworkById(network.id)?.address ?? ''}
                    </Text>
                  </View>
                  <View className='deposit-form-icon-wrapper'>
                    <CopyIconButton value={getNetworkById(network.id)?.address ?? ''} iconStyle='size-6' />
                  </View>
                </View>
              </View>

              <Dropdown
                title='Network'
                value={network}
                items={networkFilterItems}
                onSelect={(val) => setNetwork(val)}
              />

              <View className='deposit-form-footer'>
                <Text className='deposit-form-footer-title'>Additional Info</Text>
                <View className='deposit-form-footer-wrapper'>
                  <View className='flex-row items-center justify-between'>
                    <Text className='deposit-form-label'>Minimum Deposit</Text>
                    <Text className='font-clashDisplay text-sm text-body dark:text-body-dark'>1 USDT</Text>
                  </View>

                  <View className='gap-y-2'>
                    <View className='gap-y-1'>
                      <Text className='font-clashDisplay text-xs text-body dark:text-body-dark'>Deposit Advisory</Text>
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

      <View className='absolute bottom-48 left-0 right-0 px-4'>
        <PrimaryButton title='Save Picture' onPress={savePicture} />
      </View>
    </SafeAreaView>
  );
};

export default Deposit;
