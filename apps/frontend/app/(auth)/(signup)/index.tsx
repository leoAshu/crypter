import { images } from '@/assets';
import { IconButton, InputField, PrimaryButton } from '@/components';
import { AlertStrings, Strings } from '@/constants';
import { validateEmail } from '@/utils';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, Text, View } from 'react-native';

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ email: '' });

  const resetForm = () => {
    setFormData({ email: '' });
  };

  const submitForm = async () => {
    const { email } = formData;
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
    <View className='content-wrapper'>
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
        <PrimaryButton
          title={Strings.signup.BUTTON_LABEL}
          isLoading={isSubmitting}
          onPress={submitForm}
          leftIcon={<Image className='size-4' resizeMode='contain' source={images.mail}></Image>}
        />
      </View>

      {/* Socials & Footer */}
      <View className='form-group'>
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
          <Pressable disabled={isSubmitting} onPress={() => router.replace('/signin')}>
            <Text className='footer-link'>{Strings.signup.SIGNIN_CTA}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Signup;
