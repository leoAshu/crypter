import { usePayMethodStore } from '@/store';
import SHA256 from 'crypto-js/sha256';

const usePayMethod = () => {
  const { payMethods, isLoading, addNewPayMethod: addPayMethod, updatePayMethodStatus } = usePayMethodStore();

  const generatePayMethodId = (detail: Omit<PayMethod, 'id' | 'isActive' | 'createdAt' | 'updatedAt'>): string => {
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

  const addNewPayMethod = async (newPayMethod: PayMethod) => {
    if (payMethods.some((item) => item.id === newPayMethod.id)) {
      throw new Error('Pay Method already exists.');
    }
    await addPayMethod(newPayMethod);
  };

  const getActiveUniquePayMethods = () => {
    return payMethods
      .filter((item) => item.isActive)
      .reduce(
        (acc, item) => {
          acc[item.payMethodTypeId] = acc[item.payMethodTypeId] || item;
          return acc;
        },
        {} as Record<string, PayMethod>,
      );
  };

  const getActivePayMethodTypeIds = (): string[] => {
    const uniquePayMethods = getActiveUniquePayMethods();
    return Object.keys(uniquePayMethods);
  };

  return {
    isLoading,
    payMethods,
    addNewPayMethod,
    generatePayMethodId,
    updatePayMethodStatus,
    getActiveUniquePayMethods,
    getActivePayMethodTypeIds,
  };
};

export default usePayMethod;
