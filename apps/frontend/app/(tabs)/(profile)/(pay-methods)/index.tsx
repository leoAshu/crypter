import { DividerX, PayMethodCard } from '@/components';
import { usePayMethod } from '@/hooks';
import cn from 'clsx';
import React from 'react';
import { FlatList, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PayMethods = () => {
  const isDark = useColorScheme() === 'dark';

  const { payMethods } = usePayMethod();

  const isEmpty = payMethods.length === 0;

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <View className='content-wrapper mt-2'>
        <FlatList
          data={payMethods}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => <PayMethodCard index={index} payMethod={item} />}
          ItemSeparatorComponent={() => <DividerX style={cn('mb-1', isDark ? 'opacity-40' : 'opacity-25')} />}
          ListFooterComponent={() => !isEmpty && <DividerX style={isDark ? 'opacity-40' : 'opacity-25'} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default PayMethods;
