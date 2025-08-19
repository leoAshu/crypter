import { Modal, Text, View, useColorScheme } from 'react-native';

const ModalView = ({ visible, onClose, title, children, maxHeight = '50%' }: ModalViewProps) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <Modal visible={visible} transparent={true} animationType='slide' onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }} onTouchEnd={onClose}>
        <View
          style={{
            backgroundColor: isDark ? '#1C1C1F' : 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            maxHeight: typeof maxHeight === 'string' ? maxHeight : maxHeight,
          }}
        >
          <Text className='mb-4 font-clashDisplay-medium text-lg text-title dark:text-title-dark'>{title}</Text>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalView;
