import { Dimensions, Image, Text, View } from 'react-native';
import ModalView from './ModalView';

const NotificationModal = (props: NotificationModalProps) => {
  const modalMaxHeight = props.maxHeight || 0.5;
  const contentMaxHeight = Dimensions.get('screen').height * modalMaxHeight * 0.6;

  return (
    <ModalView title={''} visible={props.visible} onClose={props.onClose} maxHeight={modalMaxHeight}>
      <View className='justify-between pb-8'>
        <View className='self-cente items-center gap-y-8' style={{ maxHeight: contentMaxHeight }}>
          {props.icon && <Image source={props.icon} className='size-28' resizeMode='contain' />}

          <View className='items-center gap-y-4 px-16'>
            {props.title && (
              <Text className='text-center font-clashDisplay-medium text-2xl tracking-wider text-title dark:text-title-dark'>
                {props.title}
              </Text>
            )}
            {props.label && (
              <Text className='text-center font-satoshi text-lg text-body dark:text-body-dark'>{props.label}</Text>
            )}
          </View>
        </View>
        {props.ctaLabel && props.ctaOnPress && (
          <Text onPress={props.ctaOnPress} className='text-center font-satoshi text-lg text-primary underline'>
            {props.ctaLabel}
          </Text>
        )}
      </View>
    </ModalView>
  );
};

export default NotificationModal;
