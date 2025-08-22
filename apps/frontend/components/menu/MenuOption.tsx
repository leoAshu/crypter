import { icons } from '@/assets';
import { Image, Text, TouchableHighlight, useColorScheme, View } from 'react-native';
import { DividerX } from '../dividers';

const MenuOption = (props: MenuOptionProps) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <>
      <TouchableHighlight underlayColor={isDark ? '#1C1C1C' : '#F1F1F1'} onPress={props.onPress}>
        <View className='flex-row items-center justify-between px-2 py-4'>
          <View className='flex-row items-center gap-x-4'>
            {props.leftIcon && <Image source={props.leftIcon} className='size-6' resizeMode='contain' />}
            <Text className='font-clashDisplay text-sm text-base-dark dark:text-base-white'>{props.title}</Text>
          </View>
          {props.rightIcon ? (
            <Image source={props.rightIcon} className='size-6' resizeMode='contain' />
          ) : (
            <Image
              source={isDark ? icons.dark.arrowRight : icons.light.arrowRight}
              className='size-6'
              resizeMode='contain'
            />
          )}
        </View>
      </TouchableHighlight>
      <DividerX style={isDark ? 'opacity-40' : 'opacity-25'} />
    </>
  );
};

export default MenuOption;
