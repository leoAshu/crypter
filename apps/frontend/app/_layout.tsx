import { Stack } from 'expo-router';
import './globals.css';
import { useCustomFonts } from '@/hooks';

const RootLayout = () => {
  const [fontsLoaded] = useCustomFonts();
  if (!fontsLoaded) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='index' />
    </Stack>
  );
};

export default RootLayout;
