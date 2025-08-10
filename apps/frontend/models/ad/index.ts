enum AdType {
  Buy = 'buy',
  Sell = 'sell',
}

enum PriceType {
  Fixed = 'fixed',
  Floating = 'floating',
}

//temp record for price selectors
const PRICE_SELECTOR_RANGE: Record<string, string[]> = {
  [PriceType.Fixed]: ['200-8000', '8001-12000'],
  [PriceType.Floating]: ['200', '300', '400', '500'],
} as const;

export { AdType, PRICE_SELECTOR_RANGE, PriceType };
