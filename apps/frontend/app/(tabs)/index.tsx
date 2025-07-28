import { InitialsAvatar } from '@/components';
import { useAuthStore } from '@/store';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const { user } = useAuthStore();
  return (
    <SafeAreaView className='screen-wrapper'>
      <ScrollView>
        <View className='content-wrapper mt-6'>
          <InitialsAvatar name={user?.user_metadata.name} size='small' />
          <Text className='header-txt font-poppins-medium'>Hello,</Text>
          <Text className='header-txt -mt-6 font-poppins-medium'>{user?.user_metadata.name} 👋</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
