import { icons } from '@/assets';
import cn from 'clsx';
import { router } from 'expo-router';
import { Image, Platform, Pressable, useColorScheme, View } from 'react-native';

const HeaderBackAction = (props: HeaderBackActionProps) => {
  const isDark = useColorScheme() === 'dark';
  const containerStyle = Platform.select({
    ios: 'pl-4',
    android: 'pl-4 ml-[-4px]',
  });

  return (
    <View className={cn(containerStyle, props.containerStyle)}>
      <Pressable
        onPress={() => {
          if (props.onPress) return props.onPress();

          if (router.canGoBack()) return router.back();
        }}
      >
        <Image
          source={isDark ? icons.dark.arrowLeft : icons.light.arrowLeft}
          className='size-10'
          resizeMode='contain'
        />
      </Pressable>
    </View>
  );
};

export default HeaderBackAction;
