import { DividerX, ListEmptyState, PayMethodCard } from '@/components';
import { usePayMethod } from '@/hooks';
import cn from 'clsx';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Platform, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PayMethods = () => {
  const isDark = useColorScheme() === 'dark';

  const { payMethods } = usePayMethod();

  const isEmpty = payMethods.length === 0;
  const listStyle = !isEmpty
    ? Platform.select({
        ios: 'pb-60',
        android: 'pb-24',
      })
    : 'flex-1 items-center justify-center pb-48';

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <View className='content-wrapper mt-2'>
        <FlatList
          data={payMethods}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerClassName={listStyle}
          renderItem={({ item, index }) => <PayMethodCard index={index} payMethod={item} />}
          ItemSeparatorComponent={() => <DividerX style={cn('mb-1', isDark ? 'opacity-40' : 'opacity-25')} />}
          ListFooterComponent={() => !isEmpty && <DividerX style={isDark ? 'opacity-40' : 'opacity-25'} />}
          ListEmptyComponent={
            <ListEmptyState
              title='No Pay Methods Available'
              ctaLabel='Add'
              ctaStyle='py-4 px-8 rounded-lg'
              ctaOnPresss={() => router.push('/add-method')}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default PayMethods;
