import { ChipFilter, InitialsAvatar, InputField, PrimaryButton, WalletCard } from '@/components';
import { useCrypto } from '@/hooks';
import { CryptoOptionStrict } from '@/hooks/appData/useCrypto';
import { useProfileStore, useWallet } from '@/store';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const { profile } = useProfileStore();
  const { cryptoLabelsStrict, cryptoOptionsStrict } = useCrypto();
  const { deposit } = useWallet();

  const [crypto, setCrypto] = useState<CryptoOptionStrict>(cryptoOptionsStrict[1]);
  const [depositAmount, setDepositAmount] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePress = () => {
    const amount = parseFloat(depositAmount.replace(/,/g, ''));
    if (isNaN(amount) || amount <= 0) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      deposit(crypto, amount);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <SafeAreaView className='screen-wrapper'>
      <ScrollView>
        <View className='content-wrapper mt-6'>
          <InitialsAvatar name={profile?.name ?? ''} size='sm' />
          <View className='flex'>
            <Text className='header-txt font-clashDisplay'>Hello,</Text>
            <Text className='header-txt font-clashDisplay'>{profile?.name ?? ''} 👋</Text>
          </View>

          <ChipFilter
            value={crypto}
            options={cryptoOptionsStrict}
            labels={cryptoLabelsStrict}
            onChange={(value) => setCrypto(value)}
          />

          <WalletCard cryptoId={crypto} />

          <View className='form-group'>
            <InputField
              label='Enter Amount'
              keyboardType='decimal-pad'
              value={depositAmount}
              onChangeText={(value) => {
                const cleaned = value.replace(/[^0-9.]/g, '');
                setDepositAmount(cleaned);
              }}
            />

            <PrimaryButton title='Deposit' disabled={isLoading} isLoading={isLoading} onPress={handlePress} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
