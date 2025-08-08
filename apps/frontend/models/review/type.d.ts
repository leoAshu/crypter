interface Review {
  id: string;
  orderId: string;
  fromUserId: string;
  toUserId: string;
  type: ReviewType;
  review: string;
  createdAt: string;
  verified: boolean;
}
