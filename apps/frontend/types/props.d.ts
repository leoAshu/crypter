// ====================
// 🧩 UI / Buttons
// ====================

/** Props for a primary button with optional loading, icon, and custom text styles */
interface PrimaryButtonProps {
  title: string;
  isLoading?: boolean;
  textStyle?: string;
  leftIcon?: ReactNode;
  disabled?: boolean;
  onPress?: () => void;
}

/** Props for a basic icon-only button */
interface IconButtonProps {
  icon: ImageSourcePropType;
  tintColor?: string;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

/** Props for a round icon button with an optional secondary icon */
interface RoundIconButtonProps {
  primaryIcon: ImageSourcePropType;
  secondaryIcon?: ImageSourcePropType;
  onPress?: (e: GestureResponderEvent) => void;
}

/** Props for a secondary-styled button (e.g., outlined or subtle) */
interface SecondaryButtonProps {
  title: string;
  disabled?: boolean;
  isLoading?: boolean;
  onPress?: () => void;
}

// ====================
// 🧾 Form Fields
// ====================

/** Props for a generic input field with optional validation and keyboard settings */
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

// ====================
// 👤 Profile / User Info
// ====================

/** Props for displaying account information like name and join date */
interface AccountInfoProps {
  name: string;
  gender: string;
  yearSignedUp: string;
}

/** Allowed size variants for avatar components */
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';

/** Props for rendering initials-based avatar */
interface InitialsAvatarProps {
  name: string;
  size?: AvatarSize;
  textStyle?: string;
  containerStyle?: string;
}

// ====================
// 📄 Navigation / Menu
// ====================

/** Props for a menu item with optional right-side icon and route navigation */
interface MenuOptionProps {
  title: string;
  route?: LinkProps['href'];
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
}

// ====================
// ⏳ Loaders
// ====================

/** Props for an overlay loader with blurred background */
interface OverlayLoaderProps {
  visible: boolean;
}

// ====================
// 🧭 Tabs
// ====================

/** Props for a tab bar icon */
interface TabBarIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
  title?: string;
  iconStyle?: string;
}

/** Props for a floating action tab button */
interface FloatingActionTabButtonProps {
  icon: ImageSourcePropType;
  onPress?: () => void;
}

/** Props for an app bar action icon */
interface HeaderActionIconProps {
  icon: ImageSourcePropType;
  iconStyle?: string;
  containerStyle?: string;
  onPress?: () => void;
}

interface ToggleButtonProps<T extends string> {
  value: T;
  options: [T, T];
  labelStyle?: string;
  wrapperStyle?: string;
  labels?: Record<T, string>;
  activeButtonColors?: Record<T, string>;
  activeLabelColors?: Record<T, string>;
  onChange?: (value: T) => void;
}

interface PaymentBadgeProps {
  paymentName: string;
}

interface AdCardProps {
  ad: any;
  index: number;
  animationStyle?: AnimationStyle;
}

interface DividerXProps {
  opacityStyle?: string;
}

interface HeaderBackActionProps {
  containerStyle?: string;
  onPress?: () => void;
}

interface ChipFilterProps<T extends string> {
  value: T;
  options: T[];
  labels?: Record<T, string>;
  onChange?: (value: T) => void;
}
