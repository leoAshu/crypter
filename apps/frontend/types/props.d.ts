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
  disabled?: boolean;
  onPress?: () => void;
}

interface RoundIconButtonProps {
  primaryIcon: ImageSourcePropType;
  secondaryIcon?: ImageSourcePropType;
  onPress?: (e: GestureResponderEvent) => void;
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

interface AccountInfoProps {
  name: string;
  gender: string;
  yearSignedUp: string;
}

type AvatarSize = 'small' | 'medium' | 'large';

interface InitialsAvatarProps {
  name: string;
  size?: AvatarSize;
  className?: string;
}

interface MenuOptionProps {
  title: string;
  route?: LinkProps['href'];
  rightIcon?: ImageSourcePropType;
}
