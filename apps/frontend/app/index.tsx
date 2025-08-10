import { useAuthStore } from '@/store';
import { disableFontScaling } from '@/utils/fontScale';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

// clampFontScaling(0, 0);
disableFontScaling();

const Index = () => {
  const { isLoading, isAuthenticated, fetchAuthenticatedUser } = useAuthStore();

  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  if (!isLoading) {
    return <Redirect href={isAuthenticated ? '/(tabs)' : '/signin'} />;
  }

  return (
    <View className='flex-1 items-center justify-center bg-surface dark:bg-surface-dark'>
      <Text className='text-5xl dark:text-white'>Welcome</Text>
    </View>
  );
};

export default Index;
