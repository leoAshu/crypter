import { ChipFilter, DividerX, OrderCard } from '@/components';
import { screenContentWrapperStyle } from '@/constants';
import { useOrders } from '@/hooks';
import { CompletedOrderType, OrderType, PendingOrderType } from '@/models';
import cn from 'clsx';
import { useEffect, useState } from 'react';
import { FlatList, Platform, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Orders = () => {
  const isDark = useColorScheme() === 'dark';

  const { pendingOrderTypeFilterItems, completedOrderTypeFilterItems, filterOrdersByType } = useOrders();

  const [orderType, setOrderType] = useState<OrderType>(OrderType.Pending);
  const [pendingOrderType, setPendingOrderType] = useState<FilterItem>(pendingOrderTypeFilterItems[0]);
  const [completedOrderType, setCompletedOrderType] = useState<FilterItem>(completedOrderTypeFilterItems[0]);
  const [ordersList, setOrdersList] = useState<Order[]>(
    filterOrdersByType(orderType, pendingOrderType.id as PendingOrderType, completedOrderType.id as CompletedOrderType),
  );

  const adsListStyle = Platform.select({
    ios: 'pb-20',
    android: 'pb-24',
  });

  useEffect(() => {
    setOrdersList(
      filterOrdersByType(
        orderType,
        pendingOrderType.id as PendingOrderType,
        completedOrderType.id as CompletedOrderType,
      ),
    );
  }, [orderType, pendingOrderType, completedOrderType]);

  return (
    <SafeAreaView className='screen-wrapper'>
      <View className={cn('content-wrapper', screenContentWrapperStyle)}>
        <View className='flex gap-y-3'>
          <View className='flex-row justify-center'>
            {/* <ToggleButton
              value={orderType}
              labelStyle='text-base'
              wrapperStyle='w-5/6 h-10'
              options={['pending', 'completed']}
              labels={{ pending: 'Pending', completed: 'Completed' }}
              activeButtonColors={{ pending: 'bg-primary', completed: 'bg-primary' }}
              activeLabelColors={{ pending: 'text-base-black', completed: 'text-base-black' }}
              onChange={(val) => setOrderType(val)}
            /> */}
          </View>

          {orderType === 'pending' ? (
            <ChipFilter
              value={pendingOrderType}
              items={pendingOrderTypeFilterItems}
              onChange={(item) => setPendingOrderType(item)}
            />
          ) : (
            <ChipFilter
              value={completedOrderType}
              items={completedOrderTypeFilterItems}
              onChange={(item) => setCompletedOrderType(item)}
            />
          )}
        </View>

        <FlatList
          data={ordersList}
          initialNumToRender={0}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id.toString()}
          contentContainerClassName={adsListStyle}
          renderItem={({ item, index }) => <OrderCard index={index} order={item} />}
          ItemSeparatorComponent={() => <DividerX style={cn('mb-4', isDark ? 'opacity-40' : 'opacity-25')} />}
          ListFooterComponent={() => <DividerX style={isDark ? 'opacity-40' : 'opacity-25'} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Orders;
