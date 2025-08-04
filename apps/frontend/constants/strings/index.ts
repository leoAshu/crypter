const Strings = {
  appName: 'Crypter',
  login: {
    SCREEN_TITLE: "Let's sign you in!",
    EMAIL_LABEL: 'Email Address',
    PASSWORD_LABEL: 'Password',
    BUTTON_LABEL: 'Login',
    OR_CONTINUE_WITH: 'Or continue with',
    NO_ACCOUNT_TEXT: "Don't have an account?",
    SIGNUP_CTA: 'Sign Up',
  },
  signup: {
    SCREEN_TITLE: "Let's sign you up!",
    EMAIL_LABEL: 'Email Address',
    BUTTON_LABEL: 'Continue with Email',
    OR_CONTINUE_WITH: 'Or continue with',
    NO_ACCOUNT_TEXT: 'Already have an account?',
    SIGNIN_CTA: 'Sign In',
  },
  signupInfo: {
    SCREEN_TITLE: 'Almost there...',
    EMAIL_LABEL: 'Email Address',
    NAME_LABEL: 'First Name',
    PHONE_LABEL: 'Phone Number',
    PASSWORD_LABEL: 'Password',
    CONFIRM_PASSWORD_LABEL: 'Confirm Password',
    BUTTON_LABEL: 'Sign Up',
  },
  welcome: {
    SCREEN_GREETING: 'Hello',
    SCREEN_TITLE: 'Welcome to Crypter',
    WELCOME_TEXT: "It's great to have you here",
    BUTTON_LABEL: "I'm ready to start!",
  },
  home: {
    TAB_TITLE: 'Home',
    HEADER_TITLE: 'Home',
  },
  profile: {
    TAB_TITLE: 'Profile',
    HEADER_TITLE: 'Profile',
    TRADING_STATS_TITLE: 'Trading Info',
    TOTAL_TRADES_LABEL: 'Total Trades',
    COMPLETION_RATE_LABEL: 'Completion Rate',
    AVG_RELEASE_LABEL: 'Average Release Time',
    AVG_PAY_LABEL: 'Average Pay Time',
    VIEW_MORE_LABEL: 'View More Details',
    MENU_FEEDBACK_TITLE: 'Received Feedback',
    MENU_NOTIF_TITLE: 'Notifications',
    MENU_MERCHANT_TITLE: 'Become a Merchant',
    MENU_PAY_METHODS_TITLE: 'Payment Methods',
    MENU_HELP_TITLE: 'Help Center',
    LOGOUT_BTN_TITLE: 'Log Out',
  },
  editProfile: {
    HEADER_TITLE: 'Edit',
    NAME_LABEL: 'Your name',
    EMAIL_LABEL: 'Email Address',
    PASSWORD_LABEL: 'Your Password',
    PHONE_LABEL: 'Phone Number',
    SAVE_BTN_TITLE: 'Save',
  },
  p2p: {
    TAB_TITLE: 'P2P',
    HEADER_TITLE: 'MarketPlace',
  },
  orders: {
    TAB_TITLE: 'Orders',
    HEADER_TITLE: 'Orders',
  },
  myAds: {
    TAB_TITLE: 'Adverts',
    HEADER_TITLE: 'My Adverts',
  },
  postAd: {
    HEADER_TITLE: 'Post Adverts',
    EMPTY_STATE: 'No ads available',
  },
  errors: {
    EMAIL_ERROR: 'Please enter a valid email address',
  },
};

export * from './alert';
export * from './components';
export * from './toast';
export { Strings };
