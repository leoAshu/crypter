const usePayMethod = () => {
  const payMethods: PayMethod[] = [
    // {
    //   id: 'pm-001',
    //   userId: 'user-123',
    //   payMethodTypeId: 'banktransfer',
    //   address: 'HDFC00012341234567890',
    //   isActive: true,
    // },
    {
      id: 'pm-002',
      userId: 'user-123',
      payMethodTypeId: 'imps',
      address: '9876543210@imps',
      isActive: true,
    },
    {
      id: 'pm-003',
      userId: 'user-123',
      payMethodTypeId: 'paytm',
      address: '9876543210@paytm',
      isActive: true,
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
      isActive: true,
    },
  ];

  return {
    payMethods,
  };
};

export default usePayMethod;
