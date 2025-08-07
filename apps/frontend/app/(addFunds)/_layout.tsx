import { BackIconButton } from '@/components';
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
        headerTransparent: true,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: isDark ? '#FFFFFF' : '#23262F',
          fontWeight: 'semibold',
          fontFamily: 'poppins',
          fontSize: 18,
        },
      })}
    >
      <Stack.Screen
        name='index'
        options={{
          headerTitle: 'Deposit Asset',
          headerLeft: () => <BackIconButton containerStyle={containerStyle} />,
        }}
      />
    </Stack>
  );
};

export default AddFundsLayout;
