import { useAdStore } from '@/store';
import { useMemo } from 'react';
import useCrypto from './useCrypto';

const useAds = () => {
  const { ads } = useAdStore();
  const { cryptoOptions } = useCrypto();

  const activeAds = useMemo(() => {
    return ads.filter((ad) => cryptoOptions.includes(ad.cryptoId));
  }, [cryptoOptions]);

  const filterAdsByType = (adType: AdType, cryptoId: string) => {
    return activeAds.filter((ad) => {
      if (ad.type !== adType) return false;

      if (cryptoId === 'all') return true;

      return ad.cryptoId === cryptoId;
    });
  };

  const filterAdsByUserId = (adType: AdType, cryptoId: string, userId: string) => {
    return filterAdsByType(adType, cryptoId).filter((ad) => {
      return ad.userId === userId;
    });
  };

  return {
    activeAds,
    filterAdsByType,
    filterAdsByUserId,
  };
};

export default useAds;
