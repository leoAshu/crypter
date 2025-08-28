import { icons } from '@/assets';
import { Text, useColorScheme, View } from 'react-native';
import { IndexIconButton } from '../iconButtons';

const StepperInput = (props: StepperInputProps) => {
  const disabledDecrement = props.index === 0;
  const disabledIncrement = props.index === props.items.length - 1;
  const isDark = useColorScheme() === 'dark';

  return (
    <View className='gap-y-2'>
      <Text className='font-clashDisplay text-sm text-label dark:text-label-dark'>{props.label}</Text>
      <View className='round-icon-btn-label'>
        <IndexIconButton
          disabled={disabledDecrement}
          icon={
            disabledDecrement
              ? icons[isDark ? 'dark' : 'light'].inactive.decrement
              : icons[isDark ? 'dark' : 'light'].active.decrement
          }
          onPress={props.onDecrement}
        />
        <Text className='txt-label text-sm'>{props.items[props.index]}</Text>
        <IndexIconButton
          disabled={disabledIncrement}
          icon={
            disabledIncrement
              ? icons[isDark ? 'dark' : 'light'].inactive.increment
              : icons[isDark ? 'dark' : 'light'].active.increment
          }
          onPress={props.onIncrement}
        />
      </View>
    </View>
  );
};

export default StepperInput;
