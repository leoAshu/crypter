import { DividerX, MenuOption } from '@/components';
import { usePayMethodType } from '@/hooks';
import cn from 'clsx';
import { FlatList, Platform, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddMethod = () => {
  const isDark = useColorScheme() === 'dark';

  const { payMethodTypes, getPayMethodTypeLogoUrlById } = usePayMethodType();

  const isEmpty = payMethodTypes.length === 0;
  const adsListStyle = Platform.select({
    ios: 'pb-20',
    android: 'pb-24',
  });

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <View className='content-wrapper mt-2'>
        <FlatList
          data={payMethodTypes}
          keyExtractor={(item) => item.id}
          contentContainerClassName={adsListStyle}
          renderItem={({ item, index }) => (
            <MenuOption title={item.name} leftIcon={getPayMethodTypeLogoUrlById(item.id)} />
          )}
          ItemSeparatorComponent={() => <DividerX style={cn('mb-1', isDark ? 'opacity-40' : 'opacity-25')} />}
          ListFooterComponent={() => !isEmpty && <DividerX style={isDark ? 'opacity-40' : 'opacity-25'} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddMethod;
