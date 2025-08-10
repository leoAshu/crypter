import { icons } from '@/assets';
import { ReviewType } from '@/models';
import { formatDateTime, getMockUserName } from '@/utils';
import { Image, Text, useColorScheme, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { InitialsAvatar } from '../avatars';

const ReviewCard = (props: ReviewCardProps) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <Animated.View
      className='gap-y-3'
      entering={FadeIn.duration(200).delay(props.index * 50)}
      exiting={FadeOut.duration(150).delay(props.index * 50)}
    >
      <View className='flex-row items-center justify-between px-2'>
        <View className='flex-row items-center gap-x-2'>
          <InitialsAvatar
            name={props.review.fromName}
            textStyle='absolute font-clashDisplay-medium text-[7px] text-title dark:text-title-dark'
            containerStyle='bg-card-info dark:bg-card-dark size-5'
          />
          <Text className='font-clashDisplay text-xs text-title dark:text-title-dark'>
            @{getMockUserName(props.review.fromName)}
          </Text>
          <Image
            source={
              props.review.fromVerified
                ? isDark
                  ? icons.dark.verifyGold
                  : icons.light.verifyGold
                : isDark
                  ? icons.dark.verify
                  : icons.light.verify
            }
            className='size-4'
            resizeMode='contain'
          />
        </View>

        <Image
          source={
            props.review.type === ReviewType.Positive
              ? isDark
                ? icons.dark.active.like
                : icons.light.active.like
              : isDark
                ? icons.dark.active.dislike
                : icons.light.active.dislike
          }
          className='size-4'
          resizeMode='contain'
        />
      </View>

      <View className='gap-y-2 px-3'>
        <Text className='font-satoshi text-xs text-body dark:text-body-dark'>{props.review.review}</Text>

        <Text className='font-satoshi-medium text-[8px] text-label dark:text-label-dark'>
          {formatDateTime(props.review.createdAt).split(' ')[0]}
        </Text>
      </View>
    </Animated.View>
  );
};

export default ReviewCard;
