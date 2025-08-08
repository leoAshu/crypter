import { AccountInfo, ChipFilter, ReviewCard } from '@/components';
import { screenContentWrapperStyle } from '@/constants';
import { useReviews } from '@/hooks';
import { useProfileStore } from '@/store';
import cn from 'clsx';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Feedback = () => {
  const { profile } = useProfileStore();
  const { reviews, reviewTypeFilterItems } = useReviews();

  const [feedbackType, setFeedbackType] = useState<FilterItem>(reviewTypeFilterItems[0]);

  return (
    <SafeAreaView className='screen-wrapper'>
      <ScrollView>
        <View className={cn('content-wrapper gap-y-4', screenContentWrapperStyle)}>
          <AccountInfo name={profile?.name ?? ''} username={profile?.name ?? ''} />

          <ChipFilter value={feedbackType} items={reviewTypeFilterItems} onChange={(val) => setFeedbackType(val)} />

          <ReviewCard review={reviews[0]} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feedback;
