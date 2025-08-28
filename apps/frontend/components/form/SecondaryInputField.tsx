import cn from 'clsx';
import { useState } from 'react';
import { Platform, Text, TextInput, View } from 'react-native';

const SecondaryInputField = (props: SecondaryInputFieldProps) => {
  const isIOS = Platform.OS === 'ios';
  const value = props.value ?? '';

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={cn('gap-y-2', props.containerStyle)}>
      {props.label && <Text className='font-clashDisplay text-sm text-label dark:text-label-dark'>{props.label}</Text>}
      <View
        className={cn(
          'flex-row items-stretch rounded-lg border',
          isFocused ? 'border-primary' : 'border-stroke dark:border-stroke-dark',
        )}
      >
        <View
          className={cn(
            'flex-1 px-4 font-satoshi text-sm',
            props.secondarylabel ? 'rounded-l-lg' : 'rounded-lg',
            props.disabled ? 'bg-card dark:bg-card-info-dark' : 'bg-base-white dark:bg-base-dark',
          )}
        >
          <TextInput
            className={cn(
              'px-0 font-satoshi text-sm',
              isIOS ? 'py-2 pb-3' : 'py-3',
              props.disabled ? 'text-body/45 dark:text-body-dark/45' : 'text-body dark:text-body-dark',
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
              'it w-14 items-center justify-center rounded-r-lg py-3',
              isFocused ? 'bg-primary' : 'bg-card dark:bg-card-dark',
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

export default SecondaryInputField;
