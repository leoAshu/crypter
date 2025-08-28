import { usePayMethodType } from '@/hooks/appData';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';

interface PaymentMethodChipsProps {
  selectedPayMethods: string[];
  onRemovePayMethod: (payMethodId: string) => void;
  onOpenBottomSheet: () => void;
  canAddMore: boolean;
  maxSelections?: number;
}

const PaymentMethodChips = ({
  selectedPayMethods,
  onRemovePayMethod,
  onOpenBottomSheet,
  canAddMore,
  maxSelections = 3,
}: PaymentMethodChipsProps) => {
  const isDark = useColorScheme() === 'dark';
  const { getPayMethodTypeById } = usePayMethodType();

  return (
    <View className='gap-4'>
      <View>
        <Text className='input-label text-title dark:text-title-dark'>Payment method</Text>
        <Text className='mt-1 font-satoshi text-sm text-label dark:text-label-dark'>
          Select a maximum of {maxSelections}
        </Text>
      </View>

      <View className='flex-row flex-wrap items-center gap-3'>
        {selectedPayMethods.map((payMethodId) => {
          const payMethod = getPayMethodTypeById(payMethodId);
          return (
            <View
              key={payMethodId}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: isDark ? '#2A2A2A' : '#F1F1F1',
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#12B76A',
                  marginRight: 8,
                }}
              />
              <Text className='font-satoshi-medium text-sm text-title dark:text-title-dark'>{payMethod?.name}</Text>
              <TouchableOpacity onPress={() => onRemovePayMethod(payMethodId)} style={{ marginLeft: 8 }}>
                <Text className='text-lg text-label dark:text-label-dark'>×</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        {canAddMore && (
          <TouchableOpacity
            onPress={onOpenBottomSheet}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'transparent',
              borderRadius: 20,
              borderWidth: 1,
              borderColor: isDark ? '#6B7089' : '#CACACA',
              borderStyle: 'dashed',
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: '#667085',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8,
              }}
            >
              <Text className='text-sm font-bold text-white'>+</Text>
            </View>
            <Text className='font-satoshi-medium text-sm text-title dark:text-title-dark'>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PaymentMethodChips;
