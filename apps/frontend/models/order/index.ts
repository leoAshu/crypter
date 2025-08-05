const orders: Order[] = [
  {
    id: 'ORD-20250801-000001-A1B2C3D4E5F6',
    adId: 'ad-1',
    orderType: 'pending',
    subType: 'unpaid',
    cryptoId: 'btc',
    currency: 'INR',
    pricePerUnit: 3100000,
    totalAmount: 155000,
    quantity: 0.05,
    createdAt: '2025-08-01T12:00:00Z',
    statusTime: '10 min ago',
    counterparty: {
      name: 'CryptoKing21',
      verified: true,
      badge: 'gold',
    },
    type: 'buy',
    payMethodId: 'upi',
  },
  {
    id: 'ORD-20250801-000002-F9E8D7C6B5A4',
    adId: 'ad-2',
    orderType: 'pending',
    subType: 'paid',
    cryptoId: 'usdt',
    currency: 'INR',
    pricePerUnit: 91.8,
    totalAmount: 9180,
    quantity: 100,
    createdAt: '2025-08-01T11:30:00Z',
    statusTime: '20 min ago',
    counterparty: {
      name: 'StableBro',
      verified: true,
      badge: 'purple',
    },
    type: 'sell',
    payMethodId: 'paytm',
  },
  {
    id: 'ORD-20250801-000003-ABCDEF123456',
    adId: 'ad-3',
    orderType: 'pending',
    subType: 'appeal',
    cryptoId: 'usdt',
    currency: 'INR',
    pricePerUnit: 0.0013,
    totalAmount: 2600,
    quantity: 2000000,
    createdAt: '2025-08-01T10:45:00Z',
    statusTime: '1 hr ago',
    counterparty: {
      name: 'ShibaQueen',
      verified: false,
      badge: 'none',
    },
    type: 'sell',
    payMethodId: 'imps',
  },
  {
    id: 'ORD-20250730-000004-XYZ789LMNOPQ',
    adId: 'ad-4',
    orderType: 'completed',
    subType: 'completed',
    cryptoId: 'eth',
    currency: 'INR',
    pricePerUnit: 12.34,
    totalAmount: 2468,
    quantity: 200,
    createdAt: '2025-07-30T16:00:00Z',
    statusTime: 'Jul 30, 4:30 PM',
    counterparty: {
      name: 'btclord9000',
      verified: true,
      badge: 'purple',
    },
    type: 'buy',
    payMethodId: 'phonepe',
  },
  {
    id: 'ORD-20250728-000005-1A2B3C4D5E6F',
    adId: 'ad-5',
    orderType: 'completed',
    subType: 'canceled',
    cryptoId: 'btc',
    currency: 'INR',
    pricePerUnit: 2999990,
    totalAmount: 299999,
    quantity: 0.1,
    createdAt: '2025-07-28T09:00:00Z',
    statusTime: 'Jul 28, 9:30 AM',
    counterparty: {
      name: 'WrappedWizard',
      verified: false,
      badge: 'none',
    },
    type: 'sell',
    payMethodId: 'gpay',
  },
];

const getFilteredOrders = (type: OrderType, subType: OrderSubType) => {
  return orders.filter((o) => {
    if (o.orderType !== type) return false;
    if (subType === 'all') return true;
    return o.subType === subType;
  });
};

export { getFilteredOrders, orders };
