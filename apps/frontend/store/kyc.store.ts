import { KycStatus, RequirementStatus } from '@/models';
import { delay } from '@/utils';
import { create } from 'zustand';
import useProfileStore from './profile.store';

const useKycStore = create<KycState>((set) => ({
  kyc: null,
  isLoading: false,

  fetchKyc: async () => {
    set({ isLoading: true });

    try {
      const profile = useProfileStore.getState().profile;
      set({
        kyc: {
          id: 'kyc-1',
          userId: profile?.id ?? '',
          name: `${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`,
          email: profile?.email ?? '',
          phone: profile?.phone ?? '',
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

  verifyOtp: async (code: string) => {
    set({ isLoading: true });

    let verificationResult = false;
    try {
      await delay(1500);

      verificationResult = code === '6230';
    } catch (error: any) {
      console.log('verifyOtp error', error);
      throw new Error(error.message);
    } finally {
      set({ isLoading: false });
      return verificationResult;
    }
  },
}));

export default useKycStore;
