import { images } from '@/assets';
import { AccountInfo, MenuOption, SecondaryButton } from '@/components';
import { AlertStrings, Strings } from '@/constants';
import { useAuthStore } from '@/store';
import { router } from 'expo-router';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Account = () => {
  const { isLoading, user, signout } = useAuthStore();

  const confirmLogout = async () => {
    Alert.alert(AlertStrings.TITLE.LOGOUT, AlertStrings.MSG.CONFIRM_LOGOUT, [
      { text: AlertStrings.ACTION.CANCEL, style: 'cancel' },
      {
        text: AlertStrings.ACTION.LOGOUT,
        style: 'destructive',
        onPress: async () => {
          try {
            await signout();
            router.replace('/signin');
          } catch (err: any) {
            Alert.alert(AlertStrings.TITLE.ERROR, err.message);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView className='screen-wrapper'>
      <ScrollView>
        <View className='content-wrapper mt-20'>
          <AccountInfo
            name={user?.user_metadata?.name || ''}
            gender={user?.user_metadata?.gender || ''}
            yearSignedUp={user?.created_at || ''}
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
