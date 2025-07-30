import { images } from '@/assets';
import { currencyFormatter } from '@/utils';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { InitialsAvatar } from '../avatars';
import { PaymentBadge } from '../badges';

const AdCard = (props: any) => {
  return (
    <View className='ad-card-wrapper mb-[10px]'>
      {/* Card Header */}
      <View className='ad-card-header-wrapper'>
        <View className='ad-card-header-info'>
          <InitialsAvatar name={props.user.name} size='xs' />
          <Text className='ad-card-txt text-xs'>{props.user.name}</Text>
        </View>

        <View className='ad-card-header-stats'>
          <View className='ad-card-header-trade-stats'>
            <Text className='ad-card-txt-muted text-xs'>
              {currencyFormatter.format(props.user.trades).split('.')[0]} Trades
            </Text>
            <View className='bg-muted-divider'></View>
            <Text className='ad-card-txt-muted text-xs'>{props.user.successRate.toFixed(2)}%</Text>
          </View>
          <View className='ad-card-header-rating'>
            <Text className='ad-card-txt-muted text-xs'>{props.user.rating.toFixed(2)}%</Text>
            <Image source={images.like} className='size-3' resizeMode='contain' tintColor='#969AA0' />
          </View>
        </View>

        <View className='ad-card-divider'></View>
      </View>

      {/* Card Content */}
      <View className='ad-card-content-wrapper'>
        <View className='ad-card-content-left'>
          <View className='ad-card-price-row'>
            <Text className='ad-card-txt text-lg'>₹</Text>
            <View className='ad-card-amount-group'>
              <Text className='ad-card-txt-md text-2xl'>
                {currencyFormatter.format(props.pricePerUnit).split('.')[0]}.
              </Text>
              <Text className='ad-card-txt text-lg'>{currencyFormatter.format(props.pricePerUnit).split('.')[1]}</Text>
            </View>

            <Text className='ad-card-txt-muted-semi text-xs'>/USDT</Text>
          </View>

          <View className='ad-card-limits'>
            <View className='ad-card-limits-row'>
              <Text className='ad-card-txt-muted text-xs'>Limit</Text>
              <Text className='ad-card-txt text-xs'>
                ₹ {currencyFormatter.format(props.minLimit).split('.')[0]} -{' '}
                {currencyFormatter.format(props.maxLimit).split('.')[0]}
              </Text>
            </View>

            <View className='ad-card-limits-row'>
              <Text className='ad-card-txt-muted text-xs'>Available</Text>
              <Text className='ad-card-txt text-xs'>{currencyFormatter.format(props.available)} USDT</Text>
            </View>
          </View>
        </View>

        <View className='ad-card-content-right'>
          <View className='ad-card-release-time'>
            <Image source={images.stopwatch} className='size-3' tintColor='#969AA0' resizeMode='contain' />
            <Text className='ad-card-txt-muted-semi text-xs'>{props.releaseTime}</Text>
          </View>
        </View>
      </View>

      {/* Card Footer */}
      <View className='ad-card-footer'>
        <View className='ad-card-payment-methods'>
          {props.paymentMethods.map((item: string, index: number) => (
            <PaymentBadge key={index} paymentName={item} />
          ))}
        </View>

        <View className='ad-card-footer-btn-wrapper'>
          <TouchableOpacity className='ad-card-footer-btn bg-success-dark'>
            <Text className='ad-card-footer-btn-label'>Buy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AdCard;
