import { usePayMethodType } from '@/hooks';
import { router } from 'expo-router';
import { Dimensions, FlatList, Image, Text, TouchableHighlight, useColorScheme, View } from 'react-native';
import { DividerX } from '../dividers';
import ModalView from './ModalView';

const NewPayMethodModal = (props: NewPayMethodModalProps) => {
  const isDark = useColorScheme() === 'dark';
  const { payMethodTypes, getPayMethodTypeById, getPayMethodTypeLogoUrlById } = usePayMethodType();

  const modalMaxHeight = 0.55;
  const listMaxHeight = modalMaxHeight * 0.7;

  return (
    <ModalView title='New Pay Method' visible={props.visible} onClose={props.onClose} maxHeight={modalMaxHeight}>
      <FlatList
        data={payMethodTypes}
        keyExtractor={(item, index) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ maxHeight: Dimensions.get('screen').height * listMaxHeight }}
        renderItem={({ item, index }) => {
          const payMethodType = getPayMethodTypeById(item.id);
          const payMethodTypeLogoUrl = getPayMethodTypeLogoUrlById(item.id);

          return (
            <TouchableHighlight
              className='flex-1'
              underlayColor={isDark ? '#1C1C1C' : '#F1F1F1'}
              onPress={() => {
                props.onClose?.();
                router.push({
                  pathname: '/details',
                  params: {
                    payMethodTypeId: item.id,
                    payMethodTypeName: item.name,
                    payMethodTypeCategory: item.category,
                  },
                });
              }}
            >
              <View className='flex-row items-center justify-between px-6 py-6'>
                <Text className='font-satoshi text-sm text-title dark:text-title-dark'>{payMethodType?.name}</Text>
                <Image source={payMethodTypeLogoUrl} className='h-6 w-12' resizeMode='contain' />
              </View>
            </TouchableHighlight>
          );
        }}
        ItemSeparatorComponent={() => <DividerX style={isDark ? 'opacity-40' : 'opacity-25'} />}
        ListFooterComponent={() => <DividerX style={isDark ? 'opacity-40' : 'opacity-25'} />}
      />
    </ModalView>
  );
};

export default NewPayMethodModal;
