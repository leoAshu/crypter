import { images } from '@/assets';
import { PrimaryButton } from '@/components';
import { Strings } from '@/constants';
import { router } from 'expo-router';
import { Image, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Verify = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <SafeAreaView className='screen-wrapper bg-card dark:bg-card-info-dark' edges={['top']}>
      <View className='content-wrapper flex items-center px-0'>
        <View className='flex-1 justify-center pt-8'>
          <Image
            source={isDark ? images.greenShieldDark : images.greenShield}
            className='size-72'
            resizeMode='contain'
          />
        </View>

        <View className='flex-1 gap-y-4 bg-base px-4 py-8 dark:bg-base-dark'>
          <Text className='font-clashDisplay-medium text-2xl text-title dark:text-title-dark'>
            {Strings.verify.SCREEN_TITLE}
          </Text>

          <Text className='font-satoshi text-body dark:text-body-dark'>{Strings.verify.SCREEN_SUBTITLE}</Text>
        </View>
      </View>

      <View className='absolute bottom-24 left-0 right-0 px-4'>
        <PrimaryButton title={Strings.verify.CTA_LABEL} onPress={() => router.push('/verify/requirements')} />
      </View>
    </SafeAreaView>
  );
};

export default Verify;
