import cn from 'clsx';
import React from 'react';
import { useColorScheme, View } from 'react-native';

const DividerX = () => {
  const isDark = useColorScheme() === 'dark';

  return <View className={cn('h-px bg-[#333A47]', isDark ? 'opactive-30' : 'opacity-20')}></View>;
};

export default DividerX;
