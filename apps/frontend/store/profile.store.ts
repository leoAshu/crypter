import { createProfile, getProfile, updateProfile } from '@/utils';
import { create } from 'zustand';

const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  isLoading: false,

  createProfile: async (profile: Profile) => {
    set({ isLoading: true });

    try {
      await createProfile(profile);
      set({ profile });
    } catch (err: any) {
      console.log('createProfile error', err);
      throw new Error(err.message);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProfile: async (userId: string) => {
    set({ isLoading: true });

    try {
      const profile = await getProfile(userId);
      set({ profile });
    } catch (err: any) {
      console.log('fetchProfile error', err);
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (userId: string, updates: Partial<Profile>) => {
    set({ isLoading: true });

    try {
      if (!userId) throw new Error('No authenticated user');

      await updateProfile(userId, updates);
      const profile = await getProfile(userId);
      set({ profile: profile });
    } catch (err: any) {
      console.log('updateProfile error', err);
      throw new Error(err);
    } finally {
      set({ isLoading: false });
    }
  },

  resetProfile: () => set({ profile: null }),
}));

export default useProfileStore;
