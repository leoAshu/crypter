import cn from 'clsx';
import * as Haptics from 'expo-haptics';
import { Pressable, Text, View } from 'react-native';

const ToggleButton = (props: ToggleButtonProps) => {
  const onPress = (item: FilterItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    props.onChange?.(item);
  };

  return (
    <View className={cn('toggle-btn-wrapper', props.wrapperStyle)}>
      {props.items.map((item) => {
        const isActive = item.id === props.value.id;
        const bgClass = isActive && props.activeButtonColors?.[item.id] ? props.activeButtonColors[item.id] : '';
        const textClass =
          isActive && props.activeLabelColors?.[item.id]
            ? props.activeLabelColors[item.id]
            : 'toggle-btn-label-inactive';

        return (
          <Pressable key={item.id} className={cn('toggle-btn', bgClass)} onPress={() => onPress(item)}>
            <Text className={cn('toggle-btn-label', textClass, props.labelStyle)}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default ToggleButton;
