import cn from 'clsx';
import * as Haptics from 'expo-haptics';
import { FlatList, Pressable, Text, useColorScheme, View } from 'react-native';
import { DividerX } from '../dividers';

const ChipFilter = (props: ChipFilterProps) => {
  const isDark = useColorScheme() === 'dark';

  const onPress = (option: FilterItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    props.onChange?.(option);
  };

  return (
    <View className='flex'>
      <FlatList
        horizontal
        data={props.items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        ItemSeparatorComponent={() => <View className='w-4' />}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const isActive = item.id === props.value.id;
          const borderStyle = isActive ? 'border-b-primary' : 'border-b-transparent';
          const labelStyle = isActive ? 'text-base-dark dark:text-base-white' : 'text-neutral';

          return (
            <Pressable onPress={() => onPress(item)}>
              <View className={cn('mb-0.5 border-b-2 px-1.5 pb-1.5 pt-2', borderStyle)}>
                <Text className={cn('font-satoshi-medium text-xs tracking-wider', labelStyle)}>{item.label}</Text>
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
