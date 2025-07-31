import cn from 'clsx';
import { Pressable, Text, View } from 'react-native';

const ToggleButton = <T extends string>(props: ToggleButtonProps<T>) => {
  return (
    <View className={cn('toggle-btn-wrapper', props.wrapperStyle)}>
      {props.options.map((option) => {
        const isActive = option === props.value;
        const bgClass = isActive && props.activeButtonColors?.[option] ? props.activeButtonColors[option] : '';
        const textClass =
          isActive && props.activeLabelColors?.[option] ? props.activeLabelColors[option] : 'toggle-btn-label-inactive';

        return (
          <Pressable key={option} className={cn('toggle-btn', bgClass)} onPress={() => props.onChange?.(option)}>
            <Text className={cn('toggle-btn-label', textClass, props.labelStyle)}>
              {props.labels?.[option] ?? option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default ToggleButton;
