import { icons } from '@/assets';
import { ComponentStrings } from '@/constants';
import { useCrypto, useFiat } from '@/hooks';
import { capitalizeWords, currencyFormatter, formatDateTime } from '@/utils';
import cn from 'clsx';
import { Image, Platform, Text, useColorScheme, View } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { DividerX } from '../dividers';
import { CopyIconButton } from '../iconButtons';

const OrderCard = (props: OrderCardProps) => {
  const isDark = useColorScheme() === 'dark';
  const isBuy = props.order.type === 'buy';
  const isCanceled = props.order.subType === 'canceled';

  const { defaultFiat } = useFiat();
  const { cryptoLabels } = useCrypto();

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
            <Text className={cn('font-clashDisplay-medium', isBuy ? 'text-success-500' : 'text-error-500')}>
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
              <Text className='font-satoshi-medium text-[10px] text-label dark:text-label-dark'>
                {ComponentStrings.OrderCard.PRICE_LABEL}
              </Text>
            </View>

            <Text className='font-satoshi-medium text-[10px] text-body dark:text-body-dark'>
              {defaultFiat?.symbol ?? ''} {currencyFormatter.format(props.order.pricePerUnit)}
            </Text>
          </View>

          <View className='order-card-content-left-row'>
            <View className={cn(Platform.select({ ios: 'w-16', android: 'w-20' }))}>
              <Text className='font-satoshi-medium text-[10px] text-label dark:text-label-dark'>
                {ComponentStrings.OrderCard.QUANTITY_LABEL}
              </Text>
            </View>
            <Text className='font-satoshi-medium text-[10px] text-body dark:text-body-dark'>
              {props.order.quantity}
            </Text>
          </View>

          <View className='order-card-content-left-row'>
            <View className={cn(Platform.select({ ios: 'w-16', android: 'w-20' }))}>
              <Text className='font-satoshi-medium text-[10px] text-label dark:text-label-dark'>
                {ComponentStrings.OrderCard.ORDER_LABEL}
              </Text>
            </View>
            <View className='order-card-id-copy-group'>
              <View className='w-32'>
                <Text
                  className='font-satoshi-medium text-[10px] text-body dark:text-body-dark'
                  numberOfLines={1}
                  ellipsizeMode='middle'
                >
                  {props.order.id}
                </Text>
              </View>

              <CopyIconButton value={props.order.id} />
            </View>
          </View>
        </View>

        <View className='order-card-content-right'>
          <Text className='font-satoshi-medium text-[10px] text-label dark:text-label-dark'>Total Amount</Text>
          <View className='order-card-total-amount-group'>
            <Text className='font-clashDisplay-medium text-lg text-title dark:text-title-dark'>
              {defaultFiat?.symbol ?? ''} {currencyFormatter.format(props.order.totalAmount).split('.')[0]}.
            </Text>
            <Text className='font-clashDisplay-medium text-sm text-title dark:text-title-dark'>
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
              className='size-4'
              resizeMode='contain'
            />
            <Text className='font-clashDisplay-medium text-[10px] text-label dark:text-label-dark'>
              {props.order.counterparty.name}
            </Text>
          </View>

          <View className='order-card-date-time'>
            <Text className='font-satoshi-medium text-[8px] text-body dark:text-body-dark'>
              {formatDateTime(props.order.createdAt).split(' ')[0]}
            </Text>
            <Text className='font-satoshi-medium text-[8px] text-body dark:text-body-dark'>
              {formatDateTime(props.order.createdAt).split(' ')[1]}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default OrderCard;
