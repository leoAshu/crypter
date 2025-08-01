import { icons } from '@/assets';
import { AccountInfo, DividerX, MenuOption, SecondaryButton, ToggleButton } from '@/components';
import { AlertStrings, screenContentWrapperStyle, Strings } from '@/constants';
import { useAuthStore } from '@/store';
import cn from 'clsx';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const isDark = useColorScheme() === 'dark';
  const { isLoading, user, signout } = useAuthStore();
  const [infoTermFilter, setInfoTermFilter] = useState<TradingInfoTerm>('30d');

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
    <SafeAreaView className='screen-wrapper'>
      <ScrollView>
        <View className={cn('content-wrapper pb-28', screenContentWrapperStyle)}>
          <AccountInfo
            name={user?.user_metadata?.name || ''}
            gender={user?.user_metadata?.gender || ''}
            yearSignedUp={user?.created_at || ''}
          />

          <DividerX />

          <View className='profile-stats gap-y-6'>
            {/* Stats Header */}
            <View className='stats-header flex-row items-center justify-between'>
              <Text className='dark:text-base-dark text-base-dark font-clash-display-medium text-xl dark:text-base-white'>
                {Strings.profile.TRADING_STATS_TITLE}
              </Text>

              <ToggleButton
                labelStyle='text-xs'
                wrapperStyle='h-9 w-36'
                value={infoTermFilter}
                options={['30d', 'alltime']}
                labels={{ '30d': '30 days', alltime: 'All Time' }}
                activeButtonColors={{ '30d': 'bg-primary', alltime: 'bg-primary' }}
                activeLabelColors={{ '30d': 'text-base-black', alltime: 'text-base-black' }}
                onChange={(val) => setInfoTermFilter(val)}
              />
            </View>

            {/* Stats Content */}
            <View className='stats-content flex-row'>
              <View className='col-left flex-1 gap-y-6'>
                <View className='gap-y-2'>
                  <Text className='text-base-dark font-clash-display-medium text-2xl dark:text-base-white'>5</Text>
                  <Text className='font-satoshi-medium text-base text-neutral dark:text-neutral-400'>
                    {Strings.profile.TOTAL_TRADES_LABEL}
                  </Text>
                </View>

                <View className='gap-y-2'>
                  <Text className='text-base-dark font-clash-display-medium text-2xl dark:text-base-white'>
                    4.3 Minutes
                  </Text>
                  <Text className='font-satoshi text-base text-neutral dark:text-neutral-400'>
                    {Strings.profile.AVG_RELEASE_LABEL}
                  </Text>
                </View>
              </View>

              <View className='col-right flex-1 gap-y-6'>
                <View className='gap-y-2'>
                  <Text className='text-base-dark font-clash-display-medium text-2xl dark:text-base-white'>100%</Text>
                  <Text className='font-satoshi text-base text-neutral dark:text-neutral-400'>
                    {Strings.profile.COMPLETION_RATE_LABEL}
                  </Text>
                </View>

                <View className='gap-y-2'>
                  <Text className='text-base-dark font-clash-display-medium text-2xl dark:text-base-white'>100%</Text>
                  <Text className='font-satoshi text-base text-neutral dark:text-neutral-400'>
                    {Strings.profile.AVG_PAY_LABEL}
                  </Text>
                </View>
              </View>
            </View>

            {/* Stats Footer */}
            <TouchableOpacity>
              <Text
                className={cn(
                  'font-satoshi-medium text-sm underline',
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
            />

            <MenuOption
              title={Strings.profile.MENU_NOTIF_TITLE}
              leftIcon={isDark ? icons.dark.notification : icons.light.notification}
              rightIcon={isDark ? icons.dark.arrowRight : icons.light.arrowRight}
            />

            <MenuOption
              title={Strings.profile.MENU_MERCHANT_TITLE}
              leftIcon={isDark ? icons.dark.verify : icons.light.verify}
              rightIcon={isDark ? icons.dark.arrowRight : icons.light.arrowRight}
            />

            <MenuOption
              title={Strings.profile.MENU_PAY_METHODS_TITLE}
              leftIcon={isDark ? icons.dark.money : icons.light.money}
              rightIcon={isDark ? icons.dark.arrowRight : icons.light.arrowRight}
            />

            <MenuOption
              title={Strings.profile.MENU_HELP_TITLE}
              leftIcon={isDark ? icons.dark.messageQuestion : icons.light.messageQuestion}
              rightIcon={isDark ? icons.dark.arrowRight : icons.light.arrowRight}
            />
          </View>

          <SecondaryButton title={Strings.profile.LOGOUT_BTN_TITLE} isLoading={isLoading} onPress={confirmLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
