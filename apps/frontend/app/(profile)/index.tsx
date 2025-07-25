import InputField from '@/components/InputField';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  return (
    <SafeAreaView className='screen-wrapper'>
      <View className='mt-24 flex-1 gap-y-12 px-8'>
        <View className='flex-row items-center gap-x-4'>
          <View className='h-20 w-20 items-center justify-center rounded-full bg-teal-500'>
            <Text className='font-poppins text-2xl text-white'>AO</Text>
          </View>

          <View className='flex-1 gap-y-1'>
            <Text className='font-poppins-semibold text-3xl text-on-surface dark:text-on-surface-dark'>
              Ashutosh Ojha
            </Text>
            <Text className='font-inter-medium text-lg text-muted dark:text-muted-dark'>Male Joined 2021</Text>
          </View>
        </View>
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
