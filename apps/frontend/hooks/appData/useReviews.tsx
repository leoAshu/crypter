import { ReviewType } from '@/models';
import { useReviewStore } from '@/store';
import { capitalizeWords } from '@/utils';
import { useMemo } from 'react';

const useReviews = () => {
  const { reviews } = useReviewStore();

  const reviewTypes = Object.values(ReviewType);

  const reviewTypeFilterItems: FilterItem[] = useMemo(
    () => [{ id: 'all', label: 'All' }, ...reviewTypes.map((e) => ({ id: e, label: capitalizeWords(e) }))],
    [reviewTypes],
  );

  return {
    reviews,
    reviewTypes,
    reviewTypeFilterItems,
  };
};

export default useReviews;
