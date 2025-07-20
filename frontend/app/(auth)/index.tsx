import { View, Text, Image, Pressable } from 'react-native';
import { images } from '@/assets';
import { strings } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton, InputField, IconButton } from '@/components';
import { router } from 'expo-router';
import { useColorScheme } from 'react-native';

const Login = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView className='screen-wrapper'>
      <View className='content-wrapper'>
        {/* Group 1: Header */}
        <View className='header-wrapper'>
          <View className='logo-wrapper'>
            <Image className='header-logo' source={images.logo} resizeMode='contain' />
          </View>
          <Text className='header-txt'>{strings.login.SCREEN_TITLE}</Text>
        </View>

        {/* Group 2: Login Form */}
        <View className='form-group'>
          <InputField label={strings.login.EMAIL_LABEL} keyboardType='email-address' />
          <InputField label={strings.login.PASSWORD_LABEL} keyboardType='default' secured />
          <PrimaryButton label={strings.login.BUTTON_LABEL} onPress={() => {}} />
        </View>

        {/* Group 3: Socials Login & Footer Signup */}
        <View className='form-group'>
          <View className='divider-row'>
            <View className='divider-line' />
            <Text className='divider-txt'>{strings.login.OR_CONTINUE_WITH}</Text>
            <View className='divider-line' />
          </View>
          <View className='social-auth-row'>
            <IconButton icon={images.google} onPress={() => {}} />
            <IconButton icon={images.apple} tintColor={colorScheme === 'dark' ? '#FFF' : '#000'} onPress={() => {}} />
          </View>
          <View className='footer-wrapper'>
            <Text className='footer-txt'>{strings.login.NO_ACCOUNT_TEXT}</Text>
            <Pressable onPress={() => router.replace('/signup')}>
              <Text className='footer-link'>{strings.login.SIGNUP_CTA}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
