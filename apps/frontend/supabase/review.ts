import supabaseClient from './client';
import { convertToReviewKeys } from './mapUtils';

const fetchReviews = async (userId: string): Promise<Review[]> => {
  const { data, error } = await supabaseClient.from('reviews_details').select('*').eq('to_user_id', userId);

  if (error) throw new Error(error.message);
  const reviews = data.map((review) => convertToReviewKeys(review));

  return reviews;
};

export { fetchReviews };
