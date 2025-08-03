import { icons } from '@/assets';
import cn from 'clsx';
import { useState } from 'react';
import { Image, Pressable, useColorScheme } from 'react-native';
import Toast from 'react-native-toast-message';

const CopyIconButton = () => {
  const [copied, setCopied] = useState(false);
  const isDark = useColorScheme() === 'dark';

  const handlePress = () => {
    setCopied(true);
    Toast.show({
      type: 'success',
      text1: 'Copied!',
      text2: 'Order ID copied to clipboard.',
      position: 'bottom',
    });
    setTimeout(() => setCopied(false), 1500);
  };

  const iconSource = !copied
    ? isDark
      ? icons.dark.copy
      : icons.light.copy
    : isDark
      ? icons.dark.copySuccess
      : icons.light.copySuccess;

  return (
    <Pressable onPress={handlePress}>
      <Image source={iconSource} className={cn('size-5', isDark ? 'opacity-45' : 'opacity-55')} />
    </Pressable>
  );
};

export default CopyIconButton;
