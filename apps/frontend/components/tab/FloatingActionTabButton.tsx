import { images } from '@/assets';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Platform, Pressable, useColorScheme, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const FloatingActionTabButton = () => {
  const isIOS = Platform.OS === 'ios';
  const isDark = useColorScheme() === 'dark';

  const scale = useSharedValue(1);
  const outerShadowOpacity = useSharedValue(0);
  const innerShadowOpacity = useSharedValue(1);

  const handlePressIn = () => {
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
        shadowOpacity: 0.2,
        shadowRadius: 6,
      }}
    >
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View
          className='h-20 w-20 items-center justify-center overflow-hidden rounded-full'
          style={[{ backgroundColor: '#0066FF' }, animatedStyle]}
        >
          {/* Outer Shadows */}
          <Animated.View className='absolute inset-0 rounded-full' style={outerShadowStyle}>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.2)', 'transparent']}
              start={{ x: 0.1, y: 0.1 }}
              end={{ x: 0.9, y: 0.9 }}
              className='absolute inset-0 rounded-full'
            />
            <LinearGradient
              colors={['transparent', 'rgba(255, 255, 255, 0.4)']}
              start={{ x: 0.2, y: 0.2 }}
              end={{ x: 1, y: 1 }}
              className='absolute inset-0 rounded-full'
            />
          </Animated.View>

          {/* Inner Shadows */}
          <Animated.View className='absolute inset-0 rounded-full' style={innerShadowStyle}>
            <LinearGradient
              colors={['rgba(0,0,0,0.25)', 'transparent']}
              start={{ x: 0.6, y: 0.6 }}
              end={{ x: 0.1, y: 0.1 }}
              className='absolute inset-0 rounded-full'
            />
          </Animated.View>

          <Image
            source={images.exchange}
            className='z-10 h-8 w-8'
            resizeMode='contain'
            style={{ tintColor: '#FFFFFF' }}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default FloatingActionTabButton;
