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
        contentContainerStyle={{ paddingHorizontal: 8 }}
        ItemSeparatorComponent={() => <View className='w-4' />}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: option }) => {
          const isActive = option === props.value;
          const borderStyle = isActive ? 'border-b-primary' : 'border-b-transparent';
          const labelStyle = isActive ? 'text-base-black dark:text-base-white' : 'text-neutral';

          return (
            <Pressable onPress={() => props.onChange?.(option)}>
              <View className={cn('mb-0.5 border-b-2 px-1.5 pb-1.5 pt-2', borderStyle)}>
                <Text className={cn('font-satoshi-medium text-base tracking-wider', labelStyle)}>
                  {props.labels?.[option]}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
      <DividerX style={isDark ? 'opacity-40' : 'opacity-25'} />
    </View>
  );
};

export default ChipFilter;
