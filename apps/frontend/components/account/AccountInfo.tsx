import { getMockUserName } from '@/utils';
import { Text, View } from 'react-native';
import InitialsAvatar from '../avatars/InitialsAvatar';

const AccountInfo = (props: AccountInfoProps) => {
  return (
    <View className='account-info-wrapper'>
      <InitialsAvatar name={props.name} size='sm' />

      <View>
        <Text className='font-clashDisplay text-lg text-base-black dark:text-base-white'>{props.name}</Text>
        <Text className='font-satoshi-medium text-[10px] text-neutral dark:text-neutral-400'>
          @{getMockUserName(props.username)}
        </Text>
      </View>
    </View>
  );
};

export default AccountInfo;
