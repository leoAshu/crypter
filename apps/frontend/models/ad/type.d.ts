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
  isActive: boolean;
  userId: string;
  userFullName: string;
  userAvatar: string;
  userVerified: boolean;
  userTotalTrades: number;
  userCompletionRate: number;
  createdAt: string;
}
