import { ReactNode } from 'react';
import { SafeAreaView, View } from 'react-native';

type Props = {
  children: ReactNode;
};

const TabScreenWrapper = ({ children }: Props) => {
  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1 items-center justify-center'>{children}</View>
    </SafeAreaView>
  );
};

export default TabScreenWrapper;
