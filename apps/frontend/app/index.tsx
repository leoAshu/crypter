import { useMarket } from '@/hooks';
import { useAuthStore } from '@/store';
import { disableFontScaling } from '@/utils/fontScale';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

disableFontScaling();

const Index = () => {
  const { isLoading, isAuthenticated, fetchAuthenticatedUser } = useAuthStore();
  const { isLoading: isTickerLoading, fetchAllTickers } = useMarket();

  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  useEffect(() => {
    fetchAllTickers();
  }, [isLoading]);

  if (!isLoading && !isTickerLoading) {
    return <Redirect href={isAuthenticated ? '/(tabs)' : '/signin'} />;
  }

  return (
    <View className='flex-1 items-center justify-center bg-card dark:bg-card-dark'>
      <Text className='text-3xl dark:text-white'>Welcome</Text>
    </View>
  );
};

export default Index;
