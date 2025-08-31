import { useState } from 'react';

const paymentTimeLimits = [
  { id: '1', label: '15 Minutes', value: 15 },
  { id: '2', label: '30 Minutes', value: 30 },
  { id: '3', label: '45 Minutes', value: 45 },
  { id: '4', label: '1 Hour', value: 60 },
  { id: '5', label: '2 Hours', value: 120 },
];

const usePaymentTimeLimits = () => {
  const [selectedPayTimeLimit, setSelectedPayTimeLimit] = useState<string | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const selectPayTimeLimit = (payTimeLimitId: string) => {
    setSelectedPayTimeLimit(payTimeLimitId);
    setIsBottomSheetVisible(false);
  };

  const clearPayTimeLimit = () => {
    setSelectedPayTimeLimit(null);
  };

  const openBottomSheet = () => setIsBottomSheetVisible(true);
  const closeBottomSheet = () => setIsBottomSheetVisible(false);

  const getPayTimeLimitById = (id: string) => {
    return paymentTimeLimits.find((timeLimit) => timeLimit.id === id);
  };

  const getSelectedPayTimeLimitData = () => {
    return selectedPayTimeLimit ? getPayTimeLimitById(selectedPayTimeLimit) : null;
  };

  return {
    payTimeLimits: paymentTimeLimits,
    selectedPayTimeLimit,
    selectedPayTimeLimitData: getSelectedPayTimeLimitData(),
    isBottomSheetVisible,
    selectPayTimeLimit,
    clearPayTimeLimit,
    openBottomSheet,
    closeBottomSheet,
    setSelectedPayTimeLimit,
    getPayTimeLimitById,
  };
};

export default usePaymentTimeLimits;
