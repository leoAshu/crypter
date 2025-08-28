import { create } from 'zustand';
import useAdStore from './ad.store';
import useCountryStore from './country.store';
import useCryptotore from './crypto.store';
import usePayMethodTypeStore from './payMethodType.store';

const useAppDataStore = create<AppDataState>((set) => ({
  isLoading: false,

  fetchAppData: async () => {
    set({ isLoading: true });

    try {
      await useAdStore.getState().fetchAds();
      await useCryptotore.getState().fetchCryptos();
      await useCountryStore.getState().fetchCountries();
      await usePayMethodTypeStore.getState().fetchPayMethodTypes();
    } catch (error: any) {
      console.log('fetchAppData error', error);
      throw new Error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAppDataStore;
