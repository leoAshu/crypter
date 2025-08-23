import cn from 'clsx';
import { useState } from 'react';
import { Platform, Text, TextInput, View } from 'react-native';

const FormInputField = (props: FormInputFieldProps) => {
  const isIOS = Platform.OS === 'ios';
  const value = props.value ?? '';

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className='gap-y-2'>
      <Text className='font-clashDisplay text-sm text-label dark:text-label-dark'>{props.label}</Text>
      <View
        className={cn(
          'flex-row items-stretch rounded-lg border',
          isFocused ? 'border-primary' : 'border-stroke dark:border-stroke-dark',
        )}
      >
        <View
          className={cn(
            'relative flex-1 bg-card px-4 font-satoshi text-sm dark:bg-card-dark',
            props.secondarylabel ? 'rounded-l-lg' : 'rounded-lg',
          )}
        >
          <TextInput
            className={cn(
              'px-0 font-satoshi text-sm',
              isIOS ? 'py-2 pb-3' : 'py-3',
              props.disabled ? 'text-body/75 dark:text-body-dark/75' : 'text-body dark:text-body-dark',
            )}
            value={value}
            autoCapitalize='none'
            cursorColor='#54E6B6'
            editable={!props.disabled}
            placeholderTextColor='#66708573'
            placeholder={props.placeholder ?? ''}
            keyboardType={props.keyboardType}
            textAlignVertical='center'
            secureTextEntry={props.secureTextEntry ? !showPassword : false}
            onChangeText={props.onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>

        {props.secondarylabel && (
          <View
            className={cn(
              'justify-center rounded-r-lg px-4 py-3',
              isFocused ? 'bg-primary' : 'bg-base-white dark:bg-base-dark',
              props.disabled && 'opacity-45',
            )}
          >
            <Text className={cn('font-satoshi text-sm', isFocused ? 'text-title' : 'text-title dark:text-title-dark')}>
              {props.secondarylabel}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default FormInputField;
