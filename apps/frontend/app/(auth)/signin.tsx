import { images } from '@/assets';
import { IconButton, InputField, PrimaryButton } from '@/components';
import { AlertStrings, defaultProfileInfo, Strings } from '@/constants';
import { signIn, validateEmail, validatePassword } from '@/utils';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const resetForm = () => {
    setForm({ email: '', password: '' });
  };

  const submitForm = async () => {
    const { email, password } = form;
    const emailValidationResult = validateEmail(email);
    const passwordValidationResult = validatePassword(password);

    if (!emailValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, emailValidationResult.error);
    if (!passwordValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, passwordValidationResult.error);

    setIsSubmitting(true);

    try {
      await signIn({ email, password });
      router.replace({ pathname: '/welcome', params: { name: defaultProfileInfo.name } });
    } catch (err: any) {
      Alert.alert(AlertStrings.TITLE.ERROR, err.message);
    } finally {
      setIsSubmitting(false);
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
          value={form.email}
          disabled={isSubmitting}
          onChangeText={(value) => setForm((prev) => ({ ...prev, email: value }))}
        />
        <InputField
          label={Strings.login.PASSWORD_LABEL}
          secureTextEntry
          value={form.password}
          disabled={isSubmitting}
          onChangeText={(value) => setForm((prev) => ({ ...prev, password: value }))}
        />
        <PrimaryButton title={Strings.login.BUTTON_LABEL} isLoading={isSubmitting} onPress={submitForm} />
      </View>

      {/* Socials & Footer */}
      <View className='form-group'>
        <View className='divider-row'>
          <View className='divider-line' />
          <Text className='divider-txt'>{Strings.login.OR_CONTINUE_WITH}</Text>
          <View className='divider-line' />
        </View>
        <View className='social-auth-row'>
          <IconButton icon={images.google} disabled={isSubmitting} onPress={() => {}} />
          <IconButton icon={images.facebook} disabled={isSubmitting} onPress={() => {}} />
        </View>
        <View className='footer-wrapper'>
          <Text className='footer-txt'>{Strings.login.NO_ACCOUNT_TEXT}</Text>
          <Pressable disabled={isSubmitting} onPress={() => router.replace('/signup')}>
            <Text className='footer-link'>{Strings.login.SIGNUP_CTA}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
