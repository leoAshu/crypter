import { InitialsAvatar, PhoneInputField, PrimaryButton, SecondaryInputField } from '@/components';
import { AlertStrings, Strings } from '@/constants';
import { useProfile } from '@/hooks';
import { useAuthStore } from '@/store';
import { validateName } from '@/utils';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Edit = () => {
  const { user } = useAuthStore();
  const { isLoading, profile, updateProfile } = useProfile();

  const [formData, setFormData] = useState<Partial<Profile>>(profile ?? {});

  const updateInfo = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const hasChanged = Object.entries(profile ?? {}).some(
    ([key, value]) => formData[key as keyof typeof formData] !== value,
  );

  const saveInfo = async () => {
    const { firstName, lastName } = formData;
    const fNameValidationResult = validateName(firstName!);
    const lNameValidationResult = validateName(lastName!);

    if (!fNameValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, AlertStrings.ERROR.FNAME);
    if (!lNameValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, AlertStrings.ERROR.LNAME);

    try {
      await updateProfile(user?.id, formData);
      Alert.alert(AlertStrings.TITLE.SUCCESS, AlertStrings.MSG.PROFILE_UPDATE_SUCCESS);
    } catch (err: any) {
      Alert.alert(AlertStrings.TITLE.ERROR, err.message);
    }
  };

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View className='content-wrapper mt-4'>
            <View className='items-center'>
              <InitialsAvatar name={profile?.firstName ?? ''} size='lg' />
            </View>

            <View className='form-group mt-4'>
              <View className='flex-row gap-x-4'>
                <SecondaryInputField
                  containerStyle='flex-1'
                  label={Strings.editProfile.FNAME_LABEL}
                  value={formData.firstName}
                  disabled={isLoading}
                  onChangeText={(value) => updateInfo('firstName', value)}
                />

                <SecondaryInputField
                  containerStyle='flex-1'
                  label={Strings.editProfile.LNAME_LABEL}
                  value={formData.lastName}
                  disabled={isLoading}
                  onChangeText={(value) => updateInfo('lastName', value)}
                />
              </View>

              <SecondaryInputField label={Strings.editProfile.EMAIL_LABEL} value={formData.email} disabled={true} />

              <PhoneInputField
                label={Strings.editProfile.PHONE_LABEL}
                countryId={formData.phoneCountryId}
                number={formData.phone}
                disabled={true}
              />

              <View className='mt-4'>
                <PrimaryButton
                  title={Strings.editProfile.SAVE_BTN_TITLE}
                  isLoading={isLoading}
                  disabled={!hasChanged}
                  onPress={saveInfo}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Edit;
