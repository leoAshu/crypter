import AccountInfo from '@/components/AccountInfo';
import InputField from '@/components/InputField';
import { defaultProfileInfo } from '@/constants';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  return (
    <SafeAreaView className='screen-wrapper'>
      <View className='content-wrapper mt-20'>
        <AccountInfo name={defaultProfileInfo.name} gender='Male' yearSignedUp='2025' />

        <View className='form-group mt-4'>
          <InputField label='Your Name' value={defaultProfileInfo.name} disabled={true} />
          <InputField label='Email Address' value={defaultProfileInfo.email} disabled={true} />
          <InputField label='Your Password' value={defaultProfileInfo.password} disabled={true} secureTextEntry />
          <InputField label='Phone Number' value={defaultProfileInfo.phone} disabled={true} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
