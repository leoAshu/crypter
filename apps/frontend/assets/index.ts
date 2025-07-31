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
  active: {
    home: require('./icons/active/home.png'),
    user: require('./icons/active/user.png'),
    p2p: require('./icons/active/p2p.png'),
    receipt: require('./icons/active/receipt.png'),
    subtitle: require('./icons/active/subtitle.png'),
  },
  inactive: {
    home: require('./icons/inactive/home.png'),
    user: require('./icons/inactive/user.png'),
    p2p: require('./icons/inactive/p2p.png'),
    receipt: require('./icons/inactive/receipt.png'),
    subtitle: require('./icons/inactive/subtitle.png'),

    light: {
      arrowRight: require('./icons/inactive/light/arrow-right.png'),
      likeTag: require('./icons/inactive/light/like-tag.png'),
      notification: require('./icons/inactive/light/notification.png'),
      verify: require('./icons/inactive/light/verify.png'),
      money: require('./icons/inactive/light/money.png'),
      messageQuestion: require('./icons/inactive/light/message-question.png'),
    },

    dark: {
      arrowRight: require('./icons/inactive/dark/arrow-right.png'),
      likeTag: require('./icons/inactive/dark/like-tag.png'),
      notification: require('./icons/inactive/dark/notification.png'),
      verify: require('./icons/inactive/dark/verify.png'),
      money: require('./icons/inactive/dark/money.png'),
      messageQuestion: require('./icons/inactive/dark/message-question.png'),
    },
  },
};

export { icons, images };
