import { ComponentStrings, ToastStrings } from '@/constants';
import { useAds, useCrypto, useFiat } from '@/hooks';
import { capitalizeWords, currencyFormatter } from '@/utils';
import cn from 'clsx';
import { useEffect, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { PayMethodTypeBadge } from '../badges';
import { DividerX } from '../dividers';
import { ToggleSwitch } from '../filters';

const MyAdCard = (props: MyAdCardProps) => {
  const isBuy = props.ad.type === 'buy';

  const { fiatSymbols } = useFiat();
  const { updateAdStatus } = useAds();
  const { cryptoLabels } = useCrypto();

  const [isOn, setIsOn] = useState(props.ad.isActive);

  useEffect(() => {
    setIsOn(props.ad.isActive);
  }, [props.ad.isActive]);

  const disabledPress = async () => {
    Toast.show({
      type: 'info',
      text1: ToastStrings.Info.TITLE,
      text2: ToastStrings.Info.INACTIVE_AD,
      position: 'bottom',
      bottomOffset: 112,
      autoHide: true,
      visibilityTime: 2500,
    });
  };

  const onToggle = async (val: boolean) => {
    try {
      await updateAdStatus(props.ad.id, val);
      setIsOn(val);
      Toast.show({
        type: 'success',
        text1: ToastStrings.Success.TITLE,
        text2: val ? ToastStrings.Success.AD_ACTIVE : ToastStrings.Success.AD_INACTIVE,
        position: 'bottom',
        bottomOffset: 112,
        autoHide: true,
        visibilityTime: 1500,
      });
    } catch (e) {
      console.error('Toggle failed', e);
    }
  };

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

        <ToggleSwitch
          value={isOn}
          onChange={onToggle}
          size='sm'
          label={props.ad.isActive ? 'Listed' : 'Unlisted'}
          labelPosition='left'
          disabled={!props.ad.isActive && props.isAdActive}
          onDisabledPress={disabledPress}
        />
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
      {props.ad.payMethodTypeIds && Boolean(props.ad.payMethodTypeIds.length) && (
        <View className='ad-card-footer'>
          <View className='my-px flex-row justify-center'>
            <DividerX style='w-2/6' />
          </View>
          <View className='ad-card-pay-methods'>
            {props.ad.payMethodTypeIds.map((item: string, index: number) => (
              <PayMethodTypeBadge key={index} payMethodTypeId={item} />
            ))}
          </View>
        </View>
      )}
    </Animated.View>
  );
};

export default MyAdCard;
