import { useState } from 'react';
import { Image, ImageSourcePropType, GestureResponderEvent, Pressable, View, useColorScheme } from 'react-native';

interface RoundIconButtonProps {
  primaryIcon: ImageSourcePropType;
  secondaryIcon?: ImageSourcePropType;
  onPress?: (e: GestureResponderEvent) => void;
}

const RoundIconButton = (props: RoundIconButtonProps) => {
  const [isPrimary, setIsPrimary] = useState(true);
  const colorScheme = useColorScheme();

  const handlePress = (e: GestureResponderEvent) => {
    if (props.secondaryIcon) {
      setIsPrimary((prev) => !prev);
    }
    props.onPress?.(e);
  };

  const currentIcon = isPrimary ? props.primaryIcon : props.secondaryIcon!;

  return (
    <Pressable className='round-icon-btn' onPress={handlePress}>
      <View className='round-icon-btn-bg' style={colorScheme == 'dark' ? { opacity: 0.3 } : { opacity: 1 }} />

      <View className='round-icon-btn-img-wrapper'>
        <Image className='round-icon-btn-img' source={currentIcon} resizeMode='contain' />
      </View>
    </Pressable>
  );
};

export default RoundIconButton;
