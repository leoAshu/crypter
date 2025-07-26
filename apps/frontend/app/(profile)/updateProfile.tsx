import { PrimaryButton } from '@/components';
import InitialsAvatar from '@/components/InitialsAvatar';
import InputField from '@/components/InputField';
import { validateEmail, validatePassword } from '@/utils';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UpdateProfile = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    name: 'Ashutosh Ojha',
    email: 'ashutosh.ojha2009@gmail.com',
    password: 'password',
    phone: '+16694996135',
  });

  const updateInfo = (key: string, value: string) => {
    setProfileInfo((prev) => ({ ...prev, [key]: value }));
  };

  const saveInfo = async () => {
    const { name, email, password, phone } = profileInfo;
    const emailValidationResult = validateEmail(email);
    const passwordValidationResult = validatePassword(password);

    if (!emailValidationResult.isValid) return Alert.alert('Error', emailValidationResult.error);
    if (!passwordValidationResult.isValid) return Alert.alert('Error', passwordValidationResult.error);

    setIsSaving(true);

    setTimeout(() => {
      try {
        Alert.alert('Success', 'Profile updated successfully!');
      } catch (err: any) {
        Alert.alert('Error', err.message);
      } finally {
        setIsSaving(false);
      }
    }, 5000);
  };

  return (
    <SafeAreaView className='screen-wrapper'>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View className='content-wrapper mt-20'>
            <View className='items-center'>
              <InitialsAvatar name={profileInfo.name} size='large' />
            </View>

            <View className='flex gap-y-8'>
              <InputField
                label='Your Name'
                value={profileInfo.name}
                disabled={isSaving}
                onChangeText={(value) => updateInfo('name', value)}
              />
              <InputField
                label='Email Address'
                value={profileInfo.email}
                disabled={isSaving}
                onChangeText={(value) => updateInfo('email', value)}
              />
              <InputField
                secureTextEntry
                label='Your Password'
                value={profileInfo.password}
                disabled={isSaving}
                onChangeText={(value) => updateInfo('password', value)}
              />
              <InputField
                label='Phone Number'
                value={profileInfo.phone}
                keyboardType='phone-pad'
                disabled={isSaving}
                onChangeText={(value) => updateInfo('phone', value)}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View className='absolute bottom-16 left-0 right-0 px-8'>
        <PrimaryButton title='Save' isLoading={isSaving} onPress={saveInfo} />
      </View>
    </SafeAreaView>
  );
};

export default UpdateProfile;
