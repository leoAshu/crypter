interface PayMethod {
  id: string;
  userId: string;
  payMethodTypeId: string;
  isActive: boolean;
  bankName?: string;
  branchName?: string;
  accountType?: string;
  ifsc?: string;
  accountNo?: string;
  upiId?: string;
  phone?: string;
}
