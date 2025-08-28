import { useAuth, useMarket } from '@/hooks';
import { useAppDataStore } from '@/store';
import { disableFontScaling } from '@/utils/fontScale';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

disableFontScaling();

const Index = () => {
  const { isLoading: isTickerLoading, fetchAllTickers } = useMarket();
  const { isLoading: isAppDataLoading, fetchAppData } = useAppDataStore();
  const { isLoading: isAuthLoading, isAuthenticated, fetchAuthenticatedUser } = useAuth();

  useEffect(() => {
    fetchAppData();
    fetchAuthenticatedUser();
  }, []);

  useEffect(() => {
    if (!isAppDataLoading) {
      fetchAuthenticatedUser();
      fetchAllTickers();
    }
  }, [isAppDataLoading]);

  if (!isAppDataLoading && !isAuthLoading && !isTickerLoading) {
    return <Redirect href={isAuthenticated ? '/(tabs)' : '/signin'} />;
  }

  return (
    <View className='flex-1 items-center justify-center bg-card dark:bg-card-dark'>
      <Text className='text-3xl text-title dark:text-title-dark'>Welcome</Text>
    </View>
  );
};

export default Index;
