import { images } from '@/assets';
import { InputField, PhoneInputField, PrimaryButton } from '@/components';
import { AlertStrings, Strings } from '@/constants';
import { useAuth, useCountry } from '@/hooks';
import {
  formatPhoneNumber,
  trimPhoneNumber,
  validateConfirmPassword,
  validateName,
  validatePassword,
  validatePhone,
} from '@/utils';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUpInfo = () => {
  const { signup, isLoading } = useAuth();
  const { currentCountry } = useCountry();
  const { email } = useLocalSearchParams<{ email: string }>();

  const [profileData, setProfileData] = useState<Partial<Profile>>({
    email: email,
    phoneCountryId: currentCountry?.id,
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitForm = async () => {
    const { firstName, lastName } = profileData;
    const phone = trimPhoneNumber(profileData.phone ?? '');
    profileData.phone = phone;
    profileData.username = profileData.email?.split('@')[0];

    const fNameValidationResult = validateName(firstName!);
    const lNameValidationResult = validateName(lastName!);

    const phoneValidationResult = validatePhone(phone);
    const passwordValidationResult = validatePassword(password);
    const confirmPasswordValidationresult = validateConfirmPassword(password, confirmPassword);

    if (!fNameValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, AlertStrings.ERROR.FNAME);
    if (!lNameValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, AlertStrings.ERROR.LNAME);
    if (!phoneValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, phoneValidationResult.error);
    if (!passwordValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, passwordValidationResult.error);
    if (!confirmPasswordValidationresult.isValid)
      return Alert.alert(AlertStrings.TITLE.ERROR, confirmPasswordValidationresult.error);

    try {
      await signup({ email, password }, profileData);
      router.replace('/welcome');
    } catch (err: any) {
      Alert.alert(AlertStrings.TITLE.ERROR, err.message);
    }
  };

  return (
    <SafeAreaView className='screen-wrapper'>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={{ height: Dimensions.get('screen').height / 3.8 }}>
            <Image source={images.logo} className='header-logo' resizeMode='contain' />
          </View>

          <View className='content-wrapper gap-y-6'>
            <Text className='header-txt'>{Strings.signupInfo.SCREEN_TITLE}</Text>

            {/* Form */}
            <View className='form-group'>
              <View className='flex-row gap-x-4'>
                <View className='flex-1'>
                  <InputField
                    label={Strings.signupInfo.FNAME_LABEL}
                    keyboardType='default'
                    value={profileData.firstName}
                    disabled={isLoading}
                    onChangeText={(value) => setProfileData((prev) => ({ ...prev, firstName: value }))}
                  />
                </View>

                <View className='flex-1'>
                  <InputField
                    label={Strings.signupInfo.LNAME_LABEL}
                    keyboardType='default'
                    value={profileData.lastName}
                    disabled={isLoading}
                    onChangeText={(value) => setProfileData((prev) => ({ ...prev, lastName: value }))}
                  />
                </View>
              </View>

              <InputField
                label={Strings.signupInfo.EMAIL_LABEL}
                keyboardType='email-address'
                value={profileData.email}
                disabled={true}
              />

              <PhoneInputField
                label={Strings.signupInfo.PHONE_LABEL}
                number={formatPhoneNumber(profileData.phone ?? '')}
                countryId={profileData.phoneCountryId}
                onChange={(value) => setProfileData((prev) => ({ ...prev, phone: value }))}
                onSelect={(item) => setProfileData((prev) => ({ ...prev, phoneCountryId: item.id }))}
              />

              <InputField
                label={Strings.signupInfo.PASSWORD_LABEL}
                secureTextEntry
                value={password}
                disabled={isLoading}
                onChangeText={(value) => setPassword(value)}
              />

              <InputField
                label={Strings.signupInfo.CONFIRM_PASSWORD_LABEL}
                secureTextEntry
                value={confirmPassword}
                disabled={isLoading}
                onChangeText={(value) => setConfirmPassword(value)}
              />

              <View className='mt-4'>
                <PrimaryButton title={Strings.signupInfo.BUTTON_LABEL} isLoading={isLoading} onPress={submitForm} />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpInfo;
