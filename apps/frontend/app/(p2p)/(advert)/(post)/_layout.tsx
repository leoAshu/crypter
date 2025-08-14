import { AppBar } from '@/components';
import { Strings } from '@/constants';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

const PostLayout = () => {
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
          header: () => <AppBar title={Strings.postAd.HEADER_TITLE} />,
        }}
      />

      <Stack.Screen
        name='info'
        options={{
          header: () => <AppBar title={Strings.postAd.HEADER_TITLE_INFO} />,
        }}
      />
    </Stack>
  );
};

export default PostLayout;
