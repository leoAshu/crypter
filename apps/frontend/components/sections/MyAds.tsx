import { Strings } from '@/constants';
import cn from 'clsx';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Platform, Text, useColorScheme, View } from 'react-native';
import { PrimaryButton } from '../buttons';
import { MyAdCard } from '../cards';
import { DividerX } from '../dividers';

const MyAds = (props: MyAdsProps) => {
  const isDark = useColorScheme() === 'dark';
  const isAdsEmpty = props.myAds.length === 0;

  const adsListStyle = Platform.select({
    ios: 'pb-20',
    android: 'pb-24',
  });

  const EmptyState = () => (
    <View className='items-center justify-center'>
      <Text className={cn('header-txt', isDark ? 'text-base-white' : 'text-base-dark')}>
        {Strings.postAd.EMPTY_STATE}
      </Text>
      <PrimaryButton title='Post Advert' onPress={() => router.push('/(p2p)/(advert)/post')} />
    </View>
  );

  return (
    <FlatList
      data={props.myAds}
      initialNumToRender={0}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => item.id.toString()}
      contentContainerClassName={cn(!isAdsEmpty ? adsListStyle : 'flex-1 items-center justify-center pb-48')}
      renderItem={({ item, index }) => <MyAdCard ad={item} index={index} />}
      ItemSeparatorComponent={() => <DividerX style={cn('mb-4', isDark ? 'opacity-40' : 'opacity-25')} />}
      ListFooterComponent={() => (!isAdsEmpty ? <DividerX style={isDark ? 'opacity-40' : 'opacity-25'} /> : null)}
      ListEmptyComponent={EmptyState}
    />
  );
};

export default React.memo(MyAds);
