import { logos } from '@/assets';
import { CopyIconButton, DividerX, Dropdown, PrimaryButton } from '@/components';
import { useNetwork, useWallet } from '@/hooks';
import cn from 'clsx';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Platform, ScrollView, Text, useColorScheme, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const Deposit = () => {
  const isDark = useColorScheme() === 'dark';
  const { deposit } = useWallet();
  const { networkFilterItems, getNetworkById } = useNetwork();

  const [network, setNetwork] = useState<FilterItem>(networkFilterItems[0]);

  const address = useMemo(() => getNetworkById(network.id)?.address, [network]);
  const formStyle = Platform.select({
    android: 'pb-56',
    ios: 'pb-72',
  });

  const savePicture = async () => {
    deposit('usdt', Number((Math.random() * (15 - 1) + 1).toFixed(2)));
    setTimeout(() => router.back(), 500);
  };

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className={cn('content-wrapper mt-2', formStyle)}>
          <View className='deposit-form'>
            <View className='qr-wrapper'>
              <QRCode
                size={200}
                quietZone={8}
                logoSize={36}
                value={address}
                logoMargin={-8}
                logo={logos.crypter}
                logoBackgroundColor='transparent'
                color={isDark ? '#F1F1F1' : '#1C1C1C'}
                backgroundColor={isDark ? 'black' : 'white'}
              />
            </View>

            <View className='deposit-form-content'>
              <View className='gap-y-2'>
                <Text className='deposit-form-label'>Deposit Address</Text>

                <View className='deposit-form-row'>
                  <View className='deposit-form-value-wrapper'>
                    <Text className='deposit-form-value' numberOfLines={1} ellipsizeMode='middle'>
                      {address}
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
                      <Text className='deposit-form-label text-xs'>
                        Please deposit the exact amount to the address provided above. The platform will not be
                        responsible for any loss of funds resulting from incorrect or abnormal deposit amounts.
                      </Text>
                      <Text className='deposit-form-label text-xs'>
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

      <View className={cn('absolute-bottom-form-cta', Platform.select({ android: 'pb-48', ios: 'pb-52' }))}>
        <PrimaryButton title='Save Picture' onPress={savePicture} />
      </View>
    </SafeAreaView>
  );
};

export default Deposit;
