import { icons } from '@/assets';
import { AppBar, DividerX, HeaderActionIcon, ListEmptyState, NewPayMethodModal, PayMethodCard } from '@/components';
import { usePayMethod } from '@/hooks';
import cn from 'clsx';
import { useNavigation } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { FlatList, Platform, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PayMethods = () => {
  const navigation = useNavigation();
  const isDark = useColorScheme() === 'dark';

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const { payMethods } = usePayMethod();

  const isEmpty = payMethods.length === 0;
  const listStyle = !isEmpty
    ? Platform.select({
        ios: 'pb-60 px-2 pt-4',
        android: 'pb-24 px-2 pt-4',
      })
    : 'flex-1 items-center justify-center pb-48';

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <AppBar
          title='Pay Methods'
          right={
            <HeaderActionIcon
              icon={isDark ? icons.dark.addSquare : icons.light.addSquare}
              onPress={() => setModalVisible(true)} // 👈 opens modal
            />
          }
        />
      ),
    });
  });

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <View className='content-wrapper mt-2'>
        <FlatList
          data={payMethods}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerClassName={listStyle}
          renderItem={({ item, index }) => <PayMethodCard index={index} payMethod={item} />}
          ItemSeparatorComponent={() => <DividerX style={cn('mt-px mb-2', isDark ? 'opacity-40' : 'opacity-25')} />}
          ListFooterComponent={() => !isEmpty && <DividerX style={cn('mt-px', isDark ? 'opacity-40' : 'opacity-25')} />}
          ListEmptyComponent={
            <ListEmptyState
              title='No Pay Methods Available'
              ctaLabel='Add'
              ctaStyle='py-4 px-8 rounded-lg'
              ctaOnPresss={() => {
                setModalVisible(true);
              }}
            />
          }
        />
      </View>

      <NewPayMethodModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </SafeAreaView>
  );
};

export default PayMethods;
