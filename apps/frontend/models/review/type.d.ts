interface Review {
  id: string;
  orderId: string;
  fromUserId: string;
  toUserId: string;
  type: ReviewType;
  review: string;
  createdAt: string;
  fromUsername: string;
  fromFirstName: string;
  fromLastName: string;
  fromAvatarUrl: string;
  fromVerified: boolean;
}
