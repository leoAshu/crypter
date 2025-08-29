import { icons } from '@/assets';
import { AccountInfo, ChipFilter, DividerX, ReviewCard } from '@/components';
import { useProfile, useReviews } from '@/hooks';
import cn from 'clsx';
import { useEffect, useState } from 'react';
import { FlatList, Image, Platform, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FeedbackEmptyState = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View className='items-center gap-y-4 py-12'>
      <Image
        source={isDark ? icons.dark.messageFav : icons.light.messageFav}
        className='size-32'
        resizeMode='contain'
      />

      <View className='items-center gap-y-2'>
        <Text className='font-clashDisplay text-lg text-body dark:text-body-dark'>No Feedback Yet</Text>
        <Text className='font-satoshi text-sm text-label dark:text-label-dark'>
          Feedback from other users will appear here
        </Text>
      </View>
    </View>
  );
};

const Feedback = () => {
  const isDark = useColorScheme() === 'dark';

  const { profile } = useProfile();
  const { reviewTypeFilterItems, filterReviewsByType } = useReviews();

  const [reviewType, setReviewType] = useState<FilterItem>(reviewTypeFilterItems[0]);
  const [reviewsList, setReviewsList] = useState<Review[]>(filterReviewsByType(reviewType.id));

  const adsListStyle = Platform.select({
    ios: 'pb-20',
    android: 'pb-24',
  });

  const isEmpty = reviewsList.length === 0;
  const isAllEmpty = filterReviewsByType('all').length === 0;

  useEffect(() => {
    setReviewsList(filterReviewsByType(reviewType.id));
  }, [reviewType]);

  return (
    <SafeAreaView className='screen-wrapper' edges={['bottom']}>
      <View className='content-wrapper mt-4'>
        <View className='gap-y-4'>
          <AccountInfo name={profile?.firstName ?? ''} username={profile?.username ?? ''} />

          <ChipFilter value={reviewType} items={reviewTypeFilterItems} onChange={(val) => setReviewType(val)} />
        </View>

        <FlatList
          data={reviewsList}
          initialNumToRender={0}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerClassName={adsListStyle}
          renderItem={({ item, index }) => <ReviewCard review={item} index={index} />}
          ItemSeparatorComponent={() => <DividerX style={cn('mt-3 mb-4', isDark ? 'opacity-40' : 'opacity-25')} />}
          ListFooterComponent={
            !isEmpty ? () => <DividerX style={cn('mt-3', isDark ? 'opacity-40' : 'opacity-25')} /> : null
          }
          ListEmptyComponent={isAllEmpty ? <FeedbackEmptyState /> : null}
        />
      </View>
    </SafeAreaView>
  );
};

export default Feedback;
