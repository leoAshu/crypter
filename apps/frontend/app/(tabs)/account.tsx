import AccountInfo from '@/components/AccountInfo';
import { defaultProfileInfo } from '@/constants';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Account = () => {
  return (
    <SafeAreaView className='screen-wrapper'>
      <ScrollView>
        <View className='content-wrapper mt-20'>
          <AccountInfo
            name={defaultProfileInfo.name}
            gender={defaultProfileInfo.gender}
            yearSignedUp={defaultProfileInfo.joined}
          />

          <Pressable onPress={() => router.push('/(profile)')}>
            <Text className='text-dark dark:text-white'>View Profile</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
