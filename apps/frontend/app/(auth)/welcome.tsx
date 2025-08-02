import { images } from '@/assets';
import { PrimaryButton } from '@/components';
import { AlertStrings, Strings } from '@/constants';
import { useAuthStore } from '@/store';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Dimensions, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Welcome = () => {
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const proceed = async () => {
    setIsSubmitting(true);

    try {
      router.replace('/(tabs)');
    } catch (err: any) {
      Alert.alert(AlertStrings.TITLE.ERROR, err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className='screen-wrapper'>
      <View style={{ height: Dimensions.get('screen').height / 2.5 }}>
        <Image source={images.logo} className='header-logo' resizeMode='contain' />
      </View>

      <View className='content-wrapper'>
        <View className='welcome-header-wrapper'>
          <Text className='welcome-header-txt'>
            {Strings.welcome.SCREEN_GREETING} {user?.user_metadata.name.split(' ')[0]}! 👋
          </Text>
          <Text className='welcome-header-txt'>{Strings.welcome.SCREEN_TITLE}</Text>
          <Text className='welcome-sub-header-txt'>{Strings.welcome.WELCOME_TEXT}</Text>
        </View>
      </View>
      <View className='footer-socials'>
        <PrimaryButton title={Strings.welcome.BUTTON_LABEL} isLoading={isSubmitting} onPress={proceed} />
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
