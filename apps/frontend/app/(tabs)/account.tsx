import AccountInfo from '@/components/AccountInfo';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Account = () => {
  return (
    <SafeAreaView className='screen-wrapper'>
      <ScrollView>
        <View className='content-wrapper mt-24'>
          <AccountInfo name='Ashutosh Ojha' gender='Male' yearSignedUp='2025' />
          <Pressable onPress={() => router.push('/(profile)')}>
            <Text className='text-dark dark:text-white'>View Profile</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
