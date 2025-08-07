import { ChipFilter, DividerX, OrderCard, ToggleButton } from '@/components';
import { screenContentWrapperStyle } from '@/constants';
import { getFilteredOrders } from '@/models';
import cn from 'clsx';
import { useEffect, useState } from 'react';
import { FlatList, Platform, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Orders = () => {
  const isDark = useColorScheme() === 'dark';
  const [orderType, setOrderType] = useState<OrderType>('pending');
  const [pendingOrderType, setPendingOrderType] = useState<PendingOrderType>('all');
  const [completedOrderType, setCompletedOrderType] = useState<CompletedOrderType>('all');
  const [ordersList, setOrdersList] = useState<Order[]>(
    getFilteredOrders(orderType, orderType === 'pending' ? pendingOrderType : completedOrderType),
  );

  const adsListStyle = Platform.select({
    ios: 'pb-20',
    android: 'pb-24',
  });

  useEffect(() => {
    setOrdersList(getFilteredOrders(orderType, orderType === 'pending' ? pendingOrderType : completedOrderType));
  }, [orderType, pendingOrderType, completedOrderType]);

  return (
    <SafeAreaView className='screen-wrapper'>
      <View className={cn('content-wrapper', screenContentWrapperStyle)}>
        <View className='flex gap-y-3'>
          <View className='flex-row justify-center'>
            <ToggleButton
              value={orderType}
              labelStyle='text-base'
              wrapperStyle='w-5/6 h-10'
              options={['pending', 'completed']}
              labels={{ pending: 'Pending', completed: 'Completed' }}
              activeButtonColors={{ pending: 'bg-primary', completed: 'bg-primary' }}
              activeLabelColors={{ pending: 'text-base-black', completed: 'text-base-black' }}
              onChange={(val) => setOrderType(val)}
            />
          </View>

          {orderType === 'pending' ? (
            <ChipFilter
              value={pendingOrderType}
              options={['all', 'unpaid', 'paid', 'appeal']}
              labels={{ all: 'All', unpaid: 'Unpaid', paid: 'Paid', appeal: 'Appeal' }}
              onChange={(val) => setPendingOrderType(val)}
            />
          ) : (
            <ChipFilter
              value={completedOrderType}
              options={['all', 'completed', 'canceled']}
              labels={{ all: 'All', completed: 'Completed', canceled: 'Canceled' }}
              onChange={(val) => setCompletedOrderType(val)}
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
