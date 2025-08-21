const images = {
  logo: require('./images/logo.png'),
  google: require('./images/google.png'),
  x: require('./images/x.png'),
  eye: require('./images/eye.png'),
  eyeOff: require('./images/eye-off.png'),
  mail: require('./images/mail.png'),
  facebook: require('./images/facebook.png'),
  edit: require('./images/edit.png'),
  plus: require('./images/plus.png'),
  walletBackground: require('./images/wallet-bg.png'),
  qr: require('./images/qr.png'),
  greenShield: require('./images/green-shield.png'),
  greenShieldDark: require('./images/green-shield-dark.png'),
};

const logos = {
  gPay: require('./pay-methods/gpay.png'),
  imps: require('./pay-methods/imps.png'),
  paytm: require('./pay-methods/paytm.png'),
  phonepe: require('./pay-methods/phonepe.png'),
  upi: require('./pay-methods/upi.png'),
  crypter: require('./images/logo.png'),
};

const icons = {
  exchange: require('./icons/exchange.png'),
  increment: require('./icons/increment.png'),
  decrement: require('./icons/decrement.png'),

  // Light Theme Icons
  light: {
    // Header
    arrowLeft: require('./icons/light/arrow-left.png'),
    tickSquare: require('./icons/light/tick-square.png'),

    // Menu
    arrowRight: require('./icons/light/arrow-right.png'),
    likeTag: require('./icons/light/like-tag.png'),
    notification: require('./icons/light/notification.png'),
    verify: require('./icons/light/verify.png'),
    money: require('./icons/light/money.png'),
    messageQuestion: require('./icons/light/message-question.png'),

    // AdCard
    clock: require('./icons/light/clock.png'),

    // OrderCard
    verifyGold: require('./icons/light/verify-gold.png'),
    copy: require('./icons/light/copy.png'),
    copySuccess: require('./icons/light/copy-success.png'),

    // Toast
    closeCircle: require('./icons/light/close-circle.png'),
    infoCircle: require('./icons/light/info-circle.png'),
    tickCircle: require('./icons/light/tick-circle.png'),
    warnCircle: require('./icons/light/warn-circle.png'),

    // InputFields
    arrowDown: require('./icons/light/arrow-down.png'),

    // Cryptos
    btc: require('./icons/light/btc.png'),
    eth: require('./icons/light/eth.png'),
    usdt: require('./icons/light/usdt.png'),

    // Routes
    noteFav: require('./icons/light/note-favorite.png'),
    addSquare: require('./icons/light/add-square.png'),

    // Active Tab
    active: {
      home: require('./icons/light/active/home.png'),
      user: require('./icons/light/active/user.png'),
      p2p: require('./icons/light/active/p2p.png'),
      receipt: require('./icons/light/active/receipt.png'),
      subtitle: require('./icons/light/active/subtitle.png'),

      // Rating
      like: require('./icons/light/active/like.png'),
      dislike: require('./icons/light/active/dislike.png'),
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
    tickSquare: require('./icons/dark/tick-square.png'),

    // Menu
    arrowRight: require('./icons/dark/arrow-right.png'),
    likeTag: require('./icons/dark/like-tag.png'),
    notification: require('./icons/dark/notification.png'),
    verify: require('./icons/dark/verify.png'),
    money: require('./icons/dark/money.png'),
    messageQuestion: require('./icons/dark/message-question.png'),

    // AdCard
    clock: require('./icons/dark/clock.png'),

    // OrderCard
    verifyGold: require('./icons/dark/verify-gold.png'),
    copy: require('./icons/dark/copy.png'),
    copySuccess: require('./icons/dark/copy-success.png'),

    // Toast
    closeCircle: require('./icons/dark/close-circle.png'),
    infoCircle: require('./icons/dark/info-circle.png'),
    tickCircle: require('./icons/dark/tick-circle.png'),
    warnCircle: require('./icons/dark/warn-circle.png'),

    // InputFields
    arrowDown: require('./icons/dark/arrow-down.png'),

    // Cryptos
    btc: require('./icons/dark/btc.png'),
    eth: require('./icons/dark/eth.png'),
    usdt: require('./icons/dark/usdt.png'),

    // Routes
    noteFav: require('./icons/dark/note-favorite.png'),
    addSquare: require('./icons/dark/add-square.png'),

    // Active Tab
    active: {
      home: require('./icons/dark/active/home.png'),
      user: require('./icons/dark/active/user.png'),
      p2p: require('./icons/dark/active/p2p.png'),
      receipt: require('./icons/dark/active/receipt.png'),
      subtitle: require('./icons/dark/active/subtitle.png'),

      // Rating
      like: require('./icons/dark/active/like.png'),
      dislike: require('./icons/dark/active/dislike.png'),
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

export { icons, images, logos };
