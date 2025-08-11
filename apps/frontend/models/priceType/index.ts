enum PriceType {
  Fixed = 'fixed',
  Floating = 'floating',
}

//temp record for price selectors
const priceSelectorRange: Record<string, string[]> = {
  [PriceType.Fixed]: ['200', '300', '400', '500'],
  [PriceType.Floating]: ['200-8000', '8001-12000'],
} as const;

const priceIndex: Record<PriceType, number> = {
  [PriceType.Fixed]: 0,
  [PriceType.Floating]: 0,
} as const;

export { priceIndex, priceSelectorRange, PriceType };
