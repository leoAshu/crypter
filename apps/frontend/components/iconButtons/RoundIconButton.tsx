import { useState } from 'react';
import { GestureResponderEvent, Image, Pressable, View, useColorScheme } from 'react-native';

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
    <Pressable className='round-icon-btn' onPress={handlePress} hitSlop={15}>
      <View className='round-icon-btn-bg' style={colorScheme == 'dark' ? { opacity: 0.3 } : { opacity: 1 }} />

      <View className='round-icon-btn-img-wrapper'>
        <Image className='round-icon-btn-img' source={currentIcon} resizeMode='contain' />
      </View>
    </Pressable>
  );
};

export default RoundIconButton;
