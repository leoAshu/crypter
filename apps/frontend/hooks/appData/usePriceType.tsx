import { priceSelectorRange, PriceType } from '@/models';
import { capitalizeWords } from '@/utils';
import { useMemo } from 'react';

const usePriceTypes = () => {
  const priceTypes = Object.values(PriceType);

  const priceTypeFilterItems = useMemo(
    () =>
      priceTypes.map((e) => ({
        id: e,
        label: capitalizeWords(e),
      })),
    [priceTypes],
  );

  const getPriceRangeById = (priceTypeId: string) => {
    return priceSelectorRange[priceTypeId] || [];
  };

  return {
    priceTypes,
    priceTypeFilterItems,
    priceRanges: priceSelectorRange,
    getPriceRangeById,
  };
};

export default usePriceTypes;
