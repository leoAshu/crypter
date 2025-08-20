import cn from 'clsx';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const FormInputField = (props: FormInputFieldProps) => {
  const value = props.value ?? '';
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className='input-wrapper'>
      <Text className='input-label text-title dark:text-title-dark'>{props.label ?? ''}</Text>

      <View className='relative'>
        <TextInput
          className={cn(
            'input-txt',
            isFocused ? 'border-b-primary' : 'border-b-stroke dark:border-b-stroke-dark',
            props.disabled ? 'text-body/45 dark:text-body-dark/45' : '',
            props.innerLabel ? 'pr-24' : '',
          )}
          value={value}
          onChangeText={props.onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          cursorColor='#54E6B6'
          autoCapitalize='none'
          keyboardType={props.keyboardType}
          editable={!props.disabled}
        />

        {props.innerLabel && (
          <Text
            className='absolute right-4 top-1/2 -translate-y-1/2 text-sm text-body dark:text-body-dark'
            style={{ color: '#667085' }}
          >
            {props.innerLabel}
          </Text>
        )}
      </View>
    </View>
  );
};

export default FormInputField;
