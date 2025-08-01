import { images } from '@/assets';
import { IconButton, InputField, PrimaryButton } from '@/components';
import { AlertStrings, Strings } from '@/constants';
import useAuthStore from '@/store/auth.store';
import { validateEmail, validatePassword } from '@/utils';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';

const SignIn = () => {
  const { signin, isLoading, user } = useAuthStore();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const resetForm = () => {
    setFormData({ email: '', password: '' });
  };

  const submitForm = async () => {
    const { email, password } = formData;
    const emailValidationResult = validateEmail(email);
    const passwordValidationResult = validatePassword(password);

    if (!emailValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, emailValidationResult.error);
    if (!passwordValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, passwordValidationResult.error);

    try {
      await signin({ email, password });
      router.replace('/welcome');
    } catch (err: any) {
      Alert.alert(AlertStrings.TITLE.ERROR, err.message);
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
          value={formData.email}
          disabled={isLoading}
          onChangeText={(value) => setFormData((prev) => ({ ...prev, email: value }))}
        />
        <InputField
          label={Strings.login.PASSWORD_LABEL}
          secureTextEntry
          value={formData.password}
          disabled={isLoading}
          onChangeText={(value) => setFormData((prev) => ({ ...prev, password: value }))}
        />
        <PrimaryButton title={Strings.login.BUTTON_LABEL} isLoading={isLoading} onPress={submitForm} />
      </View>

      {/* Socials & Footer */}
      <View className='form-group'>
        <View className='divider-row'>
          <View className='divider-line' />
          <Text className='divider-txt'>{Strings.login.OR_CONTINUE_WITH}</Text>
          <View className='divider-line' />
        </View>
        <View className='social-auth-row'>
          <IconButton icon={images.google} disabled={isLoading} onPress={() => {}} />
          <IconButton icon={images.facebook} disabled={isLoading} onPress={() => {}} />
        </View>
        <View className='footer-wrapper'>
          <Text className='footer-txt'>{Strings.login.NO_ACCOUNT_TEXT}</Text>
          <Pressable disabled={isLoading} onPress={() => router.replace('/(auth)/(signup)')}>
            <Text className='footer-link'>{Strings.login.SIGNUP_CTA}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
