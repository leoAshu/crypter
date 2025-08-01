import { icons, images } from '@/assets';
import { cryptoLabels } from '@/models';
import { capitalizeWords, currencyFormatter } from '@/utils';
import cn from 'clsx';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { InitialsAvatar } from '../avatars';
import { PaymentBadge } from '../badges';
import { adCardAnimConfig } from './animations';

const AdCard = (props: AdCardProps) => {
  const isBuy = props.ad.type === 'buy';
  const animationCombo = adCardAnimConfig[props.animationStyle ?? 'default'](isBuy, props.index);

  return (
    <Animated.View className='ad-card-wrapper' entering={animationCombo.entering} exiting={animationCombo.exiting}>
      {/* Card Header */}
      <View className='ad-card-header-wrapper'>
        <View className='ad-card-info-wrapper'>
          <View className='ad-card-info'>
            <InitialsAvatar
              name={props.ad.user.name}
              textStyle='absolute text-sm font-clashDisplay-medium'
              containerStyle='bg-[#D9D9D9] size-5'
            />
            <Text className='ad-card-txt'>{props.ad.user.name}</Text>
          </View>

          <View className='ad-card-header-rating'>
            <Image source={icons.dark.likeTag} className='size-4' resizeMode='contain' />
            <Text className='ad-card-txt-muted text-xs'>{props.ad.user.rating.toFixed(0)}%</Text>
          </View>

          {/* <View className='ad-card-info justify-between'>
            <Text className='ad-card-txt-muted text-xs'>Quantity</Text>
            <Text className='ad-card-txt font-satoshi-medium text-xs'>
              {currencyFormatter.format(props.ad.available)} {cryptoLabels[props.ad.cryptoId]}
            </Text>
          </View> */}
        </View>

        {/* <View className='ad-card-header-stats'>
          <View className='ad-card-header-trade'>
            <View className='ad-card-header-stats-group'>
              <Image source={images.receipt} className='size-4' resizeMode='contain' tintColor='#969AA0' />
              <Text className='ad-card-txt-muted text-xs'>
                {currencyFormatter.format(props.ad.user.trades).split('.')[0]} Trades
              </Text>
            </View>

            <View className='bg-muted-divider'></View>

            <View className='ad-card-header-stats-group'>
              <Image source={images.tickSquare} className='size-4' resizeMode='contain' tintColor='#969AA0' />
              <Text className='ad-card-txt-muted text-xs'>{props.ad.user.successRate.toFixed(0)}% Completion</Text>
            </View>
          </View>

          <View className='ad-card-header-rating'>
            <Image source={images.rating} className='size-3' resizeMode='contain' tintColor='#969AA0' />
            <Text className='ad-card-txt-muted text-xs'>{props.ad.user.rating.toFixed(0)}%</Text>
          </View>
        </View>

        <View className='ad-card-divider'></View> */}
      </View>

      {/* Card Content */}
      <View className='ad-card-content-wrapper'>
        <View className='ad-card-content-left'>
          <View className='ad-card-price'>
            <View className='flex-row items-center gap-x-1'>
              <Text className='ad-card-txt-muted text-sm'>Price per unit </Text>
              <Text className='ad-card-txt-muted rounded-sm bg-base-black/10 px-2 py-1 text-sm text-neutral-700 dark:bg-base-white/20 dark:text-neutral-300'>
                {cryptoLabels[props.ad.cryptoId]}
              </Text>
            </View>

            <View className='ad-card-amount-group'>
              <Text className='ad-card-txt-md text-2xl'>
                ₹ {currencyFormatter.format(props.ad.pricePerUnit).split('.')[0]}.
              </Text>
              <Text className='ad-card-txt text-lg'>
                {currencyFormatter.format(props.ad.pricePerUnit).split('.')[1]}
              </Text>
            </View>
          </View>

          <View className='ad-card-limits'>
            <View className='ad-card-limits-row'>
              <Text className='ad-card-txt-muted text-xs'>Limit</Text>
              <Text className='ad-card-txt text-xs'>
                {currencyFormatter.format(props.ad.minLimit).split('.')[0]} -{' '}
                {currencyFormatter.format(props.ad.maxLimit).split('.')[0]} INR
              </Text>
            </View>

            <View className='ad-card-limits-row'></View>
          </View>
        </View>

        <View className='ad-card-content-right'>
          <View className='ad-card-release-time'>
            <Image source={images.stopwatch} className='size-3' tintColor='#969AA0' resizeMode='contain' />
            <Text className='ad-card-txt-muted-semi text-xs'>{props.ad.releaseTime}</Text>
          </View>
        </View>
      </View>

      {/* Card Footer */}
      <View className='ad-card-footer'>
        <View className='ad-card-payment-methods'>
          {props.ad.paymentMethods.map((item: string, index: number) => (
            <PaymentBadge key={index} paymentName={item} />
          ))}
        </View>

        <View className='ad-card-footer-btn-wrapper'>
          <TouchableOpacity
            className={cn('ad-card-footer-btn', props.ad.type === 'buy' ? 'bg-success-500' : 'bg-error-500')}
          >
            <Text className='ad-card-footer-btn-label'>{capitalizeWords(props.ad.type)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default AdCard;
