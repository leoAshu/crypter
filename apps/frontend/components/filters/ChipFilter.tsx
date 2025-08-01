import cn from 'clsx';
import { FlatList, Pressable, Text, useColorScheme, View } from 'react-native';
import { DividerX } from '../dividers';

const ChipFilter = <T extends string>(props: ChipFilterProps<T>) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View className='flex'>
      <FlatList
        horizontal
        data={props.options}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 4 }}
        ItemSeparatorComponent={() => <View className='w-6' />}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: option }) => {
          const isActive = option === props.value;
          const borderStyle = isActive ? 'border-b-primary' : 'border-b-transparent';
          const labelStyle = isActive ? 'text-base-black dark:text-base-white' : 'text-neutral';

          return (
            <Pressable onPress={() => props.onChange?.(option)}>
              <View className={cn('border-b-[3px] px-1 pb-1', borderStyle)}>
                <Text className={cn('font-satoshi-medium text-base', labelStyle)}>{props.labels?.[option]}</Text>
              </View>
            </Pressable>
          );
        }}
      />
      <DividerX opacityStyle={isDark ? 'opacity-40' : 'opacity-25'} />
    </View>
  );
};

export default ChipFilter;
