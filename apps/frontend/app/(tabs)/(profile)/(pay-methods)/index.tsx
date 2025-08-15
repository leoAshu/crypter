import { DividerX, PayMethodCard, PrimaryButton } from '@/components';
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
  const adsListStyle = Platform.select({
    ios: 'pb-20',
    android: 'pb-24',
  });

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <View className='content-wrapper mt-2'>
        <FlatList
          data={payMethods.slice(0, 3)}
          keyExtractor={(item) => item.id}
          contentContainerClassName={adsListStyle}
          renderItem={({ item, index }) => <PayMethodCard index={index} payMethod={item} />}
          ItemSeparatorComponent={() => <DividerX style={cn('mb-1', isDark ? 'opacity-40' : 'opacity-25')} />}
          ListFooterComponent={() => (
            <View className='gap-y-6'>
              {!isEmpty && <DividerX style={isDark ? 'opacity-40' : 'opacity-25'} />}
              <PrimaryButton title='New Pay Method' onPress={() => router.push('/add-method')} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default PayMethods;
