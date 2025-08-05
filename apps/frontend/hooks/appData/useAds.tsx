import { ads } from '@/models';
import { useState } from 'react';
import useCrypto, { CryptoOption } from './useCrypto';

const useAds = () => {
  const { cryptoOptions } = useCrypto();

  const getActiveAds = () => {
    return ads.filter((ad) => cryptoOptions.includes(ad.cryptoId));
  };

  const [activeAds, _] = useState(getActiveAds());

  const filterAdsByType = (adType: AdType, crypto: CryptoOption) => {
    return activeAds.filter((ad) => {
      if (ad.type !== adType) return false;

      if (crypto === 'all') return true;

      return ad.cryptoId === crypto;
    });
  };

  const filterAdsByUserId = (adType: AdType, crypto: CryptoOption, userId: string) => {
    return filterAdsByType(adType, crypto).filter((ad) => {
      return ad.user.id === userId;
    });
  };

  return {
    activeAds,
    filterAdsByType,
    filterAdsByUserId,
  };
};

export default useAds;
