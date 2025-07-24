import { router } from 'expo-router';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

const TabScreenWrapper = ({ children }: TabScreenWrapperProps) => {
  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1 items-center justify-center'>
        {children}

        <TouchableOpacity className='btn-primary mt-4' onPress={() => router.replace('/signin')}>
          <View className='btn-primary-inner'>
            <Text className='btn-primary-label'>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TabScreenWrapper;
