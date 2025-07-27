import { AccountInfo, InputField } from '@/components';
import { AlertStrings } from '@/constants';
import { formatPhoneNumber, getUser } from '@/utils';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (err: any) {
        Alert.alert(AlertStrings.TITLE.ERROR, err.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView className='screen-wrapper'>
      <View className='content-wrapper mt-20'>
        <AccountInfo
          name={user?.user_metadata?.name || ''}
          gender={user?.user_metadata?.gender || ''}
          yearSignedUp={user?.created_at || ''}
        />

        <View className='form-group mt-4'>
          <InputField label='Your Name' value={user?.user_metadata?.name || ''} disabled={true} />
          <InputField label='Email Address' value={user?.email || ''} disabled={true} />
          <InputField
            label='Phone Number'
            value={formatPhoneNumber(user?.user_metadata?.phone || '')}
            disabled={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
