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
    <Pressable onPress={handlePress} className='p-1.5 rounded-full'>
      {/* Background layer with opacity */}
      <View className='absolute inset-0 rounded-full bg-[#ECEDF1] dark:bg-[#3E436D]' style={colorScheme == 'dark' ? { opacity: 0.3 } : { opacity: 1 }} />

      <View className='items-center justify-center'>
        <Image source={currentIcon} className='h-4 w-4' resizeMode='contain' />
      </View>
    </Pressable>
  );
};

export default RoundIconButton;
