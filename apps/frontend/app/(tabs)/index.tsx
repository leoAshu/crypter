import { InitialsAvatar, WalletCard } from '@/components';
import { useProfileStore } from '@/store';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const { profile } = useProfileStore();

  return (
    <SafeAreaView className='screen-wrapper'>
      <ScrollView>
        <View className='content-wrapper mt-6'>
          <InitialsAvatar name={profile?.name ?? ''} size='sm' />
          <View className='flex'>
            <Text className='header-txt font-clashDisplay'>Hello,</Text>
            <Text className='header-txt font-clashDisplay'>{profile?.name ?? ''} 👋</Text>
          </View>

          <WalletCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
