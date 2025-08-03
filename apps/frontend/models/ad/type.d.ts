interface Ad {
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
  pricePerUnit: number;
  cryptoId: string; // e.g. "usdt-eth" or "btc"
  currency: string; // e.g. "INR"
  minLimit: number;
  maxLimit: number;
  available: number;
  payMethodIds: string[];
  releaseTime: string;
  type: AdType;
}

type AdType = 'buy' | 'sell';
