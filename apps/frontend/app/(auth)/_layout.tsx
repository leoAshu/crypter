import { images } from '@/assets';
import { Slot } from 'expo-router';
import { Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

const AuthLayout = () => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView className='screen-wrapper' keyboardShouldPersistTaps='handled'>
        <View style={{ height: Dimensions.get('screen').height / 2.5 }}>
          <Image source={images.logo} className='header-logo' resizeMode='contain' />
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthLayout;
