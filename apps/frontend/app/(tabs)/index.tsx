import { InitialsAvatar, Market, QuickNav, WalletCard } from '@/components';
import { useCrypto, useProfile } from '@/hooks';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const { profile } = useProfile();
  const { p2pCryptoSymbolFilterItemsStrict } = useCrypto();

  const [crypto, _] = useState<FilterItem>(p2pCryptoSymbolFilterItemsStrict[0]);

  return (
    <SafeAreaView className='screen-wrapper'>
      <ScrollView>
        <View className='content-wrapper mt-4'>
          <InitialsAvatar name={profile?.firstName ?? ''} size='sm' />

          <Text className='header-txt font-clashDisplay'>Hello {profile?.firstName ?? ''} 👋</Text>

          <WalletCard cryptoId={crypto.id} />

          <QuickNav />

          <Market />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
