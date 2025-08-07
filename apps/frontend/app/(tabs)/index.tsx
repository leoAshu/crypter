import { ChipFilter, InitialsAvatar, WalletCard } from '@/components';
import { useCrypto } from '@/hooks';
import { useProfileStore } from '@/store';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const { profile } = useProfileStore();
  const { cryptoSymbolFilterItemsStrict } = useCrypto();

  const [crypto, setCrypto] = useState<FilterItem>(cryptoSymbolFilterItemsStrict[0]);

  return (
    <SafeAreaView className='screen-wrapper'>
      <ScrollView>
        <View className='content-wrapper mt-6'>
          <InitialsAvatar name={profile?.name ?? ''} size='sm' />
          <View className='flex'>
            <Text className='header-txt font-clashDisplay'>Hello,</Text>
            <Text className='header-txt font-clashDisplay'>{profile?.name ?? ''} 👋</Text>
          </View>

          <ChipFilter value={crypto} items={cryptoSymbolFilterItemsStrict} onChange={(item) => setCrypto(item)} />

          <WalletCard cryptoId={crypto.id} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
