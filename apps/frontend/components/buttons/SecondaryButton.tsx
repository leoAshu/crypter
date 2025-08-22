import cn from 'clsx';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

const SecondaryButton = (props: SecondaryButtonProps) => {
  return (
    <TouchableOpacity
      className={cn(
        'btn-secondary',
        props.disabled || props.isLoading ? 'btn-secondary-disabled' : 'btn-secondary-active',
      )}
      disabled={props.isLoading || props.disabled}
      onPress={props.onPress}
    >
      <View className='btn-secondary-inner'>
        {props.isLoading ? (
          <ActivityIndicator size='small' className='btn-secondary-load-indicator' />
        ) : (
          <Text
            className={cn(
              'btn-secondary-label',
              props.disabled ? 'btn-secondary-label-disabled' : 'btn-seconday-label-active',
            )}
          >
            {props.title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SecondaryButton;
