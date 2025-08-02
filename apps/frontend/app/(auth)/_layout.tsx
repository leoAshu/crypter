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
      <Stack.Screen name='signin' />
      <Stack.Screen name='welcome' />
      <Stack.Screen name='(signup)/index' />
      <Stack.Screen
        name='(signup)/info'
        options={{
          headerLeft: () => <HeaderBackAction containerStyle={containerStyle} />,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
