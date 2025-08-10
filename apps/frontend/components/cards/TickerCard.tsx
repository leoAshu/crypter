import { icons } from '@/assets';
import { currencyFormatter } from '@/utils';
import cn from 'clsx';
import React from 'react';
import { Image, ImageSourcePropType, Text, useColorScheme, View } from 'react-native';

interface TickerCardProps {
  index?: number;
  cryptoId: string;
  cryptoName: string;
  cryptoSymbol: string;
  tickerData: Ticker;
  fiatSymbol: string;
}

const TickerCard = (props: TickerCardProps) => {
  const isDark = useColorScheme() === 'dark';

  const iconsMap: Record<string, { light: ImageSourcePropType; dark: ImageSourcePropType }> = {
    btc: { light: icons.light.btc, dark: icons.dark.btc },
    eth: { light: icons.light.eth, dark: icons.dark.eth },
    usdt: { light: icons.light.usdt, dark: icons.dark.usdt },
  };

  const iconSource = iconsMap[props.cryptoId]?.[isDark ? 'dark' : 'light'];
  const isUp = props.tickerData.change24h >= 0;

  return (
    <View className='flex-row rounded-md py-2'>
      <View className='w-36 flex-row items-center gap-x-4'>
        <Image source={iconSource} className='size-8' resizeMode='contain' />

        <View className='gap-y-1'>
          <Text className='font-clashDisplay-medium text-xs text-body dark:text-body-dark'>{props.cryptoName}</Text>
          <Text className='font-clashDisplay text-[8px] text-label dark:text-label-dark'>{props.cryptoSymbol}</Text>
        </View>
      </View>

      <View className={cn('w-[0.5px] bg-label', isDark ? 'opacity-40' : 'opacity-25')} />

      <View className='mr-4 flex-1 justify-center'>
        <Text className='text-right font-clashDisplay text-xs tracking-wider text-body dark:text-body-dark'>
          {props.fiatSymbol} {currencyFormatter.format(props.tickerData.price)}
        </Text>
      </View>

      <View className={cn('w-[0.5px] bg-label', isDark ? 'opacity-40' : 'opacity-25')} />

      <View className='w-20 justify-center'>
        <Text
          className={cn('text-right font-clashDisplay text-xs tracking-wider', isUp ? 'text-success' : 'text-error')}
        >
          {props.tickerData.change24h.toFixed(2)} %
        </Text>
      </View>
    </View>
  );
};

export default React.memo(TickerCard);
