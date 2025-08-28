import { getUser, signIn, signOut, signUp } from '@/supabase';
import { create } from 'zustand';
import useKycStore from './kyc.store';
import usePayMethodStore from './payMethod.store';
import useProfileStore from './profile.store';
import useReviewStore from './review.store';
import useStatsStore from './stats.store';

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) => set({ user }),
  setIsLoading: (value) => set({ isLoading: value }),
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),

  signup: async (signUpParams: SignUpParams, profileData: Partial<Profile>) => {
    set({ isLoading: true });

    try {
      await signUp({ ...signUpParams });
      const user = await getUser();

      if (user) {
        const profile: Profile = {
          id: user.id,
          username: profileData.username!,
          firstName: profileData.firstName!,
          lastName: profileData.lastName!,
          email: profileData.email!,
          phoneCountryId: profileData.phoneCountryId!,
          phone: profileData.phone!,
          verified: false,
          avatarUrl: '',
          createdAt: user.created_at,
        };
        await useProfileStore.getState().createProfile(profile);

        await useKycStore.getState().fetchKyc();
        await useStatsStore.getState().createStats(user.id);
        await useStatsStore.getState().fetchStats(user.id);
        await useReviewStore.getState().fetchReviews(user.id);
        await usePayMethodStore.getState().fetchPayMethods(user.id);
        set({ isAuthenticated: true, user: user });
      } else {
        set({ isAuthenticated: false, user: null });
      }
    } catch (err) {
      console.log('signup error', err);
      throw new Error(err as any);
    } finally {
      set({ isLoading: false });
    }
  },

  signin: async (signInParams: SignInParams) => {
    set({ isLoading: true });

    try {
      await signIn({ ...signInParams });
      const user = await getUser();

      if (user) {
        await useKycStore.getState().fetchKyc();
        await useStatsStore.getState().fetchStats(user.id);
        await useProfileStore.getState().fetchProfile(user.id);
        await useReviewStore.getState().fetchReviews(user.id);
        await usePayMethodStore.getState().fetchPayMethods(user.id);
        set({ isAuthenticated: true, user: user });
      } else {
        set({ isAuthenticated: false, user: null });
      }
    } catch (err) {
      console.log('signin error', err);
      throw new Error(err as any);
    } finally {
      set({ isLoading: false });
    }
  },

  signout: async () => {
    set({ isLoading: true });

    try {
      await signOut();
      useProfileStore.getState().resetProfile();
      set({ isAuthenticated: false, user: null });
    } catch (err) {
      console.log('logout error', err);
      throw new Error(err as any);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAuthenticatedUser: async () => {
    set({ isLoading: true });

    try {
      const user = await getUser();

      if (user) {
        await useKycStore.getState().fetchKyc();
        await useStatsStore.getState().fetchStats(user.id);
        await useReviewStore.getState().fetchReviews(user.id);
        await useProfileStore.getState().fetchProfile(user.id);
        await usePayMethodStore.getState().fetchPayMethods(user.id);
        set({ isAuthenticated: true, user: user });
      } else {
        set({ isAuthenticated: false, user: null });
        useProfileStore.getState().resetProfile();
      }
    } catch (err) {
      console.log('fetchAuthenticatedUser error', err);
      set({ isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
