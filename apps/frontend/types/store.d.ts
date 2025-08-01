interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User;

  setIsAuthenticated: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setUser: (user: User | null) => void;

  fetchAuthenticatedUser: () => Promise<void>;
  updateProfile: (newInfo: UpdateUserParams) => Promise<void>;
  signout: () => Promise<void>;
  signin: (signInParams: SignInParams) => Promise<void>;
  signup: (signUpParams: SignUpParams) => Promise<void>;
}
