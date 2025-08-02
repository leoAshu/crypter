import { images } from '@/assets';
import { IconButton, InputField, PrimaryButton } from '@/components';
import { AlertStrings, Strings } from '@/constants';
import useAuthStore from '@/store/auth.store';
import { validateEmail, validatePassword } from '@/utils';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
  const { signin, isLoading, user } = useAuthStore();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const resetForm = () => {
    setFormData({ email: '', password: '' });
  };

  const submitForm = async () => {
    const { email, password } = formData;
    const emailValidationResult = validateEmail(email);
    const passwordValidationResult = validatePassword(password);

    if (!emailValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, emailValidationResult.error);
    if (!passwordValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, passwordValidationResult.error);

    try {
      await signin({ email, password });
      router.replace('/welcome');
    } catch (err: any) {
      Alert.alert(AlertStrings.TITLE.ERROR, err.message);
    }
  };

  return (
    <SafeAreaView className='screen-wrapper'>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={{ height: Dimensions.get('screen').height / 2.5 }}>
            <Image source={images.logo} className='header-logo' resizeMode='contain' />
          </View>
          <View className='content-wrapper'>
            <Text className='header-txt'>{Strings.login.SCREEN_TITLE}</Text>

            {/* Form */}
            <View className='form-group'>
              <InputField
                label={Strings.login.EMAIL_LABEL}
                keyboardType='email-address'
                value={formData.email}
                disabled={isLoading}
                onChangeText={(value) => setFormData((prev) => ({ ...prev, email: value }))}
              />
              <InputField
                label={Strings.login.PASSWORD_LABEL}
                secureTextEntry
                value={formData.password}
                disabled={isLoading}
                onChangeText={(value) => setFormData((prev) => ({ ...prev, password: value }))}
              />
              <PrimaryButton title={Strings.login.BUTTON_LABEL} isLoading={isLoading} onPress={submitForm} />
            </View>
          </View>
        </ScrollView>
        {/* Socials & Footer */}
        <View className='footer-socials'>
          <View className='divider-row'>
            <View className='divider-line' />
            <Text className='divider-txt'>{Strings.login.OR_CONTINUE_WITH}</Text>
            <View className='divider-line' />
          </View>
          <View className='social-auth-row'>
            <IconButton icon={images.google} disabled={isLoading} onPress={() => {}} />
            <IconButton icon={images.facebook} disabled={isLoading} onPress={() => {}} />
          </View>
          <View className='footer-wrapper'>
            <Text className='footer-txt'>{Strings.login.NO_ACCOUNT_TEXT}</Text>
            <Pressable disabled={isLoading} onPress={() => router.replace('/(auth)/(signup)')}>
              <Text className='footer-link'>{Strings.login.SIGNUP_CTA}</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
