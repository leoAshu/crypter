import { icons } from '@/assets';
import cn from 'clsx';
import React from 'react';
import { FlatList, ImageSourcePropType } from 'react-native';
import { NavCard } from '../cards';

const QuickNav = () => {
  const iconsMap: Record<string, { light: ImageSourcePropType; dark: ImageSourcePropType }> = {
    p2p: { light: icons.light.inactive.p2p, dark: icons.dark.inactive.p2p },
    orders: { light: icons.light.inactive.receipt, dark: icons.dark.inactive.receipt },
    myAds: { light: icons.light.inactive.subtitle, dark: icons.dark.inactive.subtitle },
    createAd: { light: icons.light.noteFav, dark: icons.dark.noteFav },
  };

  const navRoutes: NavRoute[] = [
    { id: 'p2p', title: 'P2P', icon: iconsMap['p2p'], route: '/(p2p)' },
    { id: 'orders', title: 'Orders', icon: iconsMap['orders'], route: '/(p2p)/orders' },
    { id: 'myAds', title: 'My Ads', icon: iconsMap['myAds'], route: '/(p2p)/(advert)' },
    { id: 'createAd', title: 'Create Ad', icon: iconsMap['createAd'], route: '/(p2p)/(advert)/(post)' },
  ];

  return (
    <FlatList
      horizontal
      data={navRoutes}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <NavCard navRoute={item} />}
      contentContainerClassName={cn(
        'py-4 px-2 flex-row w-full',
        navRoutes.length - 1 > 0 ? (navRoutes.length === 2 ? 'justify-around' : 'justify-between') : 'justify-center',
      )}
    />
  );
};

export default React.memo(QuickNav);
