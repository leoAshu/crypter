import { getPayMethodById } from '@/models';
import { Image, View } from 'react-native';

const PayMethodBadge = (props: PayMethodBadgeProps) => {
  return (
    <View className='pay-method-badge'>
      <Image source={getPayMethodById(props.payMethodId)?.logoUrl} className='h-6 w-10' resizeMode='contain' />
    </View>
  );
};

export default PayMethodBadge;
