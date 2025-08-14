import { icons } from '@/assets';
import { AccountInfo, DividerX, MenuOption, SecondaryButton, ToggleButton } from '@/components';
import { AlertStrings, Strings } from '@/constants';
import { useStats } from '@/hooks';
import { useAuthStore, useProfileStore } from '@/store';
import cn from 'clsx';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const isDark = useColorScheme() === 'dark';

  const { stats } = useStats();
  const { statsTypeFilterItems } = useStats();
  const { profile } = useProfileStore();
  const { isLoading, signout } = useAuthStore();

  const [statsType, setStatsTypeFilter] = useState<FilterItem>(statsTypeFilterItems[0]);

  const confirmLogout = async () => {
    Alert.alert(AlertStrings.TITLE.LOGOUT, AlertStrings.MSG.CONFIRM_LOGOUT, [
      { text: AlertStrings.ACTION.CANCEL, style: 'cancel' },
      {
        text: AlertStrings.ACTION.LOGOUT,
        style: 'destructive',
        onPress: async () => {
          try {
            await signout();
            router.replace('/signin');
          } catch (err: any) {
            Alert.alert(AlertStrings.TITLE.ERROR, err.message);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <ScrollView>
        <View className='content-wrapper mt-4 pb-28'>
          <AccountInfo name={profile?.name ?? ''} username={profile?.name ?? ''} />

          <DividerX />

          <View className='profile-stats gap-y-6'>
            {/* Stats Header */}
            <View className='stats-header flex-row items-center justify-between'>
              <Text className='font-clashDisplay text-base-dark dark:text-base-white'>
                {Strings.profile.TRADING_STATS_TITLE}
              </Text>

              <ToggleButton
                value={statsType}
                items={[statsTypeFilterItems[0], statsTypeFilterItems[1]]}
                activeButtonColors={{
                  [statsTypeFilterItems[0].id]: 'bg-primary',
                  [statsTypeFilterItems[1].id]: 'bg-primary',
                }}
                activeLabelColors={{
                  [statsTypeFilterItems[0].id]: 'text-base-dark',
                  [statsTypeFilterItems[1].id]: 'text-base-dark',
                }}
                labelStyle='text-[8px]'
                wrapperStyle='h-9 w-36'
                onChange={(val) => setStatsTypeFilter(val)}
              />
            </View>

            {/* Stats Content */}
            <View className='stats-content flex-row'>
              <View className='col-left flex-1 gap-y-6'>
                <View className='gap-y-1'>
                  <Text className='font-clashDisplay text-lg text-base-dark dark:text-base-white'>
                    {stats?.totalTrades ?? 0}
                  </Text>
                  <Text className='font-satoshi text-xs text-body dark:text-body-dark'>
                    {Strings.profile.TOTAL_TRADES_LABEL}
                  </Text>
                </View>

                <View className='gap-y-1'>
                  <Text className='font-clashDisplay text-lg text-base-dark dark:text-base-white'>
                    {stats?.avgReleaseTime ?? 0} Minutes
                  </Text>
                  <Text className='font-satoshi text-xs text-body dark:text-body-dark'>
                    {Strings.profile.AVG_RELEASE_LABEL}
                  </Text>
                </View>
              </View>

              <View className='col-right flex-1 gap-y-6'>
                <View className='gap-y-1'>
                  <Text className='font-clashDisplay text-lg text-base-dark dark:text-base-white'>
                    {stats?.completionRate ?? 0}%
                  </Text>
                  <Text className='font-satoshi text-xs text-body dark:text-body-dark'>
                    {Strings.profile.COMPLETION_RATE_LABEL}
                  </Text>
                </View>

                <View className='gap-y-1'>
                  <Text className='font-clashDisplay text-lg text-base-dark dark:text-base-white'>
                    {stats?.avgPayTime ?? 0} Minutes
                  </Text>
                  <Text className='font-satoshi text-xs text-body dark:text-body-dark'>
                    {Strings.profile.AVG_PAY_LABEL}
                  </Text>
                </View>
              </View>
            </View>

            {/* Stats Footer */}
            <TouchableOpacity onPress={() => router.push('/stats')} hitSlop={20}>
              <Text
                className={cn(
                  'font-satoshi-medium text-xs underline',
                  isDark ? 'text-primary-500' : 'text-primary-700',
                )}
              >
                {Strings.profile.VIEW_MORE_LABEL}
              </Text>
            </TouchableOpacity>
          </View>

          <DividerX />

          <View className='menu'>
            <MenuOption
              title={Strings.profile.MENU_FEEDBACK_TITLE}
              leftIcon={isDark ? icons.dark.likeTag : icons.light.likeTag}
              rightIcon={isDark ? icons.dark.arrowRight : icons.light.arrowRight}
              route='/feedback'
            />

            {/* <MenuOption
              title={Strings.profile.MENU_NOTIF_TITLE}
              leftIcon={isDark ? icons.dark.notification : icons.light.notification}
              rightIcon={isDark ? icons.dark.arrowRight : icons.light.arrowRight}
            /> */}

            {/* <MenuOption
              title={Strings.profile.MENU_MERCHANT_TITLE}
              leftIcon={isDark ? icons.dark.verify : icons.light.verify}
              rightIcon={isDark ? icons.dark.arrowRight : icons.light.arrowRight}
            /> */}

            {/* <MenuOption
              title={Strings.profile.MENU_PAY_METHODS_TITLE}
              leftIcon={isDark ? icons.dark.money : icons.light.money}
              rightIcon={isDark ? icons.dark.arrowRight : icons.light.arrowRight}
            /> */}

            {/* <MenuOption
              title={Strings.profile.MENU_HELP_TITLE}
              leftIcon={isDark ? icons.dark.messageQuestion : icons.light.messageQuestion}
              rightIcon={isDark ? icons.dark.arrowRight : icons.light.arrowRight}
            /> */}
          </View>

          <View className='mt-4'>
            <SecondaryButton title={Strings.profile.LOGOUT_BTN_TITLE} isLoading={isLoading} onPress={confirmLogout} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
