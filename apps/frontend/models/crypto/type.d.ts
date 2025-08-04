interface CryptoCurr {
  id: string; // e.g., 'btc'
  name: string; // e.g., 'Bitcoin'
  symbol: string; // e.g., 'BTC'
  logoUrl: string; // e.g., '/icons/coins/btc.png'
  network: string; // e.g., 'Bitcoin', 'Ethereum', 'Solana'
  decimals: number; // e.g., 8 for BTC, 18 for ETH
  contractAddress?: string; // For ERC20/solana tokens, etc.
  isActive: boolean; // Whether it's available for trading
}

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

type CryptoOptions = (typeof cryptoOptions)[number];
