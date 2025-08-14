import toastConfig from '@/components/toasts';
import { useCustomFonts } from '@/hooks';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import Toast from 'react-native-toast-message';
import './globals.css';

const RootLayout = () => {
  const isDark = useColorScheme() === 'dark';
  const [fontsLoaded] = useCustomFonts();
  if (!fontsLoaded) return null;

  return (
    <>
      <Stack
        screenOptions={{
          animation: 'simple_push',
          contentStyle: {
            backgroundColor: isDark ? '#000000' : '#FFFFFF',
          },
          header: () => null,
        }}
      />
      <Toast config={toastConfig} />
    </>
  );
};

export default RootLayout;
