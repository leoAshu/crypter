import { Strings } from '@/constants';
import cn from 'clsx';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Platform, useColorScheme } from 'react-native';
import { MyAdCard } from '../cards';
import { DividerX } from '../dividers';
import ListEmptyState from './ListEmptyState';

const MyAds = (props: MyAdsProps) => {
  const isDark = useColorScheme() === 'dark';
  const isAdsEmpty = props.myAds.length === 0;

  const listStyle = !isAdsEmpty
    ? Platform.select({
        ios: 'pb-20',
        android: 'pb-24',
      })
    : 'flex-1 items-center justify-center pb-48';

  return (
    <FlatList
      data={props.myAds}
      initialNumToRender={0}
      showsVerticalScrollIndicator={false}
      contentContainerClassName={listStyle}
      keyExtractor={(item, index) => item.id.toString()}
      renderItem={({ item, index }) => <MyAdCard index={index} ad={item} isAdActive={props.isAdActive} />}
      ItemSeparatorComponent={() => <DividerX style={cn('mb-4', isDark ? 'opacity-40' : 'opacity-25')} />}
      ListFooterComponent={() => (!isAdsEmpty ? <DividerX style={isDark ? 'opacity-40' : 'opacity-25'} /> : null)}
      ListEmptyComponent={
        <ListEmptyState
          title={Strings.postAd.EMPTY_STATE}
          ctaLabel='Create Ad'
          ctaOnPresss={() => router.push('/(p2p)/(advert)/(post)')}
        />
      }
    />
  );
};

export default React.memo(MyAds);
