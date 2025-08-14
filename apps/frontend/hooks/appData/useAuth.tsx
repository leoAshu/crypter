import { useAuthStore } from '@/store';

const useAuth = () => {
  const { user, isAuthenticated, isLoading, signup, signin, signout, fetchAuthenticatedUser } = useAuthStore();

  return {
    user,
    isLoading,
    isAuthenticated,
    signup,
    signin,
    signout,
    fetchAuthenticatedUser,
  };
};

export default useAuth;
