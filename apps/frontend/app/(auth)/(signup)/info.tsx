import { images } from '@/assets';
import { InputField, PhoneInputField, PrimaryButton } from '@/components';
import { AlertStrings, Strings } from '@/constants';
import { useAuth, useCountry } from '@/hooks';
import { phoneExists, userNameExists } from '@/supabase';
import {
  formatPhoneNumber,
  trimPhoneNumber,
  validateConfirmPassword,
  validateName,
  validatePassword,
  validatePhone,
} from '@/utils';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUpInfo = () => {
  const { signup, isLoading } = useAuth();
  const { currentCountry } = useCountry();
  const { email } = useLocalSearchParams<{ email: string }>();

  const [profileData, setProfileData] = useState<Partial<Profile>>({
    email,
    phoneCountryId: currentCountry?.id,
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof Profile | 'password' | 'confirmPassword', string>>>({});

  const isError = useMemo(() => Object.values(errors).some((msg) => !!msg?.length), [errors]);

  const handleChange = useCallback(
    (field: keyof Profile | 'password' | 'confirmPassword', value: string) => {
      if (field === 'password') setPassword(value);
      else if (field === 'confirmPassword') setConfirmPassword(value);
      else setProfileData((prev) => ({ ...prev, [field]: value }));

      setErrors((prev) => ({ ...prev, [field]: undefined }));

      if (field === 'password' && confirmPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
      }
    },
    [confirmPassword],
  );

  useEffect(() => {
    if (!profileData.username) return setErrors((prev) => ({ ...prev, username: undefined }));

    const timeout = setTimeout(async () => {
      try {
        const exists = await userNameExists(profileData.username!);
        setErrors((prev) => ({
          ...prev,
          username: exists ? 'Username already taken!' : undefined,
        }));
      } catch (err) {
        console.log(err);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [profileData.username]);

  const validateAllFields = () => {
    const newErrors: typeof errors = {};

    const { firstName, lastName, phone } = profileData;
    const trimmedPhone = trimPhoneNumber(phone ?? '');
    const fNameValidation = validateName(firstName ?? '');
    const lNameValidation = validateName(lastName ?? '');
    const phoneValidation = validatePhone(trimmedPhone);
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation = validateConfirmPassword(password, confirmPassword);

    if (!fNameValidation.isValid) newErrors.firstName = AlertStrings.ERROR.FNAME;
    if (!lNameValidation.isValid) newErrors.lastName = AlertStrings.ERROR.LNAME;
    if (!phoneValidation.isValid) newErrors.phone = phoneValidation.error;
    if (!passwordValidation.isValid) newErrors.password = passwordValidation.error;
    if (!confirmPasswordValidation.isValid) newErrors.confirmPassword = confirmPasswordValidation.error;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async () => {
    const isValid = validateAllFields();
    if (!isValid) return;

    try {
      const phone = trimPhoneNumber(profileData.phone ?? '');
      const exists = await phoneExists(phone);
      setErrors((prev) => ({
        ...prev,
        phone: exists ? 'The phone number is already linked to an existing account!' : undefined,
      }));
      if (exists) throw new Error('The phone number is already linked to an existing account!');

      await signup({ email, password }, { ...profileData, phone });
      router.replace('/welcome');
    } catch (err: any) {
      Alert.alert(AlertStrings.TITLE.ERROR, err.message);
    }
  };

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerClassName='pb-16'>
          <View className='content-wrapper gap-y-2' style={{ height: Dimensions.get('screen').height / 1.3 }}>
            <Image source={images.logo} className='size-24 self-center' resizeMode='contain' />

            <Text className='header-txt text-xl tracking-wider'>{Strings.signupInfo.SCREEN_TITLE}</Text>

            {/* Form */}
            <View className='form-group'>
              <View className='flex-row gap-x-4'>
                <View className='flex-1'>
                  <InputField
                    label={Strings.signupInfo.FNAME_LABEL}
                    value={profileData.firstName}
                    error={errors.firstName}
                    disabled={isLoading}
                    onChangeText={(val) => handleChange('firstName', val)}
                  />
                </View>

                <View className='flex-1'>
                  <InputField
                    label={Strings.signupInfo.LNAME_LABEL}
                    value={profileData.lastName}
                    error={errors.lastName}
                    disabled={isLoading}
                    onChangeText={(val) => handleChange('lastName', val)}
                  />
                </View>
              </View>

              <InputField
                label={Strings.signupInfo.UNAME_LABEL}
                value={profileData.username}
                error={errors.username}
                disabled={isLoading}
                onChangeText={(val) => handleChange('username', val)}
              />

              <PhoneInputField
                label={Strings.signupInfo.PHONE_LABEL}
                number={formatPhoneNumber(profileData.phone ?? '')}
                countryId={profileData.phoneCountryId}
                onChange={(val) => handleChange('phone', val)}
                onSelect={(item) => setProfileData((prev) => ({ ...prev, phoneCountryId: item.id }))}
                // error={errors.phone} // add if your PhoneInputField supports errors
              />

              <InputField
                label={Strings.signupInfo.PASSWORD_LABEL}
                secureTextEntry
                value={password}
                error={errors.password}
                disabled={isLoading}
                onChangeText={(val) => handleChange('password', val)}
              />

              <InputField
                label={Strings.signupInfo.CONFIRM_PASSWORD_LABEL}
                secureTextEntry
                value={confirmPassword}
                error={errors.confirmPassword}
                disabled={isLoading}
                onChangeText={(val) => handleChange('confirmPassword', val)}
              />

              <View className='mt-4'>
                <PrimaryButton
                  title={Strings.signupInfo.BUTTON_LABEL}
                  disabled={isError || isLoading}
                  isLoading={isLoading}
                  onPress={submitForm}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpInfo;
