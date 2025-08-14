import { InitialsAvatar, InputField, PrimaryButton } from '@/components';
import { AlertStrings, Strings } from '@/constants';
import { useAuthStore, useProfileStore } from '@/store';
import { formatPhoneNumber, validateName } from '@/utils';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Edit = () => {
  const { user } = useAuthStore();
  const { isLoading, profile, updateProfile } = useProfileStore();
  const [formData, setFormData] = useState<Partial<Profile>>(profile ?? {});

  const updateInfo = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const hasChanged = Object.entries(profile ?? {}).some(
    ([key, value]) => formData[key as keyof typeof formData] !== value,
  );

  const saveInfo = async () => {
    const { name } = formData;
    const nameValidationResult = validateName(name!);

    if (!nameValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, nameValidationResult.error);

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
              <InitialsAvatar name={profile?.name ?? ''} size='lg' />
            </View>

            <View className='form-group mt-4'>
              <InputField
                label={Strings.editProfile.NAME_LABEL}
                value={formData.name}
                disabled={isLoading}
                onChangeText={(value) => updateInfo('name', value)}
              />

              <InputField label={Strings.editProfile.EMAIL_LABEL} value={user?.user_metadata.email} disabled={true} />

              <InputField
                label={Strings.editProfile.PHONE_LABEL}
                value={formatPhoneNumber(user?.user_metadata.phone)}
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
