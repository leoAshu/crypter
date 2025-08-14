import { icons } from '@/assets';
import { AppBar, HeaderActionIcon } from '@/components';
import { Strings } from '@/constants';
import { router, Stack } from 'expo-router';
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
        header: () => null,
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          header: () => (
            <AppBar
              title={Strings.myAds.HEADER_TITLE}
              right={
                <HeaderActionIcon
                  icon={isDark ? icons.dark.addSquare : icons.light.addSquare}
                  iconStyle='size-6'
                  onPress={() => router.push('/(p2p)/(advert)/(post)')}
                />
              }
            />
          ),
        }}
      />
      <Stack.Screen
        name='(post)'
        options={{
          headerShown: false,
          title: Strings.postAd.HEADER_TITLE,
        }}
      />
    </Stack>
  );
};

export default AdvertLayout;
