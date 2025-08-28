import { GestureResponderEvent, Image, Pressable } from 'react-native';

const IndexIconButton = (props: IndexIconButtonProps) => {
  const handlePress = (e: GestureResponderEvent) => {
    props.onPress?.(e);
  };

  return (
    <Pressable onPress={props.disabled ? undefined : handlePress} hitSlop={15}>
      <Image className='index-icon-btn-img' source={props.icon} resizeMode='contain' />
    </Pressable>
  );
};

export default IndexIconButton;
