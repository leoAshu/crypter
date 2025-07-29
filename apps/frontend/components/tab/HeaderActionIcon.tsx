import cn from 'clsx';
import { Image, Pressable, useColorScheme, View } from 'react-native';

const HeaderActionIcon = (props: HeaderActionIconProps) => {
  const isDark = useColorScheme() === 'dark';
  const iconStyle = props.iconStyle ?? 'size-6';
  return (
    <View className={cn('app-header-icon-wrapper', props.containerStyle)}>
      <Pressable onPress={props.onPress}>
        <Image
          className={iconStyle}
          source={props.icon}
          tintColor={isDark ? '#FFFFFF' : '#23262F'}
          resizeMode='contain'
        />
      </Pressable>
    </View>
  );
};

export default HeaderActionIcon;
