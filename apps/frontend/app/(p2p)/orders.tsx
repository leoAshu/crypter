import { ChipFilter, DividerX, OrderCard, ToggleButton } from '@/components';
import { useOrders } from '@/hooks';
import { CompletedOrderType, OrderType, PendingOrderType } from '@/models';
import cn from 'clsx';
import { useMemo, useState } from 'react';
import { FlatList, Platform, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Orders = () => {
  const isDark = useColorScheme() === 'dark';

  const { pendingOrderTypeFilterItems, completedOrderTypeFilterItems, orderTypeFilterItems, filterOrdersByType } =
    useOrders();

  const [orderType, setOrderType] = useState<FilterItem>(orderTypeFilterItems[0]);
  const [pendingOrderType, setPendingOrderType] = useState<FilterItem>(pendingOrderTypeFilterItems[0]);
  const [completedOrderType, setCompletedOrderType] = useState<FilterItem>(completedOrderTypeFilterItems[0]);

  const orders = useMemo(
    () =>
      filterOrdersByType(
        orderType.id as OrderType,
        pendingOrderType.id as PendingOrderType,
        completedOrderType.id as CompletedOrderType,
      ),
    [orderType, pendingOrderType, completedOrderType],
  );

  const adsListStyle = Platform.select({
    ios: 'pb-20',
    android: 'pb-24',
  });

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <View className='content-wrapper'>
        <View className='flex gap-y-3'>
          <View className='flex-row justify-center'>
            <ToggleButton
              value={orderType}
              items={[orderTypeFilterItems[0], orderTypeFilterItems[1]]}
              activeButtonColors={{
                [orderTypeFilterItems[0].id]: 'bg-primary',
                [orderTypeFilterItems[1].id]: 'bg-error-500',
              }}
              activeLabelColors={{
                [orderTypeFilterItems[0].id]: 'text-base-dark',
                [orderTypeFilterItems[1].id]: 'text-base-white',
              }}
              onChange={(val) => setOrderType(val)}
            />
          </View>

          {orderType.id === OrderType.Pending ? (
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
          data={orders}
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
