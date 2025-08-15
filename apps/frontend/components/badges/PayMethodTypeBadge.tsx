import { getPayMethodTypeById } from '@/models';
import { Image, View } from 'react-native';

const PayMethodTypeBadge = (props: PayMethodBadgeProps) => {
  return (
    <View className='pay-method-badge'>
      <Image source={getPayMethodTypeById(props.payMethodTypeId)?.logoUrl} className='h-4 w-8' resizeMode='contain' />
    </View>
  );
};

export default PayMethodTypeBadge;
