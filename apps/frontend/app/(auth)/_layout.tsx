import { images } from '@/assets';
import { Slot, usePathname } from 'expo-router';
import { Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

const AuthLayout = () => {
  const pathname = usePathname();
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView className='screen-wrapper' keyboardShouldPersistTaps='handled'>
        <View style={{ height: Dimensions.get('screen').height / (pathname === '/info' ? 3.5 : 2.5) }}>
          <Image source={images.logo} className='header-logo' resizeMode='contain' />
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthLayout;
