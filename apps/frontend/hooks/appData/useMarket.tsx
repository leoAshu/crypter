import { useMarketStore } from '@/store';
import { useMemo } from 'react';
import useCrypto from './useCrypto';
import useFiat from './useFiat';

const useMarket = () => {
  const { cryptos } = useCrypto();
  const { defaultFiat } = useFiat();
  const { isLoading, tickers, fetchTickers } = useMarketStore();

  const cryptoIds = useMemo(() => cryptos.map((c) => c.name.toLowerCase()), [cryptos]);

  const fetchAllTickers = () => fetchTickers(cryptoIds, defaultFiat?.id ?? 'inr');

  return {
    tickers,
    isLoading,
    fetchAllTickers,
  };
};

export default useMarket;
