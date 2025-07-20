import { View, Text, Image, Pressable, useColorScheme } from 'react-native';
import { images } from '@/assets';
import { strings } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton, InputField, IconButton } from '@/components';
import { router } from 'expo-router';

const Signup = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView className='screen-wrapper'>
      <View className='content-wrapper'>
        {/* Group 1: Header */}
        <View className='header-wrapper'>
          <View className='logo-wrapper'>
            <Image className='header-logo' source={images.logo} resizeMode='contain' />
          </View>
          <Text className='header-txt'>{strings.signup.SCREEN_TITLE}</Text>
        </View>

        {/* Group 2: Signup Fields & Button */}
        <View className='form-group'>
          <InputField label={strings.signup.EMAIL_LABEL} keyboardType='email-address' />
          <PrimaryButton label={strings.signup.BUTTON_LABEL} onPress={() => {}} />
        </View>

        {/* Group 3: Socials Signup & Footer Login */}
        <View className='form-group'>
          <View className='divider-row'>
            <View className='divider-line' />
            <Text className='divider-txt'>{strings.signup.OR_CONTINUE_WITH}</Text>
            <View className='divider-line' />
          </View>
          <View className='social-auth-row'>
            <IconButton icon={images.google} onPress={() => {}} />
            <IconButton icon={images.apple} tintColor={colorScheme === 'dark' ? '#FFF' : '#000'} onPress={() => {}} />
          </View>
          <View className='footer-wrapper'>
            <Text className='footer-txt'>{strings.signup.NO_ACCOUNT_TEXT}</Text>
            <Pressable onPress={() => router.replace('/(auth)')}>
              <Text className='footer-link'>{strings.signup.SIGNIN_CTA}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
