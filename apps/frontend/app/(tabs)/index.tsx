import { InitialsAvatar, Market, QuickNav, WalletCard } from '@/components';
import { useCrypto } from '@/hooks';
import { useProfileStore } from '@/store';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const { profile } = useProfileStore();
  const { p2pCryptoSymbolFilterItemsStrict } = useCrypto();

  const [crypto, _] = useState<FilterItem>(p2pCryptoSymbolFilterItemsStrict[0]);

  return (
    <SafeAreaView className='screen-wrapper'>
      <ScrollView>
        <View className='content-wrapper mt-6 gap-y-6'>
          <InitialsAvatar name={profile?.name ?? ''} size='sm' />

          <View className='flex'>
            <Text className='header-txt font-clashDisplay'>Hello,</Text>
            <Text className='header-txt font-clashDisplay'>{profile?.name ?? ''} 👋</Text>
          </View>

          <WalletCard cryptoId={crypto.id} />

          <QuickNav />

          <Market />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
