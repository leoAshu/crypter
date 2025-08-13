import { icons, images } from '@/assets';
import { Image, Pressable, Text, useColorScheme, View } from 'react-native';
import Toast, { BaseToastProps } from 'react-native-toast-message';

const InfoToast = (props: BaseToastProps) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View className='w-[86%] gap-y-2 rounded border-b-2 border-b-info bg-card px-6 pb-6 pt-4 shadow-md dark:bg-card-dark'>
      <View className='flex-row items-center gap-x-3'>
        <Image source={isDark ? icons.dark.infoCircle : icons.light.infoCircle} className='size-6' />

        <View className='flex-1 flex-row items-center justify-between'>
          {props.text1 && <Text className='font-manrope-bold text-sm text-info-500'>{props.text1}</Text>}
          <Pressable onPress={() => Toast.hide()} hitSlop={20}>
            <Image source={images.x} className='size-5' tintColor={isDark ? '#667085' : '#98A2B3'} />
          </Pressable>
        </View>
      </View>

      <View className='ml-9'>
        {props.text2 && (
          <Text className='font-manrope-semibold text-xs text-body dark:text-body-dark'>{props.text2}</Text>
        )}
      </View>
    </View>
  );
};

export default InfoToast;
