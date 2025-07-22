import { images } from '@/assets';
import { IconButton, InputField, PrimaryButton } from '@/components';
import { strings } from '@/constants';
import { validateEmail, validateRequired } from '@/constants/validations';
import { useFormValidation } from '@/hooks';
import { router } from 'expo-router';
import { Image, Pressable, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
  const colorScheme = useColorScheme();

  const { fields, updateField, isFormValid, validateAllFields } = useFormValidation({
    email: {
      validator: validateEmail,
      validateOnChange: true,
    },
    password: {
      validator: (value) => validateRequired(value, 'Password'),
      validateOnChange: false,
    },
  });

  const handleLogin = () => {
    if (validateAllFields()) {
      // Handle successful login
      console.log('Login with:', {
        email: fields.email.value,
        password: fields.password.value,
      });
    }
  };

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
          <InputField
            label={strings.login.EMAIL_LABEL}
            keyboardType='email-address'
            value={fields.email.value}
            onChangeText={(value) => updateField('email', value)}
            error={fields.email.showError ? fields.email.error : ''}
          />
          <InputField
            label={strings.login.PASSWORD_LABEL}
            keyboardType='default'
            secured
            value={fields.password.value}
            onChangeText={(value) => updateField('password', value)}
            error={fields.password.showError ? fields.password.error : ''}
          />
          <PrimaryButton label={strings.login.BUTTON_LABEL} onPress={handleLogin} disabled={!isFormValid} />
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
