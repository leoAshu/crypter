import { icons, images } from '@/assets';
import cn from 'clsx';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const PrimaryDropdown = <T extends FilterItem>(props: PrimaryDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const animationProgress = useSharedValue(0);

  const selectedItem = props.items.find((item) => item.id === props.selectedId);
  const displayValue = selectedItem?.name || props.placeholder || 'Select an option';

  const handleSelect = (item: T) => {
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
            className={cn('deposit-form-value', !selectedItem ? 'text-gray-500' : '', props.textStyle)}
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
          <View className='rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800'>
            <FlatList
              data={props.items}
              keyExtractor={(item) => item.id}
              style={{ maxHeight: 300 }}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  className={cn(
                    'flex-row items-center px-4 py-3',
                    index !== props.items.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : '',
                    item.id === props.selectedId ? 'bg-primary/10' : '',
                  )}
                  onPress={() => handleSelect(item)}
                >
                  <Text
                    className={cn(
                      'flex-1 font-satoshi-medium text-base',
                      item.id === props.selectedId
                        ? 'font-satoshi-semibold text-primary'
                        : 'text-base-black dark:text-base-white',
                    )}
                  >
                    {props.renderItem ? props.renderItem(item) : item.name}
                  </Text>
                  {item.id === props.selectedId && <Image source={images.eye} className='ml-2 h-5 w-5' />}
                </TouchableOpacity>
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

export default PrimaryDropdown;
