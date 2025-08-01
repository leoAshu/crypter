import { Text, View } from 'react-native';
import InitialsAvatar from '../avatars/InitialsAvatar';

const AccountInfo = (props: AccountInfoProps) => {
  return (
    <View className='account-info-wrapper'>
      <InitialsAvatar name={props.name} size='sm' />

      <View>
        <Text className='font-clashDisplay text-2xl text-base-black dark:text-base-white'>{props.name}</Text>
        <Text className='font-satoshi-medium text-sm text-neutral dark:text-neutral-400'>@ashu_leo</Text>
      </View>
    </View>
  );
};

export default AccountInfo;
