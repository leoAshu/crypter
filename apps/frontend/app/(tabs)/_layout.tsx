import { images } from '@/assets';
import { TabBarIcon } from '@/components';
import { useAuthStore } from '@/store';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

const TabLayout = () => {
  // temporary - remove when Signin/Signup integrated with Zustand
  const { fetchAuthenticatedUser } = useAuthStore();
  const isDark = useColorScheme() === 'dark';

  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  return (
    <Tabs
      screenOptions={() => ({
        headerTransparent: true,
        headerTitleAlign: 'center',
        tabBarShowLabel: false,
        headerTitleStyle: {
          color: isDark ? '#FFFFFF' : '#23262F',
          fontWeight: 'semibold',
          fontFamily: 'poppins',
          fontSize: 18,
        },
        tabBarStyle: {
          backgroundColor: isDark ? '#21212E' : '#F4F6F9',
          // backgroundColor: isDark ? '#101018' : '#FFFFFF',
          borderTopWidth: 0,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          marginHorizontal: 20,
          height: 80,
          position: 'absolute',
          bottom: 20,
          elevation: 5,
        },
      })}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={images.home} />,
        }}
      />
      <Tabs.Screen
        name='account'
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={images.account} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
