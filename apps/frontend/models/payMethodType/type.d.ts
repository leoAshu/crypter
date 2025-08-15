interface PayMethodType {
  id: string;
  name: string;
  isActive: boolean;
  logoUrl?: ImageSourcePropType;
  category: PayMethodCategory;
  createdAt?: string;
  updatedAt?: string;
}
