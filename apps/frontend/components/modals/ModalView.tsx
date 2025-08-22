import React from 'react';
import { Dimensions, Pressable, Text } from 'react-native';
import Animated, { Easing, FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const screenHeight = Dimensions.get('window').height;

const ModalView = ({ visible, onClose, title, children, maxHeight = '80%' }: ModalViewProps) => {
  const insets = useSafeAreaInsets();

  if (!visible) return null;

  return (
    <Animated.View
      className='z-100 absolute inset-0 justify-end'
      entering={FadeIn.duration(250).easing(Easing.out(Easing.cubic))}
      exiting={FadeOut.duration(200).easing(Easing.in(Easing.cubic))}
    >
      {/* Backdrop pressable covering entire screen */}
      <Pressable onPress={onClose} className='absolute inset-0 z-[1] bg-black/50' />

      {/* Bottom sheet content above backdrop */}
      <Animated.View
        className='flex-1 rounded-t-[20px] bg-base dark:bg-base-dark'
        style={{
          maxHeight: typeof maxHeight === 'string' ? (parseFloat(maxHeight) / 100) * screenHeight : maxHeight,
          zIndex: 2,
        }}
        entering={SlideInDown.duration(250).easing(Easing.out(Easing.ease))}
        exiting={SlideOutDown.duration(200).easing(Easing.in(Easing.ease))}
      >
        <Text className='self-center pb-2 pt-4 font-clashDisplay-medium text-lg text-title dark:text-title-dark'>
          {title}
        </Text>

        {React.cloneElement(children as any, {
          style: [{ flex: 1 }, (children as any).props.style],
          contentContainerStyle: [
            (children as any).props.contentContainerStyle,
            { paddingBottom: 200 }, // optional extra space
          ],
        })}
      </Animated.View>
    </Animated.View>
  );
};

export default ModalView;
