import { HeaderBackAction } from '@/components';
import { Stack } from 'expo-router';
import { Platform, useColorScheme } from 'react-native';

const AuthLayout = () => {
  const isDark = useColorScheme() === 'dark';
  const containerStyle = Platform.select({
    ios: 'pl-0 ml-[8px]',
    android: 'pl-0 ml-[8px]',
  });
  return (
    <Stack
      screenOptions={() => ({
        headerTransparent: true,
        headerStyle: {
          backgroundColor: isDark ? '#000000' : '#FFFFFF',
        },
      })}
    >
      <Stack.Screen name='signin' options={{ headerShown: false }} />
      <Stack.Screen name='welcome' options={{ headerShown: false }} />
      <Stack.Screen name='(signup)/index' options={{ headerShown: false }} />
      <Stack.Screen
        name='(signup)/info'
        options={{
          headerTitle: '',
          headerLeft: () => <HeaderBackAction containerStyle={containerStyle} />,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
