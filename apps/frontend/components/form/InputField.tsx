import { images } from '@/assets';
import cn from 'clsx';
import { useState } from 'react';
import { TextInput, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { RoundIconButton } from '../iconButtons';

const InputField = (props: InputFieldProps) => {
  const value = props.value ?? '';
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const labelStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: 0,
    top: withTiming(isFocused || value ? 0 : 28, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    }),
    fontSize: withTiming(isFocused || value ? 12 : 14, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    }),
    color: withTiming(isFocused ? '#54E6B6' : '#667085', {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    }),
  }));

  const handlePress = () => {
    if (props.secureTextEntry) {
      setShowPassword((prev) => !prev);
    } else {
      props.onChangeText?.('');
    }
  };

  return (
    <View className='input-wrapper'>
      <Animated.Text className='input-label' style={[labelStyle]}>
        {props.label}
      </Animated.Text>

      <TextInput
        className={cn(
          'input-txt',
          isFocused ? 'border-b-primary' : 'border-b-stroke dark:border-b-stroke-dark',
          props.disabled ? 'text-body/45 dark:text-body-dark/45' : '',
        )}
        value={value}
        onChangeText={props.onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        cursorColor='#54E6B6'
        autoCapitalize='none'
        secureTextEntry={props.secureTextEntry ? !showPassword : false}
        keyboardType={props.keyboardType}
        editable={!props.disabled}
      />

      {value.length > 0 && isFocused && (
        <View className='input-icon-wrapper'>
          <RoundIconButton
            primaryIcon={props.secureTextEntry ? (showPassword ? images.eyeOff : images.eye) : images.x}
            onPress={handlePress}
          />
        </View>
      )}
    </View>
  );
};

export default InputField;
