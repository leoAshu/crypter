import { AppBar } from '@/components';
import { Stack } from 'expo-router';
import { Platform, useColorScheme } from 'react-native';

const AddFundsLayout = () => {
  const isDark = useColorScheme() === 'dark';
  const containerStyle = Platform.select({
    ios: 'pl-0 ml-[8px]',
    android: 'pl-0 ml-[8px]',
  });
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
          header: () => <AppBar title='Deposit Asset' />,
        }}
      />
    </Stack>
  );
};

export default AddFundsLayout;
