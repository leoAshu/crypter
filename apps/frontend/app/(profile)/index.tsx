import { AccountInfo, DividerX, InputField, OverlayLoader } from '@/components';
import { useAuthStore } from '@/store';
import { formatPhoneNumber } from '@/utils';
import cn from 'clsx';
import { Platform, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const isIOS = Platform.OS === 'ios';
  const isDark = useColorScheme() === 'dark';
  const { isLoading, user } = useAuthStore();

  return (
    <SafeAreaView className='screen-wrapper'>
      <OverlayLoader visible={isLoading} />

      <View className='content-wrapper mt-20'>
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
                <Text className='font-satoshi text-base text-neutral dark:text-neutral-400'>Average release time</Text>
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
                'font-satoshi-medium text-base underline',
                isDark ? 'text-primary-500' : 'text-primary-700',
              )}
            >
              View More Details
            </Text>
          </TouchableOpacity>
        </View>

        <DividerX />

        <View className='form-group mt-4'>
          <InputField label='Your Name' value={user?.user_metadata?.name || ''} disabled={true} />
          <InputField label='Email Address' value={user?.email || ''} disabled={true} />
          <InputField
            label='Phone Number'
            value={formatPhoneNumber(user?.user_metadata?.phone || '')}
            disabled={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
