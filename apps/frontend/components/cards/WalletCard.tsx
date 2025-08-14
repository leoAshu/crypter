import { useAds, useAuth, useCrypto, useFiat, useWallet } from '@/hooks';
import { currencyFormatter } from '@/utils';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { Platform, Text, useColorScheme, View } from 'react-native';
import { WalletCardGradient } from '../backgrounds';
import { PrimaryButton } from '../buttons';
import { DividerX } from '../dividers';

const WalletCard = (props: WalletCardProps) => {
  const isIOS = Platform.OS === 'ios';
  const isDark = useColorScheme() === 'dark';

  const { user } = useAuth();
  const { balances } = useWallet();
  const { defaultFiat } = useFiat();
  const { cryptoLabels } = useCrypto();
  const { getActiveAdsCountByUserId } = useAds();

  const balance = balances[props.cryptoId]['available'];
  const fiatValue = balance * 87.71;

  return (
    <View className='elevation w-full overflow-hidden rounded-2xl bg-card dark:bg-label/35'>
      <WalletCardGradient />

      <BlurView
        className='flex-1'
        intensity={isIOS ? (isDark ? 1 : 25) : isDark ? 5 : 25}
        tint={isDark ? 'extraLight' : 'dark'}
      >
        <View className='flex-1 justify-center gap-y-2 overflow-hidden rounded-2xl'>
          <View className='overflow-hidden rounded-xl'>
            <BlurView
              className='flex-1 flex-row items-center justify-between rounded-xl p-8 px-10'
              intensity={isIOS ? (isDark ? 2 : 90) : isDark ? 15 : 25}
              tint={isDark ? 'extraLight' : 'light'}
            >
              <View className='header flex gap-y-5'>
                <View className='flex-row items-center gap-x-2'>
                  <Text className='font-satoshi-medium text-body dark:text-body-dark'>Balance</Text>

                  <View className='overflow-hidden rounded'>
                    <BlurView
                      className='w-14 items-center py-1'
                      intensity={isIOS ? (isDark ? 4 : 45) : isDark ? 25 : 55}
                      tint={isDark ? 'extraLight' : 'extraLight'}
                    >
                      <Text className='font-clashDisplay text-xs tracking-wider text-title dark:text-title-dark'>
                        {cryptoLabels[props.cryptoId]}
                      </Text>
                    </BlurView>
                  </View>
                </View>

                <PrimaryButton
                  title='Add Funds'
                  containerStyle='py-2 rounded-lg elevation'
                  textStyle='text-xs tracking-wider font-clashDisplay'
                  onPress={() => router.push('/(addFunds)')}
                />
              </View>

              <View className='overflow-hidden rounded-xl'>
                <BlurView
                  className='w-36 items-end py-2'
                  intensity={isIOS ? (isDark ? 4 : 35) : isDark ? 25 : 35}
                  tint={isDark ? 'extraLight' : 'extraLight'}
                >
                  <View className='flex-row items-baseline justify-end pr-3'>
                    <Text className='font-clashDisplay text-xl tracking-wide text-title dark:text-title-dark'>
                      {currencyFormatter.format(balance ?? 0).split('.')[0]}.
                    </Text>
                    <Text className='font-clashDisplay tracking-wide text-title dark:text-title-dark'>
                      {currencyFormatter.format(balance ?? 0).split('.')[1]}
                    </Text>
                  </View>

                  <DividerX style='opacity-1 h-1 w-full my-2' />

                  <View className='flex-row items-baseline justify-end pr-3'>
                    <Text className='font-clashDisplay text-lg tracking-wide text-title dark:text-title-dark'>
                      {defaultFiat?.symbol ?? ''} {currencyFormatter.format(fiatValue ?? 0).split('.')[0]}.
                    </Text>
                    <Text className='font-clashDisplay text-sm tracking-wide text-title dark:text-title-dark'>
                      {currencyFormatter.format(fiatValue ?? 0).split('.')[1]}
                    </Text>
                  </View>
                </BlurView>
              </View>
            </BlurView>
          </View>

          <View className='flex-row justify-center px-10 py-4'>
            <View className='flex-1 flex-row items-center justify-center gap-x-1'>
              <Text className='font-clashDisplay-medium text-sm text-body dark:text-body-dark'>
                {getActiveAdsCountByUserId(props.cryptoId, user?.id)}
              </Text>
              <Text className='font-satoshi-medium text-sm text-body dark:text-body-dark'>Active Adverts</Text>
            </View>

            <View className='mx-8 w-px bg-label' />

            <View className='flex-1 flex-row items-center justify-center gap-x-1'>
              <Text className='font-clashDisplay-medium text-sm text-body dark:text-body-dark'>43</Text>
              <Text className='font-satoshi-medium text-sm text-body dark:text-body-dark'>Open Orders</Text>
            </View>
          </View>
        </View>
      </BlurView>
    </View>
  );
};

export default WalletCard;
