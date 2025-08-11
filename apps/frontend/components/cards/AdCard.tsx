import { icons } from '@/assets';
import { ComponentStrings } from '@/constants';
import { useCrypto, useFiat } from '@/hooks';
import { useProfileStore } from '@/store';
import { capitalizeWords, currencyFormatter, getMockUserName } from '@/utils';
import cn from 'clsx';
import { Image, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { InitialsAvatar } from '../avatars';
import { PayMethodBadge } from '../badges';
import { DividerX } from '../dividers';
import { adCardAnimConfig } from './animations';

const AdCard = (props: AdCardProps) => {
  const isBuy = props.ad.type === 'buy';
  const isDark = useColorScheme() === 'dark';

  const { cryptoLabels } = useCrypto();
  const { profile } = useProfileStore();
  const { defaultFiat, fiatSymbols } = useFiat();
  const animationCombo = adCardAnimConfig[props.animationStyle ?? 'default'](isBuy, props.index);

  const isMyAd = props.ad.userId === profile?.id;

  return (
    <Animated.View className='ad-card-wrapper' entering={animationCombo.entering} exiting={animationCombo.exiting}>
      {/* Card Header */}
      <View className='ad-card-header-wrapper'>
        <View className='ad-card-info-wrapper'>
          <View className='ad-card-info'>
            <InitialsAvatar
              name={props.ad.userFullName}
              textStyle='absolute font-clashDisplay-medium text-[6px] text-on-surface-light dark:text-base-white'
              containerStyle='bg-base-surface-light dark:bg-base-surface-dark size-7'
            />
            <Text className='ad-card-txt text-sm'>{getMockUserName(props.ad.userFullName)}</Text>
          </View>

          <View className='ad-card-rating'>
            <Image source={isDark ? icons.dark.likeTag : icons.light.likeTag} className='size-4' resizeMode='contain' />
            <Text className='ad-card-txt-muted text-[8px]'>{props.ad.userCompletionRate.toFixed(0)}%</Text>
          </View>
        </View>
      </View>

      {/* Card Content */}
      <View className='ad-card-content-wrapper'>
        <View className='ad-card-content-left py-1.5'>
          <View className='ad-card-price'>
            <View className='ad-card-amount-label'>
              <Text className='ad-card-txt-muted text-[10px]'>{ComponentStrings.AdCard.UNIT_PRICE_LABEL}</Text>
              <View className='ad-card-header-badge-bg'>
                <Text className='ad-card-header-badge-txt'>{cryptoLabels[props.ad.cryptoId]}</Text>
              </View>
            </View>

            <View className='ad-card-amount-group'>
              <Text className='ad-card-txt-md'>
                {fiatSymbols[props.ad.fiatId] ?? ''} {currencyFormatter.format(props.ad.price).split('.')[0]}.
              </Text>
              <Text className='ad-card-txt text-sm'>{currencyFormatter.format(props.ad.price).split('.')[1]}</Text>
            </View>
          </View>

          <View className='ad-card-stats'>
            <View className='ad-card-stats-group'>
              <Image
                source={isDark ? icons.dark.inactive.receipt : icons.light.inactive.receipt}
                className='size-4'
                resizeMode='contain'
              />
              <Text className='ad-card-txt-muted text-[8px]'>
                {currencyFormatter.format(props.ad.userTotalTrades).split('.')[0]}{' '}
                {ComponentStrings.AdCard.STATS_TRADES_SUFFIX}
              </Text>
            </View>

            <View className='ad-card-stats-group'>
              <Image
                source={isDark ? icons.dark.tickSquare : icons.light.tickSquare}
                className='size-4'
                resizeMode='contain'
              />
              <Text className='ad-card-txt-muted text-[8px]'>
                {props.ad.userCompletionRate.toFixed(0)}
                {ComponentStrings.AdCard.STATS_COMPLETION_SUFFIX}
              </Text>
            </View>
          </View>
        </View>

        <View className='ad-card-content-right'>
          <View className='ad-card-release-time'>
            <Image source={isDark ? icons.dark.clock : icons.light.clock} className='size-4' resizeMode='contain' />
            <Text className='ad-card-txt-muted-semi text-[10px]'>{props.ad.releaseTime}</Text>
          </View>

          <View className='ad-card-btn-wrapper'>
            <TouchableOpacity
              disabled={isMyAd}
              className={cn(
                'ad-card-btn',
                props.ad.type === 'buy' ? 'bg-success-500' : 'bg-error-500',
                isMyAd && 'bg-card dark:bg-card-dark',
              )}
            >
              <Text className={cn('ad-card-btn-label', isMyAd && 'text-label dark:text-label-dark')}>
                {isMyAd ? 'My Ad' : capitalizeWords(props.ad.type)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Card Footer */}
      {props.ad.payMethodIds && Boolean(props.ad.payMethodIds.length) && (
        <View className='ad-card-footer'>
          <View className='my-px flex-row justify-center'>
            <DividerX style='w-2/6' />
          </View>
          <View className='ad-card-pay-methods'>
            {props.ad.payMethodIds.map((item: string, index: number) => (
              <PayMethodBadge key={index} payMethodId={item} />
            ))}
          </View>
        </View>
      )}
    </Animated.View>
  );
};

export default AdCard;
