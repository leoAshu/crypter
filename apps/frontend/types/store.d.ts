interface AuthState {
  user: User;
  isLoading: boolean;
  isAuthenticated: boolean;

  setUser: (user: User | null) => void;
  setIsLoading: (value: boolean) => void;
  setIsAuthenticated: (value: boolean) => void;

  signup: (signUpParams: SignUpParams) => Promise<void>;
  signin: (signInParams: SignInParams) => Promise<void>;
  signout: () => Promise<void>;
  fetchAuthenticatedUser: () => Promise<void>;
}

interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;

  createProfile: (profile: Profile) => Promise<void>;
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (userId: string, updates: Partial<Profile>) => Promise<void>;
  resetProfile: () => void;
}

interface CryptoState {
  cryptos: CryptoCurrency[];
  p2pCryptos: CryptoCurrency[];
  isLoading: boolean;

  fetchCryptos: () => Promise<void>;
}

interface StatState {
  stats: Stats | null;
  isLoading: boolean;

  fetchStats: (userId: string) => Promise<void>;
}

interface BalanceState {
  available: number;
  escrowed: number;
}

interface WalletState {
  address: string;
  balances: Record<string, BalanceState>;

  deposit: (assetId: string, amount: number) => void;
}

interface FiatState {
  fiats: FiatCurrency[];
  isLoading: boolean;
  defaultFiat: FiatCurrency | null;

  setDefaultFiat: (fiat: FiatCurrency) => void;

  fetchFiats: () => Promise<void>;
}

interface AdState {
  ads: Ad[];
  isLoading: boolean;

  fetchAds: () => Promise<void>;
  updateAdStatus: (adId: string, isActive: boolean) => Promise<void>;
}

interface MarketState {
  tickers: Record<string, Ticker>;
  isLoading: boolean;

  fetchTickers: (cryptoIds: string[], fiatId: string) => Promise<void>;
  startPolling: (interval?: number, cryptoIds: string[], fiatId: string) => void;
  stopPolling: () => void;
}

interface PayMethodState {
  payMethods: PayMethod[];
  isLoading: boolean;

  fetchPayMethods: (userId: string) => Promise<void>;
  addNewPayMethod: (detail: PayMethod) => Promise<void>;
}
