import { InputField, PrimaryButton } from '@/components';
import { AlertStrings, Strings } from '@/constants';
import {
  formatPhoneNumber,
  getUser,
  signUp,
  validateConfirmPassword,
  validateName,
  validatePassword,
  validatePhone,
} from '@/utils';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

const SignUpInfo = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { email } = useLocalSearchParams<{ email: string }>();
  const [formData, setFormData] = useState({ name: '', email: email, password: '', confirmPassword: '', phone: '' });

  const submitForm = async () => {
    const { name, email, password, confirmPassword, phone } = formData;

    const nameValidationResult = validateName(name);
    const phoneValidationResult = validatePhone(phone);
    const passwordValidationResult = validatePassword(password);
    const confirmPasswordValidationresult = validateConfirmPassword(password, confirmPassword);

    if (!nameValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, nameValidationResult.error);
    if (!phoneValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, phoneValidationResult.error);
    if (!passwordValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, passwordValidationResult.error);
    if (!confirmPasswordValidationresult.isValid)
      return Alert.alert(AlertStrings.TITLE.ERROR, confirmPasswordValidationresult.error);

    setIsSubmitting(true);

    try {
      await signUp({ name, phone, email, password });
      const user = await getUser();
      router.replace({ pathname: '/welcome', params: { name: user?.user_metadata.name || '' } });
    } catch (err: any) {
      Alert.alert(AlertStrings.TITLE.ERROR, err.message);
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
          value={formData.name}
          disabled={isSubmitting}
          onChangeText={(value) => setFormData((prev) => ({ ...prev, name: value }))}
        />
        <InputField
          label={Strings.signupInfo.EMAIL_LABEL}
          keyboardType='email-address'
          value={formData.email}
          disabled={true}
        />
        <InputField
          label={Strings.signupInfo.PHONE_LABEL}
          keyboardType='phone-pad'
          value={formatPhoneNumber(formData.phone)}
          disabled={isSubmitting}
          onChangeText={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
        />
        <InputField
          label={Strings.signupInfo.PASSWORD_LABEL}
          secureTextEntry
          value={formData.password}
          disabled={isSubmitting}
          onChangeText={(value) => setFormData((prev) => ({ ...prev, password: value }))}
        />
        <InputField
          label={Strings.signupInfo.CONFIRM_PASSWORD_LABEL}
          secureTextEntry
          value={formData.confirmPassword}
          disabled={isSubmitting}
          onChangeText={(value) => setFormData((prev) => ({ ...prev, confirmPassword: value }))}
        />
        <PrimaryButton title={Strings.signupInfo.BUTTON_LABEL} isLoading={isSubmitting} onPress={submitForm} />
      </View>
    </View>
  );
};

export default SignUpInfo;
