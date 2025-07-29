import { images } from '@/assets';
import MaskedView from '@react-native-masked-view/masked-view';
import { Image, Text, View } from 'react-native';

const WalletCard = () => {
  return (
    <MaskedView
      maskElement={
        <View className='relative flex-1 items-center justify-center rounded-3xl bg-white opacity-85'>
          <View className='h-24 w-full'></View>
        </View>
      }
    >
      <Image source={images.walletBackground} className='h-36 w-full' resizeMode='cover' />

      <View className='absolute inset-0 flex-row items-center justify-between px-6'>
        <View className='flex gap-y-4'>
          <Text className='font-inter-semibold text-xl text-white'>Total Balance</Text>
          <Text className='font-inter-medium text-base text-white'>Cash available</Text>
        </View>
        <Text className='font-inter-semibold text-3xl text-white'>₹ 41,538</Text>
      </View>
    </MaskedView>
  );
};

export default WalletCard;
