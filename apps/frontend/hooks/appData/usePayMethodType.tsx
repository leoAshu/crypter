import { logos } from '@/assets';

const usePayMethodType = () => {
  const payMethodTypes: PayMethodType[] = [
    { id: 'upi', name: 'UPI', isActive: true, logoUrl: logos.upi },
    { id: 'imps', name: 'IMPS', isActive: true, logoUrl: logos.imps },
    { id: 'phonepe', name: 'PhonePe', isActive: true, logoUrl: logos.phonepe },
    { id: 'paytm', name: 'Paytm', isActive: true, logoUrl: logos.paytm },
    { id: 'gpay', name: 'GPay', isActive: true, logoUrl: logos.gPay },
  ];

  const getPayMethodTypeById = (id: string): PayMethodType | undefined => {
    return payMethodTypes.find((pm) => pm.id === id);
  };

  return {
    payMethodTypes,
    getPayMethodTypeById,
  };
};

export default usePayMethodType;
