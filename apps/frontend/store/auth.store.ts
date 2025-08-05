import { getUser, signIn, signOut, signUp } from '@/utils';
import { create } from 'zustand';
import useCryptoStore from './crypto.store';
import useProfileStore from './profile.store';

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) => set({ user }),
  setIsLoading: (value) => set({ isLoading: value }),
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),

  signup: async (signUpParams: SignUpParams) => {
    set({ isLoading: true });

    try {
      await signUp({ ...signUpParams });
      const user = await getUser();

      if (user) {
        const profile: Profile = {
          id: user.id,
          name: signUpParams.name,
          verified: false,
          avatarUrl: '',
          createdAt: user.created_at,
        };

        await useCryptoStore.getState().fetchCryptos();
        await useProfileStore.getState().createProfile(profile);
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
        await useCryptoStore.getState().fetchCryptos();
        await useProfileStore.getState().fetchProfile(user.id);
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
        await useCryptoStore.getState().fetchCryptos();
        await useProfileStore.getState().fetchProfile(user.id);
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
