import { useRef } from 'react';
import { Image, ImageSourcePropType, GestureResponderEvent, Pressable, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

interface IconButtonProps {
  icon: ImageSourcePropType;
  onPress?: (event: GestureResponderEvent) => void;
  tintColor?: string;
}

const IconButton = (props: IconButtonProps) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0.15);
  const rippleX = useSharedValue(0);
  const rippleY = useSharedValue(0);
  const containerRef = useRef<View>(null);

  const handlePressIn = (e: GestureResponderEvent) => {
    containerRef.current?.measure((x, y, width, height, pageX, pageY) => {
      const localX = e.nativeEvent.pageX - pageX;
      const localY = e.nativeEvent.pageY - pageY;
      rippleX.value = localX;
      rippleY.value = localY;
      scale.value = 0;
      opacity.value = 0.75;
      scale.value = withTiming(3, {
        duration: 500,
        easing: Easing.out(Easing.ease),
      });
      opacity.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.ease),
      });
    });
  };

  const animatedRippleStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: rippleY.value - 50,
    left: rippleX.value - 50,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#0066FF',
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
    pointerEvents: 'none',
  }));

  return (
    <Pressable className='icon-btn-wrapper' onPress={props.onPress} onPressIn={handlePressIn}>
      <View className='icon-btn-inner' ref={containerRef}>
        <Animated.View style={animatedRippleStyle} />
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
