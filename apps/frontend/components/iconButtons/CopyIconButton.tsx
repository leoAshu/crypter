import { icons } from '@/assets';
import { ToastStrings } from '@/constants';
import cn from 'clsx';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { Image, Pressable, useColorScheme } from 'react-native';
import Toast from 'react-native-toast-message';

interface CopyIconButtonProps {
  value: string;
  iconStyle?: string;
}

const CopyIconButton = (props: CopyIconButtonProps) => {
  const [copied, setCopied] = useState(false);
  const isDark = useColorScheme() === 'dark';

  const handlePress = async () => {
    await Clipboard.setStringAsync(props.value);
    setCopied(true);
    Toast.show({
      type: 'success',
      text1: ToastStrings.Success.TITLE,
      text2: ToastStrings.Success.COPY,
      position: 'bottom',
      bottomOffset: 112,
      autoHide: true,
      visibilityTime: 1500,
      onHide: () => setCopied(false),
    });
  };

  const iconSource = !copied
    ? isDark
      ? icons.dark.copy
      : icons.light.copy
    : isDark
      ? icons.dark.copySuccess
      : icons.light.copySuccess;

  return (
    <Pressable onPress={handlePress} hitSlop={15}>
      <Image
        source={iconSource}
        className={cn('size-5', isDark ? 'opacity-45' : 'opacity-55', props.iconStyle)}
        resizeMode='contain'
      />
    </Pressable>
  );
};

export default CopyIconButton;
