interface SignInParams {
  email: string;
  password: string;
}

interface SignUpParams {
  name: string;
  phone: string;
  email: string;
  password: string;
}

interface UpdateUserParams {
  email: string;
  name: string;
  phone: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User;

  setIsAuthenticated: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setUser: (user: User | null) => void;

  fetchAuthenticatedUser: () => Promise<void>;
}
