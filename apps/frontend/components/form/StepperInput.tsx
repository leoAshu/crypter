import { icons } from '@/assets';
import { Text, useColorScheme, View } from 'react-native';
import { IndexIconButton } from '../iconButtons';

const StepperInput = (props: StepperInputProps) => {
  const disabledDecrement = props.index === 0;
  const disabledIncrement = props.index === props.items.length - 1;
  const isDark = useColorScheme() === 'dark';

  const iconsMap: Record<string, { light: any; dark: any }> = {
    decrementActive: { light: icons.light.active.decrement, dark: icons.dark.active.decrement },
    decrementInactive: { light: icons.light.inactive.decrement, dark: icons.dark.inactive.decrement },
    incrementActive: { light: icons.light.active.increment, dark: icons.dark.active.increment },
    incrementInactive: { light: icons.light.inactive.increment, dark: icons.dark.inactive.increment },
  };

  const decrementIcon =
    iconsMap[disabledDecrement ? 'decrementInactive' : 'decrementActive'][isDark ? 'dark' : 'light'];
  const incrementIcon =
    iconsMap[disabledIncrement ? 'incrementInactive' : 'incrementActive'][isDark ? 'dark' : 'light'];

  return (
    <View className='gap-y-2'>
      <Text className='font-clashDisplay text-sm text-label dark:text-label-dark'>{props.label}</Text>
      <View className='w-56 flex-row items-center justify-between gap-x-4 rounded-lg border border-stroke bg-base-white p-3 px-4 py-3 dark:border-stroke-dark dark:bg-base-dark'>
        <IndexIconButton disabled={disabledDecrement} icon={decrementIcon} onPress={props.onDecrement} />
        <Text className='txt-label text-sm'>{props.items[props.index]}</Text>
        <IndexIconButton disabled={disabledIncrement} icon={incrementIcon} onPress={props.onIncrement} />
      </View>
    </View>
  );
};

export default StepperInput;
