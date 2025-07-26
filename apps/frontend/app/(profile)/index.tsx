import { AccountInfo, InputField } from '@/components';
import { defaultProfileInfo } from '@/constants';
import { formatPhoneNumber } from '@/utils';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  return (
    <SafeAreaView className='screen-wrapper'>
      <View className='content-wrapper mt-20'>
        <AccountInfo
          name={defaultProfileInfo.name}
          gender={defaultProfileInfo.gender}
          yearSignedUp={defaultProfileInfo.joined}
        />

        <View className='form-group mt-4'>
          <InputField label='Your Name' value={defaultProfileInfo.name} disabled={true} />
          <InputField label='Email Address' value={defaultProfileInfo.email} disabled={true} />
          <InputField label='Your Password' value={defaultProfileInfo.password} disabled={true} secureTextEntry />
          <InputField label='Phone Number' value={formatPhoneNumber(defaultProfileInfo.phone)} disabled={true} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
