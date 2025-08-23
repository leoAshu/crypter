import { KycStatus, RequirementStatus } from '@/models';
import { create } from 'zustand';
import useAuthStore from './auth.store';
import useProfileStore from './profile.store';

const useKycStore = create<KycState>((set) => ({
  kyc: null,
  isLoading: false,

  fetchKyc: async () => {
    set({ isLoading: true });

    try {
      const profile = useProfileStore.getState().profile;
      const user = useAuthStore.getState().user;
      set({
        kyc: {
          id: 'kyc-1',
          userId: profile?.id ?? '',
          name: profile?.name ?? '',
          email: user?.email,
          phone: user?.user_metadata?.phone,
          address: '',
          countryId: '',
          emailStatus: RequirementStatus.NotVerified,
          phoneStatus: RequirementStatus.NotVerified,
          identityStatus: RequirementStatus.NotVerified,
          idProof: '',
          addressProof: '',
          kycStatus: KycStatus.Incomplete,
        },
      });
    } catch (error: any) {
      console.log('fetchKyc error', error);
      throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  updateKyc: async (updates: Partial<Kyc>) => {
    set({ isLoading: true });

    try {
      set((state) => ({ kyc: state.kyc ? { ...state.kyc, ...updates } : null }));
    } catch (error: any) {
      console.log('updateKyc error', error);
      throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useKycStore;
