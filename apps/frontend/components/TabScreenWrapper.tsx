import { SafeAreaView, View } from 'react-native';

const TabScreenWrapper = ({ children }: TabScreenWrapperProps) => {
  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1 items-center justify-center'>{children}</View>
    </SafeAreaView>
  );
};

export default TabScreenWrapper;
