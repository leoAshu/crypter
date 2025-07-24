import { useCustomFonts } from '@/hooks';
import { Stack } from 'expo-router';
import './globals.css';

const RootLayout = () => {
  const [fontsLoaded] = useCustomFonts();
  if (!fontsLoaded) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    ></Stack>
  );
};

export default RootLayout;
