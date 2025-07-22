import { images } from '@/assets';
import { useEffect, useState } from 'react';
import { KeyboardTypeOptions, TextInput } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { RoundIconButton } from '.';

interface InputFieldProps {
  label: string;
  value: string;
  keyboardType: KeyboardTypeOptions;
  error?: string;
  secured?: boolean;
  placeholder?: string;
  onChangeText?: (value: string) => void;
}

const InputField = (props: InputFieldProps) => {
  const value = props.value;
  const iconOpacity = useSharedValue(0);
  const isFocused = useSharedValue(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    iconOpacity.value = withTiming(value ? 1 : 0, { duration: 200 });
  }, [value]);

  const labelStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: 0,
    top: withTiming(isFocused.value || value ? 0 : 20, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    }),
    fontSize: withTiming(isFocused.value || value ? 12 : 14, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    }),
    color: withTiming(props.error ? 'red' : isFocused.value ? '#0066FF' : '#969AA0', {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    }),
  }));

  const borderStyle = useAnimatedStyle(() => ({
    borderBottomColor: withTiming(props.error ? 'red' : isFocused.value ? '#0066FF' : '#2C2E3B', {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    }),
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    opacity: iconOpacity.value,
  }));

  const handlePress = () => {
    if (props.secured) {
      setShowPassword((prev) => !prev);
    } else {
      if (props.onChangeText) props.onChangeText('');
    }
  };

  // Error animation shared value
  const errorVisible = useSharedValue(!!props.error ? 1 : 0);

  useEffect(() => {
    errorVisible.value = !!props.error ? 1 : 0;
  }, [props.error]);

  return (
    <Animated.View className='input-wrapper' style={borderStyle}>
      <Animated.Text className='input-label' style={[labelStyle]}>
        {props.label}
      </Animated.Text>

      <TextInput
        className='input-txt'
        value={value}
        onChangeText={props.onChangeText}
        onFocus={() => (isFocused.value = true)}
        onBlur={() => (isFocused.value = false)}
        cursorColor='#0066FF'
        secureTextEntry={props.secured ? !showPassword : false}
        keyboardType={props.keyboardType}
      />

      {value.length > 0 && (
        <Animated.View className='input-icon-wrapper' style={[animatedIconStyle]}>
          <RoundIconButton
            primaryIcon={props.secured ? (showPassword ? images.eyeOff : images.eye) : images.x}
            onPress={handlePress}
          />
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default InputField;
