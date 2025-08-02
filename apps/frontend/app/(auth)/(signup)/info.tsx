import { images } from '@/assets';
import { InputField, PrimaryButton } from '@/components';
import { AlertStrings, Strings } from '@/constants';
import useAuthStore from '@/store/auth.store';
import { formatPhoneNumber, validateConfirmPassword, validateName, validatePassword, validatePhone } from '@/utils';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUpInfo = () => {
  const { signup, isLoading } = useAuthStore();
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

    try {
      await signup({ name, phone, email, password });
      router.replace({ pathname: '/welcome', params: { name } });
    } catch (err: any) {
      Alert.alert(AlertStrings.TITLE.ERROR, err.message);
    }
  };

  return (
    <SafeAreaView className='screen-wrapper'>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={{ height: Dimensions.get('screen').height / 3.5 }}>
            <Image source={images.logo} className='header-logo' resizeMode='contain' />
          </View>

          <View className='content-wrapper'>
            <Text className='header-txt'>{Strings.signupInfo.SCREEN_TITLE}</Text>
            {/* Form */}
            <View className='form-group'>
              <InputField
                label={Strings.signupInfo.NAME_LABEL}
                keyboardType='default'
                value={formData.name}
                disabled={isLoading}
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
                disabled={isLoading}
                onChangeText={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
              />
              <InputField
                label={Strings.signupInfo.PASSWORD_LABEL}
                secureTextEntry
                value={formData.password}
                disabled={isLoading}
                onChangeText={(value) => setFormData((prev) => ({ ...prev, password: value }))}
              />
              <InputField
                label={Strings.signupInfo.CONFIRM_PASSWORD_LABEL}
                secureTextEntry
                value={formData.confirmPassword}
                disabled={isLoading}
                onChangeText={(value) => setFormData((prev) => ({ ...prev, confirmPassword: value }))}
              />
            </View>
          </View>
        </ScrollView>
        <View className='footer-socials'>
          <PrimaryButton title={Strings.signupInfo.BUTTON_LABEL} isLoading={isLoading} onPress={submitForm} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpInfo;
