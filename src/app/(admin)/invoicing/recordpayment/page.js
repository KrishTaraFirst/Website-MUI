// @next
import dynamic from 'next/dynamic';

// @project
const RecordPayment = dynamic(() => import('@/views/admin/invoicing/RecordPayment'));

/***************************  ACCOUNT  ***************************/

export default function Invoicings() {
  return <RecordPayment />;
}
