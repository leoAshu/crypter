import { icons } from '@/assets';
import { router } from 'expo-router';
import { Image, Pressable, useColorScheme, View } from 'react-native';

const BackIconButton = (props: BackIconButtonProps) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View className={props.containerStyle}>
      <Pressable
        hitSlop={20}
        onPress={() => {
          if (props.onPress) return props.onPress();

          if (router.canGoBack()) return router.back();
        }}
      >
        <Image source={isDark ? icons.dark.arrowLeft : icons.light.arrowLeft} className='size-6' resizeMode='contain' />
      </Pressable>
    </View>
  );
};

export default BackIconButton;
