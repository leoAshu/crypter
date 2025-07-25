import { SafeAreaView, ScrollView, View } from 'react-native';

const TabScreenWrapper = ({ children }: TabScreenWrapperProps) => {
  return (
    <SafeAreaView className='screen-wrapper'>
      <ScrollView>
        <View className='content-wrapper'>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TabScreenWrapper;
