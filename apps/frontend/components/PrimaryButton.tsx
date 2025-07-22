import { useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(props.disabled ? 0.5 : 1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    if (!props.disabled) {
      scale.value = withSpring(0.96);
    }
  };

  const handlePressOut = () => {
    if (!props.disabled) {
      scale.value = withSpring(1);
    }
  };

  useEffect(() => {
    opacity.value = withTiming(props.disabled ? 0.5 : 1, { duration: 300 });
  }, [props.disabled]);

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        className='btn-primary'
        onPress={props.disabled ? undefined : props.onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={props.disabled}
      >
        <Text className='btn-primary-label'>{props.label}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default PrimaryButton;
