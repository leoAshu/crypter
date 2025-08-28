import { ToastStrings } from '@/constants';
import { usePayMethod, usePayMethodType, useProfile } from '@/hooks';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { ToggleSwitch } from '../filters';

const PayMethodCard = (props: PayMethodCardProps) => {
  const [isOn, setIsOn] = useState<boolean>(props.payMethod.isActive);

  const { profile } = useProfile();
  const { updatePayMethodStatus } = usePayMethod();
  const { getPayMethodTypeById, getPayMethodTypeLogoUrlById } = usePayMethodType();

  const payMethodType = getPayMethodTypeById(props.payMethod.payMethodTypeId);
  const payMethodTypeLogoUrl = getPayMethodTypeLogoUrlById(props.payMethod.payMethodTypeId);

  const togglePayMethod = async (isActive: boolean) => {
    try {
      await updatePayMethodStatus(props.payMethod.id, isActive);
      setIsOn(isActive);
      Toast.show({
        type: 'success',
        text1: ToastStrings.Success.TITLE,
        text2: isActive ? ToastStrings.Success.PAY_METHOD_ACTIVE : ToastStrings.Success.PAY_METHOD_INACTIVE,
        position: 'bottom',
        bottomOffset: 112,
        autoHide: true,
        visibilityTime: 1500,
      });
    } catch (error) {
      console.log('togglePayMethod failed', error);
    }
  };

  return (
    <View className='gap-y-3 rounded pb-4 pt-2'>
      <View className='flex-row items-center justify-between'>
        <Text className='font-clashDisplay-medium text-sm text-label dark:text-label-dark'>{payMethodType?.name}</Text>
        <Image source={payMethodTypeLogoUrl} className='size-12' resizeMode='contain' />
      </View>

      <View className='flex-row items-end justify-between'>
        <View className='gap-y-2'>
          <Text className='font-clashDisplay text-sm text-title dark:text-title-dark'>
            {profile?.firstName} {profile?.lastName}
          </Text>
          <Text className='font-clashDisplay text-xs tracking-wider text-body dark:text-body-dark'>
            {props.payMethod.phone || props.payMethod.upiId || props.payMethod.accountNo}
          </Text>
        </View>

        <ToggleSwitch value={isOn} onChange={togglePayMethod} size='sm' />
      </View>
    </View>
  );
};

export default PayMethodCard;
