import { getUser, signIn, signOut, signUp, updateUser } from '@/utils';
import { create } from 'zustand';

const useAuthStore = create<AuthState>((set) => ({
  isLoading: true,
  isAuthenticated: false,
  user: null,

  setIsLoading: (value) => set({ isLoading: value }),
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setUser: (user) => set({ user }),

  fetchAuthenticatedUser: async () => {
    set({ isLoading: true });

    try {
      const user = await getUser();

      if (user) {
        set({ isAuthenticated: true, user: user });
      } else {
        set({ isAuthenticated: false, user: null });
      }
    } catch (err) {
      console.log('fetchAuthenticatedUser error', err);
      set({ isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (newInfo: UpdateUserParams) => {
    set({ isLoading: true });

    try {
      await updateUser({ ...newInfo });
      const user = await getUser();
      if (user) {
        set({ user: user });
      } else {
        set({ isAuthenticated: false, user: null });
      }
    } catch (err) {
      console.log('updateUserProfile error', err);
      throw new Error(err as any);
    } finally {
      set({ isLoading: false });
    }
  },

  signout: async () => {
    set({ isLoading: true });

    try {
      await signOut();
      set({ isAuthenticated: false, user: null });
    } catch (err) {
      console.log('logout error', err);
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

  signup: async (signUpParams: SignUpParams) => {
    set({ isLoading: true });

    try {
      await signUp({ ...signUpParams });
      const user = await getUser();
      if (user) {
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
}));

export default useAuthStore;
