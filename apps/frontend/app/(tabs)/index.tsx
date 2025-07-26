import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView className='screen-wrapper'>
      <ScrollView>
        <View className='content-wrapper mt-20'>
          <Text className='text-black dark:text-white'>Home</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
