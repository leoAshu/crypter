import { images } from '@/assets';
import { FloatingActionTabButton, HeaderActionIcon, TabBarIcon } from '@/components';
import { router, Tabs } from 'expo-router';
import { useColorScheme, View } from 'react-native';

const P2PLayout = () => {
  const isDark = useColorScheme() === 'dark';
  return (
    <View className='flex-1'>
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
            title: 'P2P',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={images.p2p} iconStyle='size-6' />,
            headerLeft: () => (
              <HeaderActionIcon icon={images.arrowLeft} containerStyle='ml-8' onPress={() => router.back()} />
            ),
            headerRight: () => <HeaderActionIcon icon={images.plus} containerStyle='mr-8' />,
          }}
        />
        <Tabs.Screen
          name='myAds'
          options={{
            title: 'My Ads',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={images.ads} iconStyle='size-8' />,
            headerLeft: () => (
              <HeaderActionIcon icon={images.arrowLeft} containerStyle='ml-8' onPress={() => router.back()} />
            ),
            headerRight: () => <HeaderActionIcon icon={images.plus} containerStyle='mr-8' />,
          }}
        />
      </Tabs>

      <View className='absolute-bottom-fab'>
        <FloatingActionTabButton icon={images.plus} onPress={() => {}} />
      </View>
    </View>
  );
};

export default P2PLayout;
