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

  const showIcon = props.showIcon ?? 'true';
  const value = props.items.find((item) => item.id === props.value?.id);
  const displayValue = value?.label || props.placeholder || 'Select an option';
  const disabled = props.disabled ?? props.items.length === 1;

  const handleSelect = (item: FilterItem) => {
    handleCloseDropdown();
    setTimeout(() => {
      props.onSelect?.(item);
    }, 0);
  };

  const handleOpenDropdown = () => {
    if (disabled) return;
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
      {props.title && <Text className='dropdown-label'>{props.title}</Text>}

      <Pressable
        className={cn(
          'dropdown-wrapper',
          disabled ? 'opacity-50' : '',
          props.error ? 'border-red-500' : '',
          props.buttonStyle,
        )}
        onPress={handleOpenDropdown}
        disabled={disabled}
      >
        <View
          className={cn('dropdown-value-wrapper flex-row items-center justify-between', !showIcon && 'rounded-r-lg')}
        >
          <Text
            className={cn(value == undefined ? 'dropdown-placeholder' : 'dropdown-value')}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {displayValue}
          </Text>

          {value?.secondaryLabel && (
            <Text
              className={cn(value == undefined ? 'dropdown-placeholder' : 'dropdown-value')}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {value?.secondaryLabel}
            </Text>
          )}
        </View>

        {showIcon && (
          <View className='dropdown-icon-wrapper'>
            <Image
              source={isDark ? icons.dark.arrowDown : icons.light.arrowDown}
              className='size-8'
              resizeMode='contain'
            />
          </View>
        )}
      </Pressable>
      {props.error && <Text className='dropdown-error'>{props.error}</Text>}
      {isOpen && (
        <Animated.View className='absolute left-0 right-0 top-full z-50 mt-1' style={dropdownAnimatedStyle}>
          <View className='dropdown-options-wrapper'>
            <FlatList
              data={props.items}
              scrollEnabled={false}
              style={{ maxHeight: 300 }}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <Pressable
                  className={cn(
                    'dropdown-option flex-row items-center justify-between',
                    index === 0 && 'rounded-t-md',
                    index !== props.items.length - 1
                      ? 'border-b-[0.5px] border-stroke dark:border-stroke-dark'
                      : 'rounded-b-md',
                    item.id === props.value?.id && 'bg-primary',
                  )}
                  onPress={() => handleSelect(item)}
                >
                  <Text
                    className={cn(
                      'dropdown-option-txt',
                      item.id === props.value?.id ? 'text-title' : 'text-label dark:text-label',
                    )}
                  >
                    {item.label}
                  </Text>
                  {value?.secondaryLabel && (
                    <Text
                      className={cn(
                        'dropdown-option-txt',
                        item.id === props.value?.id ? 'text-title' : 'text-label dark:text-label',
                      )}
                    >
                      {value?.secondaryLabel}
                    </Text>
                  )}
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
