interface Kyc {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  countryId: string;
  emailStatus: RequirementStatus;
  phoneStatus: RequirementStatus;
  identityStatus: RequirementStatus;
  idProof: string;
  addressProof: string;
  kycStatus: KycStatus;
  createdAt?: string;
  updatedAt?: string;
}

interface Requirement {
  id: RequirementType;
  label: string;
  status: RequirementStatus;
}
