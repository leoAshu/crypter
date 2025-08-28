import { allFilterItem } from '@/constants';
import { CompletedOrderType, orders as mockOrders, OrderType, PendingOrderType } from '@/models';
import { capitalizeWords } from '@/utils';
import { useMemo } from 'react';

const useOrders = () => {
  const orders = mockOrders;
  const orderTypes = Object.values(OrderType);
  const pendingOrderTypes = Object.values(PendingOrderType);
  const completedOrderTypes = Object.values(CompletedOrderType);

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

  const filterOrdersByType = (type: OrderType, pendingType: PendingOrderType, completedType: CompletedOrderType) => {
    const subType = type === OrderType.Pending ? pendingType : completedType;

    return orders.filter((o) => {
      if (o.orderType !== type) return false;
      if (subType === allFilterItem.id) return true;
      return o.subType === subType;
    });
  };

  return {
    orders,
    orderTypes,
    pendingOrderTypes,
    completedOrderTypes,
    orderTypeFilterItems,
    pendingOrderTypeFilterItems,
    completedOrderTypeFilterItems,
    filterOrdersByType,
  };
};

export default useOrders;
