import { ReviewType } from '@/models';
import { capitalizeWords } from '@/utils';
import { useMemo } from 'react';

const useReviews = () => {
  const reviews: Review[] = [
    {
      id: 'r1',
      fromUserId: 'Mano Test',
      toUserId: 'Ashutosh Ojha',
      orderId: 'o1',
      review: 'A fast and reliable person. I recommend always',
      type: ReviewType.Positive,
      createdAt: '2025-08-03',
      verified: true,
    },
  ];

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
