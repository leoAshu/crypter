import { useRef } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const useRippleAnimation = (config?: RippleAnimationConfig) => {
  const {
    color = '#FFFFFF',
    opacity = 0.45,
    scale = 3,
    duration = 500,
    radius = 50,
    easing = Easing.out(Easing.ease),
  } = config || {};

  const scaleValue = useSharedValue(0);
  const opacityValue = useSharedValue(0);
  const rippleX = useSharedValue(0);
  const rippleY = useSharedValue(0);
  const rippleContainerRef = useRef<View>(null);

  const triggerRipple = (e: GestureResponderEvent) => {
    rippleContainerRef.current?.measure((x, y, width, height, pageX, pageY) => {
      const localX = e.nativeEvent.pageX - pageX;
      const localY = e.nativeEvent.pageY - pageY;
      rippleX.value = localX;
      rippleY.value = localY;
      scaleValue.value = 0;
      opacityValue.value = opacity;
      scaleValue.value = withTiming(scale, { duration, easing });
      opacityValue.value = withTiming(0, { duration, easing });
    });
  };

  const rippleStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: rippleY.value - radius,
    left: rippleX.value - radius,
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    backgroundColor: color,
    transform: [{ scale: scaleValue.value }],
    opacity: opacityValue.value,
    pointerEvents: 'none',
  }));

  return {
    rippleContainerRef,
    rippleStyle,
    triggerRipple,
  };
};

export default useRippleAnimation;
