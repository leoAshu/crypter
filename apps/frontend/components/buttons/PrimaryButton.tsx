import cn from 'clsx';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      className={cn(
        'btn-primary',
        props.disabled || props.isLoading ? 'bg-primary-disabled' : 'bg-primary',
        props.isLoading ? 'py-4' : '',
        props.containerStyle,
      )}
      disabled={props.isLoading || props.disabled}
      onPress={props.onPress}
    >
      <View className='btn-primary-inner'>
        {props.isLoading ? (
          <ActivityIndicator size='small' className='btn-primary-load-indicator' />
        ) : (
          <>
            {props.leftIcon && <View className='mr-2 p-1'>{props.leftIcon}</View>}
            <Text
              className={cn(
                'btn-primary-label',
                props.disabled || props.isLoading ? 'opacity-45' : '',
                props.textStyle,
              )}
            >
              {props.title}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
