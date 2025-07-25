import { PrimaryButton } from '@/components';
import { Strings } from '@/constants';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

const Welcome = () => {
  const { name } = useLocalSearchParams<{ name: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const procced = async () => {
    setIsSubmitting(true);

    try {
      router.replace('/(tabs)');
    } catch (err: any) {
      Alert.alert('Error', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className='content-wrapper' style={{ justifyContent: 'flex-start' }}>
      <View className='welcome-header-wrapper'>
        <Text className='welcome-header-txt'>
          {Strings.welcome.SCREEN_GREETING} {name}! 👋
        </Text>
        <Text className='welcome-header-txt'>{Strings.welcome.SCREEN_TITLE}</Text>
        <Text className='welcome-sub-header-txt'>{Strings.welcome.WELCOME_TEXT}</Text>
      </View>
      <PrimaryButton title={Strings.welcome.BUTTON_LABEL} isLoading={isSubmitting} onPress={procced} />
    </View>
  );
};

export default Welcome;
