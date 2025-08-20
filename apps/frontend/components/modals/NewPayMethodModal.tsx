import { usePayMethodType } from '@/hooks';
import { FlatList, Image, Text, TouchableHighlight, useColorScheme, View } from 'react-native';
import { DividerX } from '../dividers';
import ModalView from './ModalView';

interface NewPayMethodModalProps {
  visible: boolean;
  onClose: () => void;
}

const NewPayMethodModal = (props: NewPayMethodModalProps) => {
  const isDark = useColorScheme() === 'dark';
  const { payMethodTypes, getPayMethodTypeById, getPayMethodTypeLogoUrlById } = usePayMethodType();

  return (
    <ModalView title='New Pay Method' visible={props.visible} onClose={props.onClose}>
      <FlatList
        data={payMethodTypes}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerClassName='mt-4'
        renderItem={({ item, index }) => {
          const payMethodType = getPayMethodTypeById(item.id);
          const payMethodTypeLogoUrl = getPayMethodTypeLogoUrlById(item.id);

          return (
            <TouchableHighlight
              className='flex-1'
              underlayColor={isDark ? '#1C1C1C' : '#F1F1F1'}
              onPress={() => console.log('Pressed', payMethodType?.name)}
            >
              <View className='flex-row items-center justify-between px-6 py-6'>
                <Text className='font-satoshi text-sm text-title dark:text-title-dark'>{payMethodType?.name}</Text>
                <Image source={payMethodTypeLogoUrl} className='h-6 w-12' resizeMode='contain' />
              </View>
            </TouchableHighlight>
          );
        }}
        ItemSeparatorComponent={() => <DividerX style={isDark ? 'opacity-40' : 'opacity-25'} />}
      />
    </ModalView>
  );
};

export default NewPayMethodModal;
