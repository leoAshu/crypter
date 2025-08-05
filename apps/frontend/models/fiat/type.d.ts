interface FiatCurrency {
  id: string; // 'usd', 'inr', 'eur', etc. (ISO 4217 lowercase preferred)
  name: string; // 'US Dollar', 'Indian Rupee'
  symbol: string; // '$', '₹'
  country: string; // 'United States', 'India'
  code: string; // 'USD', 'INR'
  isActive: boolean; // for toggle control
  position: number; // for sorting in dropdowns
  createdAt?: string;
  updatedAt?: string;
}
