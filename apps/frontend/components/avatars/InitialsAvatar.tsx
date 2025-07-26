import { getInitialsFromName } from '@/utils';
import cn from 'clsx';
import { Text, View } from 'react-native';

const SIZE_PRESETS: Record<AvatarSize, { container: string; text: string }> = {
  small: {
    container: 'size-12',
    text: 'text-xl',
  },
  medium: {
    container: 'size-20',
    text: 'text-2xl',
  },
  large: {
    container: 'size-28',
    text: 'text-4xl',
  },
};

const InitialsAvatar = (props: InitialsAvatarProps) => {
  const { container, text } = SIZE_PRESETS[props.size ?? 'medium'];

  return (
    <View className={cn(container, 'initials-avatar-wrapper', props.className)}>
      <Text className={cn('initials-avatar-txt', text)}>{getInitialsFromName(props.name)}</Text>
    </View>
  );
};

export default InitialsAvatar;
