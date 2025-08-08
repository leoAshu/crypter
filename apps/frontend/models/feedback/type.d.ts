import { FeedbackType } from '.';

interface Feedback {
  id: string;
  orderId: string;
  fromUserId: string;
  toUserId: string;
  type: FeedbackType;
  review: string;
  createdAt: string;
}
