import { images } from '@/assets';
import { IconButton, InputField, PrimaryButton } from '@/components';
import { AlertStrings, Strings } from '@/constants';
import { validateEmail } from '@/utils';
import cn from 'clsx';
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

const Signup = () => {
  const isIOS = Platform.OS === 'ios';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ email: '' });

  const resetForm = () => {
    setFormData({ email: '' });
  };

  const submitForm = async () => {
    const email = formData.email.toLowerCase();
    const emailValidationResult = validateEmail(email);

    if (!emailValidationResult.isValid) return Alert.alert(AlertStrings.TITLE.ERROR, emailValidationResult.error);

    setIsSubmitting(true);

    try {
      router.push({ pathname: '/info', params: { email: email } });
    } catch (err: any) {
      Alert.alert(AlertStrings.TITLE.ERROR, err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className='screen-wrapper'>
      <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={{ height: Dimensions.get('screen').height / 2.8 }}>
            <Image source={images.logo} className='header-logo' resizeMode='contain' />
          </View>

          <View className='content-wrapper gap-y-6'>
            <Text className='header-txt'>{Strings.signup.SCREEN_TITLE}</Text>

            {/* Form */}
            <View className='form-group'>
              <InputField
                label={Strings.signup.EMAIL_LABEL}
                keyboardType='email-address'
                value={formData.email}
                disabled={isSubmitting}
                onChangeText={(value) => setFormData((prev) => ({ ...prev, email: value }))}
              />

              <View className='mt-8'>
                <PrimaryButton
                  title={Strings.signup.BUTTON_LABEL}
                  isLoading={isSubmitting}
                  onPress={submitForm}
                  leftIcon={<Image className='size-4' resizeMode='contain' source={images.mail} tintColor='#333333' />}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Socials & Footer */}
      <View className={cn(isIOS ? 'footer-socials-ios' : 'footer-socials-android')}>
        <View className='divider-row'>
          <View className='divider-line' />
          <Text className='divider-txt'>{Strings.signup.OR_CONTINUE_WITH}</Text>
          <View className='divider-line' />
        </View>

        <View className='social-auth-row'>
          <IconButton icon={images.google} disabled={isSubmitting} onPress={() => {}} />
          <IconButton icon={images.facebook} disabled={isSubmitting} onPress={() => {}} />
        </View>

        <View className='footer-wrapper'>
          <Text className='footer-txt'>{Strings.signup.NO_ACCOUNT_TEXT}</Text>
          <Pressable disabled={isSubmitting} onPress={() => router.replace('/signin')} hitSlop={20}>
            <Text className='footer-link'>{Strings.signup.SIGNIN_CTA}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
