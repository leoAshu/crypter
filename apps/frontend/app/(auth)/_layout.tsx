import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name='signin' />
      <Stack.Screen name='welcome' />
      <Stack.Screen name='(signup)/index' />
      <Stack.Screen name='(signup)/info' />
    </Stack>
  );
};

export default AuthLayout;
