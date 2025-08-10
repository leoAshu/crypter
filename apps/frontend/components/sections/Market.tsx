import { useCrypto, useFiat, useMarket } from '@/hooks';
import React from 'react';
import { Text, useColorScheme, View } from 'react-native';
import { TickerCard } from '../cards';
import { DividerX } from '../dividers';

const Market = () => {
  const isDark = useColorScheme() === 'dark';

  const { tickers } = useMarket();
  const { cryptos } = useCrypto();
  const { defaultFiat } = useFiat();

  return (
    <View className='gap-y-4'>
      <View className='px-2'>
        <Text className='font-clashDisplay text-title dark:text-title-dark'>Market</Text>
      </View>

      <View className='gap-y-2 px-2'>
        {cryptos.map((item, index) => {
          return (
            <TickerCard
              key={item.id.toString()}
              index={index}
              cryptoId={item.id}
              cryptoName={item.name}
              cryptoSymbol={item.symbol}
              tickerData={tickers[item.name.toLowerCase()]}
              fiatSymbol={defaultFiat?.symbol ?? ''}
            />
          );
        })}

        <DividerX style={isDark ? 'opacity-40' : 'opacity-25'} />
      </View>
    </View>
  );
};

export default Market;
