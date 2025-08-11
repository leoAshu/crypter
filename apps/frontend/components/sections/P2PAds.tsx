import cn from 'clsx';
import React from 'react';
import { FlatList, Platform, useColorScheme } from 'react-native';
import { AdCard } from '../cards';
import { DividerX } from '../dividers';

const P2PAds = (props: P2PAdsProps) => {
  const isDark = useColorScheme() === 'dark';

  const adsListStyle = Platform.select({
    ios: 'pb-20',
    android: 'pb-24',
  });

  return (
    <FlatList
      data={props.ads}
      initialNumToRender={1}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => item.id.toString()}
      contentContainerClassName={adsListStyle}
      renderItem={({ item, index }) => <AdCard index={index} ad={item} animationStyle='fadeFloatUp' />}
      ItemSeparatorComponent={() => <DividerX style={cn('mb-4', isDark ? 'opacity-40' : 'opacity-25')} />}
      ListFooterComponent={() => <DividerX style={isDark ? 'opacity-40' : 'opacity-25'} />}
    />
  );
};

export default React.memo(P2PAds);
