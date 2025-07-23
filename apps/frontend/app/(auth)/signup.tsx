import { images } from '@/assets';
import { IconButton, PrimaryButton } from '@/components';
import InputField from '@/components/InputField';
import { Strings } from '@/constants';
import { useForm } from '@/hooks';
import { validateEmail } from '@/utils';
import { router } from 'expo-router';
import { Image, Pressable, Text, useColorScheme, View } from 'react-native';

const Signup = () => {
  const colorScheme = useColorScheme();

  const { fields, updateField, isFormValid, validateAllFields } = useForm({
    email: {
      validator: validateEmail,
      validateOnChange: true,
    },
  });

  const handleSignup = () => {
    if (validateAllFields()) {
      console.log('Signup with email:', fields.email.value);
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
          value={fields.email.value}
          onChangeText={(value) => updateField('email', value)}
          error={fields.email.showError ? fields.email.error : ''}
        />
        <PrimaryButton
          title={Strings.signup.BUTTON_LABEL}
          isLoading={false}
          onPress={handleSignup}
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
          <IconButton icon={images.google} onPress={() => {}} />
          <IconButton icon={images.apple} tintColor={colorScheme === 'dark' ? '#FFF' : '#000'} onPress={() => {}} />
        </View>
        <View className='footer-wrapper'>
          <Text className='footer-txt'>{Strings.signup.NO_ACCOUNT_TEXT}</Text>
          <Pressable onPress={() => router.replace('/signin')}>
            <Text className='footer-link'>{Strings.signup.SIGNIN_CTA}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Signup;
