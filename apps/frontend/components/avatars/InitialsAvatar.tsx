import { getInitialsFromName } from '@/utils';
import cn from 'clsx';
import { Text, View } from 'react-native';

const SIZE_PRESETS: Record<AvatarSize, { container: string; text: string }> = {
  xs: {
    container: 'size-4',
    text: 'text-[10px]',
  },
  sm: {
    container: 'size-10',
    text: 'text-lg',
  },
  md: {
    container: 'size-12',
    text: 'text-lg',
  },
  lg: {
    container: 'size-20',
    text: 'text-2xl',
  },
};

const InitialsAvatar = (props: InitialsAvatarProps) => {
  const { container, text } = SIZE_PRESETS[props.size ?? 'md'];

  return (
    <View className={cn(container, 'initials-avatar-wrapper', props.containerStyle)}>
      <Text className={cn('initials-avatar-txt', text, props.textStyle)}>{getInitialsFromName(props.name)}</Text>
    </View>
  );
};

export default InitialsAvatar;
