import { images } from '@/assets';
import { Image, ImageSourcePropType, View } from 'react-native';

const PaymentBadge = (props: PaymentBadgeProps) => {
  const paymentMethodIcons: Record<string, ImageSourcePropType> = {
    UPI: images.upi,
    Paytm: images.paytm,
    PhonePe: images.phonepe,
    GPay: images.gPay,
    IMPS: images.imps,
  };

  return (
    <View className='px-1'>
      <Image source={paymentMethodIcons[props.paymentName]} className='h-10 w-10' resizeMode='contain' />
    </View>
  );
};

export default PaymentBadge;
