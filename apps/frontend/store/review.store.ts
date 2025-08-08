import { fetchReviews } from '@/supabase/review';
import { create } from 'zustand';

interface ReviewState {
  reviews: Review[];
  isLoading: boolean;

  fetchReviews: (userId: string) => Promise<void>;
}

const useReviewStore = create<ReviewState>((set) => ({
  reviews: [],
  isLoading: false,

  fetchReviews: async (userId: string) => {
    set({ isLoading: true });

    try {
      const reviews = await fetchReviews(userId);
      set({ reviews });
    } catch (error: any) {
      console.log('fetchReceivedReview error', error);
      throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useReviewStore;
