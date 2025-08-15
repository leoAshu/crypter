import { Text, View } from 'react-native';
import { PrimaryButton } from '../buttons';

const ListEmptyState = (props: ListEmptyStateProps) => (
  <View className='items-center justify-center gap-y-4'>
    <Text className='font-clashDisplay text-xl text-title dark:text-title-dark'>{props.title ?? ''}</Text>

    <PrimaryButton title={props.ctaLabel ?? ''} containerStyle={props.ctaStyle} onPress={props.ctaOnPresss} />
  </View>
);

export default ListEmptyState;
