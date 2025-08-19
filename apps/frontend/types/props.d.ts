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
  containerStyle?: string;
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

interface IndexIconButtonProps {
  icon: ImageSourcePropType;
  disabled?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
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
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'decimal-pad';
  disabled?: boolean;
  onChangeText?: (text: string) => void;
}

interface FormInputFieldProps {
  label?: string;
  innerLabel?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'decimal-pad';
  disabled?: boolean;
  onChangeText?: (text: string) => void;
}

interface PaymentMethodChipsProps {
  selectedPayMethods: string[];
  onRemovePayMethod: (payMethodId: string) => void;
  onOpenBottomSheet: () => void;
  canAddMore: boolean;
  maxSelections?: number;
}

interface ModalViewProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  maxHeight?: number | `${number}%`;
}

// ====================
// 👤 Profile / User Info
// ====================

/** Props for displaying account information like name and join date */
interface AccountInfoProps {
  name: string;
  username: string;
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
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  onPress?: () => void;
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
interface FloatingActionButtonProps {
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

interface PayMethodBadgeProps {
  payMethodTypeId: string;
}

interface AdCardProps {
  ad: Ad;
  index: number;
  animationStyle?: AnimationStyle;
}

interface DividerXProps {
  style?: string;
}

interface BackIconButtonProps {
  containerStyle?: string;
  onPress?: () => void;
}

interface OrderCardProps {
  index: number;
  order: Order;
}

interface WalletCardProps {
  cryptoId: CryptoOption;
}

/** Generic filter item interface - all filter items must extend this */
interface FilterItem {
  id: string;
  label: string;
}

// ====================
// 🔽 Dropdowns
// ====================

/** Props for a primary dropdown with generic item type support */
interface DropdownProps {
  title?: string;
  placeholder?: string;
  items: FilterItem[];
  value?: FilterItem;
  disabled?: boolean;
  error?: string;
  containerStyle?: string;
  buttonStyle?: string;
  textStyle?: string;
  onSelect?: (item: FilterItem) => void;
}

interface ChipFilterProps {
  value: FilterItem;
  items: FilterItem[];
  onChange?: (val: FilterItem) => void;
}

interface ToggleButtonProps {
  value: FilterItem;
  items: [FilterItem, FilterItem];
  labelStyle?: string;
  wrapperStyle?: string;
  activeButtonColors?: Record<string, string>;
  activeLabelColors?: Record<string, string>;
  onChange?: (val: FilterItem) => void;
}

interface ReviewCardProps {
  index: number;
  review: Review;
}

interface StepperInputProps {
  label: string;
  index: number;
  items: string[];
  onChange?: (val: string) => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

interface P2PAdsProps {
  p2pAds: Ad[];
}

interface MyAdsProps {
  myAds: Ad[];
  isAdActive: boolean;
}

interface MyAdCardProps {
  index: number;
  ad: Ad;
  isAdActive: boolean;
}

interface NavCardProps {
  navRoute: NavRoute;
}

interface AppHeaderProps {
  title: string;
  right?: ReactNode;
  onBackPress?: () => void;
}

interface TickerCardProps {
  index?: number;
  cryptoId: string;
  cryptoName: string;
  cryptoSymbol: string;
  tickerData: Ticker;
  fiatSymbol: string;
}

interface PayMethodCardProps {
  index?: number;
  payMethod: PayMethod;
}

interface DetailsFormProps {
  isLoading: boolean;
  category: PayMethodCategory;
  formData?: Partial<PayMethod>;
  onChange?: (key: string, val: string) => void;
}

interface ListEmptyStateProps {
  title?: string;
  ctaLabel?: string;
  ctaStyle?: string;
  ctaOnPresss?: () => void;
}
