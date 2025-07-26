import { Text, View } from 'react-native';
import InitialsAvatar from './InitialsAvatar';

const AccountInfo = (props: AccountInfoProps) => {
  return (
    <View className='flex-row items-center gap-x-4'>
      <InitialsAvatar name={props.name} size='medium' />

      <View className='flex-1 gap-y-1'>
        <Text className='font-poppins-semibold text-2xl text-on-surface dark:text-on-surface-dark'>{props.name}</Text>
        <Text className='font-inter-medium text-base text-muted dark:text-muted-dark'>
          {props.gender} • Joined {props.yearSignedUp}
        </Text>
      </View>
    </View>
  );
};

export default AccountInfo;
