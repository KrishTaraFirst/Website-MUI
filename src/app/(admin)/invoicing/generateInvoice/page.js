// @next
import dynamic from 'next/dynamic';

// @project
const InvoicingComponent = dynamic(() => import('@/views/admin/invoicing/InvoicingComponent'));

/***************************  ACCOUNT  ***************************/

export default function Invoicings() {
  return <InvoicingComponent />;
}
