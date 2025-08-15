import { AppBar } from '@/components';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

const PayMethodsLayout = () => {
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
      <Stack.Screen
        name='index'
        options={{
          header: () => <AppBar title='Pay Methods' />,
        }}
      />
    </Stack>
  );
};

export default PayMethodsLayout;
