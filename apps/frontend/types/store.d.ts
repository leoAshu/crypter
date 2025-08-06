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
  isLoading: boolean;

  fetchCryptos: () => Promise<void>;
}

interface StatState {
  stat: Stat | null;
  isLoading: boolean;

  fetchStat: (userId: string) => Promise<void>;
}

interface BalanceState {
  available: number;
  escrowed: number;
}

interface WalletState {
  address: string;
  balances: Record<string, BalanceState>;
}
