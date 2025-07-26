import { images } from '@/assets';
import { AccountInfo, MenuOption, SecondaryButton } from '@/components';
import { AlertStrings, defaultProfileInfo, Strings } from '@/constants';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Account = () => {
  const [isLoading, setIsLoading] = useState(false);

  const confirmLogout = async () => {
    Alert.alert(AlertStrings.TITLE.LOGOUT, AlertStrings.MSG.CONFIRM_LOGOUT, [
      { text: AlertStrings.ACTION.CANCEL, style: 'cancel' },
      {
        text: AlertStrings.ACTION.LOGOUT,
        style: 'destructive',
        onPress: () => {
          setIsLoading(true);
          setTimeout(() => {
            router.replace('/signin');
          }, 2000);
        },
      },
    ]);
  };

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
            <MenuOption title={Strings.account.VIEW_PROFILE_MENU_TITLE} rightIcon={images.next} route='/(profile)' />
            <SecondaryButton title={Strings.account.LOGOUT_BTN_TITLE} isLoading={isLoading} onPress={confirmLogout} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
