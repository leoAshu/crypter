import { router } from 'expo-router';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { DividerX } from '../dividers';

const MenuOption = (props: MenuOptionProps) => {
  return (
    <View className='mb-4'>
      <TouchableHighlight onPress={() => props.route && router.push(props.route)}>
        <View className='flex-row items-center justify-between bg-base-white px-2 py-4 dark:bg-base-black'>
          <View className='flex-row items-center gap-x-4'>
            {props.leftIcon && <Image source={props.leftIcon} className='size-8' resizeMode='contain' />}
            <Text className='font-clash-display text-lg text-base-black dark:text-base-white'>{props.title}</Text>
          </View>
          {props.rightIcon && <Image source={props.rightIcon} className='size-8' resizeMode='contain' />}
        </View>
      </TouchableHighlight>
      <DividerX />
    </View>
  );
};

export default MenuOption;
