import { icons, images } from '@/assets';
import { Image, Pressable, Text, useColorScheme, View } from 'react-native';
import Toast, { BaseToastProps } from 'react-native-toast-message';

const SuccessToast = (props: BaseToastProps) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View className='w-[86%] gap-y-2 rounded border-b-2 border-b-primary bg-base-white px-6 pb-6 pt-4 shadow-md dark:bg-base-surface-dark'>
      <View className='flex-row items-center gap-x-3'>
        <Image source={isDark ? icons.dark.tickCircle : icons.light.tickCircle} className='size-6' />

        <View className='flex-1 flex-row items-center justify-between'>
          {props.text1 && <Text className='font-manrope-bold text-lg text-success-500'>{props.text1}</Text>}
          <Pressable onPress={() => Toast.hide()} hitSlop={10}>
            <Image source={images.x} className='size-5' tintColor={isDark ? '#667085' : '#98A2B3'} />
          </Pressable>
        </View>
      </View>

      <View className='ml-9'>
        {props.text2 && (
          <Text className='font-manrope-semibold text-neutral-400 dark:text-neutral-500'>{props.text2}</Text>
        )}
      </View>
    </View>
  );
};

export default SuccessToast;
