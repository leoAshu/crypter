import { icons } from '@/assets';
import { usePayMethodType } from '@/hooks';
import { FlatList, Image, Text, TouchableHighlight, useColorScheme, View } from 'react-native';
import { DividerX } from '../dividers';
import ModalView from './ModalView';

const PayMethodEmptyState = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View className='items-center gap-y-4 py-12'>
      <Image source={isDark ? icons.dark.verify : icons.light.verify} className='size-24' resizeMode='contain' />

      <View className='items-center gap-y-2'>
        <Text className='font-clashDisplay text-lg text-body dark:text-body-dark'>No Payment Methods</Text>
        <Text className='text-center font-satoshi text-sm text-label dark:text-label-dark'>
          Add payment methods to your profile first to continue
        </Text>
      </View>
    </View>
  );
};

const SelectPayMethodModal = (props: SelectPayMethodModalProps) => {
  const isDark = useColorScheme() === 'dark';
  const { getPayMethodTypeById, getPayMethodTypeLogoUrlById } = usePayMethodType();

  const isEmpty = props.payMethodTypes.length === 0;

  return (
    <ModalView title='Select Pay Method' visible={props.visible} onClose={props.onClose}>
      <FlatList
        data={props.payMethodTypes}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerClassName={isEmpty ? 'flex-1 justify-center' : 'mt-4'}
        renderItem={({ item, index }) => {
          const payMethodType = getPayMethodTypeById(item.id);
          const payMethodTypeLogoUrl = getPayMethodTypeLogoUrlById(item.id);

          return (
            <TouchableHighlight
              className='flex-1'
              underlayColor={isDark ? '#1C1C1C' : '#F1F1F1'}
              onPress={() => {
                props.onTapPayMethodType?.(payMethodType!.id);
                props.onClose?.();
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
        ListEmptyComponent={<PayMethodEmptyState />}
      />
    </ModalView>
  );
};

export default SelectPayMethodModal;
