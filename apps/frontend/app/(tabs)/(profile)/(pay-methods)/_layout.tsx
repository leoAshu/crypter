import { icons } from '@/assets';
import { AppBar, HeaderActionIcon } from '@/components';
import { router, Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

const PayMethodsLayout = () => {
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
          header: () => (
            <AppBar
              title='Pay Methods'
              right={
                <HeaderActionIcon
                  icon={isDark ? icons.dark.addSquare : icons.light.addSquare}
                  onPress={() => router.push('/add-method')}
                />
              }
            />
          ),
        }}
      />

      <Stack.Screen
        name='add-method'
        options={{
          header: () => <AppBar title='New Pay Method' />,
        }}
      />

      <Stack.Screen
        name='details'
        options={{
          header: () => <AppBar title='Details' />,
        }}
      />
    </Stack>
  );
};

export default PayMethodsLayout;
