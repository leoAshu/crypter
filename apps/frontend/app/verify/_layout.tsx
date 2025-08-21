import { AppBar } from '@/components';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

const VerifyLayout = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <Stack
      screenOptions={() => ({
        animation: 'simple_push',
        contentStyle: {
          backgroundColor: isDark ? '#000000' : '#FFFFFF',
        },
        header: () => null,
      })}
    >
      <Stack.Screen name='index' />

      <Stack.Screen name='requirements' options={{ header: () => <AppBar title='Requirements' /> }} />

      <Stack.Screen name='[reqId]' options={{ header: () => <AppBar title='Verification' /> }} />
    </Stack>
  );
};

export default VerifyLayout;
