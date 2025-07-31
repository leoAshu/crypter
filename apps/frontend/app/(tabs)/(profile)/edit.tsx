import { InitialsAvatar, InputField, PrimaryButton } from '@/components';
import { AlertStrings, Strings } from '@/constants';
import { useAuthStore } from '@/store';
import { formatPhoneNumber, validateEmail, validateName, validatePhone } from '@/utils';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Edit = () => {
  const { isLoading, user, updateProfile: updateUserProfile } = useAuthStore();
  const [formData, setFormData] = useState<UpdateUserParams>(user?.user_metadata);

  const updateInfo = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const hasChanged = Object.entries(user?.user_metadata).some(
    ([key, value]) => formData[key as keyof typeof formData] !== value,
  );

  const saveInfo = async () => {
    const { name, email, phone } = formData;
    const nameValidationResult = validateName(name);
    const emailValidationResult = validateEmail(email);
    const phoneValidationResult = validatePhone(phone);

    if (!nameValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, nameValidationResult.error);
    if (!emailValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, emailValidationResult.error);
    if (!phoneValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, phoneValidationResult.error);

    try {
      await updateUserProfile(formData);
      Alert.alert(AlertStrings.TITLE.SUCCESS, AlertStrings.MSG.PROFILE_UPDATE_SUCCESS);
    } catch (err: any) {
      Alert.alert(AlertStrings.TITLE.ERROR, err.message);
    }
  };

  return (
    <SafeAreaView className='screen-wrapper'>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View className='content-wrapper mt-20'>
            <View className='items-center'>
              <InitialsAvatar name={user?.user_metadata.name} size='lg' />
            </View>

            <View className='form-group mt-4'>
              <InputField
                label={Strings.editProfile.NAME_LABEL}
                value={formData.name}
                disabled={isLoading}
                onChangeText={(value) => updateInfo('name', value)}
              />
              <InputField
                label={Strings.editProfile.EMAIL_LABEL}
                value={formData.email}
                disabled={isLoading}
                onChangeText={(value) => updateInfo('email', value)}
              />
              <InputField
                label={Strings.editProfile.PHONE_LABEL}
                value={formatPhoneNumber(formData.phone)}
                keyboardType='phone-pad'
                disabled={isLoading}
                onChangeText={(value) => updateInfo('phone', value)}
              />
              <PrimaryButton
                title={Strings.editProfile.SAVE_BTN_TITLE}
                isLoading={isLoading}
                disabled={!hasChanged}
                onPress={saveInfo}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Edit;
