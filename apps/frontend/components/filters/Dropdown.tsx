import { icons } from '@/assets';
import cn from 'clsx';
import { useState } from 'react';
import { FlatList, Image, Pressable, Text, useColorScheme, View } from 'react-native';
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const Dropdown = (props: DropdownProps) => {
  const isDark = useColorScheme() === 'dark';

  const [isOpen, setIsOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const animationProgress = useSharedValue(0);

  const value = props.items.find((item) => item.id === props.value?.id);
  const displayValue = value?.label || props.placeholder || 'Select an option';

  const handleSelect = (item: FilterItem) => {
    handleCloseDropdown();
    setTimeout(() => {
      props.onSelect?.(item);
    }, 0);
  };

  const handleOpenDropdown = () => {
    if (props.disabled) return;
    setIsOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setShowOverlay(true);
        animationProgress.value = withTiming(1, { duration: 200 });
      });
    });
  };

  const handleCloseDropdown = () => {
    animationProgress.value = withTiming(0, { duration: 150 }, (finished) => {
      if (finished) {
        runOnJS(setIsOpen)(false);
        runOnJS(setShowOverlay)(false);
      }
    });
  };

  const dropdownAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(animationProgress.value, [0, 1], [-10, 0]);
    const opacity = interpolate(animationProgress.value, [0, 1], [0, 1]);

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <View className={cn('gap-y-2', props.containerStyle)}>
      {props.title && <Text className='deposit-form-label'>{props.title}</Text>}

      <Pressable
        className={cn(
          'deposit-form-row',
          props.disabled ? 'opacity-50' : '',
          props.error ? 'border-red-500' : '',
          props.buttonStyle,
        )}
        onPress={handleOpenDropdown}
        disabled={props.disabled}
      >
        <View className='deposit-form-value-wrapper'>
          <Text
            className={cn('deposit-form-value', !value ? 'text-label dark:text-label' : '', props.textStyle)}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {displayValue}
          </Text>
        </View>

        <View className='deposit-form-icon-wrapper'>
          <Image
            source={isDark ? icons.dark.arrowDown : icons.light.arrowDown}
            className='size-8'
            resizeMode='contain'
          />
        </View>
      </Pressable>
      {props.error && <Text className='font-satoshi-medium text-sm text-red-500'>{props.error}</Text>}
      {isOpen && (
        <Animated.View className='absolute left-0 right-0 top-full z-50 mt-1' style={dropdownAnimatedStyle}>
          <View className='rounded-md border-[0.5px] border-stroke bg-card shadow-lg dark:border-stroke-dark dark:bg-card-dark'>
            <FlatList
              scrollEnabled={false}
              data={props.items}
              keyExtractor={(item) => item.id}
              style={{ maxHeight: 300 }}
              renderItem={({ item, index }) => (
                <Pressable
                  className={cn(
                    'flex-row items-center px-4 py-3',
                    index === 0 ? 'rounded-t-md' : '',
                    index !== props.items.length - 1
                      ? 'border-b-[0.5px] border-stroke dark:border-stroke-dark'
                      : 'rounded-b-md',
                    item.id === props.value?.id ? 'bg-primary' : '',
                  )}
                  onPress={() => handleSelect(item)}
                >
                  <Text
                    className={cn(
                      'flex-1 font-satoshi',
                      item.id === props.value?.id ? 'text-title dark:text-title-dark' : 'text-label dark:text-label',
                    )}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Animated.View>
      )}
      {showOverlay && (
        <Pressable
          className='absolute inset-0 z-10'
          style={{
            top: -1000,
            bottom: -1000,
            left: -1000,
            right: -1000,
          }}
          onPress={handleCloseDropdown}
        />
      )}
    </View>
  );
};

export default Dropdown;
