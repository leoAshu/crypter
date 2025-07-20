import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/(auth)');
    }, 1000);
  }, []);

  return (
    <View className='flex-1 justify-center items-center bg-surface dark:bg-surface-dark'>
      <Text className='text-5xl dark:text-white'>Welcome</Text>
    </View>
  );
};

export default Index;
