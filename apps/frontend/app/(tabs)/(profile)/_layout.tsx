import { images } from '@/assets';
import { AppBar, HeaderActionIcon } from '@/components';
import { Strings } from '@/constants';
import { router, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

const ProfileLayout = () => {
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
      <Stack.Screen
        name='index'
        options={{
          title: Strings.profile.HEADER_TITLE,
          header: () => (
            <AppBar
              title={Strings.profile.HEADER_TITLE}
              right={
                <HeaderActionIcon
                  icon={images.edit}
                  iconStyle='size-4'
                  onPress={() => router.push('/(tabs)/(profile)/edit')}
                />
              }
            />
          ),
        }}
      />

      <Stack.Screen
        name='edit'
        options={{
          title: Strings.editProfile.HEADER_TITLE,
          header: () => <AppBar title={Strings.editProfile.HEADER_TITLE} />,
        }}
      />

      <Stack.Screen
        name='stats'
        options={{
          title: Strings.stats.HEADER_TITLE,
          header: () => <AppBar title={Strings.stats.HEADER_TITLE} />,
        }}
      />

      <Stack.Screen
        name='feedback'
        options={{
          title: Strings.feedback.HEADER_TITLE,
          header: () => <AppBar title={Strings.feedback.HEADER_TITLE} />,
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
