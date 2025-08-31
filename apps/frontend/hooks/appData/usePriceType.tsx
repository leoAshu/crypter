import { priceSelectorRange, PriceType } from '@/models';

const usePriceTypes = () => {
  const priceTypes = Object.values(PriceType);

  const getPriceRangeById = (priceTypeId: string) => {
    return priceSelectorRange[priceTypeId] || [];
  };

  return {
    priceTypes,
    priceRanges: priceSelectorRange,
    getPriceRangeById,
  };
};

export default usePriceTypes;
