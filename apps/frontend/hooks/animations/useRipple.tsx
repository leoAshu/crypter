import { useRef } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { Easing, useAnimatedStyle, useSharedValue, withTiming, WithTimingConfig } from 'react-native-reanimated';

type RippleAnimationConfig = {
  color?: string;
  opacity?: { from: number; to: number };
  scale?: { from: number; to: number };
  duration?: number;
  radius?: number;
  easing?: WithTimingConfig['easing'];
};

const useRippleAnimation = (config?: RippleAnimationConfig) => {
  const {
    color = '#FFFFFF',
    opacity = { from: 0.45, to: 0 },
    scale = { from: 0, to: 3 },
    duration = 500,
    radius = 50,
    easing = Easing.out(Easing.ease),
  } = config || {};

  const scaleValue = useSharedValue(scale.from);
  const opacityValue = useSharedValue(opacity.from);
  const rippleX = useSharedValue(0);
  const rippleY = useSharedValue(0);
  const rippleContainerRef = useRef<View>(null);

  const triggerRipple = (e: GestureResponderEvent) => {
    rippleContainerRef.current?.measure((x, y, width, height, pageX, pageY) => {
      const localX = e.nativeEvent.pageX - pageX;
      const localY = e.nativeEvent.pageY - pageY;
      rippleX.value = localX;
      rippleY.value = localY;
      scaleValue.value = scale.from;
      opacityValue.value = opacity.from;
      scaleValue.value = withTiming(scale.to, { duration, easing });
      opacityValue.value = withTiming(opacity.to, { duration, easing });
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
