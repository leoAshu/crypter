import { allFilterItem } from '@/constants';
import { AdType } from '@/models';
import { useAdStore, useProfileStore } from '@/store';
import { capitalizeWords } from '@/utils';
import { useMemo } from 'react';

const useAds = () => {
  const { ads } = useAdStore();
  const { profile } = useProfileStore();

  const adTypes = Object.values(AdType);
  const adTypeFilterItems = useMemo(
    () =>
      adTypes.map((e) => ({
        id: e,
        label: capitalizeWords(e),
      })),
    [adTypes],
  );

  const activeAds = useMemo(() => ads.filter((ad) => ad.isActive), [ads]);
  const myAds = useMemo(() => ads.filter((ad) => ad.userId === profile?.id), [ads, profile?.id]);

  const filterAdsByType = (adsList: Ad[], adType: AdType, cryptoId: string) => {
    return adsList.filter((ad) => {
      if (ad.type !== adType) return false;

      if (cryptoId === allFilterItem.id) return true;

      return ad.cryptoId === cryptoId;
    });
  };

  const filterAdsByUserId = (adsList: Ad[], adType: AdType, cryptoId: string, userId: string) => {
    return filterAdsByType(adsList, adType, cryptoId).filter((ad) => {
      return ad.userId === userId;
    });
  };

  const getActiveAdsCountByUserId = useMemo(
    () => (cryptoId: string, userId: string) =>
      activeAds.filter((ad) => {
        if (ad.userId !== userId) return false;
        if (cryptoId === allFilterItem.id) return true;
        return ad.cryptoId === cryptoId;
      }).length,
    [activeAds],
  );

  return {
    myAds,
    adTypes,
    activeAds,
    adTypeFilterItems,
    filterAdsByType,
    filterAdsByUserId,
    getActiveAdsCountByUserId,
  };
};

export default useAds;
