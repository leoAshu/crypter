import { View, Text, Image, Pressable } from 'react-native';
import { images } from '@/assets';
import { strings } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton, InputField, IconButton } from '@/components';
import { router } from 'expo-router';

const Signup = () => {
  return (
    <View className='flex-1 bg-bg-light dark:bg-bg-dark'>
      <SafeAreaView className='flex-1 px-6'>
        <View className='flex-1 justify-center gap-y-8'>
          {/* Group 1: Logo & Screen Title */}
          <View className='flex gap-y-16'>
            <View className='flex justify-center items-center'>
              <Image source={images.logo} className='size-24' resizeMode='contain' />
            </View>
            <Text className='text-4xl font-heebo-medium dark:text-white'>{strings.signup.SCREEN_TITLE}</Text>
          </View>

          {/* Group 2: Login Fields & Button */}
          <View className='flex gap-y-6'>
            <InputField label={strings.signup.EMAIL_LABEL} keyboardType='email-address' />
            <PrimaryButton label={strings.signup.BUTTON_LABEL} onPress={() => {}} />
          </View>

          {/* Group 3: Alternate Login & Signup */}
          <View className='flex gap-y-6'>
            <View className='flex-row justify-center items-center'>
              <View className='flex-1 h-px rounded-full opacity-35 bg-text-secondary-light dark:bg-text-secondary-dark' />
              <Text className='flex mx-4 text-sm font-poppins-medium text-text-secondary-light dark:text-text-secondary-dark'>
                {strings.signup.OR_CONTINUE_WITH}
              </Text>
              <View className='flex-1 h-px rounded-full opacity-35 bg-text-secondary-light dark:bg-text-secondary-dark' />
            </View>
            <View className='flex-row gap-x-4'>
              <IconButton icon={images.google} onPress={() => {}} />
              <IconButton icon={images.apple} onPress={() => {}} />
            </View>
            <View className='flex-row justify-center gap-x-1'>
              <Text className='text-sm font-poppins-medium dark:text-white'>{strings.signup.NO_ACCOUNT_TEXT}</Text>
              <Pressable onPress={() => router.replace('/(auth)')}>
                <Text className='text-sm text-primary underline'>{strings.signup.SIGNIN_CTA}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Signup;
