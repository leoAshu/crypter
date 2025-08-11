import { icons } from '@/assets';
import { Text, View } from 'react-native';
import { IndexIconButton } from '../iconButtons';

const StepperInput = (props: StepperInputProps) => {
  return (
    <View className='gap-y-2'>
      <Text className='text-label'>{props.label}</Text>
      <View className='round-icon-btn-label'>
        <IndexIconButton disabled={props.index === 0} icon={icons.decrement} onPress={props.onDecrement} />
        <Text className='text-label'>{props.items[props.index]}</Text>
        <IndexIconButton
          disabled={props.index === props.items.length - 1}
          icon={icons.increment}
          onPress={props.onIncrement}
        />
      </View>
    </View>
  );
};

export default StepperInput;
