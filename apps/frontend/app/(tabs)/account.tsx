import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Account = () => {
  return (
    <SafeAreaView className='screen-wrapper'>
      <ScrollView>
        <View className='content-wrapper mt-24'>
          <Text className='text-black dark:text-white'>Account</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
