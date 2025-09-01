import { logos } from '@/assets';
import { usePayMethodTypeStore } from '@/store';
import { ImageSourcePropType } from 'react-native';

const usePayMethodType = () => {
  const { payMethodTypes } = usePayMethodTypeStore();

  const logoMap: Record<string, ImageSourcePropType> = {
    bank: logos.imps,
    imps: logos.imps,
    gpay: logos.gPay,
    paytm: logos.paytm,
    phonepe: logos.phonepe,
    upi: logos.upi,
  };

  const getPayMethodTypeById = (id: string): PayMethodType | undefined => {
    return payMethodTypes.find((item) => item.id === id);
  };

  const getFilteredPayMethodTypesByIds = (ids: string[]): PayMethodType[] => {
    return ids
      .map((id) => getPayMethodTypeById(id))
      .filter((payMethodType): payMethodType is PayMethodType => payMethodType !== undefined);
  };

  const getPayMethodTypeLogoUrlById = (payMethodId: string) => logoMap[payMethodId];

  return {
    payMethodTypes,
    getPayMethodTypeById,
    getFilteredPayMethodTypesByIds,
    getPayMethodTypeLogoUrlById,
  };
};

export default usePayMethodType;
