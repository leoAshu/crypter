import { ToggleButton } from '@/components';
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const [filter, setFilter] = useState<'buy' | 'sell'>('buy');

  return (
    <SafeAreaView className='screen-wrapper'>
      <View className='content-wrapper mt-20 gap-y-4'>
        <ToggleButton
          value={filter}
          onChange={(val) => setFilter(val)}
          options={['buy', 'sell']}
          labels={{ buy: 'Buy', sell: 'Sell' }}
          activeColors={{ buy: 'bg-success-dark', sell: 'bg-error-dark' }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
