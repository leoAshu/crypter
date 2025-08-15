const usePayMethod = () => {
  const payMethods: PayMethod[] = [
    {
      id: 'pm-001',
      userId: 'user-123',
      payMethodTypeId: 'bank',
      address: 'HDFC00012341234567890',
      isActive: true,
    },
    {
      id: 'pm-006',
      userId: 'user-123',
      payMethodTypeId: 'gpay',
      address: 'username@okhdfc',
      isActive: true,
    },
    {
      id: 'pm-002',
      userId: 'user-123',
      payMethodTypeId: 'imps',
      address: '9876543210@imps',
      isActive: false,
    },
    {
      id: 'pm-003',
      userId: 'user-123',
      payMethodTypeId: 'paytm',
      address: '9876543210@paytm',
      isActive: false,
    },
    {
      id: 'pm-004',
      userId: 'user-123',
      payMethodTypeId: 'phonepe',
      address: '9876543210@ybl',
      isActive: true,
    },
    {
      id: 'pm-005',
      userId: 'user-123',
      payMethodTypeId: 'upi',
      address: 'username@upi',
      isActive: false,
    },
  ];

  return {
    payMethods,
  };
};

export default usePayMethod;
