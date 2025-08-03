import toastConfig from '@/components/toasts';
import { useCustomFonts } from '@/hooks';
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import './globals.css';

const RootLayout = () => {
  const [fontsLoaded] = useCustomFonts();
  if (!fontsLoaded) return null;

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <Toast config={toastConfig} />
    </>
  );
};

export default RootLayout;
