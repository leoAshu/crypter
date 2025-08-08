import { AccountInfo, ChipFilter } from '@/components';
import { screenContentWrapperStyle } from '@/constants';
import { useFeedback } from '@/hooks';
import { useProfileStore } from '@/store';
import cn from 'clsx';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Feedback = () => {
  const { profile } = useProfileStore();
  const { feedbackTypeFilterItems } = useFeedback();

  const [feedbackType, setFeedbackType] = useState<FilterItem>(feedbackTypeFilterItems[0]);

  return (
    <SafeAreaView className='screen-wrapper'>
      <ScrollView>
        <View className={cn('content-wrapper gap-y-4', screenContentWrapperStyle)}>
          <AccountInfo name={profile?.name ?? ''} username={profile?.name ?? ''} />

          <ChipFilter value={feedbackType} items={feedbackTypeFilterItems} onChange={(val) => setFeedbackType(val)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feedback;
