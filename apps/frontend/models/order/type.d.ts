type OrderType = 'pending' | 'completed';
type PendingOrderType = 'all' | 'unpaid' | 'paid' | 'appeal';
type CompletedOrderType = 'all' | 'completed' | 'canceled';
type OrderSubType = PendingOrderType | CompletedOrderType;

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
