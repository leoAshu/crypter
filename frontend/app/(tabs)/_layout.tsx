import { Tabs } from 'expo-router';

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name='index' options={{ title: 'Home' }} />
      <Tabs.Screen name='market/index' options={{ title: 'Market' }} />
      <Tabs.Screen name='trade/index' options={{ title: 'Trade' }} />
      <Tabs.Screen name='wallet/index' options={{ title: 'Wallet' }} />
      <Tabs.Screen name='profile/index' options={{ title: 'Profile' }} />
    </Tabs>
  );
};

export default TabsLayout;
