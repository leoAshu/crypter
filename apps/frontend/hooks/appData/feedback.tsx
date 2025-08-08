import { FeedbackType } from '@/models';
import { capitalizeWords } from '@/utils';
import { useMemo } from 'react';

const useFeedback = () => {
  const feedbackTypes = Object.values(FeedbackType);

  const feedbackTypeFilterItems: FilterItem[] = useMemo(
    () => [{ id: 'all', label: 'All' }, ...feedbackTypes.map((e) => ({ id: e, label: capitalizeWords(e) }))],
    [feedbackTypes],
  );

  return {
    feedbackTypes,
    feedbackTypeFilterItems,
  };
};

export default useFeedback;
