import { successHapticFeedback, warningHapticFeedback } from '@/utils';
import cn from 'clsx';
import React, { useEffect, useMemo, useRef } from 'react';
import { AccessibilityProps, Animated, Easing, Pressable, Text, useColorScheme, View } from 'react-native';

export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleSwitchProps extends AccessibilityProps {
  value: boolean;
  onChange?: (v: boolean) => void;
  onDisabledPress?: () => void;
  size?: ToggleSize;
  activeColor?: string; // tailwind utility or direct hex (used inline for background when active)
  inactiveColor?: string; // tailwind utility or direct hex
  thumbColor?: string;
  disabled?: boolean;
  animate?: boolean;
  label?: string; // optional label next to the switch
  labelPosition?: 'left' | 'right';
  style?: any;
}

const SIZE_MAP = {
  sm: {
    width: 40,
    height: 22,
    padding: 2,
    thumb: 18,
    translateX: 18,
  },
  md: {
    width: 50,
    height: 28,
    padding: 3,
    thumb: 22,
    translateX: 22,
  },
  lg: {
    width: 64,
    height: 36,
    padding: 4,
    thumb: 28,
    translateX: 28,
  },
} as const;

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  value,
  onChange,
  onDisabledPress,
  size = 'md',
  activeColor = '#54E6B6', // emerald-500
  inactiveColor = '#E5E7EB', // gray-200
  thumbColor = '#FFFFFF',
  disabled = false,
  animate = true,
  label,
  labelPosition = 'right',
  accessibilityLabel,
  style,
  ...rest
}) => {
  const isDark = useColorScheme() === 'dark';
  const config = useMemo(() => SIZE_MAP[size], [size]);

  const themeInactiveColor = isDark ? '#1C1C1C' : '#F1F1F1';

  // Animated value: 0 => off, 1 => on
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  // Sync when `value` changes externally
  useEffect(() => {
    if (!animate) {
      anim.setValue(value ? 1 : 0);
      return;
    }
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 180,
      easing: Easing.out(Easing.circle),
      useNativeDriver: false, // animating layout + colors, keep false
    }).start();
  }, [value, animate, anim]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, config.translateX],
  });

  const backgroundColor = anim.interpolate({
    inputRange: [0, 1],
    // fallback to hex strings
    outputRange: [themeInactiveColor, activeColor],
  });

  const onPress = () => {
    if (disabled) {
      warningHapticFeedback();
      onDisabledPress?.();
      return;
    }
    onChange?.(!value);
    successHapticFeedback();
  };

  const labelClasses = cn('text-[10px] font-satoshi text-body dark:text-body-dark');

  return (
    <Pressable onPress={onPress} style={[{ opacity: disabled ? 0.6 : 1 }, style]} {...rest} hitSlop={20}>
      <View className='flex-row items-center'>
        {label && labelPosition === 'left' ? <Text className={cn(labelClasses, 'mr-2')}>{label}</Text> : null}

        <Animated.View
          style={{
            width: config.width,
            height: config.height,
            borderRadius: config.height / 2,
            padding: config.padding,
            justifyContent: 'center',
            // backgroundColor animated
            backgroundColor,
          }}
        >
          <Animated.View
            style={{
              width: config.thumb,
              height: config.thumb,
              borderRadius: config.thumb / 2,
              transform: [{ translateX }],
              backgroundColor: thumbColor,
              // shadow / elevation
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.12,
              shadowRadius: 1.5,
              elevation: 2,
            }}
          />
        </Animated.View>

        {label && labelPosition === 'right' ? <Text className={cn(labelClasses, 'ml-2')}>{label}</Text> : null}
      </View>
    </Pressable>
  );
};

export default ToggleSwitch;
