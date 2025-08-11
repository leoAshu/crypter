import cn from 'clsx';
import { GestureResponderEvent, Image, Pressable, View, useColorScheme } from 'react-native';

const IndexIconButton = (props: IndexIconButtonProps) => {
  const colorScheme = useColorScheme();

  const handlePress = (e: GestureResponderEvent) => {
    props.onPress?.(e);
  };

  return (
    <Pressable onPress={props.disabled ? undefined : handlePress} hitSlop={15}>
      <View className='round-icon-btn-bg' style={colorScheme == 'dark' ? { opacity: 0.3 } : { opacity: 1 }} />

      <View className='round-icon-btn-img-wrapper'>
        <Image
          className={cn('index-icon-btn-img', props.disabled ? 'opacity-45' : '')}
          source={props.icon}
          resizeMode='contain'
        />
      </View>
    </Pressable>
  );
};

export default IndexIconButton;
