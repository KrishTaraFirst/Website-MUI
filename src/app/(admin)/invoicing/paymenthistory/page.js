// @next
import dynamic from 'next/dynamic';

// @project
const PaymentHistory = dynamic(() => import('@/views/admin/invoicing/PaymentHistory'));

/***************************  ACCOUNT  ***************************/

export default function Invoicings() {
  return <PaymentHistory />;
}
