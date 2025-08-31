import { icons } from '@/assets';
import { usePayMethodType } from '@/hooks/appData';
import { Image, Text, TouchableOpacity, View, useColorScheme } from 'react-native';

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
    <View className='gap-y-4'>
      <Text className='field-label'>Payment Method (Max. {maxSelections})</Text>

      <View className='flex-row flex-wrap gap-3'>
        {selectedPayMethods.map((payMethodId) => {
          const payMethod = getPayMethodTypeById(payMethodId);
          return (
            <View
              key={payMethodId}
              className='flex-row items-center gap-x-2 rounded-lg bg-card px-4 py-4 dark:bg-[#2A2A2A]'
            >
              <View className='size-2 rounded bg-primary' />
              <Text className='font-satoshi-medium text-sm text-body dark:text-body-dark'>{payMethod?.name}</Text>

              <TouchableOpacity onPress={() => onRemovePayMethod(payMethodId)} hitSlop={20}>
                <Text className='text-body dark:text-body-dark'>×</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        {canAddMore && (
          <TouchableOpacity
            onPress={onOpenBottomSheet}
            className='flex-row items-center gap-x-2 rounded-lg border border-dashed border-stroke px-3 py-2 dark:border-stroke-dark'
          >
            <Image
              source={isDark ? icons.dark.inactive.increment : icons.light.inactive.increment}
              className='size-6'
              resizeMode='contain'
            />

            <Text className='font-satoshi-medium text-sm text-body dark:text-body-dark'>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PaymentMethodChips;
