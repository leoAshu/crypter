interface IconButtonProps {
  icon: ImageSourcePropType;
  tintColor?: string;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

interface PrimaryButtonProps {
  title: string;
  isLoading?: boolean;
  textStyle?: string;
  leftIcon?: ReactNode;
  onPress?: () => void;
}

interface InputFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  disabled?: boolean;
  onChangeText?: (text: string) => void;
}
