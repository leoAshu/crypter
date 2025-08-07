interface Ads {
  id: string;
  user: {
    id: string;
    name: string;
    verified: boolean;
    badge: 'purple' | 'gold' | 'none';
    trades: number;
    successRate: number;
    rating: number;
  };
  price: number;
  cryptoId: string; // e.g. "usdt" or "btc"
  currency: string; // e.g. "INR"
  minLimit: number;
  maxLimit: number;
  available: number;
  payMethods: string[];
  releaseTime: string;
  type: AdType;
}

interface Ad {
  id: string;
  price: number;
  cryptoId: string;
  fiatId: string;
  minLimit: number;
  maxLimit: number;
  available: number;
  payMethodIds: string[];
  releaseTime: string;
  type: AdType;
  userId: string;
  userFullName: string;
  userAvatar: string;
  userVerified: boolean;
  userTotalTrades: number;
  userCompletionRate: number;
  createdAt: string;
}

type AdType = 'buy' | 'sell';
