import { icons, images } from '@/assets';
import { BackIconButton, HeaderActionIcon, TabBarIcon } from '@/components';
import { Strings } from '@/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { router, Tabs, useSegments } from 'expo-router';
import { Platform, useColorScheme, View } from 'react-native';

const P2PLayout = () => {
  const isDark = useColorScheme() === 'dark';
  const isIOS = Platform.OS === 'ios';
  const segments = useSegments();
  const isPostRoute = (segments as string[]).includes('post');

  return (
    <View className='flex-1'>
      <Tabs
        screenOptions={() => ({
          animation: 'none',
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
            backgroundColor: isDark ? '#000000' : '#FFFFFF',
            borderTopWidth: 0,
            height: 96,
            position: 'absolute',
            bottom: 0,
            // elevation: 0,
            shadowColor: isDark ? '#FFFFFF' : '#000000', // iOS shadow
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.12,
            shadowRadius: 16,
          },
        })}
      >
        <Tabs.Screen
          name='index'
          options={{
            title: Strings.p2p.HEADER_TITLE,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                title={Strings.p2p.TAB_TITLE}
                icon={
                  isDark
                    ? focused
                      ? icons.dark.active.p2p
                      : icons.dark.inactive.p2p
                    : focused
                      ? icons.light.active.p2p
                      : icons.light.inactive.p2p
                }
              />
            ),
            headerLeft: () => <BackIconButton />,
          }}
        />

        <Tabs.Screen
          name='orders'
          options={{
            title: Strings.orders.HEADER_TITLE,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                title={Strings.orders.TAB_TITLE}
                icon={
                  isDark
                    ? focused
                      ? icons.dark.active.receipt
                      : icons.dark.inactive.receipt
                    : focused
                      ? icons.light.active.receipt
                      : icons.light.inactive.receipt
                }
              />
            ),
            headerLeft: () => <BackIconButton />,
          }}
        />

        <Tabs.Screen
          name='(advert)'
          options={{
            title: isPostRoute ? Strings.postAd.HEADER_TITLE : Strings.myAds.HEADER_TITLE,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                title={Strings.myAds.TAB_TITLE}
                icon={
                  isDark
                    ? focused
                      ? icons.dark.active.subtitle
                      : icons.dark.inactive.subtitle
                    : focused
                      ? icons.light.active.subtitle
                      : icons.light.inactive.subtitle
                }
              />
            ),
            headerLeft: () => <BackIconButton />,
            headerRight: () => (
              <HeaderActionIcon
                icon={images.plus}
                containerStyle='mr-8'
                onPress={() => router.push('/(p2p)/(advert)/post')} // Add navigation
              />
            ),
          }}
        />
      </Tabs>

      {/* Android Shadow */}
      {!isIOS && (
        <LinearGradient
          colors={
            isDark ? ['rgba(0, 0, 0, 0.0)', 'rgba(255, 255, 255, 0.08)'] : ['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.08)']
          }
          style={{
            position: 'absolute',
            bottom: 96, // height of tab bar
            left: 0,
            right: 0,
            height: 20,
            zIndex: 5,
          }}
        />
      )}
    </View>
  );
};

export default P2PLayout;
