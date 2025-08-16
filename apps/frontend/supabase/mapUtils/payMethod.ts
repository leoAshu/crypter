const payMethodToDbMap: Record<keyof PayMethod, string> = {
  id: 'id',
  userId: 'user_id',
  payMethodTypeId: 'pay_method_type_id',
  isActive: 'is_active',
  bankName: 'bank_name',
  branchName: 'branch_name',
  accountType: 'account_type',
  accountNo: 'account_no',
  ifsc: 'ifsc',
  upiId: 'upi_id',
  phone: 'phone',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
};

const dbToPayMethodMap: Record<string, keyof PayMethod> = Object.entries(payMethodToDbMap).reduce(
  (acc, [camelKey, snakeKey]) => {
    acc[snakeKey] = camelKey as keyof PayMethod;
    return acc;
  },
  {} as Record<string, keyof PayMethod>,
);

// snake_case → camelCase
const convertToPayMethodKeys = (obj: Record<string, any>): PayMethod => {
  return Object.entries(obj).reduce((acc, [snakeKey, value]) => {
    const camelKey = dbToPayMethodMap[snakeKey];
    if (camelKey) acc[camelKey] = value;
    return acc;
  }, {} as Partial<PayMethod>) as PayMethod;
};

export { convertToPayMethodKeys };
