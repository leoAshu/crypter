import { useMarketStore } from '@/store';
import { useMemo } from 'react';
import useCrypto from './useCrypto';
import useFiat from './useFiat';

const useMarket = () => {
  const { cryptos } = useCrypto();
  const { currentFiatId } = useFiat();
  const { isLoading, tickers, fetchTickers, startPolling, stopPolling } = useMarketStore();

  const cryptoIds = useMemo(() => cryptos.map((c) => c.name.toLowerCase()), [cryptos]);

  const fetchAllTickers = () => fetchTickers(cryptoIds, currentFiatId ?? 'inr');

  const beginPolling = (interval: number) => startPolling(interval, cryptoIds, currentFiatId ?? 'inr');

  return {
    tickers,
    isLoading,
    fetchAllTickers,
    beginPolling,
    stopPolling,
  };
};

export default useMarket;
