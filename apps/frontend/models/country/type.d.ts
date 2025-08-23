interface Country {
  id: string;
  name: string;
  iso2: string;
  iso3: string;
  phoneCode: string;
  fiatCode: string;
  fiatSymbol: string;
  fiatName: string;
  isActive: boolean;
  position: number;
  createdAt?: string;
  updatedAt?: string;
}
