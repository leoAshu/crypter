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
      <Text className='font-clashDisplay text-sm text-title dark:text-title-dark'>{props.label}</Text>
      <View
        className={cn(
          'flex-row items-stretch rounded-md border',
          isFocused ? 'border-primary' : 'border-stroke dark:border-stroke-dark',
        )}
      >
        <View
          className={cn(
            'relative flex-1 bg-card px-4 font-satoshi text-sm dark:bg-card-dark',
            props.secondarylabel ? 'rounded-l-md' : 'rounded-md',
          )}
        >
          <TextInput
            className={cn(
              'font-satoshi text-sm leading-4',
              isIOS && 'py-3 pb-4',
              props.disabled ? 'text-label/55 dark:text-label-dark/55' : 'text-title dark:text-title-dark',
            )}
            value={value}
            autoCapitalize='none'
            cursorColor='#54E6B6'
            placeholder={props.placeholder ?? ''}
            placeholderTextColor='#667085'
            editable={!props.disabled}
            keyboardType={props.keyboardType}
            secureTextEntry={props.secureTextEntry ? !showPassword : false}
            onChangeText={props.onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>

        {props.secondarylabel && (
          <View
            className={cn(
              'justify-center rounded-r-md px-4 py-3',
              isFocused ? 'bg-primary' : 'bg-base dark:bg-base-dark',
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
