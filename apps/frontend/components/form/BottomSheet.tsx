import { Modal, ScrollView, Text, TouchableOpacity, View, useColorScheme } from 'react-native';

const BottomSheet = ({
  visible,
  onClose,
  title,
  items,
  onItemPress,
  children,
  maxHeight = '50%',
}: BottomSheetProps) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <Modal visible={visible} transparent={true} animationType='slide' onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
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
          <ScrollView showsVerticalScrollIndicator={false}>
            {children ||
              (items && onItemPress && (
                <>
                  {items.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => onItemPress(item)}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: isDark ? '#2A2A2A' : '#F1F1F1',
                      }}
                    >
                      <Text className='flex-1 font-satoshi-medium text-title dark:text-title-dark'>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </>
              ))}
          </ScrollView>
          <TouchableOpacity
            onPress={onClose}
            style={{
              marginTop: 16,
              backgroundColor: '#54E6B6',
              borderRadius: 12,
              paddingVertical: 12,
              alignItems: 'center',
            }}
          >
            <Text className='font-clashDisplay-medium text-title'>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default BottomSheet;
