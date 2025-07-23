import { images } from '@/assets';
import { IconButton, InputField, PrimaryButton } from '@/components';
import { Strings } from '@/constants';
import { useForm } from '@/hooks';
import { validateEmail, validatePassword } from '@/utils';
import { router } from 'expo-router';
import { Pressable, Text, useColorScheme, View } from 'react-native';

const SignIn = () => {
  const colorScheme = useColorScheme();

  const { fields, updateField, isFormValid, validateAllFields } = useForm({
    email: {
      validator: validateEmail,
      validateOnChange: true,
    },
    password: {
      validator: (value) => validatePassword(value),
      validateOnChange: true,
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
    <View className='content-wrapper'>
      <Text className='header-txt'>{Strings.login.SCREEN_TITLE}</Text>

      {/* Form */}
      <View className='form-group'>
        <InputField
          label={Strings.login.EMAIL_LABEL}
          keyboardType='email-address'
          value={fields.email.value}
          onChangeText={(value) => updateField('email', value)}
          error={fields.email.showError ? fields.email.error : ''}
        />
        <InputField
          label={Strings.login.PASSWORD_LABEL}
          keyboardType='default'
          secured
          value={fields.password.value}
          onChangeText={(value) => updateField('password', value)}
          error={fields.password.showError ? fields.password.error : ''}
        />
        <PrimaryButton title={Strings.login.BUTTON_LABEL} isLoading={false} onPress={handleLogin} />
      </View>

      {/* Socials & Footer */}
      <View className='form-group'>
        <View className='divider-row'>
          <View className='divider-line' />
          <Text className='divider-txt'>{Strings.login.OR_CONTINUE_WITH}</Text>
          <View className='divider-line' />
        </View>
        <View className='social-auth-row'>
          <IconButton icon={images.google} onPress={() => {}} />
          <IconButton icon={images.apple} tintColor={colorScheme === 'dark' ? '#FFF' : '#000'} onPress={() => {}} />
        </View>
        <View className='footer-wrapper'>
          <Text className='footer-txt'>{Strings.login.NO_ACCOUNT_TEXT}</Text>
          <Pressable onPress={() => router.replace('/signup')}>
            <Text className='footer-link'>{Strings.login.SIGNUP_CTA}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
