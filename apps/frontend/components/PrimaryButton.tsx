import cn from 'clsx';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      className={cn('btn-primary')}
      onPress={props.isLoading ? undefined : props.onPress}
      disabled={props.isLoading}
    >
      <View className='btn-primary-inner'>
        {props.isLoading ? (
          <ActivityIndicator size='small' color='white' />
        ) : (
          <>
            <View className='mr-2 p-1'>{props.leftIcon}</View>
            <Text className={cn('btn-primary-label', props.textStyle)}>{props.title}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
