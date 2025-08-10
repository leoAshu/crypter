import { icons } from '@/assets';
import { FloatingActionButton, TabBarIcon } from '@/components';
import { Strings } from '@/constants';
import cn from 'clsx';
import { LinearGradient } from 'expo-linear-gradient';
import { router, Tabs } from 'expo-router';
import { Platform, useColorScheme, View } from 'react-native';

const TabLayout = () => {
  const isDark = useColorScheme() === 'dark';
  const isIOS = Platform.OS === 'ios';

  return (
    <View className='flex-1'>
      <Tabs
        screenOptions={() => ({
          animation: 'shift',
          headerTransparent: true,
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          headerTitleStyle: {
            color: isDark ? '#FFFFFF' : '#000000',
            fontWeight: 'semibold',
            fontFamily: 'poppins',
            fontSize: 14,
          },
          tabBarStyle: {
            backgroundColor: isDark ? '#000000' : '#FFFFFF',
            borderTopWidth: 0,
            height: isIOS ? 96 : 104,
            position: 'absolute',
            bottom: 0,
            // elevation: 0,
            shadowColor: isDark ? '#FFFFFF' : '#000000', // iOS shadow
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.12,
            shadowRadius: 16,
          },
          sceneStyle: {
            backgroundColor: isDark ? '#000000' : '#FFFFFF',
          },
        })}
      >
        <Tabs.Screen
          name='index'
          options={{
            title: Strings.home.HEADER_TITLE,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                title={Strings.home.TAB_TITLE}
                icon={
                  isDark
                    ? focused
                      ? icons.dark.active.home
                      : icons.dark.inactive.home
                    : focused
                      ? icons.light.active.home
                      : icons.light.inactive.home
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name='(profile)'
          options={{
            title: Strings.profile.HEADER_TITLE,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                title={Strings.profile.TAB_TITLE}
                icon={
                  isDark
                    ? focused
                      ? icons.dark.active.user
                      : icons.dark.inactive.user
                    : focused
                      ? icons.light.active.user
                      : icons.light.inactive.user
                }
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
            bottom: 104, // height of tab bar
            left: 0,
            right: 0,
            height: 28,
            zIndex: 5,
          }}
        />
      )}

      <View className={cn('absolute-bottom-fab', isIOS ? 'bottom-[66px]' : 'bottom-[76px]')}>
        <FloatingActionButton icon={icons.exchange} onPress={() => router.push('/(p2p)')} />
      </View>
    </View>
  );
};

export default TabLayout;
