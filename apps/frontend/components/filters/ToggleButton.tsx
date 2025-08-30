import { rigidHapticFeedback } from '@/utils';
import cn from 'clsx';
import { Pressable, Text, View } from 'react-native';

const ToggleButton = (props: ToggleButtonProps) => {
  const onPress = (item: FilterItem) => {
    rigidHapticFeedback();
    props.onChange?.(item);
  };

  return (
    <View className='gap-y-2'>
      {props.title && <Text className='field-label'>{props.title}</Text>}

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
    </View>
  );
};

export default ToggleButton;
