const images = {
  logo: require('./images/logo.png'),
  google: require('./images/google.png'),
  x: require('./images/x.png'),
  eye: require('./images/eye.png'),
  eyeOff: require('./images/eye-off.png'),
  mail: require('./images/mail.png'),
  home: require('./images/home.png'),
  account: require('./images/account.png'),
  facebook: require('./images/facebook.png'),
  edit: require('./images/edit.png'),
  arrowLeft: require('./images/arrow-left.png'),
  next: require('./images/next.png'),
  walletBackground: require('./images/wallet-bg.png'),
  exchange: require('./images/exchange.png'),
  p2p: require('./images/couple.png'),
  ads: require('./images/megaphone.png'),
  plus: require('./images/plus.png'),
  like: require('./images/like.png'),
  stopwatch: require('./images/stopwatch.png'),
  gPay: require('./payment-methods/gpay.png'),
  phonepe: require('./payment-methods/phonepe.png'),
  upi: require('./payment-methods/upi.png'),
  paytm: require('./payment-methods/paytm.png'),
  imps: require('./payment-methods/imps.png'),
  receipt: require('./images/receipt.png'),
  tickSquare: require('./images/tick-square.png'),
  rating: require('./images/star.png'),
};

const icons = {
  exchange: require('./icons/exchange.png'),

  // Light Theme Icons
  light: {
    // Header
    arrowLeft: require('./icons/light/arrow-left.png'),

    // Menu
    arrowRight: require('./icons/light/arrow-right.png'),
    likeTag: require('./icons/light/like-tag.png'),
    notification: require('./icons/light/notification.png'),
    verify: require('./icons/light/verify.png'),
    money: require('./icons/light/money.png'),
    messageQuestion: require('./icons/light/message-question.png'),

    // Active Tab
    active: {
      home: require('./icons/light/active/home.png'),
      user: require('./icons/light/active/user.png'),
      p2p: require('./icons/light/active/p2p.png'),
      receipt: require('./icons/light/active/receipt.png'),
      subtitle: require('./icons/light/active/subtitle.png'),
    },

    // Inactive Tab
    inactive: {
      home: require('./icons/light/inactive/home.png'),
      user: require('./icons/light/inactive/user.png'),
      p2p: require('./icons/light/inactive/p2p.png'),
      receipt: require('./icons/light/inactive/receipt.png'),
      subtitle: require('./icons/light/inactive/subtitle.png'),
    },
  },

  // Dark Theme Icons
  dark: {
    // Header
    arrowLeft: require('./icons/dark/arrow-left.png'),

    // Menu
    arrowRight: require('./icons/dark/arrow-right.png'),
    likeTag: require('./icons/dark/like-tag.png'),
    notification: require('./icons/dark/notification.png'),
    verify: require('./icons/dark/verify.png'),
    money: require('./icons/dark/money.png'),
    messageQuestion: require('./icons/dark/message-question.png'),

    // Active Tab
    active: {
      home: require('./icons/dark/active/home.png'),
      user: require('./icons/dark/active/user.png'),
      p2p: require('./icons/dark/active/p2p.png'),
      receipt: require('./icons/dark/active/receipt.png'),
      subtitle: require('./icons/dark/active/subtitle.png'),
    },

    // Inactive Tab
    inactive: {
      home: require('./icons/dark/inactive/home.png'),
      user: require('./icons/dark/inactive/user.png'),
      p2p: require('./icons/dark/inactive/p2p.png'),
      receipt: require('./icons/dark/inactive/receipt.png'),
      subtitle: require('./icons/dark/inactive/subtitle.png'),
    },
  },
};

export { icons, images };
