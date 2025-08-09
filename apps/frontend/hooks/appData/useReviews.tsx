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

  const filterReviewsByType = useMemo(
    () => (type: string) =>
      reviews.filter((r) => {
        if (type === 'all') return true;

        return r.type === type;
      }),
    [reviews],
  );

  return {
    reviews,
    reviewTypes,
    reviewTypeFilterItems,
    filterReviewsByType,
  };
};

export default useReviews;
