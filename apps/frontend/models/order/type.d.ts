interface Order {
  id: string;
  adId: string;
  orderType: OrderType;
  subType: OrderSubType;
  cryptoId: string;
  currency: string;
  pricePerUnit: number;
  totalAmount: number;
  quantity: number;
  createdAt: string;
  statusTime: string;
  counterparty: {
    name: string;
    verified: boolean;
    badge: 'gold' | 'purple' | 'none';
  };
  type: AdType; // 'buy' | 'sell' (from AdType)
  payMethodId: string;
}
