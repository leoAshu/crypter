import { images } from '@/assets';
import { Tabs } from 'expo-router';
import { Image, Platform, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabsLayout = () => {
  const isDark = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        animation: 'shift',
        headerTransparent: true,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: isDark ? '#FFFFFF' : '#23262F',
          fontWeight: 'semibold',
          fontFamily: 'poppins',
          fontSize: 18,
        },
        tabBarStyle: {
          backgroundColor: isDark ? '#21212E' : '#F4F6F9',
          borderTopLeftRadius: 36,
          borderTopRightRadius: 36,
          borderTopWidth: 0,
          elevation: 0,
          height: 96,
          overflow: 'hidden',
          position: 'absolute',
          paddingTop: 12,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 16,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case 'index':
              return <Image source={images.home} className='size-5' tintColor={color} resizeMode='contain' />;
            case 'account':
              return <Image source={images.account} className='size-5' tintColor={color} resizeMode='contain' />;
          }
        },
        tabBarActiveTintColor: '#0066FF',
        tabBarInactiveTintColor: '#B5B9C1',
      })}
    >
      <Tabs.Screen name='index' options={{ title: 'Home' }} />
      <Tabs.Screen name='account' options={{ title: 'Account' }} />
    </Tabs>
  );
};

export default TabsLayout;
