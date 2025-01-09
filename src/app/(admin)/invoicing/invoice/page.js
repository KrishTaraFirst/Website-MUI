// @next
import dynamic from 'next/dynamic';

// @project
const InvoiceTemplate = dynamic(() => import('@/views/admin/invoicing/invoice'));

/***************************  ACCOUNT  ***************************/

export default function Invoice() {
  return <InvoiceTemplate />;
}
