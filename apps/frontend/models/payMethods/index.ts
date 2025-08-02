import { logos } from '@/assets';

const payMethods: PayMethod[] = [
  { id: 'upi', name: 'UPI', isActive: true, logoUrl: logos.upi },
  { id: 'imps', name: 'IMPS', isActive: true, logoUrl: logos.imps },
  { id: 'phonepe', name: 'PhonePe', isActive: true, logoUrl: logos.phonepe },
  { id: 'paytm', name: 'Paytm', isActive: true, logoUrl: logos.paytm },
  { id: 'gpay', name: 'GPay', isActive: true, logoUrl: logos.gPay },
];

function getPayMethodById(id: string): PayMethod | undefined {
  return payMethods.find((pm) => pm.id === id);
}

export { getPayMethodById, payMethods };
