import AccountInfo from '@/components/AccountInfo';
import InputField from '@/components/InputField';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  return (
    <SafeAreaView className='screen-wrapper'>
      <View className='mt-24 flex-1 gap-y-12 px-8'>
        <AccountInfo name='Ashutosh Ojha' gender='Male' yearSignedUp='2025' />

        <View className='flex gap-y-8'>
          <InputField label='Your Name' value='Ashutosh Ojha' disabled={true} />
          <InputField label='Email Address' value='ashutosh.ojha2009@gmail.com' disabled={true} />
          <InputField label='Your Password' value='password' disabled={true} secureTextEntry />
          <InputField label='Phone Number' value='+1 669 499-6135' disabled={true} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
