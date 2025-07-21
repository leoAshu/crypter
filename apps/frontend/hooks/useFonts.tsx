import { useFonts } from 'expo-font';

const useCustomFonts = () => {
  return useFonts({
    'Poppins-Thin': require('@/assets/fonts/Poppins/Poppins-Thin.ttf'),
    'Poppins-ExtraLight': require('@/assets/fonts/Poppins/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('@/assets/fonts/Poppins/Poppins-Light.ttf'),
    'Poppins-Regular': require('@/assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Medium': require('@/assets/fonts/Poppins/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('@/assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('@/assets/fonts/Poppins/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('@/assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
    'Poppins-Black': require('@/assets/fonts/Poppins/Poppins-Black.ttf'),

    'Heebo-Thin': require('@/assets/fonts/Heebo/Heebo-Thin.ttf'),
    'Heebo-ExtraLight': require('@/assets/fonts/Heebo/Heebo-ExtraLight.ttf'),
    'Heebo-Light': require('@/assets/fonts/Heebo/Heebo-Light.ttf'),
    'Heebo-Regular': require('@/assets/fonts/Heebo/Heebo-Regular.ttf'),
    'Heebo-Medium': require('@/assets/fonts/Heebo/Heebo-Medium.ttf'),
    'Heebo-SemiBold': require('@/assets/fonts/Heebo/Heebo-SemiBold.ttf'),
    'Heebo-Bold': require('@/assets/fonts/Heebo/Heebo-Bold.ttf'),
    'Heebo-ExtraBold': require('@/assets/fonts/Heebo/Heebo-ExtraBold.ttf'),
    'Heebo-Black': require('@/assets/fonts/Heebo/Heebo-Black.ttf'),

    'Inter-Thin': require('@/assets/fonts/Inter/Inter_18pt-Thin.ttf'),
    'Inter-ExtraLight': require('@/assets/fonts/Inter/Inter_18pt-ExtraLight.ttf'),
    'Inter-Light': require('@/assets/fonts/Inter/Inter_18pt-Light.ttf'),
    'Inter-Regular': require('@/assets/fonts/Inter/Inter_18pt-Regular.ttf'),
    'Inter-Medium': require('@/assets/fonts/Inter/Inter_18pt-Medium.ttf'),
    'Inter-SemiBold': require('@/assets/fonts/Inter/Inter_18pt-SemiBold.ttf'),
    'Inter-Bold': require('@/assets/fonts/Inter/Inter_18pt-Bold.ttf'),
    'Inter-ExtraBold': require('@/assets/fonts/Inter/Inter_18pt-ExtraBold.ttf'),
    'Inter-Black': require('@/assets/fonts/Inter/Inter_18pt-Black.ttf'),
  });
};

export default useCustomFonts;
