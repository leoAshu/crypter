import { usePayMethodStore } from '@/store';
import SHA256 from 'crypto-js/sha256';

const usePayMethod = () => {
  const { payMethods, isLoading, addNewPayMethod: addPayMethod } = usePayMethodStore();

  const generatePayMethodId = (detail: Omit<PayMethod, 'id' | 'isActive'>): string => {
    const rawString = [
      detail.userId,
      detail.payMethodTypeId,
      detail.bankName || '',
      detail.branchName || '',
      detail.accountType || '',
      detail.ifsc || '',
      detail.accountNo || '',
      detail.upiId || '',
      detail.phone || '',
    ]
      .join('|')
      .toLowerCase();

    return SHA256(rawString).toString().slice(0, 16);
  };

  const addNewPayMethod = async (detail: PayMethod) => {
    if (payMethods.some((item) => item.id === detail.id)) {
      console.log('Pay Method already exists.');
      throw new Error('Pay Method already exists.');
    }
    await addPayMethod(detail);
  };

  return {
    isLoading,
    payMethods,
    addNewPayMethod,
    generatePayMethodId,
  };
};

export default usePayMethod;
