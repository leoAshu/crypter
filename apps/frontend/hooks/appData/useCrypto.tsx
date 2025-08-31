import { allFilterItem } from '@/constants';
import useCryptotore from '@/store/crypto.store';
import { useMemo } from 'react';

const useCrypto = () => {
  const { cryptos, p2pCryptos } = useCryptotore();

  const cryptoLabels: Record<string, string> = useMemo(
    () => ({
      [allFilterItem.id]: allFilterItem.label,
      ...Object.fromEntries(cryptos.map((c) => [c.id, c.symbol])),
    }),
    [cryptos],
  );

  return {
    cryptos,
    p2pCryptos,
    cryptoLabels,
  };
};

export default useCrypto;
