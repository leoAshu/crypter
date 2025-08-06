import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

const AdvertLayout = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <Stack
      screenOptions={{
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
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='post'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AdvertLayout;
