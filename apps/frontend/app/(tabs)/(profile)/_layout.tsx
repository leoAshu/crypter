import { images } from '@/assets';
import { HeaderActionIcon, HeaderBackAction } from '@/components';
import { Strings } from '@/constants';
import { router, Stack } from 'expo-router';
import { Platform, useColorScheme } from 'react-native';

const ProfileLayout = () => {
  const isDark = useColorScheme() === 'dark';
  const containerStyle = Platform.select({
    ios: 'pl-0 ml-[8px]',
    android: 'pl-0 ml-[8px]',
  });

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
          title: Strings.profile.HEADER_TITLE,
          headerLeft: () => <HeaderBackAction containerStyle={containerStyle} />,
          headerRight: () => (
            <HeaderActionIcon
              icon={images.edit}
              iconStyle='size-5'
              onPress={() => router.push('/(tabs)/(profile)/edit')}
            />
          ),
        }}
      />
      <Stack.Screen
        name='edit'
        options={{
          title: Strings.editProfile.HEADER_TITLE,
          headerLeft: () => <HeaderBackAction containerStyle={containerStyle} />,
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
