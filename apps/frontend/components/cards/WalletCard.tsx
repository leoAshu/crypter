import { useCrypto } from '@/hooks';
import { useWalletStore } from '@/store';
import { currencyFormatter } from '@/utils';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Platform, Text, useColorScheme, View } from 'react-native';
import { PrimaryButton } from '../buttons';
import { DividerX } from '../dividers';

const WalletCard = (props: WalletCardProps) => {
  const isIOS = Platform.OS === 'ios';
  const isDark = useColorScheme() === 'dark';

  const { balances } = useWalletStore();
  const { cryptoLabels } = useCrypto();

  const balance = balances[props.cryptoId]['available'];
  const fiatValue = balance * 87.71;

  return (
    <View className='elevation-md relative w-full overflow-hidden rounded-2xl bg-base-surface-light dark:bg-neutral/35'>
      <LinearGradient
        colors={[
          'rgba(84, 230, 182,0.28)',
          'rgba(84, 230, 182,0.25)',
          'rgba(84, 230, 182,0.20)',
          'rgba(84, 230, 182,0.17)',
          'rgba(84, 230, 182,0.15)',
          'rgba(84, 230, 182,0.13)',
          'transparent',
        ]}
        locations={[0, 0.08, 0.16, 0.25, 0.35, 0.55, 1]}
        start={{ x: 0.75, y: 0.75 }}
        end={{ x: 0, y: 0 }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      />

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
                <View className='flex-row items-start gap-x-2'>
                  <Text className='font-satoshi text-2xl text-base-black dark:text-base-white'>Balance</Text>

                  <View className='overflow-hidden rounded-md'>
                    <BlurView
                      className='w-16 items-center py-1'
                      intensity={isIOS ? (isDark ? 4 : 45) : isDark ? 25 : 55}
                      tint={isDark ? 'extraLight' : 'extraLight'}
                    >
                      <Text className='tracking-wider text-base-on-surface-light dark:text-base-white'>
                        {cryptoLabels[props.cryptoId]}
                      </Text>
                    </BlurView>
                  </View>
                </View>

                <PrimaryButton
                  title='Add Funds'
                  containerStyle='py-2 rounded-lg elevation'
                  textStyle='text-sm'
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
                    <Text className='font-clashDisplay text-3xl tracking-wide text-base-black dark:text-base-white'>
                      {currencyFormatter.format(balance ?? 0).split('.')[0]}.
                    </Text>
                    <Text className='font-clashDisplay text-xl tracking-wide text-base-black dark:text-base-white'>
                      {currencyFormatter.format(balance ?? 0).split('.')[1]}
                    </Text>
                  </View>

                  <DividerX style='opacity-1 h-1 w-full my-2' />

                  <View className='flex-row items-baseline justify-end pr-3'>
                    <Text className='font-clashDisplay text-2xl tracking-wide text-base-black dark:text-base-white'>
                      ₹ {currencyFormatter.format(fiatValue ?? 0).split('.')[0]}.
                    </Text>
                    <Text className='font-clashDisplay text-lg tracking-wide text-base-black dark:text-base-white'>
                      {currencyFormatter.format(fiatValue ?? 0).split('.')[1]}
                    </Text>
                  </View>
                </BlurView>
              </View>
            </BlurView>
          </View>

          <View className='flex-row justify-center px-10 py-4'>
            <View className='flex-1 flex-row items-baseline gap-x-2'>
              <Text className='font-clashDisplay text-xl text-base-black dark:text-base-white'>12</Text>
              <Text className='font-satoshi-medium text-base-black dark:text-white'>Active Adverts</Text>
            </View>
            <View className='mx-8 w-px bg-neutral' />
            <View className='flex-1 flex-row items-baseline gap-x-2'>
              <Text className='font-clashDisplay text-xl text-base-black dark:text-base-white'>43</Text>
              <Text className='font-satoshi-medium text-base-black dark:text-base-white'>Open Orders</Text>
            </View>
          </View>
        </View>
      </BlurView>
    </View>
  );
};

export default WalletCard;
