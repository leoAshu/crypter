import { PrimaryButton } from '@/components';
import InputField from '@/components/InputField';
import { Strings } from '@/constants';
import { validateConfirmPassword, validateName, validatePassword, validatePhone } from '@/utils';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

const SignUpInfo = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { email } = useLocalSearchParams<{ email: string }>();
  const [form, setForm] = useState({ name: '', email: email, password: '', confirmPassword: '', phone: '' });

  const submitForm = async () => {
    const { name, email, password, confirmPassword, phone } = form;

    const nameValidationResult = validateName(name);
    const phoneValidationResult = validatePhone(phone);
    const passwordValidationResult = validatePassword(password);
    const confirmPasswordValidationresult = validateConfirmPassword(password, confirmPassword);

    if (!nameValidationResult.isValid) return Alert.alert('Error', nameValidationResult.error);
    if (!phoneValidationResult.isValid) return Alert.alert('Error', phoneValidationResult.error);
    if (!passwordValidationResult.isValid) return Alert.alert('Error', passwordValidationResult.error);
    if (!confirmPasswordValidationresult.isValid) return Alert.alert('Error', confirmPasswordValidationresult.error);

    setIsSubmitting(true);

    try {
      router.replace({ pathname: '/welcome', params: { name } });
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className='content-wrapper'>
      <Text className='header-txt'>{Strings.signupInfo.SCREEN_TITLE}</Text>
      {/* Form */}
      <View className='form-group'>
        <InputField
          label={Strings.signupInfo.NAME_LABEL}
          keyboardType='default'
          value={form.name}
          disabled={isSubmitting}
          onChangeText={(value) => setForm((prev) => ({ ...prev, name: value }))}
        />
        <InputField
          label={Strings.signupInfo.EMAIL_LABEL}
          keyboardType='email-address'
          value={form.email}
          disabled={true}
        />
        <InputField
          label={Strings.signupInfo.PHONE_LABEL}
          keyboardType='phone-pad'
          value={form.phone}
          disabled={isSubmitting}
          onChangeText={(value) => setForm((prev) => ({ ...prev, phone: value }))}
        />
        <InputField
          label={Strings.signupInfo.PASSWORD_LABEL}
          secureTextEntry
          value={form.password}
          disabled={isSubmitting}
          onChangeText={(value) => setForm((prev) => ({ ...prev, password: value }))}
        />
        <InputField
          label={Strings.signupInfo.CONFIRM_PASSWORD_LABEL}
          secureTextEntry
          value={form.confirmPassword}
          disabled={isSubmitting}
          onChangeText={(value) => setForm((prev) => ({ ...prev, confirmPassword: value }))}
        />
        <PrimaryButton title={Strings.signupInfo.BUTTON_LABEL} isLoading={isSubmitting} onPress={submitForm} />
      </View>
    </View>
  );
};

export default SignUpInfo;
