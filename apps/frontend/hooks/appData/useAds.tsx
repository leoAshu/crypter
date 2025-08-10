import { AdType, PriceType } from '@/models';
import { useAdStore } from '@/store';
import { capitalizeWords } from '@/utils';
import { useMemo } from 'react';
import useCrypto from './useCrypto';

const useAds = () => {
  const { ads } = useAdStore();
  const { cryptoOptions } = useCrypto();

  const adTypes = Object.values(AdType);
  const priceTypes = Object.values(PriceType);

  const adTypeFilterItems = useMemo(
    () =>
      adTypes.map((e) => ({
        id: e,
        label: capitalizeWords(e),
      })),
    [adTypes],
  );

  const priceTypeFilterItems = useMemo(
    () =>
      priceTypes.map((e) => ({
        id: e,
        label: capitalizeWords(e),
      })),
    [priceTypes],
  );

  const activeAds = useMemo(() => {
    return ads.filter((ad) => cryptoOptions.includes(ad.cryptoId));
  }, [ads, cryptoOptions]);

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
    priceTypeFilterItems,
    filterAdsByType,
    filterAdsByUserId,
    getActiveAdsCountByUserId,
  };
};

export default useAds;
