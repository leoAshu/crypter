import { icons } from '@/assets';
import { ComponentStrings } from '@/constants';
import { cryptoLabels } from '@/models';
import { capitalizeWords, currencyFormatter, formatDateTime } from '@/utils';
import cn from 'clsx';
import { Image, Platform, Text, useColorScheme, View } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { DividerX } from '../dividers';
import { CopyIconButton } from '../iconButtons';

const AdvertCard = (props: OrderCardProps) => {
  const isDark = useColorScheme() === 'dark';
  const isBuy = props.order.type === 'buy';
  const isCanceled = props.order.subType === 'canceled';

  return (
    <Animated.View
      className='order-card-wrapper'
      entering={FadeInUp.duration(250).delay(props.index * 100)}
      exiting={FadeOutDown.duration(300).delay(props.index * 100)}
    >
      {/* Header */}
      <View className='order-card-header'>
        <View className='order-card-header-left'>
          <View className={cn(Platform.select({ ios: 'w-10', android: 'w-12' }), 'justify-center')}>
            <Text className={cn('font-clashDisplay-medium text-xl', isBuy ? 'text-success-500' : 'text-error-500')}>
              {capitalizeWords(props.order.type)}
            </Text>
          </View>

          <View className='order-card-header-badge-bg'>
            <Text className='order-card-header-badge-txt'>{cryptoLabels[props.order.cryptoId]}</Text>
          </View>
        </View>

        <View
          className={cn(
            Platform.select({ ios: 'w-[68px]', android: 'w-[72px]' }),
            'order-card-type-badge-bg',
            isCanceled ? (isDark ? 'opacity-65' : 'opacity-50') : '',
          )}
        >
          <Text className='order-card-type-badge-txt'>{capitalizeWords(props.order.subType)}</Text>
        </View>
      </View>

      {/* Content */}
      <View className='order-card-content'>
        <View className='order-card-content-left'>
          <View className='order-card-content-left-row'>
            <View className={cn(Platform.select({ ios: 'w-16', android: 'w-20' }))}>
              <Text className='font-satoshi-medium text-sm text-neutral'>{ComponentStrings.OrderCard.PRICE_LABEL}</Text>
            </View>

            <Text className='font-satoshi-medium text-sm text-neutral-700 dark:text-neutral-300'>
              ₹ {currencyFormatter.format(props.order.pricePerUnit)}
            </Text>
          </View>

          <View className='order-card-content-left-row'>
            <View className={cn(Platform.select({ ios: 'w-16', android: 'w-20' }))}>
              <Text className='font-satoshi-medium text-sm text-neutral'>
                {ComponentStrings.OrderCard.QUANTITY_LABEL}
              </Text>
            </View>
            <Text className='font-satoshi-medium text-sm text-neutral-700 dark:text-neutral-300'>
              {props.order.quantity}
            </Text>
          </View>

          <View className='order-card-content-left-row'>
            <View className={cn(Platform.select({ ios: 'w-16', android: 'w-20' }))}>
              <Text className='font-satoshi-medium text-sm text-neutral'>{ComponentStrings.OrderCard.ORDER_LABEL}</Text>
            </View>
            <View className='order-card-id-copy-group'>
              <View className='w-32'>
                <Text
                  className='font-satoshi-medium text-sm text-neutral-700 dark:text-neutral-300'
                  numberOfLines={1}
                  ellipsizeMode='middle'
                >
                  {props.order.id}
                </Text>
              </View>

              <CopyIconButton />
            </View>
          </View>
        </View>

        <View className='order-card-content-right'>
          <Text className='font-satoshi-medium text-sm text-neutral'>Total Amount</Text>
          <View className='order-card-total-amount-group'>
            <Text className='font-clashDisplay-medium text-2xl text-base-black dark:text-base-white'>
              ₹ {currencyFormatter.format(props.order.totalAmount).split('.')[0]}.
            </Text>
            <Text className='font-clashDisplay-medium text-lg text-base-black dark:text-base-white'>
              {currencyFormatter.format(props.order.totalAmount).split('.')[1]}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View className='order-card-footer'>
        <View className='order-card-footer-divider'>
          <DividerX style='w-2/6' />
        </View>

        <View className='order-card-footer-info'>
          <View className='order-card-cpty-info'>
            <Image
              source={
                props.order.counterparty.verified
                  ? isDark
                    ? icons.dark.verifyGold
                    : icons.light.verifyGold
                  : isDark
                    ? icons.dark.verify
                    : icons.light.verify
              }
              className='size-5'
              resizeMode='contain'
            />
            <Text className='font-clashDisplay-medium text-sm text-neutral'>{props.order.counterparty.name}</Text>
          </View>

          <View className='order-card-date-time'>
            <Text className='font-satoshi-medium text-xs text-neutral-700 dark:text-neutral-300'>
              {formatDateTime(props.order.createdAt).split(' ')[0]}
            </Text>
            <Text className='font-satoshi-medium text-xs text-neutral-700 dark:text-neutral-300'>
              {formatDateTime(props.order.createdAt).split(' ')[1]}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default AdvertCard;
