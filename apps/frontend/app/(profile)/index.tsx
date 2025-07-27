import { AccountInfo, InputField, OverlayLoader } from '@/components';
import { useAuthStore } from '@/store';
import { formatPhoneNumber } from '@/utils';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
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
