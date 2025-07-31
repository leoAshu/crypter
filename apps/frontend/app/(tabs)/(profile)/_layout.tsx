import { images } from '@/assets';
import { HeaderActionIcon } from '@/components';
import { router, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

const ProfileLayout = () => {
  const isDark = useColorScheme() === 'dark';
  return (
    <Stack
      screenOptions={() => ({
        headerTransparent: true,
        headerStyle: {
          backgroundColor: isDark ? '#000000' : '#FFFFFF',
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: isDark ? '#FFFFFF' : '#000000',
          fontWeight: 'semibold',
          fontFamily: 'poppins',
          fontSize: 18,
        },
      })}
    >
      <Stack.Screen
        name='index'
        options={{
          title: 'Profile',
          headerLeft: () => <HeaderActionIcon icon={images.arrowLeft} onPress={() => router.back()} />,
          headerRight: () => (
            <HeaderActionIcon icon={images.edit} iconStyle='size-5' onPress={() => router.push('/(profile)/edit')} />
          ),
        }}
      />
      <Stack.Screen
        name='edit'
        options={{
          title: 'Edit',
          headerLeft: () => <HeaderActionIcon icon={images.arrowLeft} onPress={() => router.back()} />,
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
