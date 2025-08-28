import { usePaymentTimeLimits } from '@/hooks';
import { FlatList, Text, TouchableHighlight, useColorScheme, View } from 'react-native';
import { DividerX } from '../dividers';
import ModalView from './ModalView';

const PayTimeLimitModal = (props: PayTimeLimitModalProps) => {
  const isDark = useColorScheme() === 'dark';
  const { payTimeLimits } = usePaymentTimeLimits();

  return (
    <ModalView title='Payment Time Limit' visible={props.visible} onClose={props.onClose}>
      <FlatList
        data={props.payTimeLimits || payTimeLimits}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerClassName='mt-4'
        renderItem={({ item }) => {
          return (
            <TouchableHighlight
              className='flex-1'
              underlayColor={isDark ? '#1C1C1C' : '#F1F1F1'}
              onPress={() => {
                props.onSelectPayTimeLimit?.(item.id);
                props.onClose?.();
              }}
            >
              <View className='flex-row items-center justify-center px-6 py-6'>
                <Text className='font-satoshi text-sm text-title dark:text-title-dark'>{item.label}</Text>
              </View>
            </TouchableHighlight>
          );
        }}
        ItemSeparatorComponent={() => <DividerX style={isDark ? 'opacity-40' : 'opacity-25'} />}
      />
    </ModalView>
  );
};

export default PayTimeLimitModal;
