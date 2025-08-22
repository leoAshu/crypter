import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackIconButton } from '../iconButtons';

const AppBar = (props: AppHeaderProps) => {
  const canGoBack = router.canGoBack();

  return (
    <SafeAreaView edges={['top']}>
      <View className='flex-row px-3 py-4'>
        <View className='w-8 items-center justify-center'>
          {canGoBack && <BackIconButton onPress={props.onBackPress} />}
        </View>

        <View className='flex-1 items-center justify-center'>
          <Text className='font-clashDisplay-medium text-lg text-title dark:text-title-dark'>{props.title}</Text>
        </View>

        <View className='w-8 items-center justify-center'>{props.right && props.right}</View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(AppBar);
