import { BackIconButton } from '@/components';
import { Strings } from '@/constants';
import { Stack } from 'expo-router';
import { Platform, useColorScheme } from 'react-native';

const PostLayout = () => {
  const isDark = useColorScheme() === 'dark';
  const containerStyle = Platform.select({
    ios: 'pl-0 ml-[8px]',
    android: 'pl-0 ml-[8px]',
  });

  return (
    <Stack
      screenOptions={{
        animation: 'simple_push',
        contentStyle: {
          backgroundColor: isDark ? '#000000' : '#FFFFFF',
        },
        headerTransparent: true,
        headerStyle: {
          backgroundColor: isDark ? '#000000' : '#FFFFFF',
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: isDark ? '#FFFFFF' : '#000000',
          fontWeight: 'semibold',
          fontFamily: 'poppins',
          fontSize: 14,
        },
      }}
    >
      {/* <Stack.Screen
        name='index'
        options={{
          title: Strings.myAds.HEADER_TITLE,
          headerLeft: () => <BackIconButton containerStyle={containerStyle} />,
          headerRight: () => (
            <HeaderActionIcon
              icon={images.plus}
              iconStyle='size-5'
              onPress={() => router.push('/(p2p)/(advert)/(post)/post')} // Add navigation
            />
          ),
        }}
      /> */}
      <Stack.Screen
        name='index'
        options={{
          title: Strings.postAd.HEADER_TITLE,
          headerLeft: () => <BackIconButton containerStyle={containerStyle} />,
        }}
      />
    </Stack>
  );
};

export default PostLayout;
