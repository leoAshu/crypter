const cryptos: CryptoCurr[] = [
  // Native Layer 1s
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    logoUrl: '/icons/coins/btc.png',
    network: 'Bitcoin',
    decimals: 8,
    isActive: true,
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    logoUrl: '/icons/coins/eth.png',
    network: 'Ethereum',
    decimals: 18,
    isActive: true,
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    logoUrl: '/icons/coins/sol.png',
    network: 'Solana',
    decimals: 9,
    isActive: true,
  },

  // Stablecoins on multiple networks
  {
    id: 'usdt-eth',
    name: 'Tether USD (ERC20)',
    symbol: 'USDT',
    logoUrl: '/icons/coins/usdt.png',
    network: 'Ethereum',
    decimals: 6,
    contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    isActive: true,
  },

  // Edge cases
  {
    id: 'doge',
    name: 'Dogecoin',
    symbol: 'DOGE',
    logoUrl: '/icons/coins/doge.png',
    network: 'Dogecoin',
    decimals: 8,
    isActive: true,
  },
  {
    id: 'shib-eth',
    name: 'Shiba Inu (ERC20)',
    symbol: 'SHIB',
    logoUrl: '/icons/coins/shib.png',
    network: 'Ethereum',
    decimals: 18,
    contractAddress: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
    isActive: true, // example of disabled meme coin
  },
  {
    id: 'wbtc',
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    logoUrl: '/icons/coins/wbtc.png',
    network: 'Ethereum',
    decimals: 8,
    contractAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    isActive: true,
  },

  // Inactive or Test Coins
  {
    id: 'test-usdc',
    name: 'Test USDC (DevNet)',
    symbol: 'USDC-TEST',
    logoUrl: '/icons/coins/usdc.png',
    network: 'Solana DevNet',
    decimals: 6,
    contractAddress: 'TESTADDRESS1234567890',
    isActive: false,
  },
  {
    id: 'xyz',
    name: 'XYZ Token (LongName Protocol)',
    symbol: 'XYZ',
    logoUrl: '/icons/coins/xyz.png',
    network: 'Polygon',
    decimals: 18,
    contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
    isActive: false,
  },
];

const cryptoOptions = ['all', ...cryptos.filter((c) => c.isActive).map((c) => c.id)];

const cryptoLabels: Record<string, string> = {
  all: 'All',
  ...Object.fromEntries(
    cryptos.filter((c) => typeof c.id === 'string' && typeof c.symbol === 'string').map((c) => [c.id, c.symbol]),
  ),
};

const getCryptoById = (id: string): CryptoCurr | undefined => {
  return cryptos.find((c) => c.id === id);
};

export { cryptoLabels, cryptoOptions, cryptos, getCryptoById };
