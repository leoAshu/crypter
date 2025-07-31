import cn from 'clsx';
import React from 'react';
import { useColorScheme, View } from 'react-native';

const DividerX = (props: DividerXProps) => {
  const isDark = useColorScheme() === 'dark';

  return <View className={cn('divider-x', isDark ? 'opacity-30' : 'opacity-15', props.opacityStyle)}></View>;
};

export default DividerX;
