import { Modal, Text } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';

const ModalView = ({ visible, onClose, title, children, maxHeight = '50%' }: ModalViewProps) => {
  return (
    <Modal visible={visible} transparent={true} animationType='none' onRequestClose={onClose}>
      <Animated.View
        className='flex-1 justify-end bg-black/50'
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(150)}
        onTouchEnd={onClose}
      >
        <Animated.View
          className='rounded-t-[20px] bg-base p-5 dark:bg-base-surface-dark'
          style={{ maxHeight: typeof maxHeight === 'string' ? maxHeight : maxHeight }}
          entering={SlideInDown.duration(300)}
          exiting={SlideOutDown.duration(250)}
        >
          <Text className='mb-4 font-clashDisplay-medium text-lg text-title dark:text-title-dark'>{title}</Text>
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default ModalView;
