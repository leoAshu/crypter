import { router } from 'expo-router';
import { Image, Text, TouchableHighlight, View } from 'react-native';

const MenuOption = (props: MenuOptionProps) => {
  return (
    <TouchableHighlight className='rounded-xl' onPress={() => props.route && router.push(props.route)}>
      <View className='flex-row items-center justify-between rounded-xl bg-card px-6 py-5 dark:bg-card-dark'>
        <Text className='text-lg text-on-surface dark:text-on-surface-dark'>{props.title}</Text>
        {props.rightIcon && (
          <Image source={props.rightIcon} className='size-3' tintColor='#969AA0' resizeMode='contain' />
        )}
      </View>
    </TouchableHighlight>
  );
};

export default MenuOption;
