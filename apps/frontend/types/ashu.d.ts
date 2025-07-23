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
  onChangeText?: (text: string) => void;
}
