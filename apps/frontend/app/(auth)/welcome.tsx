import { PrimaryButton } from '@/components';
import { AlertStrings, Strings } from '@/constants';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

const Welcome = () => {
  const { name } = useLocalSearchParams<{ name: string }>();
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
    <View className='content-wrapper'>
      <View className='welcome-header-wrapper'>
        <Text className='welcome-header-txt'>
          {Strings.welcome.SCREEN_GREETING} {name.split(' ')[0]}! 👋
        </Text>
        <Text className='welcome-header-txt'>{Strings.welcome.SCREEN_TITLE}</Text>
        <Text className='welcome-sub-header-txt'>{Strings.welcome.WELCOME_TEXT}</Text>
      </View>
      <PrimaryButton title={Strings.welcome.BUTTON_LABEL} isLoading={isSubmitting} onPress={proceed} />
    </View>
  );
};

export default Welcome;
