import { useProfileStore } from '@/store';

const useProfile = () => {
  const { profile, isLoading, updateProfile } = useProfileStore();

  return {
    profile,
    isLoading,
    updateProfile,
  };
};

export default useProfile;
