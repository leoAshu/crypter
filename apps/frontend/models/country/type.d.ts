interface Country {
  id: string;
  name: string;
  iso2: string;
  iso3: string;
  phoneCode: string;
  currencyCode: string;
  currencySymbol: string;
  currencyName: string;
  isActive: boolean;
  position: number;
  createdAt?: string;
  updatedAt?: string;
}
