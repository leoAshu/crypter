import { useProfile } from '@/hooks';
import { getPayMethodTypeById } from '@/models';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { ToggleSwitch } from '../filters';

const PayMethodCard = (props: PayMethodCardProps) => {
  const [isOn, setIsOn] = useState<boolean>(props.payMethod.isActive);

  const { profile } = useProfile();

  const payMethodType = getPayMethodTypeById(props.payMethod.payMethodTypeId);

  const togglePayMethod = (val: boolean) => {
    setIsOn(val);
  };

  return (
    <View className='gap-y-4 rounded px-2 py-2'>
      <View className='flex-row items-center justify-between'>
        <Text className='font-clashDisplay-medium text-sm text-label dark:text-label-dark'>{payMethodType?.name}</Text>
        <Image source={payMethodType?.logoUrl} className='size-12' resizeMode='contain' />
      </View>

      <View className='flex-row items-end justify-between'>
        <View className='gap-y-2'>
          <Text className='font-clashDisplay text-sm text-title dark:text-title-dark'>{profile?.name}</Text>
          <Text className='font-clashDisplay text-xs tracking-wider text-body dark:text-body-dark'>
            {props.payMethod.address}
          </Text>
        </View>

        <ToggleSwitch value={isOn} onChange={togglePayMethod} size='sm' />
      </View>
    </View>
  );
};

export default PayMethodCard;
