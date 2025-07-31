import { icons } from '@/assets';
import { AccountInfo, DividerX, MenuOption, OverlayLoader, SecondaryButton } from '@/components';
import { AlertStrings, Strings } from '@/constants';
import { useAuthStore } from '@/store';
import cn from 'clsx';
import { router } from 'expo-router';
import { Alert, Platform, ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const isIOS = Platform.OS === 'ios';
  const isDark = useColorScheme() === 'dark';

  const { isLoading, user, signout } = useAuthStore();

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
        <OverlayLoader visible={isLoading} />

        <View className='content-wrapper mt-20 pb-28'>
          <AccountInfo
            name={user?.user_metadata?.name || ''}
            gender={user?.user_metadata?.gender || ''}
            yearSignedUp={user?.created_at || ''}
          />

          <DividerX />

          <View className='profile-stats gap-y-6'>
            {/* Stats Header */}
            <View className='stats-header flex-row justify-between'>
              <Text className='dark:text-base-dark text-base-dark font-clash-display-medium text-xl dark:text-base-white'>
                Trading info
              </Text>
            </View>

            {/* Stats Content */}
            <View className='stats-content flex-row'>
              <View className='col-left flex-1 gap-y-6'>
                <View className='gap-y-2'>
                  <Text className='text-base-dark font-clash-display-medium text-2xl dark:text-base-white'>5</Text>
                  <Text className='font-satoshi-medium text-base text-neutral dark:text-neutral-400'>Total Trades</Text>
                </View>

                <View className='gap-y-2'>
                  <Text className='text-base-dark font-clash-display-medium text-2xl dark:text-base-white'>
                    4.3 Minutes
                  </Text>
                  <Text className='font-satoshi text-base text-neutral dark:text-neutral-400'>
                    Average release time
                  </Text>
                </View>
              </View>

              <View className='col-right flex-1 gap-y-6'>
                <View className='gap-y-2'>
                  <Text className='text-base-dark font-clash-display-medium text-2xl dark:text-base-white'>100%</Text>
                  <Text className='font-satoshi text-base text-neutral dark:text-neutral-400'>Completion Rate</Text>
                </View>

                <View className='gap-y-2'>
                  <Text className='text-base-dark font-clash-display-medium text-2xl dark:text-base-white'>100%</Text>
                  <Text className='font-satoshi text-base text-neutral dark:text-neutral-400'>Average pay time</Text>
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
                View More Details
              </Text>
            </TouchableOpacity>
          </View>

          <DividerX />

          <View className='menu'>
            <MenuOption
              title='Received Feedback'
              leftIcon={isDark ? icons.inactive.dark.likeTag : icons.inactive.light.likeTag}
              rightIcon={isDark ? icons.inactive.dark.arrowRight : icons.inactive.light.arrowRight}
            />

            <MenuOption
              title='Notifications'
              leftIcon={isDark ? icons.inactive.dark.notification : icons.inactive.light.notification}
              rightIcon={isDark ? icons.inactive.dark.arrowRight : icons.inactive.light.arrowRight}
            />

            <MenuOption
              title='Become a Merchant'
              leftIcon={isDark ? icons.inactive.dark.verify : icons.inactive.light.verify}
              rightIcon={isDark ? icons.inactive.dark.arrowRight : icons.inactive.light.arrowRight}
            />

            <MenuOption
              title='Payment Methods'
              leftIcon={isDark ? icons.inactive.dark.money : icons.inactive.light.money}
              rightIcon={isDark ? icons.inactive.dark.arrowRight : icons.inactive.light.arrowRight}
            />

            <MenuOption
              title='Help Centre'
              leftIcon={isDark ? icons.inactive.dark.messageQuestion : icons.inactive.light.messageQuestion}
              rightIcon={isDark ? icons.inactive.dark.arrowRight : icons.inactive.light.arrowRight}
            />
          </View>

          <SecondaryButton title={Strings.account.LOGOUT_BTN_TITLE} isLoading={isLoading} onPress={confirmLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
