const reviewToDbMap: Record<keyof Review, string> = {
  id: 'id',
  orderId: 'order_id',
  fromUserId: 'from_user_id',
  toUserId: 'to_user_id',
  type: 'type',
  review: 'review',
  createdAt: 'created_at',
  fromUsername: 'from_username',
  fromFirstName: 'from_first_name',
  fromLastName: 'from_last_name',
  fromAvatarUrl: 'from_avatar_url',
  fromVerified: 'from_verified',
};

const dbToReviewMap: Record<string, keyof Review> = Object.entries(reviewToDbMap).reduce(
  (acc, [camelKey, snakeKey]) => {
    acc[snakeKey] = camelKey as keyof Review;
    return acc;
  },
  {} as Record<string, keyof Review>,
);

// snake_case → camelCase
const convertToReviewKeys = (obj: Record<string, any>): Review => {
  return Object.entries(obj).reduce((acc, [snakeKey, value]) => {
    const camelKey = dbToReviewMap[snakeKey];
    if (camelKey) acc[camelKey] = value;
    return acc;
  }, {} as Partial<Review>) as Review;
};

export { convertToReviewKeys };
