interface Review {
  id: string;
  orderId: string;
  fromUserId: string;
  toUserId: string;
  type: ReviewType;
  review: string;
  createdAt: string;
  fromName: string;
  fromAvatarUrl: string;
  fromVerified: boolean;
}
