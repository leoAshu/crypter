interface Ad {
  id: string;
  price: number;
  cryptoId: string;
  countryId: string;
  minLimit: number;
  maxLimit: number;
  available: number;
  payMethodTypeIds: string[];
  releaseTime: string;
  type: AdType;
  isActive: boolean;
  userId: string;
  username: string;
  userFirstName: string;
  userLastName: string;
  userAvatar: string;
  userVerified: boolean;
  userTotalTrades: number;
  userCompletionRate: number;
  createdAt: string;
}
