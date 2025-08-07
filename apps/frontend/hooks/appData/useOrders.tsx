import { capitalizeWords } from '@/utils';
import { useMemo } from 'react';

const useOrders = () => {
  const orderTypes = ['pending', 'completed'];
  const pendingOrderTypes = ['all', 'unpaid', 'paid', 'appeal'];
  const completedOrderTypes = ['all', 'completed', 'canceled'];

  const orderTypeFilterItems = useMemo(
    () =>
      orderTypes.map((e) => ({
        id: e,
        label: capitalizeWords(e),
      })),
    [],
  );
  const pendingOrderTypeFilterItems = useMemo(
    () =>
      pendingOrderTypes.map((e) => ({
        id: e,
        label: capitalizeWords(e),
      })),
    [],
  );
  const completedOrderTypeFilterItems = useMemo(
    () =>
      completedOrderTypes.map((e) => ({
        id: e,
        label: capitalizeWords(e),
      })),
    [],
  );

  return {
    orderTypes,
    pendingOrderTypes,
    completedOrderTypes,
    orderTypeFilterItems,
    pendingOrderTypeFilterItems,
    completedOrderTypeFilterItems,
  };
};

export default useOrders;
