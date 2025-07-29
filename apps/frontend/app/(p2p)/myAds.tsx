import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyAds = () => {
  return (
    <SafeAreaView className='screen-wrapper'>
      <ScrollView>
        <View className='content-wrapper mt-6'></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyAds;
