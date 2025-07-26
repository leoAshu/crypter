import { images } from '@/assets';
import AccountInfo from '@/components/AccountInfo';
import MenuOption from '@/components/MenuOption';
import { defaultProfileInfo } from '@/constants';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Account = () => {
  return (
    <SafeAreaView className='screen-wrapper'>
      <ScrollView>
        <View className='content-wrapper mt-20'>
          <AccountInfo
            name={defaultProfileInfo.name}
            gender={defaultProfileInfo.gender}
            yearSignedUp={defaultProfileInfo.joined}
          />

          <View className='menu-group mt-4'>
            <MenuOption title='View Profile' rightIcon={images.next} route='/(profile)' />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
