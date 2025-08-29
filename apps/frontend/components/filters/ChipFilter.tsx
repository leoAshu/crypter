import { allFilterItem } from '@/constants';
import { lightHapticFeedback } from '@/utils';
import cn from 'clsx';
import { FlatList, Pressable, Text, useColorScheme, View } from 'react-native';
import { DividerX } from '../dividers';

const ChipFilter = (props: ChipFilterProps) => {
  const isDark = useColorScheme() === 'dark';
  const disabled = props.disabled ?? false

  const showFilter = (() => {
    let count = 0;
    for (const i of props.items) {
      if (i.id !== allFilterItem.id) {
        count++;
        if (count > 1) return true;
      }
    }
    return false;
  })();

  const onPress = (option: FilterItem) => {
    lightHapticFeedback();
    props.onChange?.(option);
  };

  return (
    <View className='flex'>
      {showFilter && (
        <FlatList
          horizontal
          data={props.items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 8 }}
          ItemSeparatorComponent={() => <View className='w-4' />}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const isActive = item.id === props.value.id;
            const borderStyle = isActive ? (disabled ? 'border-b-stroke dark:border-b-stroke-dark' : 'border-b-primary') : 'border-b-transparent';
            const labelStyle = isActive ? (disabled ? 'text-body dark:text-body-dark' : 'text-base-dark dark:text-base-white') : 'text-label dark:text-label-dark';

            return (
              <Pressable disabled={disabled} onPress={() => onPress(item)}>
                <View className={cn('mb-0.5 border-b-2 px-1.5 pb-1.5 pt-2', borderStyle)}>
                  <Text className={cn('font-satoshi-medium text-xs tracking-wider', labelStyle)}>{item.label}</Text>
                </View>
              </Pressable>
            );
          }}
        />
      )}
      <DividerX style={isDark ? 'opacity-40' : 'opacity-25'} />
    </View>
  );
};

export default ChipFilter;
