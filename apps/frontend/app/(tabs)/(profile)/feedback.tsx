import { AccountInfo, ChipFilter, DividerX, ReviewCard } from '@/components';
import { screenContentWrapperStyle } from '@/constants';
import { useReviews } from '@/hooks';
import { useProfileStore } from '@/store';
import cn from 'clsx';
import { useEffect, useState } from 'react';
import { FlatList, Platform, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Feedback = () => {
  const isDark = useColorScheme() === 'dark';

  const { profile } = useProfileStore();
  const { reviewTypeFilterItems, filterReviewsByType } = useReviews();

  const [reviewType, setReviewType] = useState<FilterItem>(reviewTypeFilterItems[0]);
  const [reviewsList, setReviewsList] = useState<Review[]>(filterReviewsByType(reviewType.id));

  const adsListStyle = Platform.select({
    ios: 'pb-20',
    android: 'pb-24',
  });

  useEffect(() => {
    setReviewsList(filterReviewsByType(reviewType.id));
  }, [reviewType]);

  return (
    <SafeAreaView className='screen-wrapper'>
      <View className={cn('content-wrapper gap-y-4', screenContentWrapperStyle)}>
        <View className='gap-y-4'>
          <AccountInfo name={profile?.name ?? ''} username={profile?.name ?? ''} />

          <ChipFilter value={reviewType} items={reviewTypeFilterItems} onChange={(val) => setReviewType(val)} />
        </View>

        <FlatList
          data={reviewsList}
          initialNumToRender={0}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id.toString()}
          contentContainerClassName={adsListStyle}
          renderItem={({ item, index }) => <ReviewCard review={item} index={index} />}
          ItemSeparatorComponent={() => <DividerX style={cn('mt-3 mb-4', isDark ? 'opacity-40' : 'opacity-25')} />}
          ListFooterComponent={() => <DividerX style={cn('mt-3', isDark ? 'opacity-40' : 'opacity-25')} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Feedback;
