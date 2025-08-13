import { router } from 'expo-router';
import { Image, Pressable, Text, useColorScheme, View } from 'react-native';

const NavCard = (props: NavCardProps) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <Pressable onPress={() => props.navRoute.route && router.push(props.navRoute.route)}>
      <View className='elevation flex w-24 items-center justify-center gap-y-4 rounded-md bg-card px-2 py-4 dark:bg-card-info-dark'>
        {props.navRoute.icon && (
          <Image
            source={isDark ? props.navRoute.icon['dark'] : props.navRoute.icon['light']}
            className='size-6'
            resizeMode='contain'
          />
        )}

        {props.navRoute.title && (
          <Text className='font-manrope-medium text-[10px] text-label dark:text-label-dark'>
            {props.navRoute.title}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default NavCard;
