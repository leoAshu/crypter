import { getUser } from '@/utils';
import { create } from 'zustand';

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  user: null,

  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setIsLoading: (value) => set({ isLoading: value }),
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
}));

export default useAuthStore;
