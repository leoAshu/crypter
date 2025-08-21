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
    </Stack>
  );
};

export default VerifyLayout;
