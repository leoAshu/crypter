import { allFilterItem } from '@/constants';
import { ReviewType } from '@/models';
import { useReviewStore } from '@/store';
import { capitalizeWords } from '@/utils';
import { useMemo } from 'react';

const useReviews = () => {
  const { reviews } = useReviewStore();

  const reviewTypes = Object.values(ReviewType);

  const reviewTypeFilterItems: FilterItem[] = useMemo(
    () => [allFilterItem, ...reviewTypes.map((e) => ({ id: e, label: capitalizeWords(e) }))],
    [reviewTypes],
  );

  const filterReviewsByType = useMemo(
    () => (type: string) =>
      reviews.filter((r) => {
        if (type === allFilterItem.id) return true;

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
