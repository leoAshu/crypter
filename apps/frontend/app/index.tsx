import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/(profile)');
    }, 1000);
  }, []);

  return (
    <View className='flex-1 items-center justify-center bg-surface dark:bg-surface-dark'>
      <Text className='text-5xl dark:text-white'>Welcome</Text>
    </View>
  );
};

export default Index;
