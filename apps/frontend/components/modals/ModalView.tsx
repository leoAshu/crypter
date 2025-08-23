import React from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';
import Animated, { Easing, FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';

const ModalView = ({ visible, onClose, title, children, maxHeight = 0.55 }: ModalViewProps) => {
  if (!visible) return null;

  return (
    <Animated.View
      className='absolute inset-0 justify-end'
      entering={FadeIn.duration(250).easing(Easing.out(Easing.cubic))}
      exiting={FadeOut.duration(200).easing(Easing.in(Easing.cubic))}
    >
      {/* Backdrop pressable covering entire screen */}
      <Pressable onPress={onClose} className='absolute inset-0 bg-backdrop dark:bg-backdrop-dark' />

      {/* Bottom sheet content above backdrop */}
      <Animated.View
        className='flex-1 gap-y-6 rounded-t-[20px] bg-base-white py-2 dark:bg-base-dark'
        style={{
          maxHeight: Dimensions.get('screen').height * maxHeight,
        }}
        entering={SlideInDown.duration(250).easing(Easing.out(Easing.ease))}
        exiting={SlideOutDown.duration(200).easing(Easing.in(Easing.ease))}
      >
        <View className='items-center'>
          <View className='h-1 w-10 rounded-md bg-stroke dark:bg-stroke-dark' />
        </View>

        <View className='items-center'>
          <Text className='font-clashDisplay-medium text-lg text-title dark:text-title-dark'>{title}</Text>
        </View>

        {React.cloneElement(children as any, {
          style: [{ flex: 1 }, (children as any).props.style],
          contentContainerStyle: [
            (children as any).props.contentContainerStyle,
            { paddingBottom: 16 }, // optional extra space
          ],
        })}
      </Animated.View>
    </Animated.View>
  );
};

export default ModalView;
