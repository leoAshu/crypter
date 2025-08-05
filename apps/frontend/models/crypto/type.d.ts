interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  logoUrl: string;
  network: string;
  category: string;
  decimals: number;
  contractAddress?: string;
  isActive: boolean;
  createdAt: string;
}
