import { useCrypto, useFiat, useMarket } from '@/hooks';
import { useEffect } from 'react';
import { Text, useColorScheme, View } from 'react-native';
import { TickerCard } from '../cards';
import { DividerX } from '../dividers';

const Market = () => {
  const isDark = useColorScheme() === 'dark';

  const { cryptos } = useCrypto();
  const { currentFiatSymbol } = useFiat();
  const { tickers, beginPolling, stopPolling } = useMarket();

  useEffect(() => {
    beginPolling(15000);
    return () => stopPolling();
  }, []);

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
              fiatSymbol={currentFiatSymbol ?? ''}
            />
          );
        })}

        <DividerX style={isDark ? 'opacity-40' : 'opacity-25'} />
      </View>
    </View>
  );
};

export default Market;
