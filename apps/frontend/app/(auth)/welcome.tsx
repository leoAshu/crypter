import { images } from '@/assets';
import { PrimaryButton } from '@/components';
import { Strings } from '@/constants';
import { useProfileStore } from '@/store';
import { router } from 'expo-router';
import { Dimensions, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Welcome = () => {
  const { profile } = useProfileStore();

  return (
    <SafeAreaView className='screen-wrapper'>
      <View style={{ height: Dimensions.get('screen').height / 2.5 }}>
        <Image source={images.logo} className='header-logo' resizeMode='contain' />
      </View>

      <View className='content-wrapper'>
        <View className='welcome-header-wrapper'>
          <View className=''>
            <Text className='welcome-header-txt'>
              {Strings.welcome.SCREEN_GREETING} {(profile?.name ?? '').split(' ')[0]}
              {'  '}👋
            </Text>

            <Text className='welcome-sub-header-txt'>{Strings.welcome.SCREEN_TITLE}</Text>
            <Text className='welcome-body-txt'>{Strings.welcome.WELCOME_TEXT}</Text>
          </View>
        </View>
      </View>

      <View className='absolute-bottom-cta'>
        <PrimaryButton title={Strings.welcome.BUTTON_LABEL} onPress={() => router.replace('/(tabs)')} />
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
