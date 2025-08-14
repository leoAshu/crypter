import { useAuth, useMarket } from '@/hooks';
import { disableFontScaling } from '@/utils/fontScale';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

disableFontScaling();

const Index = () => {
  const { isLoading: isTickerLoading, fetchAllTickers } = useMarket();
  const { isLoading, isAuthenticated, fetchAuthenticatedUser } = useAuth();

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
      <Text className='text-3xl text-title dark:text-title-dark'>Welcome</Text>
    </View>
  );
};

export default Index;
