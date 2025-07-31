import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Platform, Pressable, useColorScheme, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const FloatingActionTabButton = (props: FloatingActionTabButtonProps) => {
  const isIOS = Platform.OS === 'ios';
  const isDark = useColorScheme() === 'dark';

  const scale = useSharedValue(1);
  const outerShadowOpacity = useSharedValue(0);
  const innerShadowOpacity = useSharedValue(1);

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    scale.value = withTiming(isIOS ? 0.94 : 1, { duration: 100 });
    outerShadowOpacity.value = withTiming(1, { duration: 120 });
    innerShadowOpacity.value = withTiming(0, { duration: 120 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
    outerShadowOpacity.value = withTiming(0, { duration: 120 });
    innerShadowOpacity.value = withTiming(1, { duration: 120 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const outerShadowStyle = useAnimatedStyle(() => ({
    opacity: outerShadowOpacity.value,
  }));

  const innerShadowStyle = useAnimatedStyle(() => ({
    opacity: innerShadowOpacity.value,
  }));

  return (
    <View
      className='ios-shadow'
      style={{
        elevation: 6,
        shadowColor: isDark ? '#FFFFFF' : '#000000',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: isDark ? 0.6 : 0.4,
        shadowRadius: 8,
      }}
    >
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={props.onPress}>
        <Animated.View className='fab-wrapper' style={animatedStyle}>
          {/* Outer Shadows */}
          <Animated.View className='fab-shadow' style={outerShadowStyle}>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.2)', 'transparent']}
              start={{ x: 0.1, y: 0.1 }}
              end={{ x: 0.9, y: 0.9 }}
              className='fab-shadow'
            />
            <LinearGradient
              colors={['transparent', 'rgba(255, 255, 255, 0.4)']}
              start={{ x: 0.2, y: 0.2 }}
              end={{ x: 1, y: 1 }}
              className='fab-shadow'
            />
          </Animated.View>

          {/* Inner Shadows */}
          <Animated.View className='fab-shadow' style={innerShadowStyle}>
            <LinearGradient
              colors={['rgba(0,0,0,0.25)', 'transparent']}
              start={{ x: 0.6, y: 0.6 }}
              end={{ x: 0.1, y: 0.1 }}
              className='fab-shadow'
            />
          </Animated.View>

          <Image source={props.icon} className='fab-icon' resizeMode='contain' tintColor='#FFFFFF' />
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default FloatingActionTabButton;
