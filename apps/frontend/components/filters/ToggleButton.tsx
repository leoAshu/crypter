import cn from 'clsx';
import { Platform, Pressable, Text, View } from 'react-native';

const ToggleButton = <T extends string>(props: ToggleButtonProps<T>) => {
  const isIOS = Platform.OS === 'ios';

  return (
    <View className='toggle-btn-wrapper'>
      {props.options.map((option) => {
        const isActive = option === props.value;
        const bgClass = isActive && props.activeColors?.[option] ? props.activeColors[option] : '';
        const textClass = isActive ? 'toggle-btn-label-active' : 'toggle-btn-label-inactive';

        return (
          <Pressable
            key={option}
            className={cn('toggle-btn', bgClass, isIOS ? 'py-4' : 'py-3')}
            onPress={() => props.onChange?.(option)}
          >
            <Text className={cn('text-center', textClass)}>{props.labels?.[option] ?? option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default ToggleButton;
