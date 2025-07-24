import { useRipple } from '@/hooks';
import { Image, Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';

const IconButton = (props: IconButtonProps) => {
  const { rippleContainerRef, rippleStyle, triggerRipple } = useRipple();

  return (
    <Pressable className='icon-btn-wrapper' disabled={props.disabled} onPress={props.onPress} onPressIn={triggerRipple}>
      <View className='icon-btn-inner' ref={rippleContainerRef}>
        <Animated.View style={rippleStyle} />
        <Image
          className='icon-btn-img'
          source={props.icon}
          resizeMode='contain'
          style={props.tintColor ? { tintColor: props.tintColor } : undefined}
        />
      </View>
    </Pressable>
  );
};

export default IconButton;
