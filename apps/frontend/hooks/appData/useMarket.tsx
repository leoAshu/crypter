import { useMarketStore } from '@/store';
import { useMemo } from 'react';
import useCrypto from './useCrypto';
import useFiat from './useFiat';

const useMarket = () => {
  const { cryptos } = useCrypto();
  const { defaultFiat } = useFiat();
  const { isLoading, tickers, fetchTickers, startPolling, stopPolling } = useMarketStore();

  const cryptoIds = useMemo(() => cryptos.map((c) => c.name.toLowerCase()), [cryptos]);

  const fetchAllTickers = () => fetchTickers(cryptoIds, defaultFiat?.id ?? 'inr');

  const beginPolling = (interval: number) => startPolling(interval, cryptoIds, defaultFiat?.id ?? 'inr');

  return {
    tickers,
    isLoading,
    fetchAllTickers,
    beginPolling,
    stopPolling,
  };
};

export default useMarket;
