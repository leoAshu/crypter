import { Modal, Pressable, Text } from 'react-native';
import Animated, { Easing, FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';

const ModalView = ({ visible, onClose, title, children, maxHeight = '50%' }: ModalViewProps) => {
  return (
    <Modal visible={visible} transparent={true} animationType='none' onRequestClose={onClose}>
      {/* Backdrop */}
      <Animated.View
        className='flex-1 justify-end bg-backdrop dark:bg-backdrop-dark'
        entering={FadeIn.duration(250).easing(Easing.out(Easing.cubic))}
        exiting={FadeOut.duration(200).easing(Easing.in(Easing.cubic))}
      >
        <Pressable className='flex-1' onPress={onClose} />

        {/* Content */}
        <Animated.View
          className='rounded-t-[20px] bg-base py-6 dark:bg-base-dark'
          style={{ maxHeight: typeof maxHeight === 'string' ? maxHeight : maxHeight }}
          entering={SlideInDown.duration(250).easing(Easing.out(Easing.ease))}
          exiting={SlideOutDown.duration(200).easing(Easing.in(Easing.ease))}
        >
          <Text className='self-center font-clashDisplay-medium text-lg text-title dark:text-title-dark'>{title}</Text>
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default ModalView;
