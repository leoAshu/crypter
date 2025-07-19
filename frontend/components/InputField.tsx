import { useEffect, useState } from 'react';
import { TextInput, KeyboardTypeOptions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import RoundIconButton from './RoundIconButton';
import { images } from '@/assets';

interface InputFieldProps {
  label: string;
  keyboardType: KeyboardTypeOptions;
  placeholder?: string;
  secured?: boolean;
}

const InputField = (props: InputFieldProps) => {
  const [value, setValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const isFocused = useSharedValue(false);
  const iconOpacity = useSharedValue(0);

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
    color: withTiming(isFocused.value ? '#0066FF' : '#969AA0', {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    }),
  }));

  const borderStyle = useAnimatedStyle(() => ({
    borderBottomColor: withTiming(isFocused.value ? '#0066FF' : '#2C2E3B', {
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
      setValue('');
    }
  };

  return (
    <Animated.View className='relative border-b-2 pb-1' style={borderStyle}>
      <Animated.Text style={[labelStyle]} className={'font-poppins-medium'}>
        {props.label}
      </Animated.Text>

      <TextInput
        value={value}
        onChangeText={setValue}
        onFocus={() => (isFocused.value = true)}
        onBlur={() => (isFocused.value = false)}
        className='text-base pt-6 pb-3 pr-10 text-text-primary-light dark:text-text-primary-dark'
        cursorColor='#0066FF'
        secureTextEntry={props.secured ? !showPassword : false}
        keyboardType={props.keyboardType}
      />

      {value.length > 0 && (
        <Animated.View style={[animatedIconStyle]} className='absolute right-0 top-6'>
          <RoundIconButton primaryIcon={props.secured ? (showPassword ? images.eyeOff : images.eye) : images.x} onPress={handlePress} />
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default InputField;
