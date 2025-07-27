import { InitialsAvatar, InputField, PrimaryButton } from '@/components';
import { AlertStrings, Strings } from '@/constants';
import { formatPhoneNumber, getUser, updateUser, validateEmail, validateName, validatePhone } from '@/utils';
import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Edit = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [initialProfileInfo, setInitialProfileInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [profileInfo, setProfileInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        const userProfileInfo = {
          name: userData?.user_metadata?.name || '',
          email: userData?.email || '',
          phone: userData?.user_metadata?.phone || '',
        };
        setProfileInfo(userProfileInfo);
        setInitialProfileInfo(userProfileInfo);
      } catch (err: any) {
        Alert.alert(AlertStrings.TITLE.ERROR, err.message);
      }
    };

    fetchUser();
  }, []);

  const updateInfo = (key: string, value: string) => {
    setProfileInfo((prev) => ({ ...prev, [key]: value }));
  };

  const hasChanged = Object.entries(initialProfileInfo).some(
    ([key, value]) => profileInfo[key as keyof typeof profileInfo] !== value,
  );

  const saveInfo = async () => {
    const { name, email, phone } = profileInfo;
    const nameValidationResult = validateName(name);
    const emailValidationResult = validateEmail(email);
    const phoneValidationResult = validatePhone(phone);

    if (!nameValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, nameValidationResult.error);
    if (!emailValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, emailValidationResult.error);
    if (!phoneValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, phoneValidationResult.error);

    setIsSaving(true);

    try {
      await updateUser({ email: profileInfo.email, name: profileInfo.name, phone: profileInfo.phone });
      Alert.alert(AlertStrings.TITLE.SUCCESS, AlertStrings.MSG.PROFILE_UPDATE_SUCCESS);
    } catch (err: any) {
      Alert.alert(AlertStrings.TITLE.ERROR, err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView className='screen-wrapper'>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View className='content-wrapper mt-20'>
            <View className='items-center'>
              <InitialsAvatar name={initialProfileInfo.name} size='large' />
            </View>

            <View className='form-group mt-4'>
              <InputField
                label={Strings.editProfile.NAME_LABEL}
                value={profileInfo.name}
                disabled={isSaving}
                onChangeText={(value) => updateInfo('name', value)}
              />
              <InputField
                label={Strings.editProfile.EMAIL_LABEL}
                value={profileInfo.email}
                disabled={isSaving}
                onChangeText={(value) => updateInfo('email', value)}
              />
              <InputField
                label={Strings.editProfile.PHONE_LABEL}
                value={formatPhoneNumber(profileInfo.phone)}
                keyboardType='phone-pad'
                disabled={isSaving}
                onChangeText={(value) => updateInfo('phone', value)}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View className='absolute-bottom'>
        <PrimaryButton
          title={Strings.editProfile.SAVE_BTN_TITLE}
          isLoading={isSaving}
          disabled={!hasChanged}
          onPress={saveInfo}
        />
      </View>
    </SafeAreaView>
  );
};

export default Edit;
