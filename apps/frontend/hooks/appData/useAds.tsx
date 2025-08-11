import { AdType } from '@/models';
import { useAdStore } from '@/store';
import { capitalizeWords } from '@/utils';
import { useMemo } from 'react';
import useCrypto from './useCrypto';

const useAds = () => {
  const { ads } = useAdStore();
  const { p2pCryptoIds } = useCrypto();

  const adTypes = Object.values(AdType);

  const adTypeFilterItems = useMemo(
    () =>
      adTypes.map((e) => ({
        id: e,
        label: capitalizeWords(e),
      })),
    [adTypes],
  );

  const activeAds = useMemo(() => {
    return ads.filter((ad) => p2pCryptoIds.has(ad.cryptoId));
  }, [ads, p2pCryptoIds]);

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

  const getActiveAdsCountByUserId = useMemo(
    () => (cryptoId: string, userId: string) =>
      activeAds.filter((ad) => {
        if (ad.userId !== userId) return false;
        if (cryptoId === 'all') return true;
        return ad.cryptoId === cryptoId;
      }).length,
    [activeAds],
  );

  return {
    adTypes,
    activeAds,
    adTypeFilterItems,
    filterAdsByType,
    filterAdsByUserId,
    getActiveAdsCountByUserId,
  };
};

export default useAds;
