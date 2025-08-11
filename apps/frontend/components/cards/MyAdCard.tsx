import { ComponentStrings } from '@/constants';
import { useCrypto, useFiat } from '@/hooks';
import { capitalizeWords, currencyFormatter } from '@/utils';
import cn from 'clsx';
import { Platform, Text, View } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { PayMethodBadge } from '../badges';
import { DividerX } from '../dividers';

const MyAdCard = (props: MyAdCardProps) => {
  const isBuy = props.ad.type === 'buy';

  const { fiatSymbols } = useFiat();
  const { cryptoLabels } = useCrypto();

  return (
    <Animated.View
      className='gap-y-4 px-2 pb-4 pt-2'
      entering={FadeInUp.duration(250).delay(props.index * 100)}
      exiting={FadeOutDown.duration(300).delay(props.index * 100)}
    >
      {/* Header */}
      <View className='flex-row justify-between'>
        <View className='flex-row items-center'>
          <View className={cn(Platform.select({ ios: 'w-10', android: 'w-12' }), 'justify-center')}>
            <Text className={cn('font-clashDisplay-medium', isBuy ? 'text-success-500' : 'text-error-500')}>
              {capitalizeWords(props.ad.type)}
            </Text>
          </View>

          <View className='rounded-sm bg-card px-2 py-1 dark:bg-card-dark'>
            <Text className='font-clashDisplay text-[8px] tracking-widest text-title dark:text-title-dark'>
              {cryptoLabels[props.ad.cryptoId]}
            </Text>
          </View>
        </View>

        <View className={cn('items-center justify-center rounded-sm bg-card dark:bg-card-dark')}>
          <Text className='font-clashDisplay text-[8px] tracking-wider text-title dark:text-title-dark'>
            Active/Inactive Switch
          </Text>
        </View>
      </View>

      {/* Content */}
      <View className='flex-row items-end justify-between'>
        <View className='justify-end gap-y-2'>
          <View className='flex-row'>
            <View className={cn(Platform.select({ ios: 'w-32', android: 'w-24' }))}>
              <Text className='font-satoshi-medium text-[10px] text-label dark:text-label-dark'>
                {ComponentStrings.MyAdCard.AVAILABLE_LABEL}
              </Text>
            </View>
            <Text className='font-satoshi-medium text-[10px] text-body dark:text-body-dark'>
              {currencyFormatter.format(props.ad.available)} {cryptoLabels[props.ad.cryptoId]}
            </Text>
          </View>

          <View className='flex-row'>
            <View className={cn(Platform.select({ ios: 'w-32', android: 'w-24' }))}>
              <Text className='font-satoshi-medium text-[10px] text-label dark:text-label-dark'>
                {ComponentStrings.MyAdCard.ORDER_LIMIT_LABEL}
              </Text>
            </View>

            <Text className='font-satoshi-medium text-[10px] text-body dark:text-body-dark'>
              {fiatSymbols[props.ad.fiatId] ?? ''} {currencyFormatter.format(props.ad.minLimit)} -{' '}
              {currencyFormatter.format(props.ad.maxLimit)}
            </Text>
          </View>
        </View>

        <View className='flex items-end gap-y-px'>
          <Text className='font-satoshi-medium text-[10px] text-label dark:text-label-dark'>
            {ComponentStrings.MyAdCard.PRICE_LABEL}
          </Text>
          <View className='flex-row items-baseline'>
            <Text className='font-clashDisplay-medium text-lg text-title dark:text-title-dark'>
              {fiatSymbols[props.ad.fiatId] ?? ''} {currencyFormatter.format(props.ad.price).split('.')[0]}.
            </Text>
            <Text className='font-clashDisplay-medium text-sm text-title dark:text-title-dark'>
              {currencyFormatter.format(props.ad.price).split('.')[1]}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      {props.ad.payMethodIds && Boolean(props.ad.payMethodIds.length) && (
        <View className='ad-card-footer'>
          <View className='my-px flex-row justify-center'>
            <DividerX style='w-2/6' />
          </View>
          <View className='ad-card-pay-methods'>
            {props.ad.payMethodIds.map((item: string, index: number) => (
              <PayMethodBadge key={index} payMethodId={item} />
            ))}
          </View>
        </View>
      )}
    </Animated.View>
  );
};

export default MyAdCard;
